<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { ChevronUp, ChevronDown } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import type { Todo, TodosByStatus, StatusLabels, BadgeVariant } from './types.js';

	interface TodoCardProps {
		todo: Todo;
		moveItemUp: (todo: Todo) => Promise<void>;
		moveItemDown: (todo: Todo) => Promise<void>;
		moveTodo: (todo: Todo, newStatus: Todo['status']) => Promise<void>;
		getPriorityColor: (priority: string) => BadgeVariant;
		statusOrder: string[];
		statusLabels: StatusLabels;
		todosByStatus: TodosByStatus;
	}

	let { 
		todo, 
		moveItemUp, 
		moveItemDown, 
		moveTodo, 
		getPriorityColor, 
		statusOrder, 
		statusLabels,
		todosByStatus 
	}: TodoCardProps = $props();
</script>

<div 
	class="border rounded-lg todo-card mb-2 grid gap-0 overflow-hidden
		{todo.priority === 'high' ? 'border-red-200' : 
		 todo.priority === 'medium' ? 'border-yellow-200' : 
		 'border-gray-200'}"
	style="grid-template-columns: 1fr 100px;"
	in:fly={{ x: -20, duration: 300 }}
	out:fly={{ x: 20, duration: 200 }}
>
	<!-- Content Column -->
	<div class="col-span-1 p-3 bg-white">
		<div class="flex justify-between items-start mb-2">
			<h4 class="font-semibold text-gray-900 text-sm leading-tight">{todo.task}</h4>
		</div>
		
		<div class="text-xs text-gray-600 mb-2">
			<strong>Assigned:</strong> {todo.assignee.join(', ')}
		</div>
		
		{#if todo.dueDate}
			<div class="text-xs text-gray-600 mb-2">
				<strong>Due:</strong> {todo.dueDate}
			</div>
		{/if}
		
		<p class="text-xs text-gray-700 mb-2">{todo.description}</p>
		
		<!-- Quick Action Buttons -->
		<div class="flex flex-wrap gap-1 mt-2">
			{#each statusOrder as targetStatus}
				{#if targetStatus !== todo.status}
					<button
						class="text-xs h-6 px-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
						onclick={() => moveTodo(todo, targetStatus as Todo['status'])}
					>
						→ {statusLabels[targetStatus] || targetStatus}
					</button>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Status & Chevron Column -->
	<div class="col-span-1 p-3 bg-white flex flex-col justify-between items-center">
		<button
			class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-full shadow-sm transition-all"
			onclick={(e) => { e.stopPropagation(); moveItemUp(todo); }}
			disabled={!todosByStatus[todo.status] || todosByStatus[todo.status].findIndex(t => t.id === todo.id) === 0}
			title="Move up"
		>
			<ChevronUp size={14} />
		</button>

		<Badge variant={getPriorityColor(todo.priority)} class="text-xs">
			{todo.priority}
		</Badge>

		<button
			class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-full shadow-sm transition-all"
			onclick={(e) => { e.stopPropagation(); moveItemDown(todo); }}
			disabled={!todosByStatus[todo.status] || todosByStatus[todo.status].findIndex(t => t.id === todo.id) === todosByStatus[todo.status].length - 1}
			title="Move down"
		>
			<ChevronDown size={14} />
		</button>
	</div>
</div>

<style>
	.todo-card {
		transition: all 0.2s ease;
	}
	
	.todo-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style>