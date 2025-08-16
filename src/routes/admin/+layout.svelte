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

	function handleLogout() {
		adminAuth.logout();
		password = '';
		loginError = false;
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
	<div class="min-h-screen bg-slate-50">
		<!-- Admin Navigation -->
		<nav class="from-nautical-navy to-nautical-blue border-nautical-teal border-b bg-gradient-to-r">
			<div class="container mx-auto px-4">
				<div class="flex h-16 items-center justify-between">
					<div class="flex items-center space-x-6">
						<a href="/admin" class="text-lg font-bold text-white">Admin Panel</a>
						<div class="hidden space-x-4 md:flex">
							<a href="/admin" class="text-white/80 transition-colors hover:text-white">Dashboard</a
							>
							<a href="/admin/connectivity" class="text-white/80 transition-colors hover:text-white"
								>Connectivity</a
							>
							<a href="/admin/utilities" class="text-white/80 transition-colors hover:text-white"
								>Utilities</a
							>
							<a href="/admin/insurance" class="text-white/80 transition-colors hover:text-white"
								>Insurance</a
							>
							<a href="/admin/maintenance" class="text-white/80 transition-colors hover:text-white"
								>Maintenance</a
							>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<a href="/" class="text-white/80 transition-colors hover:text-white">Guest Site</a>
						<Button
							variant="outline"
							size="sm"
							class="border-white text-white hover:bg-white/20"
							onclick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Admin Content -->
		<main class="p-6">
			{@render children?.()}
		</main>
	</div>
{/if}
