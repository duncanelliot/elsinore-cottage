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
		Home, 
		Wifi, 
		Zap, 
		Droplets,
		Flame,
		Shield,
		Wrench,
		Calendar,
		AlertTriangle,
		CheckCircle,
		Clock
	} from '@lucide/svelte';

	// Mock data - in real app this would come from a database
	const systemStatus = {
		wifi: { status: 'online', lastChecked: '2 hours ago' },
		electricity: { status: 'normal', lastReading: 'Yesterday' },
		water: { status: 'normal', lastReading: '3 days ago' },
		gas: { status: 'normal', lastReading: '1 week ago' },
		heating: { status: 'online', temperature: '20°C' }
	};

	const upcomingTasks = [
		{ task: 'Boiler service', date: 'Next week', priority: 'high' },
		{ task: 'WiFi speed test', date: 'Tomorrow', priority: 'medium' },
		{ task: 'Insurance renewal', date: 'Next month', priority: 'high' },
		{ task: 'Garden maintenance', date: 'This weekend', priority: 'low' }
	];

	const recentGuests = [
		{ name: 'Smith Family', checkout: '2 days ago', rating: 5 },
		{ name: 'Johnson Couple', checkout: '1 week ago', rating: 5 },
		{ name: 'Wilson Group', checkout: '2 weeks ago', rating: 4 }
	];
</script>

<svelte:head>
	<title>Admin Dashboard - Elsinore Property Management</title>
</svelte:head>

<div class="container mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-nautical-navy mb-2">Elsinore Property Dashboard</h1>
		<p class="text-gray-600">Manage your castle by the sea</p>
	</div>

	<!-- Quick Stats -->
	<div class="grid lg:grid-cols-5 gap-6 mb-8">
		<Card class={systemStatus.wifi.status === 'online' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
			<CardHeader class="pb-3">
				<div class="flex items-center justify-between">
					<Wifi class={`h-6 w-6 ${systemStatus.wifi.status === 'online' ? 'text-green-600' : 'text-red-600'}`} />
					<Badge variant={systemStatus.wifi.status === 'online' ? 'default' : 'destructive'}>
						{systemStatus.wifi.status}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p class="font-semibold text-gray-800">WiFi</p>
				<p class="text-sm text-gray-600">Last checked: {systemStatus.wifi.lastChecked}</p>
			</CardContent>
		</Card>

		<Card class="border-blue-200 bg-blue-50">
			<CardHeader class="pb-3">
				<div class="flex items-center justify-between">
					<Zap class="h-6 w-6 text-blue-600" />
					<Badge variant="default">Normal</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p class="font-semibold text-gray-800">Electricity</p>
				<p class="text-sm text-gray-600">Reading: {systemStatus.electricity.lastReading}</p>
			</CardContent>
		</Card>

		<Card class="border-cyan-200 bg-cyan-50">
			<CardHeader class="pb-3">
				<div class="flex items-center justify-between">
					<Droplets class="h-6 w-6 text-cyan-600" />
					<Badge variant="default">Normal</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p class="font-semibold text-gray-800">Water</p>
				<p class="text-sm text-gray-600">Reading: {systemStatus.water.lastReading}</p>
			</CardContent>
		</Card>

		<Card class="border-orange-200 bg-orange-50">
			<CardHeader class="pb-3">
				<div class="flex items-center justify-between">
					<Flame class="h-6 w-6 text-orange-600" />
					<Badge variant="default">Normal</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p class="font-semibold text-gray-800">Gas</p>
				<p class="text-sm text-gray-600">Reading: {systemStatus.gas.lastReading}</p>
			</CardContent>
		</Card>

		<Card class="border-purple-200 bg-purple-50">
			<CardHeader class="pb-3">
				<div class="flex items-center justify-between">
					<Home class="h-6 w-6 text-purple-600" />
					<Badge variant="default">20°C</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p class="font-semibold text-gray-800">Heating</p>
				<p class="text-sm text-gray-600">Status: Online</p>
			</CardContent>
		</Card>
	</div>

	<div class="grid lg:grid-cols-3 gap-8">
		<!-- Quick Actions -->
		<Card class="lg:col-span-1">
			<CardHeader>
				<CardTitle class="text-nautical-navy">Quick Actions</CardTitle>
				<CardDescription>Common management tasks</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-3">
					<Button class="w-full justify-start" variant="outline" href="/admin/bookings">
						<Calendar class="h-4 w-4 mr-2" />
						Manage Bookings
					</Button>
					<Button class="w-full justify-start" variant="outline" href="/admin/connectivity">
						<Wifi class="h-4 w-4 mr-2" />
						Check WiFi Status
					</Button>
					<Button class="w-full justify-start" variant="outline" href="/admin/utilities">
						<Zap class="h-4 w-4 mr-2" />
						View Meter Readings
					</Button>
					<Button class="w-full justify-start" variant="outline" href="/admin/insurance">
						<Shield class="h-4 w-4 mr-2" />
						Insurance Details
					</Button>
					<Button class="w-full justify-start" variant="outline" href="/admin/maintenance">
						<Wrench class="h-4 w-4 mr-2" />
						Maintenance Schedule
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Upcoming Tasks -->
		<Card class="lg:col-span-1">
			<CardHeader>
				<CardTitle class="text-nautical-navy">Upcoming Tasks</CardTitle>
				<CardDescription>Scheduled maintenance and reminders</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each upcomingTasks as task}
						<div class="flex items-center justify-between p-3 rounded-lg border">
							<div class="flex items-center space-x-3">
								{#if task.priority === 'high'}
									<AlertTriangle class="h-4 w-4 text-red-500" />
								{:else if task.priority === 'medium'}
									<Clock class="h-4 w-4 text-yellow-500" />
								{:else}
									<CheckCircle class="h-4 w-4 text-green-500" />
								{/if}
								<div>
									<p class="font-medium text-gray-800">{task.task}</p>
									<p class="text-sm text-gray-600">{task.date}</p>
								</div>
							</div>
							<Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
								{task.priority}
							</Badge>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>

		<!-- Recent Activity -->
		<Card class="lg:col-span-1">
			<CardHeader>
				<CardTitle class="text-nautical-navy">Recent Guests</CardTitle>
				<CardDescription>Latest bookings and feedback</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each recentGuests as guest}
						<div class="flex items-center justify-between p-3 rounded-lg border">
							<div>
								<p class="font-medium text-gray-800">{guest.name}</p>
								<p class="text-sm text-gray-600">Checked out {guest.checkout}</p>
							</div>
							<div class="flex items-center space-x-1">
								{#each Array(guest.rating) as _}
									<div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Contact Information -->
	<div class="mt-8">
		<Card class="border-nautical-teal/20">
			<CardHeader>
				<CardTitle class="text-nautical-navy">Emergency Contacts</CardTitle>
				<CardDescription>Important numbers for property management</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid md:grid-cols-3 gap-6">
					<div>
						<h4 class="font-semibold text-gray-800 mb-2">Utilities</h4>
						<ul class="space-y-1 text-sm text-gray-700">
							<li>• <strong>Electric:</strong> 0845 770 1900</li>
							<li>• <strong>Water:</strong> 0330 303 0277</li>
							<li>• <strong>Gas:</strong> 0800 111 999</li>
						</ul>
					</div>
					<div>
						<h4 class="font-semibold text-gray-800 mb-2">Maintenance</h4>
						<ul class="space-y-1 text-sm text-gray-700">
							<li>• <strong>Plumber:</strong> 01983 400999</li>
							<li>• <strong>Electrician:</strong> 01983 401000</li>
							<li>• <strong>Boiler Service:</strong> 01983 402000</li>
						</ul>
					</div>
					<div>
						<h4 class="font-semibold text-gray-800 mb-2">Other</h4>
						<ul class="space-y-1 text-sm text-gray-700">
							<li>• <strong>Insurance:</strong> 0800 123 4567</li>
							<li>• <strong>Internet:</strong> 0800 800 151</li>
							<li>• <strong>Cleaner:</strong> 07123 456789</li>
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</div>