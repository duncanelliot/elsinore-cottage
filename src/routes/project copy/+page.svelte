<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import PersonTodos from './PersonTodos.svelte';
	import KanbanBoard from './KanbanBoard.svelte';
	import BulkEmailGenerator from './BulkEmailGenerator.svelte';
	import ProjectStats from './ProjectStats.svelte';
	import ProjectParticipants from './ProjectParticipants.svelte';
	import SaveIndicator from './SaveIndicator.svelte';
	import AddTaskModal from './AddTaskModal.svelte';
	import EditTaskModal from './EditTaskModal.svelte';
	import { participants } from './data/participants.js';
	import { projectDetails } from './data/project-details.js';
	import { assigneeEmails } from './data/assignee-emails.js';
	import type { Todo, TodosByAssignee, TodosByStatus } from './types.js';
	import initialTodos from './data/todos.json';

	let lastModified = $state<string | null>(null);
	let showSaveIndicator = $state(false);
	let editTaskModalOpen = $state(false);
	let selectedTask = $state<Todo | null>(null);

	// Initialize todos from imported data
	let todos = $state<Todo[]>([...(initialTodos as Todo[])]);
	
	// Add new task handler
	function handleAddTask(newTask: Partial<Todo>) {
		const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
		const taskWithId: Todo = {
			id: maxId + 1,
			task: newTask.task || '',
			assignee: newTask.assignee || [],
			organization: newTask.organization || 'Elsinore Cottage Team',
			status: newTask.status || 'pending',
			priority: newTask.priority || 'medium',
			description: newTask.description || '',
			context: newTask.context || ''
		};
		todos = [...todos, taskWithId];
		showChangeNotification();
		
		// Save to file
		fetch('/project/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todos)
		});
	}
	
	// Edit task handlers
	function handleCardClick(task: Todo) {
		selectedTask = task;
		editTaskModalOpen = true;
	}
	
	function handleUpdateTask(updatedTask: Todo) {
		todos = todos.map(t => t.id === updatedTask.id ? updatedTask : t);
		showChangeNotification();
		
		// Save to file
		fetch('/project/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todos)
		});
	}
	
	function handleDeleteTask(taskId: number) {
		todos = todos.filter(t => t.id !== taskId);
		showChangeNotification();
		
		// Save to file
		fetch('/project/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todos)
		});
	}

	// Group todos by status
	let todosByStatus = $derived(
		todos.reduce((acc: TodosByStatus, todo: Todo) => {
			if (!acc[todo.status]) acc[todo.status] = [];
			acc[todo.status].push(todo);
			return acc;
		}, {} as TodosByStatus)
	);

	// Group todos by individual assignee for reminders
	let todosByAssignee = $derived.by((): TodosByAssignee => {
		const result: TodosByAssignee = {};
		todos.forEach((todo: Todo) => {
			// Assignee is now an array
			todo.assignee.forEach((assignee: string) => {
				if (!result[assignee]) result[assignee] = [];
				result[assignee].push(todo);
			});
		});
		return result;
	});

	function showChangeNotification() {
		lastModified = new Date().toLocaleTimeString();
		showSaveIndicator = true;
		setTimeout(() => {
			showSaveIndicator = false;
		}, 3000);
	}

	// Track selected assignees for bulk email
	let selectedAssignees = $state<Set<string>>(new Set());

	// Track selected todos for each assignee (todo id -> boolean)
	let selectedTodos = $state<Map<number, boolean>>(new Map());

	// Initialize all todos as selected by default
	$effect(() => {
		let needsUpdate = false;
		todos.forEach((todo) => {
			if (!selectedTodos.has(todo.id)) {
				selectedTodos.set(todo.id, true); // Always start with all todos selected
				needsUpdate = true;
			}
		});
		// Only update if changes were made
		if (needsUpdate) {
			selectedTodos = new Map(selectedTodos);
		}
	});

	// Initialize selected assignees with all available assignees
	$effect(() => {
		if (Object.keys(todosByAssignee).length > 0 && selectedAssignees.size === 0) {
			// Select all assignees by default (excluding 'All stakeholders' and Cloud Lobsters team)
			Object.keys(todosByAssignee).forEach((assignee) => {
				if (
					assignee !== 'All stakeholders' &&
					assignee !== 'Duncan Elliot' &&
					assignee !== 'Tara Whitaker'
				) {
					selectedAssignees.add(assignee);
				}
			});
			selectedAssignees = new Set(selectedAssignees);
		}
	});

	// Toggle individual todo selection
	function toggleTodoSelection(todoId: number): void {
		const newMap = new Map(selectedTodos);
		newMap.set(todoId, !newMap.get(todoId));
		selectedTodos = newMap;
	}

	// Toggle all todos for assignee
	function toggleAllTodosForAssignee(assignee: string, selectAll: boolean): void {
		const newMap = new Map(selectedTodos);
		const assigneeTodos = todosByAssignee[assignee] || [];
		assigneeTodos.forEach((todo: Todo) => {
			if (todo.status !== 'completed') {
				newMap.set(todo.id, selectAll);
			}
		});
		selectedTodos = newMap;
	}

	const statusOrder = ['pending', 'in_progress', 'scheduled', 'completed', 'abandoned', 'future'];
	const statusLabels: Record<string, string> = {
		pending: 'Pending',
		in_progress: 'In Progress',
		scheduled: 'Scheduled',
		completed: 'Completed',
		abandoned: 'Abandoned',
		future: 'Future'
	};
</script>

<svelte:head>
	<title>Project Overview - AXIS Canada x Cloud Lobsters</title>
</svelte:head>

<div class="w-full p-6">
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">{projectDetails.title}</h1>
		<p class="text-lg text-gray-600 mb-4">{projectDetails.description}</p>
		<Separator />
	</div>

	<Tabs value="todos" class="w-full">
		<TabsList class="grid w-full grid-cols-3">
			<TabsTrigger value="todos">Action Items & TODOs</TabsTrigger>
			<TabsTrigger value="who-is-who">Who is Who</TabsTrigger>
			<TabsTrigger value="reminders">Email Reminders</TabsTrigger>
		</TabsList>

		<TabsContent value="who-is-who" class="space-y-6">
			<ProjectParticipants {participants} />
		</TabsContent>

		<TabsContent value="todos" class="space-y-6">
			<!-- Summary Cards -->
			<ProjectStats {todosByStatus} />

			<!-- Kanban Board Style Todos -->
			<div class="space-y-4">
				<div class="flex justify-between items-center mb-4">
					<div>
						<h2 class="text-2xl font-bold text-gray-900">Action Items Kanban Board</h2>
						<p class="text-sm text-gray-600">
							Drag and drop cards between columns to change their status. Scroll horizontally to see
							all columns.
						</p>
					</div>
					<div class="flex items-center gap-4">
						<AddTaskModal onAddTask={handleAddTask} assignees={['Duncan', 'Panda']} />
						<SaveIndicator {showSaveIndicator} {lastModified} />
					</div>
				</div>

				<KanbanBoard bind:todos {statusOrder} {statusLabels} {showChangeNotification} onCardClick={handleCardClick} />
			</div>
		</TabsContent>

		<TabsContent value="reminders" class="space-y-6">
			<div class="mb-8">
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Email Reminders</h2>
				<p class="text-sm text-gray-600 mb-6">
					Generate personalized email reminders for each team member with their pending action
					items. Click "Copy Email" to copy the content to your clipboard.
				</p>
			</div>

			<!-- Bulk Email Generation Section -->
			<BulkEmailGenerator
				{todosByAssignee}
				bind:selectedAssignees
				{selectedTodos}
				{assigneeEmails}
			/>

			<div class="grid grid-cols-1 gap-6">
				{#each Object.entries(todosByAssignee) as [assignee, assigneeTodos]}
					<PersonTodos
						{assignee}
						{assigneeTodos}
						{assigneeEmails}
						bind:selectedTodos
						{todosByAssignee}
						{showChangeNotification}
					/>
				{/each}
			</div>

			{#if Object.keys(todosByAssignee).length === 0}
				<Card>
					<CardContent class="text-center py-12">
						<div class="text-4xl mb-4">📝</div>
						<p class="text-gray-500">No assignees found. Add some todos to generate reminders.</p>
					</CardContent>
				</Card>
			{/if}
		</TabsContent>
	</Tabs>
	
	<!-- Edit Task Modal -->
	<EditTaskModal 
		task={selectedTask} 
		bind:open={editTaskModalOpen} 
		onUpdateTask={handleUpdateTask} 
		onDeleteTask={handleDeleteTask} 
		assignees={['Duncan', 'Panda']}
	/>
</div>
