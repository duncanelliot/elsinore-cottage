<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Sofa,
		Utensils,
		Bed,
		Bath,
		Wrench,
		Package,
		Filter,
		Grid3X3,
		List,
		PoundSterling
	} from '@lucide/svelte';

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

	interface RoomFilter {
		name: string;
		icon: any;
		color: string;
	}

	let {
		selectedRoom,
		compactMode,
		allItems,
		filteredItems,
		selectedFilteredItems,
		roomFilters,
		onRoomChange,
		onModeChange,
		onSelectAll,
		onDeselectAll
	}: {
		selectedRoom: string;
		compactMode: boolean;
		allItems: FurnitureItem[];
		filteredItems: FurnitureItem[];
		selectedFilteredItems: FurnitureItem[];
		roomFilters: RoomFilter[];
		onRoomChange: (room: string) => void;
		onModeChange: (compact: boolean) => void;
		onSelectAll: () => void;
		onDeselectAll: () => void;
	} = $props();

	function getFilterColorClasses(color: string, isSelected: boolean, hasItems: boolean = true, filterName: string = '') {
		const colors: Record<string, { bg: string; border: string; hover: string; text: string }> = {
			slate: { bg: 'bg-slate-600 border-slate-600', border: 'border-slate-300', hover: 'hover:bg-slate-100', text: 'text-slate-700' },
			blue: { bg: 'bg-blue-600 border-blue-600', border: 'border-blue-300', hover: 'hover:bg-blue-100', text: 'text-blue-700' },
			green: { bg: 'bg-green-600 border-green-600', border: 'border-green-300', hover: 'hover:bg-green-100', text: 'text-green-700' },
			orange: { bg: 'bg-orange-600 border-orange-600', border: 'border-orange-300', hover: 'hover:bg-orange-100', text: 'text-orange-700' },
			purple: { bg: 'bg-purple-600 border-purple-600', border: 'border-purple-300', hover: 'hover:bg-purple-100', text: 'text-purple-700' },
			violet: { bg: 'bg-violet-600 border-violet-600', border: 'border-violet-300', hover: 'hover:bg-violet-100', text: 'text-violet-700' },
			indigo: { bg: 'bg-indigo-600 border-indigo-600', border: 'border-indigo-300', hover: 'hover:bg-indigo-100', text: 'text-indigo-700' },
			cyan: { bg: 'bg-cyan-600 border-cyan-600', border: 'border-cyan-300', hover: 'hover:bg-cyan-100', text: 'text-cyan-700' },
			teal: { bg: 'bg-teal-600 border-teal-600', border: 'border-teal-300', hover: 'hover:bg-teal-100', text: 'text-teal-700' },
			sky: { bg: 'bg-sky-600 border-sky-600', border: 'border-sky-300', hover: 'hover:bg-sky-100', text: 'text-sky-700' },
			emerald: { bg: 'bg-emerald-600 border-emerald-600', border: 'border-emerald-300', hover: 'hover:bg-emerald-100', text: 'text-emerald-700' },
			gray: { bg: 'bg-gray-600 border-gray-600', border: 'border-gray-300', hover: 'hover:bg-gray-100', text: 'text-gray-700' }
		};
		const colorSet = colors[color] || colors.slate;

		if (isSelected) {
			return `${colorSet.bg} text-white`;
		}

		// Always show color for "All Rooms" filter
		if (filterName === 'All Rooms' || hasItems) {
			return `${colorSet.text} ${colorSet.border} ${colorSet.hover}`;
		}

		return `text-gray-400 border-gray-200 cursor-not-allowed opacity-50`;
	}

	// Calculate which rooms have items
	const roomItemCounts = $derived.by(() => {
		const counts: Record<string, number> = {};
		roomFilters.forEach(filter => {
			if (filter.name === 'All Rooms') {
				counts[filter.name] = allItems.length;
			} else {
				counts[filter.name] = allItems.filter(item => item.roomDisplayName === filter.name).length;
			}
		});
		return counts;
	});

	// Calculate total estimated spend
	function parsePrice(priceString: string): number {
		// Extract number from price strings like "£299.00", "£520–£649", "From £1,725", "TBD"
		if (priceString.includes('TBD') || priceString.includes('See page')) {
			return 0;
		}

		// Handle range prices - take the lower value
		if (priceString.includes('–') || priceString.includes('-')) {
			const match = priceString.match(/£(\d+(?:,\d+)?(?:\.\d+)?)/);
			return match ? parseFloat(match[1].replace(',', '')) : 0;
		}

		// Handle "From £X" prices
		if (priceString.includes('From')) {
			const match = priceString.match(/£(\d+(?:,\d+)?(?:\.\d+)?)/);
			return match ? parseFloat(match[1].replace(',', '')) : 0;
		}

		// Handle regular prices
		const match = priceString.match(/£(\d+(?:,\d+)?(?:\.\d+)?)/);
		return match ? parseFloat(match[1].replace(',', '')) : 0;
	}

	const totalSpend = $derived(
		selectedFilteredItems.reduce((total, item) => total + parsePrice(item.price), 0)
	);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency: 'GBP',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	};
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
	<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
		<!-- Left Section: Filters -->
		<div class="flex flex-col sm:flex-row sm:items-center gap-4">
			<div class="flex items-center gap-2 text-sm font-medium text-gray-700">
				<Filter class="h-4 w-4" />
				Filter:
			</div>
			<div class="flex flex-wrap gap-2">
				{#each roomFilters as filter}
					{@const itemCount = roomItemCounts[filter.name] || 0}
					{@const hasItems = itemCount > 0}
					<button
						class="px-2 py-1 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors {getFilterColorClasses(filter.color, selectedRoom === filter.name, hasItems, filter.name)}"
						onclick={() => (hasItems || filter.name === 'All Rooms') && onRoomChange(filter.name)}
						disabled={!hasItems && filter.name !== 'All Rooms'}
						title={hasItems ? `${itemCount} items` : 'No items in this room'}
					>
						<svelte:component this={filter.icon} class="h-3 w-3" />
						{filter.name}
						{#if itemCount > 0}
							<span class="text-xs opacity-75">({itemCount})</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Right Section: Selection Controls, View Mode & Stats -->
		<div class="flex items-center gap-4">
			<!-- Selection Controls -->
			<div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
				<button
					onclick={onSelectAll}
					class="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
					title="Select all visible items"
				>
					All
				</button>
				<button
					onclick={onDeselectAll}
					class="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
					title="Deselect all items"
				>
					None
				</button>
			</div>

			<!-- View Mode Toggle -->
			<div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
				<button
					class="px-2 py-1 rounded text-xs font-medium transition-colors {!compactMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
					onclick={() => onModeChange(false)}
				>
					<Grid3X3 class="h-3 w-3" />
				</button>
				<button
					class="px-2 py-1 rounded text-xs font-medium transition-colors {compactMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
					onclick={() => onModeChange(true)}
				>
					<List class="h-3 w-3" />
				</button>
			</div>

			<!-- Stats -->
			<div class="flex items-center gap-4 text-sm">
				<div class="flex items-center gap-1.5 text-gray-600">
					<Package class="h-4 w-4" />
					<span class="font-medium">{selectedFilteredItems.length}</span>
					<span class="text-gray-500">selected</span>
					<span class="text-gray-400">of</span>
					<span class="font-medium">{filteredItems.length}</span>
				</div>
				<div class="flex items-center gap-1.5 text-green-600">
					<PoundSterling class="h-4 w-4" />
					<span class="font-semibold">{formatCurrency(totalSpend)}</span>
					<span class="text-gray-500 text-xs">selected</span>
				</div>
			</div>
		</div>
	</div>
</div>