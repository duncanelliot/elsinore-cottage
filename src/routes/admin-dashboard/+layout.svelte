<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { adminAuth } from '$lib/stores/auth.js';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";

	let { children } = $props();
	let isAuthenticated = $state(false);

	onMount(() => {
		isAuthenticated = adminAuth.checkAuth();
		if (!isAuthenticated) {
			goto('/login');
		}
	});

	adminAuth.subscribe((authState) => {
		isAuthenticated = authState.isAuthenticated;
		if (!authState.isAuthenticated && browser) {
			goto('/login');
		}
	});
</script>

{#if isAuthenticated}
	<Sidebar.Provider>
		<div class="flex min-h-screen w-full bg-background">
			<AppSidebar />
			<main class="flex-1 p-6">
				<div class="md:hidden mb-4">
					<Sidebar.Trigger />
				</div>
				{@render children?.()}
			</main>
		</div>
	</Sidebar.Provider>
{/if}
