<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();
	
	const isAdminRoute = $derived($page.url.pathname.startsWith('/admin-dashboard') || $page.url.pathname.startsWith('/guest-dashboard') || $page.url.pathname === '/login');

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Elsinore - Holiday Cottage, Bembridge, Isle of Wight</title>
</svelte:head>

<div class="min-h-screen bg-slate-50">
	{#if !isAdminRoute}
		<Navigation />
	{/if}
	<main class="flex-1">
		{@render children?.()}
	</main>
</div>
