<script lang="ts">
	import { dndzone, TRIGGERS, SOURCES } from 'svelte-dnd-action';
	import { Badge } from '$lib/components/ui/badge';
	import { GripVertical, Calendar, Users, AlertCircle } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { getPriorityColor, getPriorityIcon } from './helpers';
	import FilterTabs from './FilterTabs.svelte';
	import type { KanbanBoardProps, Todo, TodoColumns, DndEvent } from './types.js';

	let {
		todos = $bindable(),
		statusOrder,
		statusLabels,
		showChangeNotification
	}: KanbanBoardProps = $props();

	let dragDisabled = $state(false);
	let selectedOrganizations = $state<Set<string>>(new Set());
	let selectedAssignees = $state<Set<string>>(new Set());
	let kanbanBoardElement = $state<HTMLElement>();
	let columnWidth = $state<number>(400);
	let isNarrow = $state<boolean>(false);
	let expandedColumn = $state<string | null>(null);
	
	let columns = $derived.by(() => {
		const newColumns: TodoColumns = {};
		statusOrder.forEach((status: string) => {
			let filteredTodos = todos.filter((todo: Todo) => todo.status === status);

			// Apply organization filter if any organizations are selected
			if (selectedOrganizations.size > 0) {
				filteredTodos = filteredTodos.filter((todo: Todo) =>
					selectedOrganizations.has(todo.organization)
				);
			}

			// Apply assignee filter if any assignees are selected
			if (selectedAssignees.size > 0) {
				filteredTodos = filteredTodos.filter((todo: Todo) =>
					todo.assignee.some((assignee) => selectedAssignees.has(assignee))
				);
			}

			newColumns[status] = filteredTodos;
		});
		return newColumns;
	});


	$effect(() => {
		function updateColumnWidth() {
			if (kanbanBoardElement) {
				const boardWidth = kanbanBoardElement.clientWidth;
				const gap = 16; // gap-4 = 1rem = 16px
				const padding = 32; // p-4 = 2rem = 32px total
				const availableWidth = boardWidth - padding;
				const numColumns = statusOrder.length;
				const calculatedWidth = (availableWidth - (gap * (numColumns - 1))) / numColumns;
				
				columnWidth = Math.max(280, Math.min(400, calculatedWidth));
				isNarrow = calculatedWidth < 350; // Consider narrow if less than 350px
			}
		}

		if (typeof window !== 'undefined') {
			updateColumnWidth();
			window.addEventListener('resize', updateColumnWidth);
			
			return () => {
				window.removeEventListener('resize', updateColumnWidth);
			};
		}
	});

	function getStatusStyle(status: string): string {
		switch (status) {
			case 'completed':
				return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
			case 'in_progress':
				return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
			case 'scheduled':
				return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
			case 'pending':
				return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
			case 'abandoned':
				return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200';
			case 'future':
				return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
			default:
				return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
		}
	}

	function getStatusHeaderStyle(status: string): string {
		switch (status) {
			case 'completed':
				return 'background: linear-gradient(to right, #16a34a, #15803d);';
			case 'in_progress':
				return 'background: linear-gradient(to right, #2563eb, #1d4ed8);';
			case 'scheduled':
				return 'background: linear-gradient(to right, #9333ea, #7e22ce);';
			case 'pending':
				return 'background: linear-gradient(to right, #eab308, #ca8a04);';
			case 'abandoned':
				return 'background: linear-gradient(to right, #dc2626, #b91c1c);';
			case 'future':
				return 'background: linear-gradient(to right, #4b5563, #374151);';
			default:
				return 'background: linear-gradient(to right, #4b5563, #374151);';
		}
	}

	function handleDndConsiderColumn(status: string, e: DndEvent<Todo>): void {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		
		// Update todos array to reflect the new order/status
		const updatedTodos = [...todos];
		const currentStatusTodos = updatedTodos.filter(todo => todo.status === status);
		const otherTodos = updatedTodos.filter(todo => todo.status !== status);
		
		// Replace the todos for this status with the new items
		const newTodos = [...otherTodos];
		newItems.forEach(item => {
			newTodos.push({ ...item, status: status as Todo['status'] });
		});
		
		todos = newTodos;

		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	}

	async function handleDndFinalizeColumn(status: string, e: DndEvent<Todo>): Promise<void> {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		
		// Update todos array to reflect the final order/status
		const updatedTodos = [...todos];
		const otherTodos = updatedTodos.filter(todo => todo.status !== status);
		
		// Replace the todos for this status with the new items
		const allTodos = [...otherTodos];
		newItems.forEach(item => {
			allTodos.push({ ...item, status: status as Todo['status'] });
		});
		
		todos = allTodos;
		showChangeNotification();

		// Persist to server
		try {
			await fetch('/project/api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'save', todos: allTodos })
			});
		} catch (error) {
			console.error('Failed to save changes:', error);
		}

		if (source === SOURCES.KEYBOARD) {
			dragDisabled = true;
		}
	}


	function toggleColumnExpansion(status: string): void {
		expandedColumn = expandedColumn === status ? null : status;
	}
</script>

<!-- Filters -->
<FilterTabs {todos} bind:selectedOrganizations bind:selectedAssignees />

<div class="kanban-board w-full overflow-x-auto" bind:this={kanbanBoardElement}>
	<div class="flex gap-4 p-4" class:flex-col={expandedColumn}>
		{#each statusOrder as status}
			{#if !expandedColumn || expandedColumn === status}
				<div 
					class="kanban-column flex flex-col"
					class:flex-1={!expandedColumn}
					class:min-w-[280px]={!expandedColumn}
					class:max-w-[400px]={!expandedColumn}
					class:w-full={expandedColumn === status}
					class:h-[75vh]={!expandedColumn}
					class:h-auto={expandedColumn === status}
				>
				<div
					class="column-header text-white rounded-t-lg p-3 shadow-sm"
					style={getStatusHeaderStyle(status)}
				>
					<div class="flex items-center justify-between">
						<h3 class="font-bold text-sm uppercase tracking-wider">
							{statusLabels[status]}
							{#if expandedColumn === status}
								<span class="ml-2 text-xs opacity-75">(Expanded)</span>
							{/if}
						</h3>
						<Badge 
							variant="secondary" 
							class="bg-white/20 text-white border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
							onclick={() => toggleColumnExpansion(status)}
							role="button"
							tabindex="0"
							aria-label={expandedColumn === status ? "Collapse column" : "Expand column to horizontal view"}
						>
							{expandedColumn === status ? '✕' : (columns[status]?.length || 0)}
						</Badge>
					</div>
				</div>

				<div
					class="column-content {getStatusStyle(status)} rounded-b-lg p-3 border-2 border-t-0"
					class:overflow-y-auto={!expandedColumn || expandedColumn !== status}
					class:overflow-x-auto={expandedColumn === status}
					class:flex-1={!expandedColumn || expandedColumn !== status}
					class:h-auto={expandedColumn === status}
					class:flex={expandedColumn === status}
					class:flex-col={expandedColumn === status}
					class:gap-3={expandedColumn === status}
					class:space-y-0={expandedColumn === status}
					use:dndzone={{
						items: columns[status] || [],
						dragDisabled,
						dropTargetStyle: {},
						morphDisabled: false,
						type: 'kanban-card'
					}}
					onconsider={(e) => handleDndConsiderColumn(status, e)}
					onfinalize={(e) => handleDndFinalizeColumn(status, e)}
				>
					{#each columns[status] || [] as todo (todo.id)}
					<div
						animate:flip={{ duration: 300 }}
						class="kanban-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-move select-none"
						class:mb-3={expandedColumn !== status}
						class:w-full={expandedColumn === status}
						tabindex="0"
						role="button"
						aria-label="Drag to move task"
					>
							<div class="card-header" class:p-3={!isNarrow && expandedColumn !== status} class:pb-2={!isNarrow && expandedColumn !== status} class:p-2={isNarrow} class:p-4={expandedColumn === status}>
								{#if expandedColumn === status}
									<!-- Row layout for expanded column -->
									<div class="flex items-center gap-6">
										<div class="flex-1">
											<h4 class="font-semibold text-lg text-gray-900 leading-tight mb-2">
												{todo.task}
											</h4>
											<p class="text-sm text-gray-600">
												{todo.description}
											</p>
										</div>
										
										<div class="flex items-center gap-4 flex-shrink-0">
											{#if todo.assignee && todo.assignee.length > 0}
												<div class="flex items-center gap-2 text-sm text-gray-600">
													<Users size={16} />
													<span title={todo.assignee.join(', ')}>
														{todo.assignee.length > 1
															? `${todo.assignee[0]} +${todo.assignee.length - 1}`
															: todo.assignee[0]}
													</span>
												</div>
											{/if}

											{#if todo.dueDate}
												<div class="flex items-center gap-2 text-sm text-gray-600">
													<Calendar size={16} />
													<span>{todo.dueDate}</span>
												</div>
											{/if}

											<div class="flex gap-2">
												<Badge variant={getPriorityColor(todo.priority)} class="text-sm px-3 py-1">
													{todo.priority}
												</Badge>
												<Badge variant="outline" class="text-sm px-3 py-1">
													{todo.organization}
												</Badge>
											</div>

											<span class="priority-indicator text-2xl ml-2" title="{todo.priority} priority">
												{getPriorityIcon(todo.priority)}
											</span>
										</div>
									</div>
								{:else if isNarrow}
									<!-- Compact layout for narrow columns -->
									<div class="mb-1">
										<h4 class="font-semibold text-xs text-gray-900 leading-tight mb-1">
											{todo.task}
										</h4>
										<div class="flex items-center justify-between">
											<span class="priority-indicator text-sm" title="{todo.priority} priority">
												{getPriorityIcon(todo.priority)}
											</span>
											<Badge variant={getPriorityColor(todo.priority)} class="text-xs px-1 py-0">
												{todo.priority.charAt(0).toUpperCase()}
											</Badge>
										</div>
									</div>

									<p class="text-xs text-gray-600 mb-1 line-clamp-3">
										{todo.description}
									</p>

									<div class="space-y-1 text-xs">
										{#if todo.assignee && todo.assignee.length > 0}
											<div class="flex items-center gap-1 text-gray-500">
												<Users size={10} />
												<span class="truncate text-xs">
													{todo.assignee.length > 1
														? `${todo.assignee[0]} +${todo.assignee.length - 1}`
														: todo.assignee[0]}
												</span>
											</div>
										{/if}

										{#if todo.dueDate}
											<div class="flex items-center gap-1 text-gray-500">
												<Calendar size={10} />
												<span class="text-xs">{todo.dueDate}</span>
											</div>
										{/if}

										<Badge variant="outline" class="text-xs px-1 py-0 w-fit">
											{todo.organization}
										</Badge>
									</div>
								{:else}
									<!-- Standard layout for normal width columns -->
									<div class="flex items-start justify-between mb-2">
										<h4 class="font-semibold text-sm text-gray-900 leading-tight flex-1">
											{todo.task}
										</h4>
										<span class="priority-indicator text-lg ml-2" title="{todo.priority} priority">
											{getPriorityIcon(todo.priority)}
										</span>
									</div>

									<p class="text-xs text-gray-600 mb-2 line-clamp-2">
										{todo.description}
									</p>

									<div class="flex flex-wrap items-center gap-2 text-xs">
										{#if todo.assignee && todo.assignee.length > 0}
											<div class="flex items-center gap-1 text-gray-500">
												<Users size={12} />
												<span class="truncate max-w-[150px]" title={todo.assignee.join(', ')}>
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

									<div class="mt-2 flex gap-1">
										<Badge variant={getPriorityColor(todo.priority)} class="text-xs px-2 py-0">
											{todo.priority}
										</Badge>
										<Badge variant="outline" class="text-xs px-2 py-0">
											{todo.organization}
										</Badge>
									</div>
								{/if}
							</div>
						</div>
					{/each}

					{#if !columns[status]?.length}
						<div class="empty-state text-center py-12 text-gray-400">
							<div class="text-3xl mb-2">📋</div>
							<p class="text-sm">Drop items here</p>
						</div>
					{/if}
				</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.kanban-board {
		width: 100%;
		overflow-x: auto;
		scrollbar-width: thin;
		scrollbar-color: #cbd5e0 #f7fafc;
	}

	.kanban-board::-webkit-scrollbar {
		height: 8px;
	}

	.kanban-board::-webkit-scrollbar-track {
		background: #f1f5f9;
		border-radius: 4px;
	}

	.kanban-board::-webkit-scrollbar-thumb {
		background: #cbd5e0;
		border-radius: 4px;
	}

	.kanban-board::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}

	.kanban-card {
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		touch-action: none;
	}

	.kanban-card:active {
		cursor: grabbing !important;
		transform: rotate(2deg);
	}

	.column-content :global(.drop-target) {
		box-shadow: inset 0 0 0 2px #3b82f6;
		background-color: rgba(59, 130, 246, 0.05) !important;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.empty-state {
		border: 2px dashed #d1d5db;
		border-radius: 0.5rem;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.kanban-column {
		transition: all 0.3s ease-in-out;
	}

	.cards-container {
		transition: all 0.3s ease-in-out;
	}

	.column-content {
		transition: all 0.3s ease-in-out;
	}

	/* Enhanced styling for expanded row cards */
	.kanban-card.w-full {
		min-height: 80px;
	}
</style>
