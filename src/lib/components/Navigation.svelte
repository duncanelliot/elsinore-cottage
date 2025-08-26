<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Anchor, MapPin, Home, Phone, Activity, Settings, Calendar } from '@lucide/svelte';
	import MobileSheet from './MobileSheet.svelte';

	const guestNavItems = [
		{ href: '/', label: 'Welcome', icon: Home },
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
					<span class="text-nautical-white text-xl font-bold leading-tight">Elsinore</span>
					<span class="text-nautical-white/70 text-xs">Bembridge, Isle of Wight</span>
				</div>
			</div>

			{#if !isAdminArea}
				<div class="hidden items-center space-x-1 md:flex">
					{#each guestNavItems as item}
						<Button
							variant={currentPath === item.href ? 'secondary' : 'ghost'}
							class="text-nautical-white hover:bg-white/20"
							href={item.href}
						>
							<item.icon class="h-4 w-4" />
							{item.label}
						</Button>
					{/each}
				</div>
			{:else}
				<div class="flex items-center space-x-2">
					<Settings class="text-nautical-white h-5 w-5" />
					<span class="text-nautical-white font-medium">Admin Panel</span>
				</div>
			{/if}

			<div class="flex items-center space-x-2">
				<!-- Desktop Admin/Guest Toggle -->
				<div class="hidden md:block">
					{#if !isAdminArea}
						<Button
							variant="ghost"
							class="text-nautical-white border-nautical-white border hover:bg-white/20"
							href="/admin"
						>
							<Settings class="mr-1 h-4 w-4" />
							Admin
						</Button>
					{:else}
						<Button
							variant="ghost"
							class="text-nautical-white border-nautical-white border hover:bg-white/20"
							href="/"
						>
							<Home class="mr-1 h-4 w-4" />
							Guest Site
						</Button>
					{/if}
				</div>

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
