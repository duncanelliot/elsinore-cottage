<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { ExternalLink, Edit } from '@lucide/svelte';
	import { Room, getRoomColor } from '$lib/constants';
	import EditFurnitureModal from './EditFurnitureModal.svelte';

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

	let {
		items,
		onToggleSelection,
		onUpdateItem
	}: {
		items: FurnitureItem[];
		onToggleSelection?: (itemId: string) => void;
		onUpdateItem?: (itemId: string, updates: Partial<FurnitureItem>) => Promise<void>;
	} = $props();

	let editingItem = $state<FurnitureItem | null>(null);
	let showEditModal = $state(false);

	function getRoomColorClasses(color: string = 'blue') {
		const colors: Record<string, { badge: string }> = {
			blue: { badge: 'bg-blue-100 text-blue-800 border-blue-300' },
			green: { badge: 'bg-green-100 text-green-800 border-green-300' },
			orange: { badge: 'bg-orange-100 text-orange-800 border-orange-300' },
			purple: { badge: 'bg-purple-100 text-purple-800 border-purple-300' },
			violet: { badge: 'bg-violet-100 text-violet-800 border-violet-300' },
			indigo: { badge: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
			cyan: { badge: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
			teal: { badge: 'bg-teal-100 text-teal-800 border-teal-300' },
			sky: { badge: 'bg-sky-100 text-sky-800 border-sky-300' },
			emerald: { badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
			gray: { badge: 'bg-gray-100 text-gray-800 border-gray-300' },
			slate: { badge: 'bg-slate-100 text-slate-800 border-slate-300' }
		};
		return colors[color] || colors.blue;
	}

	function openEditModal(item: FurnitureItem) {
		editingItem = item;
		showEditModal = true;
	}

	async function handleModalSave(updates: Partial<FurnitureItem>) {
		if (!onUpdateItem || !editingItem) return;
		await onUpdateItem(editingItem.id, updates);
	}
</script>

<div class="bg-white border border-gray-200 overflow-hidden">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead class="bg-gray-50 border-b border-gray-200">
				<tr>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
						<Checkbox class="ml-1" />
					</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
					<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each items as item}
					{@const roomColors = getRoomColorClasses(getRoomColor(item.room as Room))}
					<tr class="hover:bg-gray-50 transition-colors {item.buy ? 'bg-blue-50 ring-1 ring-blue-200' : ''}">
						<td class="px-3 py-2 whitespace-nowrap">
							<Checkbox
								checked={item.buy}
								onCheckedChange={(checked) => {
									console.log('Table checkbox clicked!', item.id, 'new state:', checked);
									onToggleSelection?.(item.id);
								}}
								class="ml-1"
							/>
						</td>
						<td class="px-3 py-2 whitespace-nowrap">
							<div class="font-medium text-gray-900 text-sm">{item.item}</div>
						</td>
						<td class="px-3 py-2">
							<div class="text-sm text-gray-900 max-w-xs">
								<div class="line-clamp-2">{item.product}</div>
							</div>
						</td>
						<td class="px-3 py-2 whitespace-nowrap">
							<Badge class="text-xs {roomColors.badge} border-0">
								{item.roomDisplayName}
							</Badge>
						</td>
						<td class="px-3 py-2 whitespace-nowrap">
							<div class="text-sm font-semibold text-gray-900">{item.price}</div>
						</td>
						<td class="px-3 py-2">
							{#if item.primaryImage || item.primaryImageSource}
								<div class="space-y-1">
									{#if item.primaryImage}
										<div>
											<a
												href={item.primaryImage}
												target="_blank"
												rel="noopener noreferrer"
												class="text-blue-600 hover:text-blue-800 text-xs underline block"
												title="View image"
											>
												📷 Image
											</a>
										</div>
									{/if}
									{#if item.primaryImageSource}
										<div>
											<a
												href={item.primaryImageSource}
												target="_blank"
												rel="noopener noreferrer"
												class="text-green-600 hover:text-green-800 text-xs underline block"
												title="Visit retailer page"
											>
												🏪 {item.primaryImageRetailer || 'Source'}
											</a>
										</div>
									{/if}
								</div>
							{:else}
								<span class="text-gray-400 text-xs">No image</span>
							{/if}
						</td>
						<td class="px-3 py-2 whitespace-nowrap">
							<Button
								variant="outline"
								size="sm"
								class="flex items-center gap-1 px-2 py-1 h-7"
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink class="h-3 w-3" />
								<span class="hidden sm:inline text-xs">View</span>
							</Button>
						</td>
						<td class="px-3 py-2 whitespace-nowrap">
							<Button
								variant="outline"
								size="sm"
								class="flex items-center gap-1 px-2 py-1 h-7"
								onclick={() => openEditModal(item)}
							>
								<Edit class="h-3 w-3" />
								<span class="hidden sm:inline text-xs">Edit</span>
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Edit Modal -->
<EditFurnitureModal
	bind:open={showEditModal}
	item={editingItem}
	onSave={handleModalSave}
/>

<style>
	.line-clamp-2 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>