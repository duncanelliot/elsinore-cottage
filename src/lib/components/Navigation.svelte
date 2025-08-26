<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Anchor, MapPin, Home, Phone, Activity, Settings, Calendar } from '@lucide/svelte';
	import MobileSheet from './MobileSheet.svelte';

	const guestNavItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/cottage', label: 'Cottage', icon: Home },
		{ href: '/area', label: 'Local Area', icon: MapPin },
		{ href: '/guide', label: 'House Guide', icon: Activity },
		{ href: '/emergency', label: 'Emergency', icon: Phone },
		{ href: '/activities', label: 'Activities', icon: Activity },
		{ href: '/booking', label: 'Book Now', icon: Calendar }
	];

	const adminNavItems = [
		{ href: '/admin', label: 'Dashboard', icon: Home },
		{ href: '/admin/bookings', label: 'Bookings', icon: Calendar },
		{ href: '/admin/connectivity', label: 'WiFi & Internet', icon: Settings },
		{ href: '/admin/utilities', label: 'Utilities', icon: Settings },
		{ href: '/admin/insurance', label: 'Insurance', icon: Settings },
		{ href: '/admin/maintenance', label: 'Maintenance', icon: Settings }
	];

	const currentPath = $derived($page.url.pathname);
	const isAdminArea = $derived(currentPath.startsWith('/admin'));
</script>

<nav class="sticky top-0 z-50 w-full border-b">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center space-x-2">
				<Anchor class="text-nautical-white h-8 w-8" />
				<div class="flex flex-col">
					<span class="text-nautical-white text-xl leading-tight font-bold">Elsinore</span>
					<span class="text-nautical-white/70 text-xs">Bembridge, Isle of Wight</span>
				</div>
			</div>

			<div class="flex items-center space-x-1">
				{#if !isAdminArea}
					<!-- Guest Navigation Items -->
					<div class="hidden items-center space-x-1 md:flex">
						{#each guestNavItems as item}
							<Button
								variant="ghost"
								class="text-nautical-white hover:bg-white/20 {currentPath === item.href
									? 'bg-red-900'
									: ''}"
								href={item.href}
							>
								<item.icon class="h-4 w-4" />
								{item.label}
							</Button>
						{/each}
						<!-- Admin Button for Guest Area -->
						<div class="ml-2">
							<Button
								variant="ghost"
								class="text-nautical-white border-nautical-white hover:bg-red/20 border"
								href="/admin"
							>
								<Settings class="mr-1 h-4 w-4" />
								Admin
							</Button>
						</div>
					</div>
				{:else}
					<!-- Admin Panel Indicator -->
					<div class="mr-4 hidden items-center space-x-2 md:flex">
						<Settings class="text-nautical-white h-5 w-5" />
						<span class="text-nautical-white font-medium">Admin Panel</span>
					</div>
					<!-- Guest Site Button for Admin Area -->
					<div class="hidden md:block">
						<Button
							variant="ghost"
							class="text-nautical-white border-nautical-white border hover:bg-white/20"
							href="/"
						>
							<Home class="mr-1 h-4 w-4" />
							Guest Site
						</Button>
					</div>
				{/if}

				<!-- Mobile Navigation -->
				<MobileSheet
					navItems={isAdminArea ? adminNavItems : guestNavItems}
					{currentPath}
					{isAdminArea}
				/>
			</div>
		</div>
	</div>
</nav>
