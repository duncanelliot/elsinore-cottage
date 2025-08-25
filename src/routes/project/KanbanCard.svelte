<script>
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, Users, AlertCircle } from '@lucide/svelte';
	import { getPriorityColor, getPriorityIcon } from './helpers';
	
	let { 
		todo,
		onCardClick
	} = $props();

	function handleClick(event) {
		// Prevent click during drag
		if (event.target.closest('.kanban-card').classList.contains('dragging')) {
			return;
		}
		onCardClick?.(todo);
	}
</script>

<div 
	class="kanban-card bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 cursor-pointer select-none hover:shadow-md transition-all"
	onclick={handleClick}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && handleClick(e)}
>
	<div class="flex items-start justify-between mb-2">
		<h4 class="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
			{todo.task}
		</h4>
		<span class="priority-indicator text-lg flex-shrink-0" title="{todo.priority} priority">
			{getPriorityIcon(todo.priority)}
		</span>
	</div>
	
	<p class="text-xs text-gray-600 mb-3 line-clamp-2">
		{todo.description}
	</p>
	
	<div class="flex flex-wrap items-center gap-2 text-xs mb-2">
		{#if todo.assignee && todo.assignee.length > 0}
			<div class="flex items-center gap-1 text-gray-500">
				<Users size={12} />
				<span class="truncate max-w-[180px]" title={todo.assignee.join(', ')}>
					{todo.assignee.length > 1 
						? `${todo.assignee[0]} +${todo.assignee.length - 1}` 
						: todo.assignee[0]}
				</span>
			</div>
		{/if}
		
		{#if todo.dueDate}
			<div class="flex items-center gap-1 text-gray-500">
				<Calendar size={12} />
				<span>{todo.dueDate}</span>
			</div>
		{/if}
		
		{#if todo.priority === 'high'}
			<div class="flex items-center gap-1 text-red-600">
				<AlertCircle size={12} />
				<span>High Priority</span>
			</div>
		{/if}
	</div>
	
	<div class="flex gap-1 flex-wrap">
		<Badge variant={getPriorityColor(todo.priority)} class="text-xs px-2 py-0">
			{todo.priority}
		</Badge>
		<Badge variant="outline" class="text-xs px-2 py-0">
			{todo.organization}
		</Badge>
	</div>
</div>

<style>
	.kanban-card {
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		touch-action: none;
	}
	
	.kanban-card:active {
		cursor: grabbing;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>