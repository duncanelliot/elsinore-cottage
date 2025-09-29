<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Props {
		value: string;
		placeholder?: string;
		class?: string;
		disabled?: boolean;
		multiline?: boolean;
		maxLength?: number;
		required?: boolean;
		type?: 'text' | 'number' | 'email' | 'url';
	}

	let {
		value = $bindable(''),
		placeholder = '',
		class: className = '',
		disabled = false,
		multiline = false,
		maxLength,
		required = false,
		type = 'text'
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		change: { value: string };
		save: { value: string };
		cancel: {};
	}>();

	let isEditing = $state(false);
	let originalValue = $state(value);
	let inputElement: HTMLInputElement | HTMLTextAreaElement;
	let isSaving = $state(false);

	function startEditing() {
		if (disabled) return;
		isEditing = true;
		originalValue = value;

		// Focus the input after the DOM update
		setTimeout(() => {
			inputElement?.focus();
			if (inputElement instanceof HTMLInputElement) {
				inputElement.select();
			}
		}, 0);
	}

	function cancelEditing() {
		value = originalValue;
		isEditing = false;
		dispatch('cancel');
	}

	async function saveChanges() {
		if (isSaving) return;

		// Validate required field
		if (required && (!value || value.trim() === '')) {
			return; // Don't save if required field is empty
		}

		isSaving = true;
		isEditing = false;

		try {
			dispatch('save', { value: value.trim() });
		} finally {
			isSaving = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !multiline) {
			event.preventDefault();
			saveChanges();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			cancelEditing();
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		dispatch('change', { value });
	}

	// Auto-save on blur
	function handleBlur() {
		if (isEditing && value !== originalValue) {
			saveChanges();
		} else if (isEditing) {
			isEditing = false;
		}
	}
</script>

{#if isEditing}
	{#if multiline}
		<textarea
			bind:this={inputElement}
			{value}
			{placeholder}
			{disabled}
			{maxLength}
			{required}
			class="w-full resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded {className}"
			oninput={handleInput}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		></textarea>
	{:else}
		<input
			bind:this={inputElement}
			{type}
			{value}
			{placeholder}
			{disabled}
			{maxLength}
			{required}
			class="w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded {className}"
			oninput={handleInput}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>
	{/if}
{:else}
	<div
		role="button"
		tabindex="0"
		class="cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors {className} {isSaving ? 'opacity-50' : ''}"
		onclick={startEditing}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && startEditing()}
		title="Click to edit"
	>
		{#if isSaving}
			<span class="text-gray-500">Saving...</span>
		{:else if value}
			{value}
		{:else}
			<span class="text-gray-400 italic">{placeholder || 'Click to edit'}</span>
		{/if}
	</div>
{/if}