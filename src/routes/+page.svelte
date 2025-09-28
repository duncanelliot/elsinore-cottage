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
	import Hero from '$lib/components/Hero.svelte';
	import { 
		Waves, 
		Home, 
		Phone, 
		Activity, 
		Wifi, 
		Car,
		Coffee,
		Bath
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Welcome to Elsinore - Your Castle by the Sea, Bembridge</title>
	<meta
		name="description"
		content="Elsinore - Your royal retreat in Bembridge, Isle of Wight. Experience coastal charm with modern amenities in this distinguished holiday cottage."
	/>
</svelte:head>

<Hero />

<!-- Featured Images Section -->
<div class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-4">Discover Elsinore</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Step inside your castle by the sea - a perfect blend of comfort and coastal elegance.
			</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
			<div class="group cursor-pointer">
				<div class="overflow-hidden rounded-lg">
					<img src="/elsinore-2.jpg" alt="Spacious living room" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
				</div>
				<h3 class="text-xl font-semibold text-nautical-navy mt-4">Comfortable Living Space</h3>
				<p class="text-gray-600 mt-2">Relax in style with modern amenities and coastal charm</p>
			</div>
			
			<div class="group cursor-pointer">
				<div class="overflow-hidden rounded-lg">
					<img src="/elsinore-3.jpg" alt="Modern kitchen" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
				</div>
				<h3 class="text-xl font-semibold text-nautical-navy mt-4">Fully Equipped Kitchen</h3>
				<p class="text-gray-600 mt-2">Everything you need to prepare delicious meals</p>
			</div>
			
			<div class="group cursor-pointer">
				<div class="overflow-hidden rounded-lg">
					<img src="/elsinore-4.jpg" alt="Comfortable bedroom" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
				</div>
				<h3 class="text-xl font-semibold text-nautical-navy mt-4">Peaceful Bedrooms</h3>
				<p class="text-gray-600 mt-2">Wake up refreshed and ready for island adventures</p>
			</div>
		</div>

		<div class="text-center">
			<Button size="lg" class="bg-nautical-navy text-white hover:bg-nautical-blue" href="/cottage">
				View Full Gallery
			</Button>
		</div>
	</div>
</div>

<!-- Quick Info Cards -->
<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-4">Everything You Need for the Perfect Stay</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Your cottage is fully equipped with modern amenities while maintaining its charming coastal character.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			<Card class="border-nautical-teal/20 card-transition">
				<CardHeader class="text-center">
					<Wifi class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">High-Speed WiFi</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Stay connected with complimentary high-speed internet throughout the cottage.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 card-transition">
				<CardHeader class="text-center">
					<Car class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Private Parking</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Dedicated parking space right outside your cottage door.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 card-transition">
				<CardHeader class="text-center">
					<Coffee class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Fully Equipped Kitchen</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Everything you need to prepare meals, from morning coffee to evening dinner.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 card-transition">
				<CardHeader class="text-center">
					<Bath class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Modern Bathroom</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Spacious bathroom with shower, fresh towels, and essential toiletries.</p>
				</CardContent>
			</Card>
		</div>
	</div>
</div>

<!-- Quick Links Section -->
<div class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-4">Important Information</h2>
			<p class="text-lg text-gray-600">Quick access to everything you need during your stay</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
			<a href="/guide" class="block">
				<Card class="border-2 border-nautical-navy/10 hover:border-nautical-teal/50 transition-colors cursor-pointer">
					<CardHeader class="text-center">
						<Home class="h-12 w-12 text-nautical-navy mx-auto mb-3" />
						<CardTitle class="text-nautical-navy">House Guide</CardTitle>
						<CardDescription>WiFi passwords, appliances, and house instructions</CardDescription>
					</CardHeader>
				</Card>
			</a>

			<a href="/emergency" class="block">
				<Card class="border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer">
					<CardHeader class="text-center">
						<Phone class="h-12 w-12 text-red-600 mx-auto mb-3" />
						<CardTitle class="text-red-700">Emergency Info</CardTitle>
						<CardDescription>Important contacts and emergency procedures</CardDescription>
					</CardHeader>
				</Card>
			</a>

			<a href="/activities" class="block">
				<Card class="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer">
					<CardHeader class="text-center">
						<Activity class="h-12 w-12 text-green-600 mx-auto mb-3" />
						<CardTitle class="text-green-700">Local Activities</CardTitle>
						<CardDescription>Beaches, sailing, dining, and attractions nearby</CardDescription>
					</CardHeader>
				</Card>
			</a>
		</div>
	</div>
</div>
