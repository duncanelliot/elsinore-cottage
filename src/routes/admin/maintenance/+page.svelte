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
	import { 
		Wrench, 
		Calendar,
		Phone,
		Clock,
		CheckCircle,
		AlertTriangle,
		User,
		Home,
		Zap,
		Droplets,
		Flame,
		Wifi
	} from '@lucide/svelte';

	const contractors = [
		{
			name: 'Bob\'s Plumbing Services',
			trade: 'Plumber',
			phone: '01983 400999',
			emergency: true,
			rating: 5,
			notes: 'Reliable, knows the property well'
		},
		{
			name: 'Isle Electric Solutions',
			trade: 'Electrician',
			phone: '01983 401000',
			emergency: true,
			rating: 5,
			notes: 'Certified, available weekends'
		},
		{
			name: 'Boiler Care IoW',
			trade: 'Boiler Engineer',
			phone: '01983 402000',
			emergency: false,
			rating: 4,
			notes: 'Annual service contract'
		},
		{
			name: 'Garden Perfect',
			trade: 'Gardener',
			phone: '01983 403000',
			emergency: false,
			rating: 4,
			notes: 'Monthly garden maintenance'
		},
		{
			name: 'CleanSweep IoW',
			trade: 'Cleaner',
			phone: '07123 456789',
			emergency: false,
			rating: 5,
			notes: 'Between-guest cleaning service'
		},
		{
			name: 'Handyman Harry',
			trade: 'General Maintenance',
			phone: '07987 654321',
			emergency: false,
			rating: 4,
			notes: 'Minor repairs and odd jobs'
		}
	];

	const maintenanceSchedule = [
		{
			task: 'Boiler Annual Service',
			frequency: 'Yearly',
			lastDone: '2024-01-15',
			nextDue: '2025-01-15',
			contractor: 'Boiler Care IoW',
			priority: 'high',
			status: 'scheduled'
		},
		{
			task: 'WiFi Speed Test',
			frequency: 'Monthly',
			lastDone: '2024-01-10',
			nextDue: '2024-02-10',
			contractor: 'Self',
			priority: 'medium',
			status: 'due'
		},
		{
			task: 'Garden Maintenance',
			frequency: 'Monthly',
			lastDone: '2024-01-05',
			nextDue: '2024-02-05',
			contractor: 'Garden Perfect',
			priority: 'low',
			status: 'overdue'
		},
		{
			task: 'Deep Clean',
			frequency: 'Quarterly',
			lastDone: '2023-12-20',
			nextDue: '2024-03-20',
			contractor: 'CleanSweep IoW',
			priority: 'medium',
			status: 'upcoming'
		},
		{
			task: 'Fire Alarm Test',
			frequency: 'Monthly',
			lastDone: '2024-01-08',
			nextDue: '2024-02-08',
			contractor: 'Self',
			priority: 'high',
			status: 'due'
		}
	];

	const emergencyProcedures = [
		{
			issue: 'Water Leak',
			icon: Droplets,
			steps: [
				'Turn off water at mains (under kitchen sink)',
				'Switch off electricity if water near electrics',
				'Call Bob\'s Plumbing: 01983 400999',
				'Document damage with photos',
				'Contact insurance if significant damage'
			]
		},
		{
			issue: 'Power Cut',
			icon: Zap,
			steps: [
				'Check if neighbors affected (area outage)',
				'Check main fuse box in utility cupboard',
				'Reset any tripped switches',
				'Call Isle Electric: 01983 401000 if issues persist',
				'Call Southern Electric: 0845 770 1900 for outages'
			]
		},
		{
			issue: 'Gas Leak',
			icon: Flame,
			steps: [
				'Do NOT use electrical switches or naked flames',
				'Open doors and windows',
				'Turn off gas at meter (outside front door)',
				'Call Gas Emergency: 0800 111 999 immediately',
				'Evacuate property if smell is strong'
			]
		},
		{
			issue: 'Heating Failure',
			icon: Home,
			steps: [
				'Check thermostat setting and batteries',
				'Check boiler pilot light (utility cupboard)',
				'Press boiler reset button if needed',
				'Call Boiler Care IoW: 01983 402000',
				'Provide temporary heating if safe to do so'
			]
		}
	];

	function getStatusColor(status: string) {
		switch(status) {
			case 'completed': return 'bg-green-100 text-green-800';
			case 'scheduled': return 'bg-blue-100 text-blue-800';
			case 'due': return 'bg-yellow-100 text-yellow-800';
			case 'overdue': return 'bg-red-100 text-red-800';
			case 'upcoming': return 'bg-gray-100 text-gray-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}

	function getPriorityColor(priority: string) {
		switch(priority) {
			case 'high': return 'text-red-600';
			case 'medium': return 'text-yellow-600';
			case 'low': return 'text-green-600';
			default: return 'text-gray-600';
		}
	}
</script>

<svelte:head>
	<title>Maintenance Management - Admin</title>
</svelte:head>

<div class="container mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-nautical-navy mb-2">Maintenance Management</h1>
		<p class="text-gray-600">Property maintenance schedules and contractor contacts</p>
	</div>

	<!-- Maintenance Schedule -->
	<Card class="mb-8">
		<CardHeader>
			<CardTitle class="text-nautical-navy flex items-center">
				<Calendar class="h-5 w-5 mr-2" />
				Maintenance Schedule
			</CardTitle>
			<CardDescription>Upcoming and recurring maintenance tasks</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				{#each maintenanceSchedule as task}
					<div class="flex items-center justify-between p-4 border rounded-lg">
						<div class="flex items-center space-x-4">
							<div class="w-3 h-3 rounded-full {task.status === 'overdue' ? 'bg-red-500' : task.status === 'due' ? 'bg-yellow-500' : 'bg-green-500'}"></div>
							<div>
								<h4 class="font-semibold text-gray-800">{task.task}</h4>
								<p class="text-sm text-gray-600">
									{task.frequency} • Last: {task.lastDone} • Next: {task.nextDue}
								</p>
								<p class="text-sm text-gray-500">Contractor: {task.contractor}</p>
							</div>
						</div>
						<div class="flex items-center space-x-3">
							<Badge variant="outline" class={getPriorityColor(task.priority)}>
								{task.priority}
							</Badge>
							<Badge class={getStatusColor(task.status)}>
								{task.status}
							</Badge>
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>

	<!-- Contractor Directory -->
	<Card class="mb-8">
		<CardHeader>
			<CardTitle class="text-nautical-navy flex items-center">
				<User class="h-5 w-5 mr-2" />
				Contractor Directory
			</CardTitle>
			<CardDescription>Trusted contractors and service providers</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid md:grid-cols-2 gap-6">
				{#each contractors as contractor}
					<div class="border rounded-lg p-4">
						<div class="flex items-center justify-between mb-3">
							<div>
								<h4 class="font-semibold text-gray-800">{contractor.name}</h4>
								<p class="text-sm text-gray-600">{contractor.trade}</p>
							</div>
							<div class="flex items-center space-x-2">
								{#if contractor.emergency}
									<Badge variant="destructive" class="text-xs">24/7</Badge>
								{/if}
								<div class="flex items-center">
									{#each Array(contractor.rating) as _}
										<div class="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
									{/each}
								</div>
							</div>
						</div>
						<div class="space-y-2">
							<div class="flex items-center space-x-2">
								<Phone class="h-4 w-4 text-gray-500" />
								<span class="font-mono text-sm">{contractor.phone}</span>
							</div>
							<p class="text-sm text-gray-700">{contractor.notes}</p>
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>

	<!-- Emergency Procedures -->
	<Card class="mb-8">
		<CardHeader>
			<CardTitle class="text-nautical-navy flex items-center">
				<AlertTriangle class="h-5 w-5 mr-2 text-red-500" />
				Emergency Procedures
			</CardTitle>
			<CardDescription>Step-by-step guides for common emergencies</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid md:grid-cols-2 gap-6">
				{#each emergencyProcedures as procedure}
					<div class="border rounded-lg p-4">
						<h4 class="font-semibold text-gray-800 mb-3 flex items-center">
							<svelte:component this={procedure.icon} class="h-5 w-5 mr-2 text-red-500" />
							{procedure.issue}
						</h4>
						<ol class="space-y-2">
							{#each procedure.steps as step, index}
								<li class="flex items-start space-x-3">
									<span class="flex-shrink-0 w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-medium">
										{index + 1}
									</span>
									<span class="text-sm text-gray-700">{step}</span>
								</li>
							{/each}
						</ol>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>

	<!-- Quick Reference -->
	<div class="grid lg:grid-cols-2 gap-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy">System Locations</CardTitle>
				<CardDescription>Key system and utility locations</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div class="flex items-center space-x-3 p-3 border rounded">
						<Zap class="h-5 w-5 text-blue-500" />
						<div>
							<p class="font-medium">Main Fuse Box</p>
							<p class="text-sm text-gray-600">Utility cupboard, ground floor</p>
						</div>
					</div>
					<div class="flex items-center space-x-3 p-3 border rounded">
						<Droplets class="h-5 w-5 text-cyan-500" />
						<div>
							<p class="font-medium">Water Stopcock</p>
							<p class="text-sm text-gray-600">Under kitchen sink, turn clockwise to close</p>
						</div>
					</div>
					<div class="flex items-center space-x-3 p-3 border rounded">
						<Flame class="h-5 w-5 text-orange-500" />
						<div>
							<p class="font-medium">Gas Meter</p>
							<p class="text-sm text-gray-600">Outside front door, right side</p>
						</div>
					</div>
					<div class="flex items-center space-x-3 p-3 border rounded">
						<Home class="h-5 w-5 text-purple-500" />
						<div>
							<p class="font-medium">Boiler</p>
							<p class="text-sm text-gray-600">Utility cupboard, ground floor</p>
						</div>
					</div>
					<div class="flex items-center space-x-3 p-3 border rounded">
						<Wifi class="h-5 w-5 text-green-500" />
						<div>
							<p class="font-medium">WiFi Router</p>
							<p class="text-sm text-gray-600">Hallway, shelf by stairs</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle class="text-nautical-navy">Maintenance Tips</CardTitle>
				<CardDescription>Regular maintenance best practices</CardDescription>
			</CardHeader>
			<CardContent>
				<ul class="space-y-3">
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Test smoke alarms monthly</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Check for leaks under sinks regularly</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Keep gutters clear of debris</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Service boiler annually</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Update contractor contact details</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Keep maintenance records up to date</span>
					</li>
					<li class="flex items-start space-x-3">
						<CheckCircle class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span class="text-sm text-gray-700">Address minor issues before they become major</span>
					</li>
				</ul>
			</CardContent>
		</Card>
	</div>
</div>