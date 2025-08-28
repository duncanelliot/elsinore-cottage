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
		Bed, 
		Users, 
		Car, 
		Wifi, 
		Coffee, 
		Bath, 
		Tv, 
		Wind,
		Sun,
		MapPin,
		Check
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>About Elsinore - Your Castle by the Sea, Bembridge</title>
	<meta
		name="description"
		content="Discover Elsinore, your beautifully appointed holiday cottage in Bembridge. Modern amenities, coastal charm, and everything you need for the perfect royal retreat."
	/>
</svelte:head>

<!-- Header Section -->
<div class="bg-gradient-to-r from-blue-900 to-blue-800 text-white pt-32 pb-16 -mt-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<Home class="h-10 w-10" />
				<div>
					<h1 class="text-4xl font-bold mb-2">About Elsinore</h1>
					<p class="text-xl text-white/90">Your royal retreat with comfort and coastal charm</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content -->
<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<!-- Image Gallery -->
		<div class="mb-12 max-w-6xl mx-auto">
			<h2 class="text-3xl font-bold text-nautical-navy mb-6 text-center">Gallery</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div class="md:col-span-2 lg:col-span-2 md:row-span-2">
					<img src="/elsinore-1.jpg" alt="Elsinore cottage exterior" class="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
				</div>
				<div>
					<img src="/elsinore-2.jpg" alt="Living room" class="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
				</div>
				<div>
					<img src="/elsinore-3.jpg" alt="Kitchen area" class="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
				</div>
				<div>
					<img src="/elsinore-4.jpg" alt="Bedroom" class="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
				</div>
				<div>
					<img src="/elsinore-5.jpg" alt="Garden view" class="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
				</div>
			</div>
		</div>

		<!-- Key Details -->
		<div class="grid lg:grid-cols-4 gap-6 mb-12">
			<Card class="text-center border-nautical-teal/20">
				<CardHeader>
					<Bed class="h-8 w-8 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">2 Bedrooms</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600">Comfortable sleeping for up to 4 guests</p>
				</CardContent>
			</Card>

			<Card class="text-center border-nautical-teal/20">
				<CardHeader>
					<Home class="h-8 w-8 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Victorian Cottage</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600">1,400 sq ft of period charm</p>
				</CardContent>
			</Card>

			<Card class="text-center border-nautical-teal/20">
				<CardHeader>
					<Car class="h-8 w-8 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Private Parking</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600">Dedicated parking space included</p>
				</CardContent>
			</Card>

			<Card class="text-center border-nautical-teal/20">
				<CardHeader>
					<MapPin class="h-8 w-8 text-nautical-teal mx-auto mb-2" />
					<CardTitle class="text-nautical-navy">Prime Location</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-gray-600">Heart of Bembridge village</p>
				</CardContent>
			</Card>
		</div>

		<!-- Detailed Description -->
		<div class="grid lg:grid-cols-2 gap-12 mb-12">
			<div>
				<h2 class="text-3xl font-bold text-nautical-navy mb-6">Your Castle by the Sea</h2>
				<div class="prose prose-lg text-gray-700">
					<p class="mb-4">
						Welcome to Elsinore, your distinguished Victorian cottage in the heart of Bembridge. This beautifully restored 
						red brick terraced house combines period character with contemporary luxury, offering approximately 1,400 square feet 
						of elegant living space across two floors.
					</p>
					<p class="mb-4">
						The heart of Elsinore is its stunning open-plan ground floor, featuring soaring ceilings, original period details, 
						and a magnificent fireplace in the living area. The modern fitted kitchen boasts sleek black granite worktops, 
						integrated appliances, and French doors opening to your private garden - perfect for al fresco dining.
					</p>
					<p>
						Throughout the cottage, large bay windows flood the space with natural light, while the warm wooden floors 
						and sophisticated décor create an atmosphere of refined coastal living. Every detail has been carefully considered 
						to provide the perfect blend of Victorian charm and modern comfort.
					</p>
				</div>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-nautical-navy mb-6">Amenities & Features</h3>
				<div class="space-y-4">
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Victorian period features & high ceilings</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Open-plan living with original fireplace</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Modern kitchen with granite worktops</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>French doors to private garden</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Beautiful bay windows throughout</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Wooden flooring & contemporary décor</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>High-speed WiFi & modern amenities</span>
					</div>
					<div class="flex items-center space-x-3">
						<Check class="h-5 w-5 text-green-600 flex-shrink-0" />
						<span>Welcome pack with local treats</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Room Details -->
		<div class="bg-white rounded-lg p-8 mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Room by Room</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<!-- Living Area -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center space-x-3">
							<Home class="h-6 w-6 text-nautical-teal" />
							<CardTitle class="text-nautical-navy">Living Area</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-gray-700">
							<li>• Comfortable sofa seating for 4</li>
							<li>• 43" Smart TV with Netflix, Prime Video</li>
							<li>• Coffee table with local guidebooks</li>
							<li>• Large windows with garden views</li>
							<li>• Coastal-themed décor and artwork</li>
						</ul>
					</CardContent>
				</Card>

				<!-- Kitchen -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center space-x-3">
							<Coffee class="h-6 w-6 text-nautical-teal" />
							<CardTitle class="text-nautical-navy">Kitchen</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-gray-700">
							<li>• Full-size refrigerator with freezer</li>
							<li>• Electric oven and 4-hob cooktop</li>
							<li>• Microwave and toaster</li>
							<li>• Dishwasher for easy cleanup</li>
							<li>• Complete cookware and tableware</li>
						</ul>
					</CardContent>
				</Card>

				<!-- Master Bedroom -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center space-x-3">
							<Bed class="h-6 w-6 text-nautical-teal" />
							<CardTitle class="text-nautical-navy">Master Bedroom</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-gray-700">
							<li>• King-size bed with premium linens</li>
							<li>• Built-in wardrobes with hangers</li>
							<li>• Bedside tables with reading lights</li>
							<li>• Blackout curtains for restful sleep</li>
							<li>• Sea-themed décor and comfortable chair</li>
						</ul>
					</CardContent>
				</Card>

				<!-- Second Bedroom -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center space-x-3">
							<Bed class="h-6 w-6 text-nautical-teal" />
							<CardTitle class="text-nautical-navy">Second Bedroom</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-gray-700">
							<li>• Twin beds (can be joined as super king)</li>
							<li>• Built-in storage and hanging space</li>
							<li>• Desk area perfect for remote work</li>
							<li>• Garden views and plenty of natural light</li>
							<li>• High-quality mattresses and bedding</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Check-in Information -->
		<div class="bg-nautical-navy text-white rounded-lg p-8 text-center">
			<h2 class="text-2xl font-bold mb-4">Ready for Your Royal Arrival</h2>
			<p class="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
				Elsinore will be prepared with fresh linens, towels, and a welcome pack featuring local treats. 
				We'll provide all check-in details and house information before your arrival at your castle by the sea.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<Button size="lg" class="bg-white text-nautical-navy hover:bg-white/90" href="/guide">
					<Home class="h-5 w-5 mr-2" />
					House Guide
				</Button>
				<Button size="lg" variant="ghost" class="border border-white text-white hover:bg-white/20" href="/area">
					<MapPin class="h-5 w-5 mr-2" />
					Explore Bembridge
				</Button>
			</div>
		</div>
	</div>
</div>