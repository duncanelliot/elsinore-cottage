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
		Anchor, 
		Waves, 
		Home, 
		MapPin, 
		Phone, 
		Activity, 
		Wifi, 
		Car,
		Coffee,
		Bath,
		Calendar
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Welcome to Elsinore - Your Castle by the Sea, Bembridge</title>
	<meta
		name="description"
		content="Elsinore - Your royal retreat in Bembridge, Isle of Wight. Experience coastal charm with modern amenities in this distinguished holiday cottage."
	/>
</svelte:head>

<!-- Hero Section -->
<div class="relative min-h-[70vh] flex items-center hero-section">
	<!-- Hero Background Image -->
	<div class="absolute inset-0">
		<img src="/elsinore-1.jpg" alt="Elsinore cottage" class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
	</div>
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<Anchor class="h-12 w-12 text-white" />
				<div>
					<h1 class="text-5xl font-bold text-white mb-2">Welcome to Elsinore</h1>
					<p class="text-xl text-white/90">Your castle by the sea in beautiful Bembridge</p>
				</div>
			</div>
			
			<div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
				<p class="text-lg text-white/95 leading-relaxed">
					Discover the charm of the Isle of Wight from Elsinore, your distinguished cottage in the heart of Bembridge. 
					With stunning coastal views, modern amenities, and the regal atmosphere of your castle by the sea, 
					your perfect royal retreat awaits.
				</p>
			</div>

			<div class="flex flex-wrap gap-4">
				<Button size="lg" class="bg-white text-nautical-navy hover:bg-white/90" href="/booking">
					<Calendar class="h-5 w-5 mr-2" />
					Book Your Stay
				</Button>
				<Button size="lg" variant="ghost" class="border border-white text-white hover:bg-white/20" href="/cottage">
					<Home class="h-5 w-5 mr-2" />
					Explore the Cottage
				</Button>
				<Button size="lg" variant="ghost" class="border border-white text-white hover:bg-white/20" href="/area">
					<MapPin class="h-5 w-5 mr-2" />
					Discover Bembridge
				</Button>
			</div>
		</div>
	</div>
	
	<!-- Decorative waves -->
	<div class="absolute bottom-0 left-0 right-0">
		<svg class="w-full h-16 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
		</svg>
	</div>
</div>

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
				<div class="overflow-hidden rounded-lg shadow-lg">
					<img src="/elsinore-2.jpg" alt="Spacious living room" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
				</div>
				<h3 class="text-xl font-semibold text-nautical-navy mt-4">Comfortable Living Space</h3>
				<p class="text-gray-600 mt-2">Relax in style with modern amenities and coastal charm</p>
			</div>
			
			<div class="group cursor-pointer">
				<div class="overflow-hidden rounded-lg shadow-lg">
					<img src="/elsinore-3.jpg" alt="Modern kitchen" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
				</div>
				<h3 class="text-xl font-semibold text-nautical-navy mt-4">Fully Equipped Kitchen</h3>
				<p class="text-gray-600 mt-2">Everything you need to prepare delicious meals</p>
			</div>
			
			<div class="group cursor-pointer">
				<div class="overflow-hidden rounded-lg shadow-lg">
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
			<Card class="border-nautical-teal/20 hover:shadow-lg transition-shadow card-transition">
				<CardHeader class="text-center">
					<Wifi class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">High-Speed WiFi</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Stay connected with complimentary high-speed internet throughout the cottage.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 hover:shadow-lg transition-shadow card-transition">
				<CardHeader class="text-center">
					<Car class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Private Parking</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Dedicated parking space right outside your cottage door.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 hover:shadow-lg transition-shadow card-transition">
				<CardHeader class="text-center">
					<Coffee class="h-10 w-10 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Fully Equipped Kitchen</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600 text-center">Everything you need to prepare meals, from morning coffee to evening dinner.</p>
				</CardContent>
			</Card>

			<Card class="border-nautical-teal/20 hover:shadow-lg transition-shadow card-transition">
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

<!-- Contact Footer -->
<div class="bg-nautical-navy text-white py-12">
	<div class="container mx-auto px-4 text-center">
		<div class="flex items-center justify-center space-x-3 mb-6">
			<Waves class="h-8 w-8" />
			<h3 class="text-2xl font-bold">Enjoy Your Stay</h3>
			<Waves class="h-8 w-8" />
		</div>
		<p class="text-white/80 max-w-2xl mx-auto">
			If you have any questions during your stay, don't hesitate to reach out. 
			We want to ensure your time in Bembridge is absolutely perfect.
		</p>
	</div>
</div>
