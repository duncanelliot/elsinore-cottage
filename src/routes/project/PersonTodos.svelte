<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { getPriorityColor, getStatusColor } from './helpers';
	import type { Todo, CopyStates, TodosByAssignee } from './types.js';

	let { 
		assignee,
		assigneeTodos,
		assigneeEmails,
		selectedTodos = $bindable(),
		todosByAssignee,
		showChangeNotification
	}: {
		assignee: string;
		assigneeTodos: Todo[];
		assigneeEmails: Record<string, string>;
		selectedTodos: Map<number, boolean>;
		todosByAssignee: TodosByAssignee;
		showChangeNotification: () => void;
	} = $props();

	// Internal state for copy button states
	let copyStates = $state<CopyStates>({});

	// Derived values
	const pendingTodos = $derived(assigneeTodos.filter((todo: Todo) => todo.status !== 'completed'));
	const highPriorityCount = $derived(pendingTodos.filter((todo: Todo) => todo.priority === 'high').length);
	const buttonState = $derived(copyStates[assignee] || 'ready');

	// Generate email content for a specific assignee
	function generateEmailContent(assignee: string, assigneeTodos: Todo[]): string {
		const pendingTodos = assigneeTodos.filter((todo: Todo) => todo.status !== 'completed');
		const highPriorityCount = pendingTodos.filter((todo: Todo) => todo.priority === 'high').length;

		let emailContent = `Hi ${assignee.split(' ')[0]},\n\n`;
		emailContent += `Here's a summary of your current action items for the AXIS Canada x Cloud Lobsters project:\n\n`;

		if (pendingTodos.length === 0) {
			emailContent += `✅ Great news! You have no pending action items at the moment.\n\n`;
		} else {
			if (highPriorityCount > 0) {
				emailContent += `🔴 You have ${highPriorityCount} high-priority item${highPriorityCount > 1 ? 's' : ''} that need${highPriorityCount === 1 ? 's' : ''} attention.\n\n`;
			}

			emailContent += `PENDING ITEMS (${pendingTodos.length}):\n`;
			emailContent += `${'='.repeat(40)}\n\n`;

			pendingTodos.forEach((todo: Todo, index: number) => {
				const priorityIcon =
					todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢';
				const statusText =
					todo.status === 'in_progress'
						? ' (IN PROGRESS)'
						: todo.status === 'scheduled'
							? ' (SCHEDULED)'
							: '';

				emailContent += `${index + 1}. ${priorityIcon} ${todo.task}${statusText}\n`;
				emailContent += `   ${todo.description}\n`;
				if (todo.dueDate) {
					emailContent += `   📅 Due: ${todo.dueDate}\n`;
				}
				emailContent += `   Context: ${todo.context}\n\n`;
			});
		}

		emailContent += `If you have any questions or need clarification on any of these items, please don't hesitate to reach out.\n\n`;
		emailContent += `Best regards,\n[Your Name]`;

		return emailContent;
	}

	// Copy email content to clipboard
	async function copyToClipboard(content: string, assignee: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(content);
			copyStates[assignee] = 'copied';
			showChangeNotification(); // Reuse the notification system

			// Reset the button state after 2 seconds
			setTimeout(() => {
				copyStates[assignee] = 'ready';
			}, 2000);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			copyStates[assignee] = 'error';
			setTimeout(() => {
				copyStates[assignee] = 'ready';
			}, 2000);
		}
	}

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
</script>

<Card class="border-2 border-gray-200 shadow-sm">
	<CardHeader>
		<div class="flex justify-between items-center">
			<div>
				<CardTitle class="text-xl flex items-center gap-2">
					{assignee}
					{#if pendingTodos.length === 0}
						<Badge variant="outline" class="bg-green-50 text-green-700">All Clear ✅</Badge>
					{:else}
						<Badge variant="outline" class="text-xs">
							{pendingTodos.length} pending
						</Badge>
						{#if highPriorityCount > 0}
							<Badge variant="destructive" class="text-xs">
								{highPriorityCount} high priority
							</Badge>
						{/if}
					{/if}
				</CardTitle>
				{#if assigneeEmails[assignee]}
					<p class="text-sm text-gray-500 mt-1">📧 {assigneeEmails[assignee]}</p>
				{/if}
			</div>
			<div class="flex gap-2">
				<!-- Individual Email Client Button -->
				<button
					class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
					onclick={(e) => {
						e.preventDefault();
						if (!assigneeEmails[assignee]) {
							alert('No email address found for this person.');
							return;
						}
						
						const emailContent = generateEmailContent(assignee, assigneeTodos);
						const subject = encodeURIComponent(`AXIS Project - Your Action Items`);
						const body = encodeURIComponent(emailContent);
						const to = assigneeEmails[assignee];
						const cc = 'duncan@cloudlobsters.com,tara@cloudlobsters.com';
						
						const mailtoLink = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
						console.log('Individual email for', assignee, mailtoLink.length, 'chars');
						
						try {
							const link = document.createElement('a');
							link.href = mailtoLink;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						} catch (error) {
							window.location.href = mailtoLink;
						}
						
						setTimeout(() => {
							if (!confirm('Did your email client open? Click Cancel if it didn\'t work.')) {
								copyToClipboard(emailContent, assignee);
								alert('Content copied to clipboard instead.');
							}
						}, 1500);
					}}
				>
					📧 Email
				</button>
				
				<!-- Copy Button -->
				<button
					class="px-3 py-2 rounded-md transition-all text-sm min-w-[80px] flex items-center justify-center gap-1
						{buttonState === 'copied' 
							? 'bg-green-600 text-white' 
							: buttonState === 'error' 
							? 'bg-red-600 text-white' 
							: 'bg-gray-600 text-white hover:bg-gray-700'}"
					onclick={() => copyToClipboard(generateEmailContent(assignee, assigneeTodos), assignee)}
					disabled={buttonState === 'copied' || buttonState === 'error'}
				>
					{#if buttonState === 'copied'}
						✓ Copied
					{:else if buttonState === 'error'}
						✗ Error
					{:else}
						📋 Copy
					{/if}
				</button>
			</div>
		</div>
		<CardDescription>
			{#if pendingTodos.length === 0}
				No pending action items
			{:else}
				{pendingTodos.length} pending item{pendingTodos.length > 1 ? 's' : ''}
				{#if highPriorityCount > 0}
					• {highPriorityCount} high priority
				{/if}
			{/if}
		</CardDescription>
	</CardHeader>
	<CardContent>
		{#if pendingTodos.length > 0}
			<!-- Select All/None buttons -->
			<div class="flex gap-2 mb-4 pb-2 border-b border-gray-200">
				<button 
					class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
					onclick={() => toggleAllTodosForAssignee(assignee, true)}
				>
					Select All
				</button>
				<button 
					class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
					onclick={() => toggleAllTodosForAssignee(assignee, false)}
				>
					Select None
				</button>
			</div>
			
			<div class="space-y-3">
				{#each pendingTodos as todo}
					<div 
						class="border-l-4 pl-4 py-2 cursor-pointer transition-all hover:shadow-md select-none {selectedTodos.get(todo.id) === true ? 'opacity-100' : 'opacity-50'} {todo.priority === 'high' ? 'border-red-500 bg-red-50' : todo.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-gray-50'}"
						onclick={() => toggleTodoSelection(todo.id)}
						onkeydown={(e) => e.key === 'Enter' && toggleTodoSelection(todo.id)}
						role="button"
						tabindex="0"
					>
						<div class="flex justify-between items-start mb-1">
							<div class="flex items-start gap-3 flex-1">
								<div class="mt-1 w-4 h-4 flex-shrink-0 flex items-center justify-center">
									{#if selectedTodos.get(todo.id) === true}
										<span class="text-blue-600 text-sm">✓</span>
									{:else}
										<span class="text-gray-400 text-sm">○</span>
									{/if}
								</div>
								<h4 class="font-medium text-gray-900 text-sm flex-1">{todo.task}</h4>
							</div>
							<div class="flex gap-1">
								<Badge variant={getPriorityColor(todo.priority)} class="text-xs">
									{todo.priority}
								</Badge>
								<span class="px-2 py-1 rounded text-xs {getStatusColor(todo.status)}">
									{todo.status.replace('_', ' ')}
								</span>
							</div>
						</div>
						<p class="text-xs text-gray-600 mb-1">{todo.description}</p>
						{#if todo.dueDate}
							<p class="text-xs text-gray-500">📅 Due: {todo.dueDate}</p>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-8">
				<div class="text-6xl mb-4">🎉</div>
				<p class="text-gray-500">All caught up! No pending action items.</p>
			</div>
		{/if}
	</CardContent>
</Card>