<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Plus } from 'lucide-svelte';
	import type { Todo } from './types';

	let {
		onAddTask,
		assignees = ['Duncan', 'Panda']
	}: {
		onAddTask: (task: Partial<Todo>) => void;
		assignees?: string[];
	} = $props();

	let open = $state(false);
	let title = $state('');
	let description = $state('');
	let context = $state('');
	let selectedAssignee = $state('Duncan');
	let selectedPriority = $state('medium');

	const priorities = [
		{ value: 'low', label: 'Low', color: 'bg-green-500' },
		{ value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
		{ value: 'high', label: 'High', color: 'bg-red-500' }
	];

	function handleSubmit() {
		if (!title.trim()) return;

		const newTask: Partial<Todo> = {
			task: title,
			assignee: [selectedAssignee],
			organization: 'Elsinore Cottage Team',
			status: 'pending',
			priority: selectedPriority as 'low' | 'medium' | 'high',
			description: description.trim(),
			context: context.trim()
		};

		onAddTask(newTask);
		
		// Reset form
		title = '';
		description = '';
		context = '';
		selectedAssignee = 'Duncan';
		selectedPriority = 'medium';
		open = false;
	}

	function handleCancel() {
		// Reset form
		title = '';
		description = '';
		context = '';
		selectedAssignee = 'Duncan';
		selectedPriority = 'medium';
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button variant="default" class="gap-2">
			<Plus class="h-4 w-4" />
			Add Task
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Add New Task</Dialog.Title>
			<Dialog.Description>
				Create a new task for the Elsinore Cottage project. Fill in the details below.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="title">Task Title *</Label>
				<Input
					id="title"
					bind:value={title}
					placeholder="Enter task title..."
					class="col-span-3"
				/>
			</div>
			
			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					bind:value={description}
					placeholder="Describe what needs to be done..."
					class="min-h-[80px]"
				/>
			</div>
			
			<div class="grid gap-2">
				<Label for="context">Context</Label>
				<Textarea
					id="context"
					bind:value={context}
					placeholder="Provide additional context or background information..."
					class="min-h-[80px]"
				/>
			</div>
			
			<div class="grid grid-cols-2 gap-4">
				<div class="grid gap-2">
					<Label for="assignee">Assignee</Label>
					<select
						id="assignee"
						bind:value={selectedAssignee}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						{#each assignees as assignee}
							<option value={assignee}>{assignee}</option>
						{/each}
					</select>
				</div>
				
				<div class="grid gap-2">
					<Label for="priority">Priority</Label>
					<select
						id="priority"
						bind:value={selectedPriority}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						{#each priorities as priority}
							<option value={priority.value}>{priority.label}</option>
						{/each}
					</select>
					<div class="flex items-center gap-2 text-sm text-muted-foreground">
						{#each priorities as priority}
							{#if priority.value === selectedPriority}
								<div class="h-2 w-2 rounded-full {priority.color}"></div>
								<span>{priority.label} priority selected</span>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={handleCancel}>Cancel</Button>
			<Button onclick={handleSubmit} disabled={!title.trim()}>Create Task</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>