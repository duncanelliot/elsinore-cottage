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
		Activity, 
		Waves, 
		Sailboat,
		Mountain,
		Camera,
		TreePine,
		Castle,
		Users,
		Clock,
		MapPin,
		Sun,
		Bike
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Things to Do - Activities & Attractions</title>
	<meta
		name="description"
		content="Discover amazing activities and attractions near your Bembridge cottage. Beaches, sailing, hiking, historic sites and family fun on the Isle of Wight."
	/>
</svelte:head>

<!-- Header -->
<div class="relative py-16 text-white">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img src="/elsinore-2.jpg" alt="Comfortable interior at Elsinore" class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-green-700/80"></div>
	</div>
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<Activity class="h-10 w-10" />
				<div>
					<h1 class="text-4xl font-bold mb-2">Things to Do</h1>
					<p class="text-xl text-white/90">Adventures await on the Isle of Wight</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<!-- Beach Activities -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Beach & Water Activities</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card class="border-blue-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Waves class="h-8 w-8 text-blue-600 mb-2" />
						<CardTitle class="text-blue-700">Beach Days</CardTitle>
						<CardDescription>Perfect sandy beaches for all the family</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-gray-700">
							<li>• <strong>Bembridge Beach:</strong> Safe swimming, rock pools</li>
							<li>• <strong>Sandown Beach:</strong> Golden sand, pier attractions</li>
							<li>• <strong>Shanklin Beach:</strong> Victorian charm, cliff lift</li>
							<li>• <strong>Ventnor Beach:</strong> Sheltered cove, microclimate</li>
						</ul>
					</CardContent>
				</Card>

				<Card class="border-blue-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Sailboat class="h-8 w-8 text-blue-600 mb-2" />
						<CardTitle class="text-blue-700">Sailing & Boating</CardTitle>
						<CardDescription>Experience the Solent waters</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-gray-700">
							<li>• <strong>Bembridge Sailing Club:</strong> Lessons & rentals</li>
							<li>• <strong>Cowes Week:</strong> August sailing festival</li>
							<li>• <strong>Solent Cruises:</strong> Day trips & sunset tours</li>
							<li>• <strong>Kayak Hire:</strong> Explore the coastline</li>
						</ul>
					</CardContent>
				</Card>

				<Card class="border-blue-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Activity class="h-8 w-8 text-blue-600 mb-2" />
						<CardTitle class="text-blue-700">Water Sports</CardTitle>
						<CardDescription>Active adventures on the water</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-gray-700">
							<li>• <strong>Paddleboarding:</strong> SUP hire & lessons</li>
							<li>• <strong>Windsurfing:</strong> Perfect Solent conditions</li>
							<li>• <strong>Sea Fishing:</strong> Charter boats available</li>
							<li>• <strong>Diving:</strong> Explore underwater wrecks</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Outdoor Adventures -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Outdoor Adventures</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-green-200">
					<CardHeader>
						<Mountain class="h-8 w-8 text-green-600 mb-2" />
						<CardTitle class="text-green-700">Walking & Hiking</CardTitle>
						<CardDescription>Discover stunning coastal paths and countryside</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Coastal Path Highlights</h4>
								<ul class="space-y-1 text-sm text-gray-700">
									<li>• <strong>Culver Down:</strong> Spectacular cliff views (2 miles)</li>
									<li>• <strong>Tennyson Down:</strong> Rolling chalk downs (3 miles)</li>
									<li>• <strong>The Needles:</strong> Iconic chalk stacks (4 miles)</li>
									<li>• <strong>Freshwater Bay:</strong> Dramatic cliffs (2.5 miles)</li>
								</ul>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Family-Friendly Walks</h4>
								<ul class="space-y-1 text-sm text-gray-700">
									<li>• <strong>Bembridge Trail:</strong> Village to beach (1 mile)</li>
									<li>• <strong>Brading Marshes:</strong> Nature reserve (2 miles)</li>
									<li>• <strong>Arreton Valley:</strong> Countryside views (1.5 miles)</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="border-green-200">
					<CardHeader>
						<Bike class="h-8 w-8 text-green-600 mb-2" />
						<CardTitle class="text-green-700">Cycling</CardTitle>
						<CardDescription>Explore the island on two wheels</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-4">
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Cycle Routes</h4>
								<ul class="space-y-1 text-sm text-gray-700">
									<li>• <strong>Red Squirrel Trail:</strong> 32-mile island circuit</li>
									<li>• <strong>Round the Island:</strong> 62-mile challenge</li>
									<li>• <strong>Family Trails:</strong> Shorter scenic routes</li>
									<li>• <strong>Off-road Tracks:</strong> Forest and downs</li>
								</ul>
							</div>
							<div>
								<h4 class="font-semibold text-gray-800 mb-2">Bike Hire</h4>
								<ul class="space-y-1 text-sm text-gray-700">
									<li>• <strong>Bembridge Cycle Hire:</strong> 01983 875202</li>
									<li>• <strong>Electric bikes available</strong></li>
									<li>• <strong>Child seats & trailers</strong></li>
									<li>• <strong>Delivery to cottage available</strong></li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Historic Attractions -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Historic Attractions</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Castle class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">Carisbrooke Castle</CardTitle>
						<Badge variant="secondary" class="mb-2">20 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							Medieval castle where Charles I was imprisoned. Explore the Great Hall, 
							chapel, and famous donkeys working the wellhouse.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Daily 10:00-17:00 • Adult £13.50
						</div>
					</CardContent>
				</Card>

				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Camera class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">Osborne House</CardTitle>
						<Badge variant="secondary" class="mb-2">25 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							Queen Victoria's beloved holiday home. Stunning Italianate palace 
							with beautiful gardens and private beach.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Daily 10:00-17:00 • Adult £19.50
						</div>
					</CardContent>
				</Card>

				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Mountain class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">Brading Roman Villa</CardTitle>
						<Badge variant="secondary" class="mb-2">15 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							Finest Roman mosaics in the UK. Well-preserved villa with 
							audio guide and interactive displays.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Daily 10:00-17:00 • Adult £9.50
						</div>
					</CardContent>
				</Card>

				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Sailboat class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">The Needles</CardTitle>
						<Badge variant="secondary" class="mb-2">35 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							Iconic chalk stacks with chairlift, lighthouse, and battery. 
							Spectacular views and historic rocket testing site.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Chairlift: Daily 10:00-16:00
						</div>
					</CardContent>
				</Card>

				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<Activity class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">Blackgang Chine</CardTitle>
						<Badge variant="secondary" class="mb-2">30 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							UK's oldest amusement park with themed lands, rides, and 
							spectacular cliff-top setting.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Seasonal hours • From £16
						</div>
					</CardContent>
				</Card>

				<Card class="border-amber-200 hover:shadow-lg transition-shadow">
					<CardHeader>
						<TreePine class="h-8 w-8 text-amber-600 mb-2" />
						<CardTitle class="text-amber-700">Amazon World Zoo</CardTitle>
						<Badge variant="secondary" class="mb-2">15 min drive</Badge>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 text-sm mb-3">
							Exotic animals from South America. Great for families with 
							talks, feeding times, and indoor rainforest.
						</p>
						<div class="flex items-center text-xs text-gray-600">
							<Clock class="h-3 w-3 mr-1" />
							Daily 10:00-17:00 • Adult £14.95
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Family Activities -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Family Fun</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-purple-200">
					<CardHeader>
						<Users class="h-8 w-8 text-purple-600 mb-2" />
						<CardTitle class="text-purple-700">Theme Parks & Fun</CardTitle>
					</CardHeader>
					<CardContent>
						<ul class="space-y-3 text-sm">
							<li>
								<div class="font-semibold text-gray-800">Robin Hill Country Park</div>
								<div class="text-gray-600">Adventure park with treetop trail and birds of prey (20 mins)</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Dinosaur Isle Museum</div>
								<div class="text-gray-600">Fossil displays and dinosaur discoveries in Sandown (15 mins)</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Isle of Wight Steam Railway</div>
								<div class="text-gray-600">Heritage railway through beautiful countryside (20 mins)</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Godshill Model Village</div>
								<div class="text-gray-600">Miniature village in picturesque Godshill (25 mins)</div>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card class="border-purple-200">
					<CardHeader>
						<Sun class="h-8 w-8 text-purple-600 mb-2" />
						<CardTitle class="text-purple-700">Indoor Activities</CardTitle>
					</CardHeader>
					<CardContent>
						<ul class="space-y-3 text-sm">
							<li>
								<div class="font-semibold text-gray-800">Bowling & Cinema</div>
								<div class="text-gray-600">Ten-pin bowling and latest films in Sandown & Ryde</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Swimming Pools</div>
								<div class="text-gray-600">Public pools in Sandown, Ryde, and Newport</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Adventure Golf</div>
								<div class="text-gray-600">Mini golf courses across the island</div>
							</li>
							<li>
								<div class="font-semibold text-gray-800">Escape Rooms</div>
								<div class="text-gray-600">Puzzle solving adventures in Newport</div>
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Seasonal Events -->
		<div class="bg-white rounded-lg p-8">
			<h2 class="text-2xl font-bold text-nautical-navy mb-6 text-center">Seasonal Events & Festivals</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div>
					<h3 class="font-semibold text-green-700 mb-3">Spring (Mar-May)</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Cowes Classics Week</li>
						<li>• Isle of Wight Walking Festival</li>
						<li>• Ventnor Fringe Festival</li>
						<li>• Spring flower shows</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-amber-700 mb-3">Summer (Jun-Aug)</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Isle of Wight Festival</li>
						<li>• Cowes Week (sailing)</li>
						<li>• Garlic Festival</li>
						<li>• Beach festivals</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-orange-700 mb-3">Autumn (Sep-Nov)</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Bestival (music festival)</li>
						<li>• Harvest festivals</li>
						<li>• Literary festival</li>
						<li>• Halloween events</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-blue-700 mb-3">Winter (Dec-Feb)</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Christmas markets</li>
						<li>• Winter wonderlands</li>
						<li>• New Year fireworks</li>
						<li>• Indoor attractions</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Call to Action - Return to Elsinore -->
<div class="py-16 bg-nautical-navy text-white">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<div class="grid md:grid-cols-2 gap-8 items-center">
				<div class="rounded-lg overflow-hidden">
					<img src="/elsinore-4.jpg" alt="Relax at Elsinore after your adventures" class="w-full h-64 object-cover" />
				</div>
				<div>
					<h2 class="text-3xl font-bold mb-4">Return to Your Castle</h2>
					<p class="text-xl text-white/90 mb-6">
						After a day of island adventures, return to the comfort and tranquility of Elsinore. 
						Your royal retreat awaits with everything you need to relax and recharge.
					</p>
					<div class="flex gap-4">
						<Button size="lg" class="bg-white text-nautical-navy hover:bg-gray-100" href="/cottage">
							View Cottage
						</Button>
						<Button size="lg" variant="ghost" class="border border-white text-white hover:bg-white/20" href="/booking">
							Book Your Stay
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>