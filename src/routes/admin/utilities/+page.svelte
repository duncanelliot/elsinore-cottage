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
		Zap, 
		Droplets, 
		Flame,
		Calendar,
		Phone,
		MapPin,
		Edit,
		Save,
		X,
		TrendingUp,
		AlertTriangle
	} from '@lucide/svelte';

	let isEditingElectric = false;
	let isEditingWater = false;
	let isEditingGas = false;

	let electricData = {
		supplier: 'British Gas',
		accountNumber: 'BG987654321',
		meterNumber: 'E123456789',
		tariff: 'Standard Variable',
		lastReading: '15,847 kWh',
		readingDate: '2024-01-15',
		emergencyPhone: '0333 202 9802'
	};

	let waterData = {
		supplier: 'Southern Water',
		accountNumber: 'SW456789123',
		meterNumber: 'W987654321',
		lastReading: '2,156 m³',
		readingDate: '2024-01-12',
		emergencyPhone: '0330 303 0277'
	};

	let gasData = {
		supplier: 'British Gas',
		accountNumber: 'BG123987456',
		meterNumber: 'G456789123',
		lastReading: '8,234 m³',
		readingDate: '2024-01-10',
		emergencyPhone: '0800 111 999'
	};

	let editElectric = { ...electricData };
	let editWater = { ...waterData };
	let editGas = { ...gasData };

	function startEditElectric() {
		editElectric = { ...electricData };
		isEditingElectric = true;
	}

	function saveElectric() {
		electricData = { ...editElectric };
		isEditingElectric = false;
	}

	function cancelEditElectric() {
		editElectric = { ...electricData };
		isEditingElectric = false;
	}

	// Similar functions for water and gas...
	function startEditWater() {
		editWater = { ...waterData };
		isEditingWater = true;
	}

	function saveWater() {
		waterData = { ...editWater };
		isEditingWater = false;
	}

	function cancelEditWater() {
		editWater = { ...waterData };
		isEditingWater = false;
	}

	function startEditGas() {
		editGas = { ...gasData };
		isEditingGas = true;
	}

	function saveGas() {
		gasData = { ...editGas };
		isEditingGas = false;
	}

	function cancelEditGas() {
		editGas = { ...gasData };
		isEditingGas = false;
	}

	const utilityTips = [
		'Take meter readings monthly for accurate billing',
		'Keep supplier contact numbers easily accessible',
		'Know the location of all utility shut-offs',
		'Check for any unusual usage patterns',
		'Report any issues to suppliers immediately'
	];
</script>

<svelte:head>
	<title>Utilities Management - Admin</title>
</svelte:head>

<div class="container mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-nautical-navy mb-2">Utilities Management</h1>
		<p class="text-gray-600">Manage electricity, water, and gas supplies</p>
	</div>

	<!-- Quick Status Overview -->
	<div class="grid lg:grid-cols-3 gap-6 mb-8">
		<Card class="border-blue-200 bg-blue-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Zap class="h-8 w-8 text-blue-600" />
					<Badge className="bg-blue-100 text-blue-800">Normal</Badge>
				</div>
				<CardTitle class="text-blue-700">Electricity</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-lg font-semibold text-blue-800">{electricData.lastReading}</p>
				<p class="text-sm text-gray-600">Last reading: {electricData.readingDate}</p>
			</CardContent>
		</Card>

		<Card class="border-cyan-200 bg-cyan-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Droplets class="h-8 w-8 text-cyan-600" />
					<Badge className="bg-cyan-100 text-cyan-800">Normal</Badge>
				</div>
				<CardTitle class="text-cyan-700">Water</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-lg font-semibold text-cyan-800">{waterData.lastReading}</p>
				<p class="text-sm text-gray-600">Last reading: {waterData.readingDate}</p>
			</CardContent>
		</Card>

		<Card class="border-orange-200 bg-orange-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Flame class="h-8 w-8 text-orange-600" />
					<Badge className="bg-orange-100 text-orange-800">Normal</Badge>
				</div>
				<CardTitle class="text-orange-700">Gas</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-lg font-semibold text-orange-800">{gasData.lastReading}</p>
				<p class="text-sm text-gray-600">Last reading: {gasData.readingDate}</p>
			</CardContent>
		</Card>
	</div>

	<!-- Electricity Details -->
	<Card class="mb-8">
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle class="text-nautical-navy flex items-center">
						<Zap class="h-5 w-5 mr-2 text-blue-500" />
						Electricity Supply
					</CardTitle>
					<CardDescription>Power supply details and account information</CardDescription>
				</div>
				{#if !isEditingElectric}
					<Button variant="outline" on:click={startEditElectric}>
						<Edit class="h-4 w-4 mr-2" />
						Edit
					</Button>
				{:else}
					<div class="flex space-x-2">
						<Button variant="outline" size="sm" on:click={saveElectric}>
							<Save class="h-4 w-4 mr-2" />
							Save
						</Button>
						<Button variant="outline" size="sm" on:click={cancelEditElectric}>
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
						<label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.supplier} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{electricData.supplier}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.accountNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{electricData.accountNumber}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.meterNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{electricData.meterNumber}</p>
						{/if}
					</div>
				</div>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Tariff</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.tariff} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{electricData.tariff}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Last Reading</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.lastReading} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{electricData.lastReading}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
						{#if isEditingElectric}
							<Input bind:value={editElectric.emergencyPhone} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{electricData.emergencyPhone}</p>
						{/if}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Water Details -->
	<Card class="mb-8">
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle class="text-nautical-navy flex items-center">
						<Droplets class="h-5 w-5 mr-2 text-cyan-500" />
						Water Supply
					</CardTitle>
					<CardDescription>Water supply details and account information</CardDescription>
				</div>
				{#if !isEditingWater}
					<Button variant="outline" on:click={startEditWater}>
						<Edit class="h-4 w-4 mr-2" />
						Edit
					</Button>
				{:else}
					<div class="flex space-x-2">
						<Button variant="outline" size="sm" on:click={saveWater}>
							<Save class="h-4 w-4 mr-2" />
							Save
						</Button>
						<Button variant="outline" size="sm" on:click={cancelEditWater}>
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
						<label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
						{#if isEditingWater}
							<Input bind:value={editWater.supplier} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{waterData.supplier}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
						{#if isEditingWater}
							<Input bind:value={editWater.accountNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{waterData.accountNumber}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
						{#if isEditingWater}
							<Input bind:value={editWater.meterNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{waterData.meterNumber}</p>
						{/if}
					</div>
				</div>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Last Reading</label>
						{#if isEditingWater}
							<Input bind:value={editWater.lastReading} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{waterData.lastReading}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Reading Date</label>
						{#if isEditingWater}
							<Input type="date" bind:value={editWater.readingDate} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{waterData.readingDate}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
						{#if isEditingWater}
							<Input bind:value={editWater.emergencyPhone} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{waterData.emergencyPhone}</p>
						{/if}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Gas Details -->
	<Card class="mb-8">
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle class="text-nautical-navy flex items-center">
						<Flame class="h-5 w-5 mr-2 text-orange-500" />
						Gas Supply
					</CardTitle>
					<CardDescription>Gas supply details and account information</CardDescription>
				</div>
				{#if !isEditingGas}
					<Button variant="outline" on:click={startEditGas}>
						<Edit class="h-4 w-4 mr-2" />
						Edit
					</Button>
				{:else}
					<div class="flex space-x-2">
						<Button variant="outline" size="sm" on:click={saveGas}>
							<Save class="h-4 w-4 mr-2" />
							Save
						</Button>
						<Button variant="outline" size="sm" on:click={cancelEditGas}>
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
						<label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
						{#if isEditingGas}
							<Input bind:value={editGas.supplier} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{gasData.supplier}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
						{#if isEditingGas}
							<Input bind:value={editGas.accountNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{gasData.accountNumber}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
						{#if isEditingGas}
							<Input bind:value={editGas.meterNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{gasData.meterNumber}</p>
						{/if}
					</div>
				</div>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Last Reading</label>
						{#if isEditingGas}
							<Input bind:value={editGas.lastReading} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{gasData.lastReading}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Reading Date</label>
						{#if isEditingGas}
							<Input type="date" bind:value={editGas.readingDate} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{gasData.readingDate}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
						{#if isEditingGas}
							<Input bind:value={editGas.emergencyPhone} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded text-red-600 font-semibold">{gasData.emergencyPhone}</p>
						{/if}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Utility Locations & Tips -->
	<div class="grid lg:grid-cols-2 gap-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<MapPin class="h-5 w-5 mr-2" />
					Meter Locations
				</CardTitle>
				<CardDescription>Physical locations of all utility meters</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div class="border rounded-lg p-3">
						<h4 class="font-semibold text-blue-700 mb-2">⚡ Electricity Meter</h4>
						<p class="text-sm text-gray-700">Utility cupboard, ground floor, next to boiler</p>
					</div>
					<div class="border rounded-lg p-3">
						<h4 class="font-semibold text-cyan-700 mb-2">💧 Water Meter</h4>
						<p class="text-sm text-gray-700">Outside front door, left side, in ground cover</p>
					</div>
					<div class="border rounded-lg p-3">
						<h4 class="font-semibold text-orange-700 mb-2">🔥 Gas Meter</h4>
						<p class="text-sm text-gray-700">Outside front door, right side, against wall</p>
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<AlertTriangle class="h-5 w-5 mr-2 text-amber-500" />
					Utility Management Tips
				</CardTitle>
				<CardDescription>Best practices for utility management</CardDescription>
			</CardHeader>
			<CardContent>
				<ul class="space-y-3">
					{#each utilityTips as tip}
						<li class="flex items-start space-x-2">
							<div class="w-2 h-2 bg-nautical-teal rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-sm text-gray-700">{tip}</span>
						</li>
					{/each}
				</ul>
			</CardContent>
		</Card>
	</div>
</div>