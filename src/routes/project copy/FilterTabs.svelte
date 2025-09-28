<script lang="ts">
	import { Building, Users } from '@lucide/svelte';
	import type { Todo } from './types.js';

	let { 
		todos,
		selectedOrganizations = $bindable(),
		selectedAssignees = $bindable()
	}: {
		todos: Todo[];
		selectedOrganizations: Set<string>;
		selectedAssignees: Set<string>;
	} = $props();

	let activeFilter = $state<'organizations' | 'assignees' | null>(null);

	// Get unique organizations and assignees
	let organizations = $derived(
		Array.from(new Set(todos.map((todo: Todo) => todo.organization))).sort()
	);

	let assignees = $derived(
		Array.from(new Set(todos.flatMap((todo: Todo) => todo.assignee))).sort()
	);

	function toggleOrganization(org: string) {
		if (selectedOrganizations.has(org)) {
			selectedOrganizations.delete(org);
		} else {
			selectedOrganizations.add(org);
		}
		selectedOrganizations = new Set(selectedOrganizations);
	}

	function toggleAssignee(assignee: string) {
		if (selectedAssignees.has(assignee)) {
			selectedAssignees.delete(assignee);
		} else {
			selectedAssignees.add(assignee);
		}
		selectedAssignees = new Set(selectedAssignees);
	}

	function toggleFilter(filter: 'organizations' | 'assignees') {
		activeFilter = activeFilter === filter ? null : filter;
	}

	function clearAllOrganizations() {
		selectedOrganizations = new Set();
	}

	function clearAllAssignees() {
		selectedAssignees = new Set();
	}
</script>

<div class="mb-4">
	<!-- Compact Filter Icons -->
	<div class="flex items-center gap-3 mb-3">
		<span class="text-sm font-medium text-gray-700">Filters:</span>
		
		<!-- Organization Filter Icon -->
		<button
			onclick={() => toggleFilter('organizations')}
			class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all {activeFilter === 'organizations' 
				? 'bg-blue-50 border-blue-300 text-blue-700' 
				: 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}"
		>
			<Building size={16} />
			<span class="text-sm">Organizations</span>
			{#if selectedOrganizations.size > 0}
				<span class="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
					{selectedOrganizations.size}
				</span>
			{/if}
		</button>

		<!-- Assignee Filter Icon -->
		<button
			onclick={() => toggleFilter('assignees')}
			class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all {activeFilter === 'assignees' 
				? 'bg-green-50 border-green-300 text-green-700' 
				: 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}"
		>
			<Users size={16} />
			<span class="text-sm">Assignees</span>
			{#if selectedAssignees.size > 0}
				<span class="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
					{selectedAssignees.size}
				</span>
			{/if}
		</button>
	</div>

	<!-- Filter Chips (only show when a filter is active) -->
	{#if activeFilter === 'organizations'}
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
			<div class="flex items-center justify-between mb-2">
				<span class="text-sm font-medium text-blue-700">Filter by Organization:</span>
				{#if selectedOrganizations.size > 0}
					<button
						onclick={clearAllOrganizations}
						class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
					>
						Clear All
					</button>
				{/if}
			</div>
			<div class="flex flex-wrap gap-2">
				{#each organizations as org}
					<button
						onclick={() => toggleOrganization(org)}
						class="px-3 py-1 text-sm rounded-full border transition-all {selectedOrganizations.has(org) 
							? 'bg-blue-600 border-blue-600 text-white' 
							: 'bg-white border-blue-300 text-blue-700 hover:bg-blue-100'}"
					>
						{org}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	{#if activeFilter === 'assignees'}
		<div class="bg-green-50 border border-green-200 rounded-lg p-3">
			<div class="flex items-center justify-between mb-2">
				<span class="text-sm font-medium text-green-700">Filter by Assignee:</span>
				{#if selectedAssignees.size > 0}
					<button
						onclick={clearAllAssignees}
						class="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
					>
						Clear All
					</button>
				{/if}
			</div>
			<div class="flex flex-wrap gap-2">
				{#each assignees as assignee}
					<button
						onclick={() => toggleAssignee(assignee)}
						class="px-3 py-1 text-sm rounded-full border transition-all {selectedAssignees.has(assignee) 
							? 'bg-green-600 border-green-600 text-white' 
							: 'bg-white border-green-300 text-green-700 hover:bg-green-100'}"
					>
						{assignee}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>