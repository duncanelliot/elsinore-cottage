<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { 
		Wifi, 
		Router, 
		Smartphone,
		Monitor,
		Phone,
		AlertTriangle,
		CheckCircle,
		Edit,
		Save,
		X
	} from '@lucide/svelte';

	let isEditing = false;
	let wifiData = {
		networkName: 'Seaside_Guest',
		password: 'Bembridge2024!',
		provider: 'BT Business',
		speed: '80 Mbps',
		accountNumber: 'BT123456789',
		supportPhone: '0800 800 151'
	};

	let editData = { ...wifiData };

	function startEdit() {
		editData = { ...wifiData };
		isEditing = true;
	}

	function saveChanges() {
		wifiData = { ...editData };
		isEditing = false;
	}

	function cancelEdit() {
		editData = { ...wifiData };
		isEditing = false;
	}

	const troubleshootingSteps = [
		'Check all cable connections are secure',
		'Unplug router for 30 seconds, then plug back in',
		'Wait 2-3 minutes for full router restart',
		'Check device WiFi settings and reconnect',
		'Test internet speed using speedtest.net',
		'Contact ISP if problem persists'
	];

	const deviceTips = [
		{ device: 'Smart TV', tip: 'Access Settings > Network > WiFi and reconnect' },
		{ device: 'Tablets/Phones', tip: 'Forget network and reconnect with password' },
		{ device: 'Laptops', tip: 'Update WiFi drivers if connection issues persist' },
		{ device: 'Smart Speakers', tip: 'Use device app to reconnect to WiFi network' }
	];
</script>

<svelte:head>
	<title>Connectivity Management - Admin</title>
</svelte:head>

<div class="container mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-nautical-navy mb-2">Connectivity Management</h1>
		<p class="text-gray-600">Manage internet, WiFi, and communication systems</p>
	</div>

	<!-- WiFi Status -->
	<div class="grid lg:grid-cols-3 gap-6 mb-8">
		<Card class="border-green-200 bg-green-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Wifi class="h-8 w-8 text-green-600" />
					<Badge className="bg-green-100 text-green-800">Online</Badge>
				</div>
				<CardTitle class="text-green-700">WiFi Status</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-2xl font-bold text-green-800">80 Mbps</p>
				<p class="text-sm text-gray-600">Last speed test: 2 hours ago</p>
			</CardContent>
		</Card>

		<Card class="border-blue-200 bg-blue-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Router class="h-8 w-8 text-blue-600" />
					<Badge className="bg-blue-100 text-blue-800">Active</Badge>
				</div>
				<CardTitle class="text-blue-700">Router Status</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-700 mb-2">BT Business Hub</p>
				<p class="text-sm text-gray-600">Uptime: 7 days, 3 hours</p>
			</CardContent>
		</Card>

		<Card class="border-purple-200 bg-purple-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Smartphone class="h-8 w-8 text-purple-600" />
					<Badge className="bg-purple-100 text-purple-800">6 devices</Badge>
				</div>
				<CardTitle class="text-purple-700">Connected Devices</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-600">2 phones, 2 tablets, 1 laptop, 1 TV</p>
			</CardContent>
		</Card>
	</div>

	<!-- WiFi Settings -->
	<Card class="mb-8">
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle class="text-nautical-navy">WiFi Configuration</CardTitle>
					<CardDescription>Network settings and access information</CardDescription>
				</div>
				{#if !isEditing}
					<Button variant="outline" on:click={startEdit}>
						<Edit class="h-4 w-4 mr-2" />
						Edit
					</Button>
				{:else}
					<div class="flex space-x-2">
						<Button variant="outline" size="sm" on:click={saveChanges}>
							<Save class="h-4 w-4 mr-2" />
							Save
						</Button>
						<Button variant="outline" size="sm" on:click={cancelEdit}>
							<X class="h-4 w-4 mr-2" />
							Cancel
						</Button>
					</div>
				{/if}
			</div>
		</CardHeader>
		<CardContent>
			<div class="grid md:grid-cols-2 gap-6">
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Network Name (SSID)</label>
						{#if isEditing}
							<Input bind:value={editData.networkName} />
						{:else}
							<p class="text-lg font-mono bg-gray-50 p-2 rounded">{wifiData.networkName}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
						{#if isEditing}
							<Input type="password" bind:value={editData.password} />
						{:else}
							<p class="text-lg font-mono bg-gray-50 p-2 rounded">{wifiData.password}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Provider</label>
						{#if isEditing}
							<Input bind:value={editData.provider} />
						{:else}
							<p class="text-lg bg-gray-50 p-2 rounded">{wifiData.provider}</p>
						{/if}
					</div>
				</div>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Connection Speed</label>
						{#if isEditing}
							<Input bind:value={editData.speed} />
						{:else}
							<p class="text-lg bg-gray-50 p-2 rounded">{wifiData.speed}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
						{#if isEditing}
							<Input bind:value={editData.accountNumber} />
						{:else}
							<p class="text-lg font-mono bg-gray-50 p-2 rounded">{wifiData.accountNumber}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
						{#if isEditing}
							<Input bind:value={editData.supportPhone} />
						{:else}
							<p class="text-lg font-mono bg-gray-50 p-2 rounded">{wifiData.supportPhone}</p>
						{/if}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<div class="grid lg:grid-cols-2 gap-8">
		<!-- Troubleshooting Guide -->
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<AlertTriangle class="h-5 w-5 mr-2 text-orange-500" />
					Troubleshooting Steps
				</CardTitle>
				<CardDescription>Steps to resolve common connectivity issues</CardDescription>
			</CardHeader>
			<CardContent>
				<ol class="space-y-3">
					{#each troubleshootingSteps as step, index}
						<li class="flex items-start space-x-3">
							<span class="flex-shrink-0 w-6 h-6 bg-nautical-navy text-white rounded-full flex items-center justify-center text-sm font-medium">
								{index + 1}
							</span>
							<span class="text-sm text-gray-700">{step}</span>
						</li>
					{/each}
				</ol>
			</CardContent>
		</Card>

		<!-- Device Connection Help -->
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<Monitor class="h-5 w-5 mr-2 text-blue-500" />
					Device Connection Tips
				</CardTitle>
				<CardDescription>Help guests connect their devices</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each deviceTips as tip}
						<div class="border rounded-lg p-3">
							<h4 class="font-semibold text-gray-800 mb-1">{tip.device}</h4>
							<p class="text-sm text-gray-600">{tip.tip}</p>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Router Location & Access -->
	<Card class="mt-8">
		<CardHeader>
			<CardTitle class="text-nautical-navy">Router Information</CardTitle>
			<CardDescription>Physical location and access details</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="font-semibold text-gray-800 mb-3">Router Location</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• <strong>Location:</strong> Hallway, on shelf by stairs</li>
						<li>• <strong>Model:</strong> BT Business Hub 2</li>
						<li>• <strong>Admin Access:</strong> 192.168.1.1</li>
						<li>• <strong>Admin Password:</strong> Contact BT Support</li>
					</ul>
				</div>
				<div>
					<h3 class="font-semibold text-gray-800 mb-3">Emergency Contacts</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• <strong>BT Business Support:</strong> 0800 800 151</li>
						<li>• <strong>Technical Issues:</strong> 0330 1234 150</li>
						<li>• <strong>Account Queries:</strong> 0800 800 154</li>
						<li>• <strong>OpenReach (Line Issues):</strong> 0800 023 2023</li>
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
</div>