<script lang="ts">
	import { goto } from '$app/navigation';
	import { adminAuth } from '$lib/stores/auth.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Lock, Eye, EyeOff, User, Mail, Shield, ArrowRight } from 'lucide-svelte';

	let loginMode = $state<'guest' | 'admin'>('guest');
	let guestEmail = $state('');
	let guestPassword = $state('');
	let adminUsername = $state('');
	let adminPassword = $state('');
	let showGuestPassword = $state(false);
	let showAdminPassword = $state(false);
	let loginError = $state(false);
	let errorMessage = $state('');

	function handleGuestLogin() {
		// For now, simple guest validation - you can enhance this later
		if (guestEmail && guestPassword) {
			// In a real app, validate against a database
			if (guestPassword === 'guest123') { // You can change this
				goto('/guest-dashboard');
			} else {
				loginError = true;
				errorMessage = 'Invalid email or password';
			}
		} else {
			loginError = true;
			errorMessage = 'Please fill in all fields';
		}
	}

	async function handleAdminLogin() {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: adminUsername,
					password: adminPassword
				})
			});

			if (response.ok) {
				const data = await response.json();
				// Store user data in adminAuth store
				adminAuth.setUser(data.user);
				goto('/admin-dashboard');
			} else {
				const error = await response.json();
				loginError = true;
				errorMessage = error.error || 'Incorrect admin password';
			}
		} catch (error) {
			console.error('Login error:', error);
			loginError = true;
			errorMessage = 'Login failed. Please try again.';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			if (loginMode === 'guest') {
				handleGuestLogin();
			} else {
				handleAdminLogin();
			}
		}
	}

	function switchToAdmin() {
		loginMode = 'admin';
		loginError = false;
		errorMessage = '';
		// Clear admin fields
		adminUsername = '';
		adminPassword = '';
	}

	function switchToGuest() {
		loginMode = 'guest';
		loginError = false;
		errorMessage = '';
		// Clear guest fields
		guestEmail = '';
		guestPassword = '';
	}
</script>

<svelte:head>
	<title>Login - Elsinore Cottage</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left side - Image -->
	<div class="hidden lg:flex lg:w-3/5 relative">
		<img 
			src="/elsinore-5.jpg" 
			alt="Elsinore cottage view" 
			class="absolute inset-0 w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30">
			<div class="flex flex-col justify-end h-full p-12 text-white">
				<h1 class="text-5xl font-bold mb-4">Welcome to Elsinore</h1>
				<p class="text-xl mb-2">Your castle by the sea in Bembridge</p>
				<p class="text-lg opacity-90">Holiday Cottage, Isle of Wight</p>
			</div>
		</div>
	</div>

	<!-- Right side - Login Form -->
	<div class="w-full lg:w-2/5 flex items-center justify-center bg-white p-8">
		<div class="w-full max-w-md">
			<Card class="border-none bg-transparent">
				<CardHeader class="space-y-1 pb-6">
					<div class="flex justify-center mb-4">
						<div class="p-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 transition-all duration-300">
							{#if loginMode === 'guest'}
								<User class="h-8 w-8 text-white" />
							{:else}
								<Shield class="h-8 w-8 text-white" />
							{/if}
						</div>
					</div>
					<CardTitle class="text-2xl text-center transition-opacity duration-200">
						{loginMode === 'guest' ? 'Guest Login' : 'Admin Access'}
					</CardTitle>
					<CardDescription class="text-center transition-opacity duration-200">
						{loginMode === 'guest' 
							? 'Access your booking and guest information' 
							: 'Property management dashboard'}
					</CardDescription>
				</CardHeader>

				<CardContent class="space-y-4">
					{#if loginMode === 'guest'}
						<!-- Guest Login Form -->
						<div class="space-y-4">
							<div class="space-y-2">
								<Label for="email">Email Address</Label>
								<div class="relative">
									<Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="your@email.com"
										bind:value={guestEmail}
										onkeydown={handleKeydown}
										class="pl-10 {loginError ? 'border-red-500' : ''}"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="guest-password">Password</Label>
								<div class="relative">
									<Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="guest-password"
										type={showGuestPassword ? 'text' : 'password'}
										placeholder="Enter your password"
										bind:value={guestPassword}
										onkeydown={handleKeydown}
										class="pl-10 pr-10 {loginError ? 'border-red-500' : ''}"
									/>
									<button
										type="button"
										class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
										onclick={() => (showGuestPassword = !showGuestPassword)}
									>
										{#if showGuestPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</button>
								</div>
								<p class="text-xs text-gray-500">Your password can be found in your booking confirmation email</p>
							</div>

							{#if loginError}
								<p class="text-sm text-red-600">{errorMessage}</p>
							{/if}

							<Button
								class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 !rounded-full"
								onclick={handleGuestLogin}
								disabled={!guestEmail || !guestPassword}
							>
								Login to Guest Dashboard
								<ArrowRight class="ml-2 h-4 w-4" />
							</Button>

							<div class="relative py-4">
								<div class="absolute inset-0 flex items-center">
									<span class="w-full border-t" />
								</div>
								<div class="relative flex justify-center text-xs uppercase">
									<span class="bg-white px-2 text-muted-foreground">Or</span>
								</div>
							</div>

							<button
								type="button"
								class="w-full text-sm text-center text-blue-600 hover:text-blue-700 font-medium transition-all hover:scale-105"
								onclick={switchToAdmin}
							>
								Want to login as admin? Click here
							</button>
						</div>
					{:else}
						<!-- Admin Login Form -->
						<div class="space-y-4">
							<div class="space-y-2">
								<Label for="admin-username">Username</Label>
								<div class="relative">
									<User class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="admin-username"
										type="text"
										placeholder="Enter admin username"
										bind:value={adminUsername}
										onkeydown={handleKeydown}
										class="pl-10 {loginError ? 'border-red-500' : ''}"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="admin-password">Password</Label>
								<div class="relative">
									<Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="admin-password"
										type={showAdminPassword ? 'text' : 'password'}
										placeholder="Enter admin password"
										bind:value={adminPassword}
										onkeydown={handleKeydown}
										class="pl-10 pr-10 {loginError ? 'border-red-500' : ''}"
									/>
									<button
										type="button"
										class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
										onclick={() => (showAdminPassword = !showAdminPassword)}
									>
										{#if showAdminPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</button>
								</div>
							</div>

							{#if loginError}
								<p class="text-sm text-red-600">{errorMessage}</p>
							{/if}

							<Button
								class="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black !rounded-full"
								onclick={handleAdminLogin}
								disabled={!adminUsername || !adminPassword}
							>
								Access Admin Dashboard
								<Shield class="ml-2 h-4 w-4" />
							</Button>

							<div class="relative py-4">
								<div class="absolute inset-0 flex items-center">
									<span class="w-full border-t" />
								</div>
								<div class="relative flex justify-center text-xs uppercase">
									<span class="bg-white px-2 text-muted-foreground">Or</span>
								</div>
							</div>

							<button
								type="button"
								class="w-full text-sm text-center text-blue-600 hover:text-blue-700 font-medium transition-all hover:scale-105"
								onclick={switchToGuest}
							>
								Back to guest login
							</button>
						</div>
					{/if}
				</CardContent>
			</Card>

			<!-- Help text -->
			<p class="text-center text-sm text-gray-500 mt-6">
				Need help? Contact us at support@elsinore-cottage.com
			</p>
		</div>
	</div>
</div>