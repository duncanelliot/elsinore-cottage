<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet/index.js';
	import { Menu, Calendar } from '@lucide/svelte';

	type NavItem = {
		href: string;
		label: string;
		icon: any;
	};

	let {
		navItems,
		otherItems = [],
		currentPath,
		isAdminArea = false
	}: {
		navItems: NavItem[];
		otherItems?: NavItem[];
		currentPath: string;
		isAdminArea?: boolean;
	} = $props();

	let isOpen = $state(false);

	function closeSheet() {
		isOpen = false;
	}
</script>

<Sheet bind:open={isOpen}>
	<SheetTrigger class="md:hidden">
		<Button 
			variant="ghost"
			size="sm"
			class="text-nautical-white hover:bg-white/20 active:bg-white/30 p-3 touch-manipulation"
			aria-label="Open navigation menu"
			style="min-height: 44px; min-width: 44px;"
		>
			<Menu class="h-6 w-6" />
		</Button>
	</SheetTrigger>
	
	<SheetContent side="right" class="w-80 sm:w-80 max-h-screen overflow-y-auto">
		<SheetHeader class="text-left pb-6">
			<SheetTitle class="text-lg font-semibold text-nautical-navy">
				Elsinore {isAdminArea ? 'Admin' : 'Navigation'}
			</SheetTitle>
		</SheetHeader>
		
		<!-- Navigation Menu -->
		<nav class="flex flex-col space-y-1">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={closeSheet}
					class="flex items-center space-x-3 px-4 py-4 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation {currentPath === item.href
						? 'bg-nautical-navy text-white hover:bg-nautical-blue'
						: ''}"
					style="min-height: 44px;"
				>
					<item.icon class="h-5 w-5 flex-shrink-0" />
					<span class="font-medium">{item.label}</span>
				</a>
			{/each}
		</nav>

		<!-- Other Menu Section -->
		{#if otherItems.length > 0 && !isAdminArea}
			<div class="mt-4">
				<p class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Other</p>
				<nav class="flex flex-col space-y-1">
					{#each otherItems as item}
						<a
							href={item.href}
							onclick={closeSheet}
							class="flex items-center space-x-3 px-4 py-4 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation {currentPath === item.href
								? 'bg-nautical-navy text-white hover:bg-nautical-blue'
								: ''}"
							style="min-height: 44px;"
						>
							<item.icon class="h-5 w-5 flex-shrink-0" />
							<span class="font-medium">{item.label}</span>
						</a>
					{/each}
				</nav>
			</div>
		{/if}

		<!-- Divider -->
		<div class="my-6 border-t border-gray-200"></div>
		
		<!-- Action Buttons -->
		<div class="space-y-3">
			{#if isAdminArea}
				<Button 
					class="w-full justify-start bg-nautical-navy hover:bg-nautical-blue active:bg-nautical-blue text-white touch-manipulation"
					href="/"
					onclick={closeSheet}
					style="min-height: 44px;"
				>
					Back to Guest Site
				</Button>
				<Button 
					variant="outline" 
					class="w-full justify-start touch-manipulation active:bg-gray-100"
					href="/admin/bookings"
					onclick={closeSheet}
					style="min-height: 44px;"
				>
					<Calendar class="h-4 w-4 mr-2" />
					Manage Bookings
				</Button>
			{:else}
				<Button 
					class="w-full justify-start bg-nautical-navy hover:bg-nautical-blue active:bg-nautical-blue text-white touch-manipulation"
					href="/booking"
					onclick={closeSheet}
					style="min-height: 44px;"
				>
					<Calendar class="h-4 w-4 mr-2" />
					Book Your Stay
				</Button>
				<Button 
					variant="outline" 
					class="w-full justify-start touch-manipulation active:bg-gray-100"
					href="/admin"
					onclick={closeSheet}
					style="min-height: 44px;"
				>
					Admin Access
				</Button>
			{/if}
		</div>
		
		<!-- Footer -->
		<div class="mt-auto pt-6 border-t border-gray-200">
			<p class="text-xs text-gray-500 text-center">
				{isAdminArea ? 'Property Management' : 'Your Castle by the Sea'}
			</p>
		</div>
	</SheetContent>
</Sheet>