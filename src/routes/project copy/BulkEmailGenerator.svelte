<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';

	let {
		todosByAssignee,
		selectedAssignees = $bindable(),
		selectedTodos,
		assigneeEmails
	} = $props();

	// Toggle assignee selection
	function toggleAssignee(assignee: any) {
		if (selectedAssignees.has(assignee)) {
			selectedAssignees.delete(assignee);
		} else {
			selectedAssignees.add(assignee);
		}
		selectedAssignees = new Set(selectedAssignees);
	}

	// Generate bulk email in default client
	function generateBulkEmail() {
		console.log('Generate bulk email clicked');
		const selectedNames = Array.from(selectedAssignees);
		console.log('Selected names:', selectedNames);
		
		if (selectedNames.length === 0) {
			alert('Please select at least one person to send reminders to.');
			return;
		}

		// Build email addresses
		const toEmails = selectedNames
			.filter((name: any) => assigneeEmails[name])
			.map((name: any) => assigneeEmails[name]);
		
		console.log('To emails:', toEmails);
		
		const ccEmails: any[] = [];
		if (Object.keys(todosByAssignee).includes('Duncan Elliot')) {
			ccEmails.push(assigneeEmails['Duncan Elliot']);
		}
		if (Object.keys(todosByAssignee).includes('Tara Whitaker')) {
			ccEmails.push(assigneeEmails['Tara Whitaker']);
		}

		console.log('CC emails:', ccEmails);

		// Generate simplified email content (shorter to avoid URL length issues)
		let emailBody = `Hi team,

Here's a summary of current action items for the AXIS Canada x Cloud Lobsters project:

`;
		
		selectedNames.forEach((assignee: any, index: any) => {
			const assigneeTodos = todosByAssignee[assignee] || [];
			const selectedPendingTodos = assigneeTodos.filter((todo: any) => 
				todo.status !== 'completed' && selectedTodos.get(todo.id) === true
			);
			
			if (selectedPendingTodos.length > 0) {
				emailBody += `${assignee}:
`;
				
				selectedPendingTodos.forEach((todo: any, todoIndex: any) => {
					const priorityIcon = todo.priority === 'high' ? 'HIGH' : todo.priority === 'medium' ? 'MED' : 'LOW';
					emailBody += `${todoIndex + 1}. [${priorityIcon}] ${todo.task}
`;
					if (todo.dueDate) {
						emailBody += `   Due: ${todo.dueDate}
`;
					}
				});
				
				emailBody += `
`;
			}
		});

		emailBody += `Please review your assigned items.

Best regards,
[Your Name]`;

		// Create simplified mailto link
		const subject = encodeURIComponent(`AXIS Project - Action Items Summary`);
		const body = encodeURIComponent(emailBody);
		const to = toEmails.join(',');
		const cc = ccEmails.join(',');
		
		let mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
		if (cc) {
			mailtoLink += `&cc=${cc}`;
		}

		console.log('Mailto link:', mailtoLink);
		console.log('Link length:', mailtoLink.length);

		// Try to open email client with user feedback
		try {
			// Create a temporary link element and click it
			const link = document.createElement('a');
			link.href = mailtoLink;
			link.style.display = 'none';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			console.log('Email client should open now');
			
		} catch (error) {
			console.error('Error with email generation:', error);
			// Direct fallback: copy to clipboard
			navigator.clipboard.writeText(emailBody).then(() => {
				alert(`Unable to open email client. Email content has been copied to clipboard.\n\nTo: ${toEmails.join(', ')}\nCC: ${ccEmails.join(', ')}\nSubject: AXIS Project - Action Items Summary`);
			}).catch(() => {
				alert('Unable to open email client and failed to copy to clipboard. Please check console for email content.');
				console.log('Email details:', {
					to: toEmails.join(', '),
					cc: ccEmails.join(', '),
					subject: 'AXIS Project - Action Items Summary',
					body: emailBody
				});
			});
		}
	}

	// Generate copy content for clipboard
	function generateCopyContent() {
		const selectedNames = Array.from(selectedAssignees);
		if (selectedNames.length === 0) {
			alert('Please select at least one person to send reminders to.');
			return;
		}
		
		const toEmails = selectedNames.filter((name: any) => assigneeEmails[name]).map((name: any) => assigneeEmails[name]);
		const ccEmails = ['duncan@cloudlobsters.com', 'tara@cloudlobsters.com'];
		
		let emailContent = `TO: ${toEmails.join(', ')}\nCC: ${ccEmails.join(', ')}\nSUBJECT: AXIS Project - Action Items Summary\n\n`;
		emailContent += `Hi team,\n\nHere's a summary of current action items:\n\n`;
		
		selectedNames.forEach((assignee: any) => {
			const selectedPendingTodos = todosByAssignee[assignee]?.filter((todo: any) => 
				todo.status !== 'completed' && selectedTodos.get(todo.id) === true
			) || [];
			if (selectedPendingTodos.length > 0) {
				emailContent += `${assignee}:\n`;
				selectedPendingTodos.forEach((todo: any, i: any) => {
					emailContent += `${i+1}. [${todo.priority.toUpperCase()}] ${todo.task}\n`;
					if (todo.dueDate) emailContent += `   Due: ${todo.dueDate}\n`;
				});
				emailContent += `\n`;
			}
		});
		emailContent += `Please review your assigned items.\n\nBest regards,\n[Your Name]`;
		
		navigator.clipboard.writeText(emailContent);
		alert('Email content copied to clipboard! You can now paste it into your email client.');
	}
</script>

<Card class="mb-6 border-2 border-blue-200 bg-blue-50">
	<CardHeader>
		<CardTitle class="text-lg flex items-center gap-2">
			📨 Bulk Email Generator - All in One
		</CardTitle>
		<CardDescription>
			Select team members to include in a single combined email with everyone's action items. Duncan and Tara will be automatically CC'd. For individual emails, use the buttons on each person's card below.
		</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="flex flex-wrap gap-2 mb-4">
			{#each Object.keys(todosByAssignee).filter(name => name !== 'All stakeholders') as assignee}
				<button
					class="px-3 py-1 rounded-full text-sm transition-all border-2
						{selectedAssignees.has(assignee) 
							? 'bg-blue-600 text-white border-blue-600' 
							: 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}"
					onclick={() => toggleAssignee(assignee)}
				>
					{assignee}
					{#if selectedAssignees.has(assignee)}
						<span class="ml-1">✓</span>
					{/if}
				</button>
			{/each}
		</div>
		
		<div class="flex justify-between items-center">
			<div class="text-sm text-gray-600">
				{selectedAssignees.size} of {Object.keys(todosByAssignee).filter(name => name !== 'All stakeholders').length} selected
				{#if selectedAssignees.size > 0}
					• CC: Duncan Elliot, Tara Whitaker
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<!-- All in One Email Button -->
				<button
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm {selectedAssignees.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
					onclick={(e) => {
						e.preventDefault();
						generateBulkEmail();
					}}
					disabled={selectedAssignees.size === 0}
				>
					📨 All in One Email
				</button>
				
				<!-- Copy All Button -->
				<button
					class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
					onclick={generateCopyContent}
					disabled={selectedAssignees.size === 0}
				>
					📋 Copy Content
				</button>
			</div>
		</div>
	</CardContent>
</Card>