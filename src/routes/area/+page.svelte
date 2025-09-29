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
		MapPin, 
		Waves, 
		Sailboat,
		UtensilsCrossed,
		TreePine,
		Camera,
		Clock,
		Star
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Discover Bembridge - Local Area Guide</title>
	<meta
		name="description"
		content="Explore beautiful Bembridge and the Isle of Wight. Discover beaches, sailing, dining, and attractions near your holiday cottage."
	/>
</svelte:head>

<!-- Header -->
<div class="bg-gradient-to-r from-nautical-teal to-nautical-blue text-white py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<MapPin class="h-10 w-10" />
				<div>
					<h1 class="text-4xl font-bold mb-2">Discover Bembridge</h1>
					<p class="text-xl text-white/90">Your gateway to Isle of Wight adventures</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<!-- Your Base: Elsinore -->
		<div class="mb-16">
			<div class="bg-white rounded-lg p-8 max-w-4xl mx-auto">
				<div class="grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h2 class="text-2xl font-bold text-nautical-navy mb-4">Your Perfect Base: Elsinore</h2>
						<p class="text-gray-600 mb-4">
							From your charming cottage in the heart of Bembridge, you're perfectly positioned to explore 
							everything this beautiful corner of the Isle of Wight has to offer.
						</p>
						<p class="text-gray-600 mb-6">
							Step out your door and you're minutes from sandy beaches, the bustling harbor, 
							and some of the island's best coastal walks and sailing opportunities.
						</p>
						<Button href="/cottage" class="bg-nautical-navy text-white hover:bg-nautical-blue">
							View Your Cottage
						</Button>
					</div>
					<div class="rounded-lg overflow-hidden">
						<img src="/elsinore-1.jpg" alt="Elsinore cottage - your perfect base" class="w-full h-64 object-cover" />
					</div>
				</div>
			</div>
		</div>

		<!-- Beaches & Coast -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Beaches & Coastline</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-nautical-navy">Bembridge Beach</CardTitle>
							<Badge variant="secondary">2 min walk</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-4">
							Sandy beach perfect for families, with shallow waters ideal for children. 
							Great for swimming, beach games, and watching the sunset.
						</p>
						<div class="flex items-center text-sm text-gray-600">
							<Clock class="h-4 w-4 mr-1" />
							Best visited: Low tide for rock pooling
						</div>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-nautical-navy">Whitecliff Bay</CardTitle>
							<Badge variant="secondary">10 min drive</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-4">
							Stunning chalk cliffs and fossil hunting opportunities. Beautiful coastal walks 
							with spectacular views across the Solent.
						</p>
						<div class="flex items-center text-sm text-gray-600">
							<Camera class="h-4 w-4 mr-1" />
							Don't miss: Fossil hunting at low tide
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Sailing & Water Activities -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Sailing & Water Sports</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Sailboat class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Bembridge Sailing Club</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">Premier sailing club offering lessons and boat hire</p>
						<p class="text-sm text-gray-600">📞 01983 872237</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Waves class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Kayak Hire</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">Explore the coastline by kayak - equipment and guides available</p>
						<p class="text-sm text-gray-600">Island Adventure Activities</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<Sailboat class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Bembridge Harbour</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">Working harbour with boat trips and fishing charters</p>
						<p class="text-sm text-gray-600">Daily boat trips available</p>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Dining -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Dining & Pubs</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-nautical-navy">The Crab & Lobster Inn</CardTitle>
							<div class="flex items-center">
								<Star class="h-4 w-4 text-yellow-500 fill-current" />
								<Star class="h-4 w-4 text-yellow-500 fill-current" />
								<Star class="h-4 w-4 text-yellow-500 fill-current" />
								<Star class="h-4 w-4 text-yellow-500 fill-current" />
								<Star class="h-4 w-4 text-yellow-500 fill-current" />
							</div>
						</div>
						<CardDescription>3 min walk • Seafood restaurant</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Award-winning seafood restaurant with stunning harbor views. 
							Famous for fresh crab, lobster, and locally caught fish.
						</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-nautical-navy">The Pilot Boat Inn</CardTitle>
							<Badge variant="outline">Traditional Pub</Badge>
						</div>
						<CardDescription>5 min walk • Pub & restaurant</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Cozy traditional pub with excellent pub food, local ales, 
							and a warm atmosphere. Dog-friendly with garden seating.
						</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<CardTitle class="text-nautical-navy">Bembridge Coast Café</CardTitle>
						<CardDescription>2 min walk • Casual dining</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Perfect for breakfast, lunch, and coffee. Great fish & chips, 
							homemade cakes, and child-friendly options.
						</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<CardTitle class="text-nautical-navy">The Spinnaker</CardTitle>
						<CardDescription>4 min walk • Modern British</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Contemporary restaurant with seasonal menus featuring 
							local produce and modern British cuisine.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Attractions -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Local Attractions</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<CardTitle class="text-nautical-navy">Bembridge Windmill</CardTitle>
						<CardDescription>8 min walk</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Last surviving windmill on the Isle of Wight. Climb to the top 
							for panoramic views across the island.
						</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<CardTitle class="text-nautical-navy">Brading Roman Villa</CardTitle>
						<CardDescription>15 min drive</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Remarkably preserved Roman villa with stunning mosaics. 
							Audio guide and museum on site.
						</p>
					</CardContent>
				</Card>

				<Card class="border-nautical-teal/20">
					<CardHeader>
						<CardTitle class="text-nautical-navy">Culver Down</CardTitle>
						<CardDescription>12 min drive</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700">
							Dramatic chalk cliffs with fantastic walks and views. 
							Great for picnics and wildlife spotting.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Practical Info -->
		<div class="bg-white rounded-lg p-8">
			<h2 class="text-2xl font-bold text-nautical-navy mb-6 text-center">Practical Information</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold text-nautical-navy mb-4">Essential Services</h3>
					<ul class="space-y-2 text-gray-700">
						<li>• <strong>Tesco Express:</strong> 3 min walk - groceries & essentials</li>
						<li>• <strong>Post Office:</strong> 5 min walk - banking & postal services</li>
						<li>• <strong>Pharmacy:</strong> 4 min walk - Bembridge Pharmacy</li>
						<li>• <strong>Medical Centre:</strong> 6 min walk - Bembridge Medical Centre</li>
					</ul>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-nautical-navy mb-4">Getting Around</h3>
					<ul class="space-y-2 text-gray-700">
						<li>• <strong>Bus Service:</strong> Regular buses to Newport & Ryde</li>
						<li>• <strong>Taxi:</strong> IOW Radio Taxis - 01983 400400</li>
						<li>• <strong>Car Hire:</strong> Available in Newport (20 min drive)</li>
						<li>• <strong>Cycle Hire:</strong> Bembridge Cycle Hire - 01983 875202</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>