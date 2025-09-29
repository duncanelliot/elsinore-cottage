<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { ExternalLink, Edit } from '@lucide/svelte';
	import { Room, getRoomColor } from '$lib/constants';
	import ImageCarousel from './ImageCarousel.svelte';
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
		item,
		compactMode = false,
		isSelected = false,
		onToggleSelection,
		onUpdateItem
	}: {
		item: FurnitureItem;
		compactMode?: boolean;
		isSelected?: boolean;
		onToggleSelection?: (itemId: string) => void;
		onUpdateItem?: (itemId: string, updates: Partial<FurnitureItem>) => Promise<void>;
	} = $props();
	let imageLoaded = $state(false);
	let imageError = $state(false);
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

	const roomColors = $derived(getRoomColorClasses(getRoomColor(item.room as Room)));

	// Handle checkbox toggle
	function handleCheckboxChange(checked: boolean) {
		onToggleSelection?.(item.id);
	}

	// Handle edit button click
	function openEditModal() {
		showEditModal = true;
	}

	// Handle modal save
	async function handleModalSave(updates: Partial<FurnitureItem>) {
		if (!onUpdateItem) return;
		await onUpdateItem(item.id, updates);
	}
</script>

{#if compactMode}
	<!-- Compact Mode: List Layout -->
	<div class="group bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden {isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}">
		<div class="flex items-center p-3 gap-3 relative">
			<!-- Selection Checkbox -->
			<div class="flex-shrink-0">
				<Checkbox
					checked={isSelected}
					onCheckedChange={handleCheckboxChange}
				/>
			</div>

			<!-- Hover Image -->
			{#if item.primaryImage && !imageError}
				<div class="absolute left-12 top-3 w-16 h-16 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-hidden">
					<img
						src={item.primaryImage}
						alt={item.item}
						class="w-full h-full object-cover"
						onload={() => imageLoaded = true}
						onerror={() => imageError = true}
					/>
				</div>
			{/if}

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex items-start justify-between gap-3">
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2 mb-1">
							{#if item.roomDisplayName}
								<Badge class="text-xs {roomColors.badge} border-0">
									{item.roomDisplayName}
								</Badge>
							{/if}
						</div>
						<h3 class="font-semibold text-gray-900 text-sm line-clamp-1">{item.item}</h3>
						<p class="text-xs text-gray-600 line-clamp-1">{item.product}</p>
					</div>
					<div class="flex items-center gap-3">
						<p class="text-sm font-bold text-gray-900 whitespace-nowrap">{item.price}</p>
						<Button
							variant="outline"
							size="sm"
							class="flex items-center gap-1 px-2 py-1 h-7"
							onclick={openEditModal}
						>
							<Edit class="h-3 w-3" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							class="flex items-center gap-1 px-2 py-1 h-7"
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ExternalLink class="h-3 w-3" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<!-- Regular Mode: Card Layout -->
	<div class="h-full bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden {isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''} relative">
		<div class="group relative aspect-square bg-gray-100 overflow-hidden rounded-xl">
			<ImageCarousel
				images={item.allImages}
				alt={item.item}
				className="w-full h-full"
			/>

			<!-- Selection Checkbox - Top Right -->
			<div class="absolute top-2 right-2 z-10">
				<div class="bg-white rounded-md shadow-lg p-1">
					<Checkbox
						checked={isSelected}
						onCheckedChange={handleCheckboxChange}
					/>
				</div>
			</div>

			<!-- Room Badge - Top Left -->
			{#if item.roomDisplayName}
				<div class="absolute top-2 left-2">
					<Badge class="text-xs {roomColors.badge} border-0">
						{item.roomDisplayName}
					</Badge>
				</div>
			{/if}

			<!-- Overlay Content -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
				<div class="text-white">
					<h3 class="font-semibold text-white mb-1 line-clamp-1">{item.item}</h3>
					<p class="text-xs text-gray-200 mb-2 line-clamp-2">{item.product}</p>

					<div class="flex items-center justify-between">
						<p class="text-lg font-bold text-white">{item.price}</p>
						<div class="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								class="flex items-center gap-1 px-2 py-1 h-7 bg-white/90 text-gray-900 border-white/50 hover:bg-white"
								onclick={openEditModal}
							>
								<Edit class="h-3 w-3" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								class="flex items-center gap-1 px-2 py-1 h-7 bg-white/90 text-gray-900 border-white/50 hover:bg-white"
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink class="h-3 w-3" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Edit Modal -->
<EditFurnitureModal
	bind:open={showEditModal}
	{item}
	onSave={handleModalSave}
/>