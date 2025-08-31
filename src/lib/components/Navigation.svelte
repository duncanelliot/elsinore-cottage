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

<nav class="sticky top-0 z-50 w-full !bg-none">
	<div class="relative bg-gradient-to-r from-sky-600 to-cyan-600">
		<div class="container mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-2">
					<Anchor class="h-8 w-8 text-white" />
					<div class="flex flex-col">
						<span class="text-xl leading-tight font-bold text-white">Elsinore</span>
						<span class="text-xs text-sky-100/80">Bembridge, Isle of Wight</span>
					</div>
				</div>

				<div class="flex items-center space-x-1">
					{#if !isAdminArea}
						<!-- Guest Navigation Items -->
						<div class="hidden items-center space-x-1 md:flex">
							{#each guestNavItems as item}
								<Button
									variant="ghost"
									class="text-white {currentPath === item.href
										? 'cursor-default bg-sky-700/60 hover:bg-sky-700/60'
										: 'hover:bg-white/20'}"
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
									class="border border-white/50 text-white hover:bg-white/20"
									href="/login"
								>
									<Settings class="mr-1 h-4 w-4" />
									Login
								</Button>
							</div>
						</div>
					{:else}
						<!-- Admin Panel Indicator -->
						<div class="mr-4 hidden items-center space-x-2 md:flex">
							<Settings class="h-5 w-5 text-white" />
							<span class="font-medium text-white">Admin Panel</span>
						</div>
						<!-- Guest Site Button for Admin Area -->
						<div class="hidden md:block">
							<Button
								variant="ghost"
								class="border border-white/50 text-white hover:bg-white/20"
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
	</div>
	<!-- Wavy bottom edge -->
	<svg
		class="-mt-[2px] block h-3 w-full"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 120"
		preserveAspectRatio="none"
	>
		<path
			d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
			class="fill-cyan-600"
		></path>
	</svg>
</nav>
