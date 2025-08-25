<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Trash2 } from 'lucide-svelte';
	import type { Todo } from './types';

	let {
		task,
		open = $bindable(),
		onUpdateTask,
		onDeleteTask,
		assignees = ['Duncan', 'Panda']
	}: {
		task: Todo | null;
		open: boolean;
		onUpdateTask: (task: Todo) => void;
		onDeleteTask: (taskId: number) => void;
		assignees?: string[];
	} = $props();

	let title = $state('');
	let description = $state('');
	let context = $state('');
	let selectedAssignee = $state('Duncan');
	let selectedPriority = $state('medium');
	let selectedStatus = $state('pending');
	let showDeleteConfirm = $state(false);

	const priorities = [
		{ value: 'low', label: 'Low', color: 'bg-green-500' },
		{ value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
		{ value: 'high', label: 'High', color: 'bg-red-500' }
	];

	const statuses = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'in_progress', label: 'In Progress' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'abandoned', label: 'Abandoned' },
		{ value: 'future', label: 'Future' }
	];

	$effect(() => {
		if (task && open) {
			title = task.task;
			description = task.description || '';
			context = task.context || '';
			selectedAssignee = task.assignee[0] || 'Duncan';
			selectedPriority = task.priority;
			selectedStatus = task.status;
		}
	});

	function handleUpdate() {
		if (!task || !title.trim()) return;

		const updatedTask: Todo = {
			...task,
			task: title,
			assignee: [selectedAssignee],
			priority: selectedPriority as 'low' | 'medium' | 'high',
			status: selectedStatus,
			description: description.trim(),
			context: context.trim()
		};

		onUpdateTask(updatedTask);
		open = false;
	}

	function handleDelete() {
		if (!task) return;
		onDeleteTask(task.id);
		showDeleteConfirm = false;
		open = false;
	}

	function handleCancel() {
		open = false;
	}
</script>

{#if task}
<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Edit Task</Dialog.Title>
			<Dialog.Description>
				Update the task details or delete it entirely.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="edit-title">Task Title *</Label>
				<Input
					id="edit-title"
					bind:value={title}
					placeholder="Enter task title..."
					class="col-span-3"
				/>
			</div>
			
			<div class="grid gap-2">
				<Label for="edit-description">Description</Label>
				<Textarea
					id="edit-description"
					bind:value={description}
					placeholder="Describe what needs to be done..."
					class="min-h-[80px]"
				/>
			</div>
			
			<div class="grid gap-2">
				<Label for="edit-context">Context</Label>
				<Textarea
					id="edit-context"
					bind:value={context}
					placeholder="Provide additional context or background information..."
					class="min-h-[80px]"
				/>
			</div>
			
			<div class="grid grid-cols-3 gap-4">
				<div class="grid gap-2">
					<Label for="edit-assignee">Assignee</Label>
					<select
						id="edit-assignee"
						bind:value={selectedAssignee}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						{#each assignees as assignee}
							<option value={assignee}>{assignee}</option>
						{/each}
					</select>
				</div>
				
				<div class="grid gap-2">
					<Label for="edit-priority">Priority</Label>
					<select
						id="edit-priority"
						bind:value={selectedPriority}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						{#each priorities as priority}
							<option value={priority.value}>{priority.label}</option>
						{/each}
					</select>
				</div>

				<div class="grid gap-2">
					<Label for="edit-status">Status</Label>
					<select
						id="edit-status"
						bind:value={selectedStatus}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						{#each statuses as status}
							<option value={status.value}>{status.label}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<Dialog.Footer class="flex justify-between">
			<AlertDialog.Root bind:open={showDeleteConfirm}>
				<AlertDialog.Trigger>
					<Button variant="destructive" class="gap-2">
						<Trash2 class="h-4 w-4" />
						Delete Task
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete the task.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action onclick={handleDelete}>Delete</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
			
			<div class="flex gap-2">
				<Button variant="outline" onclick={handleCancel}>Cancel</Button>
				<Button onclick={handleUpdate} disabled={!title.trim()}>Update Task</Button>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
{/if}