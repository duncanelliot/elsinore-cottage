<script>
	import { dndzone, TRIGGERS, SOURCES } from 'svelte-dnd-action';
	import { Badge } from '$lib/components/ui/badge';
	import KanbanCard from './KanbanCard.svelte';
	import { flip } from 'svelte/animate';
	
	let { 
		status,
		label,
		items = [],
		onConsider,
		onFinalize,
		dragDisabled
	} = $props();

	function getStatusHeaderStyle(status) {
		switch (status) {
			case 'completed':
				return 'background: linear-gradient(to right, #16a34a, #15803d);';
			case 'in_progress':
				return 'background: linear-gradient(to right, #2563eb, #1d4ed8);';
			case 'scheduled':
				return 'background: linear-gradient(to right, #9333ea, #7e22ce);';
			case 'pending':
				return 'background: linear-gradient(to right, #eab308, #ca8a04);';
			case 'future':
				return 'background: linear-gradient(to right, #4b5563, #374151);';
			default:
				return 'background: linear-gradient(to right, #4b5563, #374151);';
		}
	}

	function getStatusStyle(status) {
		switch (status) {
			case 'completed':
				return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
			case 'in_progress':
				return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
			case 'scheduled':
				return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
			case 'pending':
				return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
			case 'future':
				return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
			default:
				return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
		}
	}
</script>

<div class="kanban-column flex flex-col h-[calc(100vh-250px)] min-w-[320px] max-w-[400px] flex-1">
	<div class="column-header text-white rounded-t-lg p-3 shadow-sm" style="{getStatusHeaderStyle(status)}">
		<div class="flex items-center justify-between">
			<h3 class="font-bold text-sm uppercase tracking-wider">
				{label}
			</h3>
			<Badge variant="secondary" class="bg-white/20 text-white border-white/30">
				{items.length}
			</Badge>
		</div>
	</div>
	
	<div 
		class="column-content {getStatusStyle(status)} rounded-b-lg p-3 overflow-y-auto border-2 border-t-0 flex-1"
		use:dndzone={{
			items,
			dragDisabled,
			dropTargetStyle: {},
			morphDisabled: true,
			dropFromOthersDisabled: false,
			type: 'kanban'
		}}
		on:consider={onConsider}
		on:finalize={onFinalize}
	>
		{#each items as todo (todo.id)}
			<div animate:flip={{duration: 300}}>
				<KanbanCard {todo} />
			</div>
		{/each}
		
		{#if items.length === 0}
			<div class="empty-state text-center py-12 text-gray-400">
				<div class="text-3xl mb-2">📋</div>
				<p class="text-sm">Drop items here</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.kanban-column {
		display: flex;
		flex-direction: column;
	}
	
	.column-content {
		transition: background-color 0.2s ease;
		scrollbar-width: thin;
		scrollbar-color: #cbd5e0 transparent;
	}
	
	.column-content::-webkit-scrollbar {
		width: 6px;
	}
	
	.column-content::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.column-content::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
	
	.column-content::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
	
	.column-content:global(.drop-target) {
		box-shadow: inset 0 0 0 2px #3b82f6;
		background-color: rgba(59, 130, 246, 0.05) !important;
	}
	
	.empty-state {
		border: 2px dashed #d1d5db;
		border-radius: 0.5rem;
		background-color: rgba(255, 255, 255, 0.5);
	}
	
	:global(.kanban-card.dragging) {
		opacity: 0.5;
		transform: rotate(3deg);
	}
</style>