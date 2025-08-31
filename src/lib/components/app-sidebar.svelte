<script lang="ts">
	import { 
		Calendar, 
		Wifi, 
		Zap, 
		Shield,
		Wrench,
		Home,
		ChevronRight,
		LayoutDashboard,
		Users,
		AlertTriangle,
		LogOut
	} from 'lucide-svelte';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { page } from '$app/stores';
	import { adminAuth } from '$lib/stores/auth.js';
	
	// Main navigation items
	const mainItems = [
		{
			title: "Dashboard",
			url: "/admin-dashboard",
			icon: LayoutDashboard,
		},
		{
			title: "Bookings",
			url: "/admin-dashboard/bookings",
			icon: Calendar,
			badge: "3"
		},
		{
			title: "Users",
			url: "/admin-dashboard/users",
			icon: Users,
		},
	];

	// Management items
	const managementItems = [
		{
			title: "WiFi & Connectivity",
			url: "/admin-dashboard/connectivity",
			icon: Wifi,
		},
		{
			title: "Utilities",
			url: "/admin-dashboard/utilities",
			icon: Zap,
		},
		{
			title: "Insurance",
			url: "/admin-dashboard/insurance",
			icon: Shield,
		},
		{
			title: "Maintenance",
			url: "/admin-dashboard/maintenance",
			icon: Wrench,
		},
	];

	// Bottom navigation item
	const bottomItems = [
		{
			title: "Back to Site",
			url: "/",
			icon: Home,
		},
	];

	$: currentPath = $page.url.pathname;

	function handleLogout() {
		adminAuth.logout();
		window.location.href = '/login';
	}
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="hover:bg-sidebar-accent">
					{#snippet child({ props })}
						<a href="/admin-dashboard" {...props}>
							<Home class="size-4" />
							<span class="font-semibold">Elsinore Admin</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	
	<Sidebar.Content>
		<!-- Main Navigation -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each mainItems as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton 
								class={currentPath === item.url ? 'bg-sidebar-accent' : ''}
							>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<svelte:component this={item.icon} class="size-4" />
										<span>{item.title}</span>
										{#if item.badge}
											<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
										{/if}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Separator />

		<!-- Property Management -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>Property Management</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each managementItems as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton 
								class={currentPath === item.url ? 'bg-sidebar-accent' : ''}
							>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<svelte:component this={item.icon} class="size-4" />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Separator />

		<!-- Quick Stats -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>Quick Stats</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<div class="px-2 py-1.5 text-xs space-y-2">
					<div class="flex justify-between">
						<span class="text-muted-foreground">Occupancy</span>
						<span class="font-medium">78%</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground">This Month</span>
						<span class="font-medium text-green-600">£4,200</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground">Next Guest</span>
						<span class="font-medium">In 3 days</span>
					</div>
				</div>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Separator class="mb-2" />
		<Sidebar.Menu>
			{#each bottomItems as item}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton 
						class="hover:bg-blue-50 hover:text-blue-600"
					>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<svelte:component this={item.icon} class="size-4" />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton 
					class="hover:bg-red-50 hover:text-red-600"
					onclick={handleLogout}
				>
					<LogOut class="size-4" />
					<span>Logout</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>