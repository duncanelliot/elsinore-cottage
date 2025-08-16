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
		Tv, 
		Coffee, 
		WashingMachine,
		Thermometer,
		Key,
		Clock,
		Phone,
		AlertTriangle,
		CheckCircle
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>House Guide - Essential Information</title>
	<meta
		name="description"
		content="Everything you need to know about your cottage - WiFi, appliances, check-in procedures, and house instructions."
	/>
</svelte:head>

<!-- Header -->
<div class="bg-gradient-to-r from-nautical-navy to-nautical-blue text-white py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<Home class="h-10 w-10" />
				<div>
					<h1 class="text-4xl font-bold mb-2">House Guide</h1>
					<p class="text-xl text-white/90">Everything you need for a comfortable stay</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<!-- Quick Access Info -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
			<Card class="bg-nautical-teal text-white">
				<CardHeader>
					<Wifi class="h-8 w-8 mb-2" />
					<CardTitle>WiFi Details</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm mb-1">Network: <strong>Seaside_Guest</strong></p>
					<p class="text-sm">Password: <strong>Bembridge2024!</strong></p>
				</CardContent>
			</Card>

			<Card class="bg-green-600 text-white">
				<CardHeader>
					<Key class="h-8 w-8 mb-2" />
					<CardTitle>Check-in</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm mb-1">From: <strong>3:00 PM</strong></p>
					<p class="text-sm">Key safe code: <strong>1234</strong></p>
				</CardContent>
			</Card>

			<Card class="bg-red-600 text-white">
				<CardHeader>
					<Clock class="h-8 w-8 mb-2" />
					<CardTitle>Check-out</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm mb-1">By: <strong>10:00 AM</strong></p>
					<p class="text-sm">Leave keys in property</p>
				</CardContent>
			</Card>

			<Card class="bg-amber-600 text-white">
				<CardHeader>
					<Phone class="h-8 w-8 mb-2" />
					<CardTitle>Emergency</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm mb-1">Host: <strong>07123 456789</strong></p>
					<p class="text-sm">Emergency: <strong>999</strong></p>
				</CardContent>
			</Card>
		</div>

		<!-- Appliance Instructions -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Appliance Guide</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<!-- Kitchen Appliances -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Coffee class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Kitchen Appliances</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Oven & Hob</h4>
								<p class="text-gray-700 text-sm">Electric oven with 4-ring ceramic hob. Main oven switch is on the wall behind the cooker. Use 180°C for most baking.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Dishwasher</h4>
								<p class="text-gray-700 text-sm">Bosch integrated dishwasher. Eco cycle recommended. Tablets are under the sink. Run when full.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Coffee Machine</h4>
								<p class="text-gray-700 text-sm">Nespresso machine with complimentary pods. Descale light will show red when needed - instructions in drawer.</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<!-- Entertainment & Heating -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Tv class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Entertainment & Heating</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Smart TV</h4>
								<p class="text-gray-700 text-sm">43" Samsung with Netflix, Prime Video, BBC iPlayer. Remote on coffee table. Press 'Home' to access apps.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Central Heating</h4>
								<p class="text-gray-700 text-sm">Programmable thermostat in hallway. Set to 20°C for comfort. Boost button for immediate heating.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Hot Water</h4>
								<p class="text-gray-700 text-sm">Combi boiler provides instant hot water. If no hot water, check pilot light (instructions in utility cupboard).</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<!-- Laundry -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<WashingMachine class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Laundry</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Washing Machine</h4>
								<p class="text-gray-700 text-sm">Hotpoint washing machine in utility room. Use 40°C for most loads. Detergent provided in cupboard above.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Tumble Dryer</h4>
								<p class="text-gray-700 text-sm">Condenser dryer - empty water drawer after each use. Clean lint filter (pull out tray at bottom).</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Drying Rack</h4>
								<p class="text-gray-700 text-sm">Clothes horse in utility cupboard. Garden washing line available - pegs in kitchen drawer.</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<!-- Utilities & Maintenance -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Thermometer class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Utilities & Safety</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Electricity</h4>
								<p class="text-gray-700 text-sm">Fuse box in utility cupboard. Trip switches are clearly labeled. Main switch at top.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Water</h4>
								<p class="text-gray-700 text-sm">Stopcock under kitchen sink (clockwise to turn off). Water meter is outside front door.</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Smoke Alarms</h4>
								<p class="text-gray-700 text-sm">Tested monthly. If chirping, replace 9V battery (spares in kitchen drawer). Never remove batteries.</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- House Rules -->
		<div class="bg-white rounded-lg p-8 mb-12">
			<h2 class="text-2xl font-bold text-nautical-navy mb-6 text-center">House Rules & Guidelines</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold text-green-700 mb-4 flex items-center">
						<CheckCircle class="h-5 w-5 mr-2" />
						Please Do
					</h3>
					<ul class="space-y-2 text-gray-700">
						<li>• Keep doors and windows locked when out</li>
						<li>• Take shoes off on light carpets</li>
						<li>• Use coasters for drinks on wooden surfaces</li>
						<li>• Separate recycling (bins in utility room)</li>
						<li>• Report any issues immediately</li>
						<li>• Enjoy the garden and outdoor furniture</li>
						<li>• Feel free to use all provided amenities</li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-lg font-semibold text-red-700 mb-4 flex items-center">
						<AlertTriangle class="h-5 w-5 mr-2" />
						Please Don't
					</h3>
					<ul class="space-y-2 text-gray-700">
						<li>• Smoke anywhere in the property</li>
						<li>• Have parties or excessive noise after 10 PM</li>
						<li>• Use candles or open flames</li>
						<li>• Move furniture without permission</li>
						<li>• Leave windows open when out</li>
						<li>• Put anything unusual down drains</li>
						<li>• Exceed maximum occupancy (4 guests)</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Troubleshooting -->
		<div class="bg-red-50 border border-red-200 rounded-lg p-8">
			<h2 class="text-2xl font-bold text-red-800 mb-6 text-center">Quick Troubleshooting</h2>
			
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<h3 class="font-semibold text-red-700 mb-3">No WiFi Connection</h3>
					<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">
						<li>Check router lights (should be solid green)</li>
						<li>Unplug router for 30 seconds, then plug back in</li>
						<li>Wait 2-3 minutes for full restart</li>
						<li>Contact host if still no connection</li>
					</ol>
				</div>
				
				<div>
					<h3 class="font-semibold text-red-700 mb-3">No Hot Water</h3>
					<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">
						<li>Check boiler pilot light (utility cupboard)</li>
						<li>Press reset button if light is out</li>
						<li>Wait 10 minutes for water to heat</li>
						<li>Contact host if problem persists</li>
					</ol>
				</div>
				
				<div>
					<h3 class="font-semibold text-red-700 mb-3">Power Cut/Trip</h3>
					<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">
						<li>Check main switch in fuse box</li>
						<li>Reset any tripped switches (flip up)</li>
						<li>Unplug appliances before resetting</li>
						<li>Call host if problem continues</li>
					</ol>
				</div>
				
				<div>
					<h3 class="font-semibold text-red-700 mb-3">Blocked Drain</h3>
					<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">
						<li>Try hot water and washing up liquid</li>
						<li>Use plunger if available</li>
						<li>Never use chemical drain cleaners</li>
						<li>Contact host immediately if severe</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>