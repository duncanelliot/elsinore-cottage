<script lang="ts">
	import { Package } from '@lucide/svelte';
	import FurnitureCard from './FurnitureCard.svelte';
	import FurnitureTable from './FurnitureTable.svelte';
	import FurnitureToolbar from './FurnitureToolbar.svelte';
	import { generateRoomFilters } from '$lib/constants';
	import type { PageData } from './$types';

	interface FurnitureItem {
		id: string;
		item: string;
		product: string;
		price: string;
		link: string;
		room: string;
		roomDisplayName: string;
		primaryImage?: string | null;
		primaryImageSource?: string | null;
		primaryImageRetailer?: string | null;
		allImages: Array<{
			url: string;
			description?: string | null;
			isPrimary: boolean;
		}>;
		priority: number;
		isActive: boolean;
		buy: boolean;
		notes?: string | null;
		createdAt: Date;
		updatedAt: Date;
	}

	let { data }: { data: PageData } = $props();

	// Use the transformed data from the server (make it reactive)
	let allFurnitureItems: FurnitureItem[] = $state(data.furnitureItems);

	const roomFilters = generateRoomFilters();

	let selectedRoom = $state('All Rooms');
	let compactMode = $state(false);

	const filteredItems = $derived(selectedRoom === 'All Rooms'
		? allFurnitureItems
		: allFurnitureItems.filter(item => item.roomDisplayName === selectedRoom));

	const selectedFilteredItems = $derived(
		filteredItems.filter(item => item.buy === true)
	);

	// Generic function to update any furniture item fields
	async function updateFurnitureItem(itemId: string, updates: Partial<FurnitureItem>) {
		console.log('Updating item:', itemId, 'with:', updates);

		const itemIndex = allFurnitureItems.findIndex(i => i.id === itemId);
		if (itemIndex === -1) {
			console.error('Item not found:', itemId);
			throw new Error('Item not found');
		}

		const originalItem = allFurnitureItems[itemIndex];

		// Optimistic update
		allFurnitureItems = allFurnitureItems.map(item =>
			item.id === itemId ? { ...item, ...updates } : item
		);

		try {
			console.log('Making API call to:', `/api/furniture/${itemId}`);
			const response = await fetch(`/api/furniture/${itemId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updates),
			});

			if (!response.ok) {
				console.error('API call failed, reverting update');
				// Revert optimistic update
				allFurnitureItems = allFurnitureItems.map(item =>
					item.id === itemId ? originalItem : item
				);
				throw new Error('Failed to update item');
			} else {
				const result = await response.json();
				console.log('API call successful:', result);

				// Update with the actual response data to ensure consistency
				allFurnitureItems = allFurnitureItems.map(item =>
					item.id === itemId ? { ...item, ...result } : item
				);
			}
		} catch (error) {
			console.error('Error updating furniture item:', error);
			// Revert optimistic update
			allFurnitureItems = allFurnitureItems.map(item =>
				item.id === itemId ? originalItem : item
			);
			throw error;
		}
	}

	// Simplified toggle function using the generic update function
	async function toggleItemSelection(itemId: string) {
		const currentItem = allFurnitureItems.find(i => i.id === itemId);
		if (!currentItem) return;

		try {
			await updateFurnitureItem(itemId, { buy: !currentItem.buy });
		} catch (error) {
			console.error('Failed to toggle item selection:', error);
		}
	}

	async function selectAll() {
		const updates = filteredItems
			.filter(item => !item.buy)
			.map(item => toggleItemSelection(item.id));

		await Promise.all(updates);
	}

	async function deselectAll() {
		const updates = filteredItems
			.filter(item => item.buy)
			.map(item => toggleItemSelection(item.id));

		await Promise.all(updates);
	}
</script>

<svelte:head>
	<title>Furniture List - Elsinore House</title>
	<meta
		name="description"
		content="Complete furniture list for Elsinore house, organized by room with recommendations and shopping links."
	/>
</svelte:head>

<!-- Header Section -->
<div class="relative -mt-16 bg-gradient-to-b from-slate-800 to-slate-900 pt-32 pb-20 text-white overflow-hidden">
	<div class="relative container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<div class="space-y-6">
				<div>
					<h1 class="mb-4 text-5xl font-light tracking-tight">Furniture & Essentials</h1>
					<div class="mb-4 h-px w-24 bg-amber-400 mx-auto"></div>
					<p class="text-xl font-light tracking-wide text-gray-300">
						Complete furnishing list for Elsinore House
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content -->
<div class="bg-slate-50 py-12">
	<div class="container mx-auto px-4">
		<!-- Toolbar -->
		<div class="sticky top-16 z-40 mb-8">
			<FurnitureToolbar
				{selectedRoom}
				{compactMode}
				allItems={allFurnitureItems}
				{filteredItems}
				selectedFilteredItems={selectedFilteredItems}
				{roomFilters}
				onRoomChange={(room) => selectedRoom = room}
				onModeChange={(compact) => compactMode = compact}
				onSelectAll={selectAll}
				onDeselectAll={deselectAll}
			/>
		</div>

		<!-- Furniture Content -->
		{#if compactMode}
			<!-- Table View -->
			<FurnitureTable
				items={filteredItems}
				onToggleSelection={toggleItemSelection}
				onUpdateItem={updateFurnitureItem}
			/>
		{:else}
			<!-- Grid View -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each filteredItems as item}
					<FurnitureCard
						{item}
						{compactMode}
						isSelected={item.buy}
						onToggleSelection={toggleItemSelection}
						onUpdateItem={updateFurnitureItem}
					/>
				{/each}
			</div>
		{/if}

		{#if filteredItems.length === 0}
			<div class="text-center py-16">
				<Package class="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
				<p class="text-gray-600">Try selecting a different room filter.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.line-clamp-1 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.line-clamp-2 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>