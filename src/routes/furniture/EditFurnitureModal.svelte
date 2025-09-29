<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog/index.js';
	import { Save, X } from '@lucide/svelte';
	import { Room, ROOM_CONFIGS } from '$lib/constants';

	interface FurnitureItem {
		id: string;
		item: string;
		product: string;
		price: string;
		link: string;
		room: string;
		roomDisplayName: string;
		notes?: string | null;
	}

	let {
		open = $bindable(false),
		item,
		onSave
	}: {
		open: boolean;
		item: FurnitureItem | null;
		onSave: (updates: Partial<FurnitureItem>) => Promise<void>;
	} = $props();

	let isSaving = $state(false);
	let errors = $state<Record<string, string>>({});
	let editForm = $state({
		item: '',
		product: '',
		price: '',
		room: '',
		link: '',
		notes: ''
	});

	// Reset form when item changes or modal opens
	$effect(() => {
		if (item && open) {
			editForm = {
				item: item.item,
				product: item.product,
				price: item.price,
				room: item.room,
				link: item.link,
				notes: item.notes || ''
			};
			errors = {};
		}
	});

	function validateForm(): boolean {
		errors = {};

		if (!editForm.item.trim()) {
			errors.item = 'Item name is required';
		}

		if (!editForm.product.trim()) {
			errors.product = 'Product description is required';
		}

		if (!editForm.price.trim()) {
			errors.price = 'Price is required';
		}

		if (!editForm.room) {
			errors.room = 'Room selection is required';
		}

		if (editForm.link && !isValidUrl(editForm.link)) {
			errors.link = 'Please enter a valid URL';
		}

		return Object.keys(errors).length === 0;
	}

	function isValidUrl(string: string): boolean {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;
		}
	}

	async function handleSave() {
		if (!item || isSaving) return;

		if (!validateForm()) {
			return;
		}

		isSaving = true;
		try {
			const roomConfig = ROOM_CONFIGS[editForm.room as Room];

			await onSave({
				item: editForm.item.trim(),
				product: editForm.product.trim(),
				price: editForm.price.trim(),
				room: editForm.room,
				roomDisplayName: roomConfig.displayName,
				roomColor: roomConfig.color,
				link: editForm.link.trim(),
				notes: editForm.notes.trim() || null
			});

			open = false;
		} catch (error) {
			console.error('Failed to save changes:', error);
			// You could add a toast notification here
			errors.general = 'Failed to save changes. Please try again.';
		} finally {
			isSaving = false;
		}
	}

	function handleCancel() {
		open = false;
		// Reset form
		if (item) {
			editForm = {
				item: item.item,
				product: item.product,
				price: item.price,
				room: item.room,
				link: item.link,
				notes: item.notes || ''
			};
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			handleSave();
		}
	}
</script>

<Dialog bind:open>
	<DialogContent class="sm:max-w-md">
		<DialogHeader>
			<DialogTitle>Edit Furniture Item</DialogTitle>
		</DialogHeader>

		{#if item}
			{#if errors.general}
				<div class="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
					<p class="text-sm text-red-600">{errors.general}</p>
				</div>
			{/if}

			<form class="space-y-4" onkeydown={handleKeydown}>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="item">Item Name *</Label>
						<Input
							id="item"
							bind:value={editForm.item}
							placeholder="e.g., Sofa, Dining Table"
							class={errors.item ? 'border-red-500' : ''}
							required
						/>
						{#if errors.item}
							<p class="text-sm text-red-600 mt-1">{errors.item}</p>
						{/if}
					</div>
					<div>
						<Label for="price">Price *</Label>
						<Input
							id="price"
							bind:value={editForm.price}
							placeholder="e.g., £299, TBD"
							class={errors.price ? 'border-red-500' : ''}
							required
						/>
						{#if errors.price}
							<p class="text-sm text-red-600 mt-1">{errors.price}</p>
						{/if}
					</div>
				</div>

				<div>
					<Label for="product">Product Description *</Label>
					<Textarea
						id="product"
						bind:value={editForm.product}
						placeholder="Product name and description"
						rows="2"
						class={errors.product ? 'border-red-500' : ''}
						required
					/>
					{#if errors.product}
						<p class="text-sm text-red-600 mt-1">{errors.product}</p>
					{/if}
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="room">Room *</Label>
						<Select.Root bind:value={editForm.room}>
							<Select.Trigger class={errors.room ? 'border-red-500' : ''}>
								<Select.Value placeholder="Select room" />
							</Select.Trigger>
							<Select.Content>
								{#each Object.values(ROOM_CONFIGS) as roomConfig}
									<Select.Item value={roomConfig.enum}>
										{roomConfig.displayName}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						{#if errors.room}
							<p class="text-sm text-red-600 mt-1">{errors.room}</p>
						{/if}
					</div>
					<div>
						<Label for="link">Product Link</Label>
						<Input
							id="link"
							type="url"
							bind:value={editForm.link}
							placeholder="https://..."
							class={errors.link ? 'border-red-500' : ''}
						/>
						{#if errors.link}
							<p class="text-sm text-red-600 mt-1">{errors.link}</p>
						{/if}
					</div>
				</div>

				<div>
					<Label for="notes">Notes</Label>
					<Textarea
						id="notes"
						bind:value={editForm.notes}
						placeholder="Additional notes (optional)"
						rows="2"
					/>
				</div>

				<div class="flex justify-end gap-2 pt-4">
					<Button variant="outline" onclick={handleCancel} disabled={isSaving}>
						<X class="w-4 h-4 mr-2" />
						Cancel
					</Button>
					<Button onclick={handleSave} disabled={isSaving}>
						<Save class="w-4 h-4 mr-2" />
						{isSaving ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		{/if}
	</DialogContent>
</Dialog>