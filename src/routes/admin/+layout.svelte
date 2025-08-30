<script lang="ts">
	import { onMount } from 'svelte';
	import { adminAuth } from '$lib/stores/auth.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Lock, Eye, EyeOff } from '@lucide/svelte';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";

	let { children } = $props();
	let password = $state('');
	let showPassword = $state(false);
	let loginError = $state(false);
	let isAuthenticated = $state(false);

	onMount(() => {
		isAuthenticated = adminAuth.checkAuth();
	});

	adminAuth.subscribe((value) => {
		isAuthenticated = value;
	});

	function handleLogin() {
		const success = adminAuth.login(password);
		if (success) {
			loginError = false;
			password = '';
		} else {
			loginError = true;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}
</script>

{#if !isAuthenticated}
	<div class="flex min-h-screen items-center justify-center bg-slate-50 p-4">
		<Card class="border-nautical-teal/20 w-full max-w-md">
			<CardHeader class="text-center">
				<div class="mb-4 flex justify-center">
					<div class="bg-nautical-navy rounded-full p-3">
						<Lock class="h-8 w-8 text-white" />
					</div>
				</div>
				<CardTitle class="text-nautical-navy text-2xl">Admin Access</CardTitle>
				<CardDescription>Enter the admin password to access property management</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div class="relative">
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter admin password"
							bind:value={password}
							onkeydown={handleKeydown}
							class={loginError ? 'border-red-500' : ''}
						/>
						<button
							type="button"
							class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							onclick={() => (showPassword = !showPassword)}
						>
							{#if showPassword}
								<EyeOff class="h-4 w-4" />
							{:else}
								<Eye class="h-4 w-4" />
							{/if}
						</button>
					</div>

					{#if loginError}
						<p class="text-sm text-red-600">Incorrect password. Please try again.</p>
					{/if}

					<Button
						class="bg-nautical-navy hover:bg-nautical-blue w-full"
						onclick={handleLogin}
						disabled={!password}
					>
						<Lock class="mr-2 h-4 w-4" />
						Access Admin Panel
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>
{:else}
	<Sidebar.Provider>
		<div class="flex min-h-screen w-full bg-background">
			<AppSidebar />
			<div class="flex-1">
				<header class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
					<Sidebar.Trigger class="md:hidden" />
					<div class="flex-1">
						<h2 class="text-lg font-semibold text-foreground">Property Management</h2>
					</div>
				</header>
				<main class="flex-1 p-6">
					{@render children?.()}
				</main>
			</div>
		</div>
	</Sidebar.Provider>
{/if}
