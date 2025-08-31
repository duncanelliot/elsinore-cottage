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
		Shield, 
		Phone,
		Calendar,
		AlertTriangle,
		FileText,
		Home,
		Car,
		Edit,
		Save,
		X
	} from '@lucide/svelte';

	let isEditing = false;
	
	let insuranceData = {
		provider: 'Direct Line Property',
		policyNumber: 'DL987654321',
		expiryDate: '2024-12-15',
		premium: '£450/year',
		coverage: 'Buildings & Contents',
		contactPhone: '0845 246 8704',
		claimPhone: '0845 246 8705',
		emergencyPhone: '0800 028 5100'
	};

	let editData = { ...insuranceData };

	function startEdit() {
		editData = { ...insuranceData };
		isEditing = true;
	}

	function saveChanges() {
		insuranceData = { ...editData };
		isEditing = false;
	}

	function cancelEdit() {
		editData = { ...insuranceData };
		isEditing = false;
	}

	const claimTypes = [
		{ type: 'Water Damage', action: 'Turn off water supply, document damage, call emergency number' },
		{ type: 'Fire/Smoke', action: 'Ensure safety first, call fire service if needed, then insurer' },
		{ type: 'Theft/Break-in', action: 'Call police first, get crime number, then contact insurer' },
		{ type: 'Storm Damage', action: 'Make property safe, document damage with photos' },
		{ type: 'Accidental Damage', action: 'Document incident, take photos, contact insurer' }
	];

	const renewalChecklist = [
		'Review current coverage levels',
		'Compare quotes from other providers',
		'Update property value if needed',
		'Check for any new risks or changes',
		'Consider increasing/decreasing excess',
		'Update contact details with insurer'
	];
</script>

<svelte:head>
	<title>Insurance Management - Admin</title>
</svelte:head>

<div class="container mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-nautical-navy mb-2">Insurance Management</h1>
		<p class="text-gray-600">Property insurance details and claims procedures</p>
	</div>

	<!-- Insurance Status -->
	<div class="grid lg:grid-cols-3 gap-6 mb-8">
		<Card class="border-green-200 bg-green-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Shield class="h-8 w-8 text-green-600" />
					<Badge className="bg-green-100 text-green-800">Active</Badge>
				</div>
				<CardTitle class="text-green-700">Policy Status</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-700 mb-1">Valid until: {insuranceData.expiryDate}</p>
				<p class="text-sm text-gray-600">Auto-renewal enabled</p>
			</CardContent>
		</Card>

		<Card class="border-blue-200 bg-blue-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Home class="h-8 w-8 text-blue-600" />
					<Badge className="bg-blue-100 text-blue-800">Full Coverage</Badge>
				</div>
				<CardTitle class="text-blue-700">Coverage Type</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-700 mb-1">{insuranceData.coverage}</p>
				<p class="text-sm text-gray-600">Including public liability</p>
			</CardContent>
		</Card>

		<Card class="border-amber-200 bg-amber-50">
			<CardHeader>
				<div class="flex items-center justify-between">
					<Calendar class="h-8 w-8 text-amber-600" />
					<Badge className="bg-amber-100 text-amber-800">Renewal Due</Badge>
				</div>
				<CardTitle class="text-amber-700">Next Renewal</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-700 mb-1">December 15, 2024</p>
				<p class="text-sm text-gray-600">Reminder set for November</p>
			</CardContent>
		</Card>
	</div>

	<!-- Policy Details -->
	<Card class="mb-8">
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle class="text-nautical-navy">Policy Details</CardTitle>
					<CardDescription>Current insurance policy information</CardDescription>
				</div>
				{#if !isEditing}
					<Button variant="outline" onclick={startEdit}>
						<Edit class="h-4 w-4 mr-2" />
						Edit
					</Button>
				{:else}
					<div class="flex space-x-2">
						<Button variant="outline" size="sm" onclick={saveChanges}>
							<Save class="h-4 w-4 mr-2" />
							Save
						</Button>
						<Button variant="outline" size="sm" onclick={cancelEdit}>
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
						<label class="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
						{#if isEditing}
							<Input bind:value={editData.provider} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{insuranceData.provider}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
						{#if isEditing}
							<Input bind:value={editData.policyNumber} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{insuranceData.policyNumber}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
						{#if isEditing}
							<Input type="date" bind:value={editData.expiryDate} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{insuranceData.expiryDate}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Annual Premium</label>
						{#if isEditing}
							<Input bind:value={editData.premium} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{insuranceData.premium}</p>
						{/if}
					</div>
				</div>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
						{#if isEditing}
							<Input bind:value={editData.coverage} />
						{:else}
							<p class="bg-gray-50 p-2 rounded">{insuranceData.coverage}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">General Enquiries</label>
						{#if isEditing}
							<Input bind:value={editData.contactPhone} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded">{insuranceData.contactPhone}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Claims Phone</label>
						{#if isEditing}
							<Input bind:value={editData.claimPhone} />
						{:else}
							<p class="font-mono bg-gray-50 p-2 rounded text-red-600 font-semibold">{insuranceData.claimPhone}</p>
						{/if}
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">24/7 Emergency</label>
						{#if isEditing}
							<Input bind:value={editData.emergencyPhone} />
						{:else}
							<p class="font-mono bg-red-50 p-2 rounded border border-red-200 text-red-700 font-bold">{insuranceData.emergencyPhone}</p>
						{/if}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<div class="grid lg:grid-cols-2 gap-8">
		<!-- Claims Procedures -->
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<AlertTriangle class="h-5 w-5 mr-2 text-red-500" />
					Claims Procedures
				</CardTitle>
				<CardDescription>Step-by-step guide for different claim types</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each claimTypes as claim}
						<div class="border rounded-lg p-4">
							<h4 class="font-semibold text-gray-800 mb-2 flex items-center">
								<FileText class="h-4 w-4 mr-2 text-blue-500" />
								{claim.type}
							</h4>
							<p class="text-sm text-gray-700">{claim.action}</p>
						</div>
					{/each}
				</div>
				<div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
					<h4 class="font-semibold text-red-800 mb-2">Emergency Claims Contact</h4>
					<p class="text-sm text-red-700 mb-2">For urgent claims requiring immediate assistance:</p>
					<p class="font-mono text-lg text-red-800 font-bold">{insuranceData.emergencyPhone}</p>
				</div>
			</CardContent>
		</Card>

		<!-- Renewal Checklist -->
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy flex items-center">
					<Calendar class="h-5 w-5 mr-2 text-green-500" />
					Renewal Checklist
				</CardTitle>
				<CardDescription>Tasks to complete before policy renewal</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-3">
					{#each renewalChecklist as item}
						<div class="flex items-center space-x-3">
							<input type="checkbox" class="rounded border-gray-300" />
							<span class="text-sm text-gray-700">{item}</span>
						</div>
					{/each}
				</div>
				<div class="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
					<h4 class="font-semibold text-amber-800 mb-2">Renewal Reminder</h4>
					<p class="text-sm text-amber-700">Policy expires on {insuranceData.expiryDate}</p>
					<p class="text-sm text-amber-700">Start renewal process at least 30 days before expiry</p>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Important Documents -->
	<Card class="mt-8">
		<CardHeader>
			<CardTitle class="text-nautical-navy">Important Documents</CardTitle>
			<CardDescription>Key insurance documents and certificates</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid md:grid-cols-3 gap-6">
				<div>
					<h4 class="font-semibold text-gray-800 mb-3">Policy Documents</h4>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Current policy certificate</li>
						<li>• Policy schedule & terms</li>
						<li>• Previous year's documents</li>
						<li>• Renewal notices</li>
					</ul>
				</div>
				<div>
					<h4 class="font-semibold text-gray-800 mb-3">Property Information</h4>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Property valuation report</li>
						<li>• Contents inventory list</li>
						<li>• Recent photos of property</li>
						<li>• Security system certificates</li>
					</ul>
				</div>
				<div>
					<h4 class="font-semibold text-gray-800 mb-3">Claims History</h4>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Previous claims (if any)</li>
						<li>• Receipts for major items</li>
						<li>• Maintenance records</li>
						<li>• Professional inspections</li>
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
</div>