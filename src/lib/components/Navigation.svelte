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
				<Anchor class="h-8 w-8 text-nautical-white" />
				<span class="text-xl font-bold text-nautical-white">Elsinore</span>
				<span class="text-sm text-nautical-white/70">Bembridge, Isle of Wight</span>
			</div>

			{#if !isAdminArea}
				<div class="hidden md:flex items-center space-x-1">
					{#each guestNavItems as item}
						<Button
							variant={currentPath === item.href ? 'secondary' : 'ghost'}
							class="text-nautical-white hover:bg-white/20"
							href={item.href}
						>
							<item.icon class="h-4 w-4 mr-2" />
							{item.label}
						</Button>
					{/each}
				</div>
			{:else}
				<div class="flex items-center space-x-2">
					<Settings class="h-5 w-5 text-nautical-white" />
					<span class="text-nautical-white font-medium">Admin Panel</span>
				</div>
			{/if}

			<div class="flex items-center space-x-2">
				<!-- Desktop Admin/Guest Toggle -->
				<div class="hidden md:block">
					{#if !isAdminArea}
						<Button
							variant="ghost"
							class="text-nautical-white border border-nautical-white hover:bg-white/20"
							href="/admin"
						>
							<Settings class="h-4 w-4 mr-2" />
							Admin
						</Button>
					{:else}
						<Button
							variant="ghost"
							class="text-nautical-white border border-nautical-white hover:bg-white/20"
							href="/"
						>
							<Home class="h-4 w-4 mr-2" />
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