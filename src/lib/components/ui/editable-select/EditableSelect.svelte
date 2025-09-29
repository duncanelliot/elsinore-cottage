<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';

	interface Option {
		value: string;
		label: string;
		color?: string;
	}

	interface Props {
		value: string;
		options: Option[];
		placeholder?: string;
		class?: string;
		disabled?: boolean;
	}

	let {
		value = $bindable(''),
		options = [],
		placeholder = 'Select option',
		class: className = '',
		disabled = false
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		change: { value: string; option: Option };
		save: { value: string; option: Option };
	}>();

	let isOpen = $state(false);
	let isSaving = $state(false);

	const selectedOption = $derived(options.find(opt => opt.value === value));

	function selectOption(option: Option) {
		if (disabled || isSaving) return;

		const previousValue = value;
		value = option.value;
		isOpen = false;
		isSaving = true;

		dispatch('change', { value: option.value, option });

		// Auto-save on selection
		setTimeout(() => {
			dispatch('save', { value: option.value, option });
			isSaving = false;
		}, 0);
	}

	function toggleDropdown() {
		if (disabled) return;
		isOpen = !isOpen;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (isOpen && !(event.target as Element)?.closest('.editable-select')) {
			isOpen = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="editable-select relative {className}">
	<button
		type="button"
		class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors {isSaving ? 'opacity-50' : ''}"
		onclick={toggleDropdown}
		{disabled}
		title="Click to change"
	>
		{#if isSaving}
			<span class="text-gray-500">Saving...</span>
		{:else if selectedOption}
			<span>{selectedOption.label}</span>
		{:else}
			<span class="text-gray-400 italic">{placeholder}</span>
		{/if}
		<ChevronDown class="w-4 h-4 text-gray-400 {isOpen ? 'rotate-180' : ''} transition-transform" />
	</button>

	{#if isOpen}
		<div class="absolute z-50 mt-1 w-full min-w-max bg-white border border-gray-200 rounded-md shadow-lg">
			<div class="max-h-60 overflow-auto py-1">
				{#each options as option (option.value)}
					<button
						type="button"
						class="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors {value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}"
						onclick={() => selectOption(option)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>