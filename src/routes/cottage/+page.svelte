<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import {
		Home,
		Bed,
		Coffee,
		MapPin,
		Check
	} from '@lucide/svelte';
	import RoomGallery from './RoomGallery.svelte';
	import KeyDetails from './KeyDetails.svelte';
</script>

<svelte:head>
	<title>About Elsinore - Your Castle by the Sea, Bembridge</title>
	<meta
		name="description"
		content="Discover Elsinore, your beautifully appointed holiday cottage in Bembridge. Modern amenities, coastal charm, and everything you need for the perfect royal retreat."
	/>
</svelte:head>

<!-- Header Section -->
<div class="relative -mt-16 bg-gradient-to-b from-slate-800 to-slate-900 pt-32 pb-24 text-white overflow-hidden">
	<div
		class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/20"
	></div>
	<!-- Nautical Doodle Pattern -->
	<div class="absolute inset-0 opacity-[0.08]">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="nautical" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
					<!-- Small anchor -->
					<path d="M30 30 v10 m-5 0 h10 m-5 0 v15 c-6 0 -9 -3 -9 -6 m9 6 c6 0 9 -3 9 -6 m-9 -15 a3 3 0 1 0 0 -6 a3 3 0 0 0 0 6" 
						stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Wave lines -->
					<path d="M60 40 Q70 35 80 40 T100 40" stroke="white" stroke-width="0.8" fill="none"/>
					<path d="M65 45 Q75 40 85 45 T105 45" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Small fish -->
					<path d="M140 30 c10 0 15 5 15 10 s-5 10 -15 10 m0 -20 l-8 10 l8 10" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Starfish -->
					<path d="M170 80 l3 10 l3 -10 m-3 2 l-8 4 m8 -4 l8 4 m-8 -4 l-5 -8 m5 8 l5 -8" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Shell -->
					<path d="M30 120 c0 -10 8 -18 18 -18 s18 8 18 18 m-36 0 l18 -18 l18 18 m-30 -3 l12 -12 l12 12 m-18 -6 l6 -6 l6 6" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Small waves -->
					<path d="M100 140 Q110 135 120 140 T140 140" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Sailboat -->
					<path d="M150 170 l0 -25 l15 20 z m0 -25 l-10 20 z m-10 20 h25" stroke="white" stroke-width="0.8" fill="none"/>
					<!-- Seagull -->
					<path d="M80 170 Q85 165 90 170 M95 175 Q100 170 105 175" stroke="white" stroke-width="0.8" fill="none"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#nautical)" />
		</svg>
	</div>
	<div class="relative container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<div class="space-y-6">
				<div>
					<h1 class="mb-4 text-6xl font-light tracking-tight">About Elsinore</h1>
					<div class="mb-4 h-px w-24 bg-amber-400 mx-auto"></div>
					<p class="text-xl font-light tracking-wide text-gray-300">
						Your royal retreat with comfort and coastal charm
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content -->
<div class="bg-slate-50 py-16">
	<div class="container mx-auto px-4">
		<!-- Detailed Description -->
		<div class="mb-16">
			<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
				<div>
					<div class="mb-8">
						<span class="inline-block px-4 py-1 text-sm font-medium text-sky-800 bg-sky-100 rounded-full mb-4">Premium Victorian Cottage</span>
						<h2 class="text-4xl font-bold leading-tight bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">Your Castle by the Sea</h2>
					</div>
					<div class="space-y-6 text-gray-600 leading-relaxed">
						<p class="text-lg">
							Welcome to <span class="font-semibold text-blue-700">Elsinore</span>, your distinguished Victorian cottage in the heart of Bembridge.
							This beautifully restored red brick terraced house combines period character with
							contemporary luxury, offering approximately <span class="font-semibold text-slate-700 bg-blue-50 px-2 py-0.5 rounded">1,400 square feet</span> of elegant living space
							across two floors.
						</p>
						<div class="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/30 rounded-r-lg">
							<p>
								The heart of Elsinore is its stunning open-plan ground floor, featuring soaring
								ceilings, original period details, and a magnificent fireplace in the living area. The
								modern fitted kitchen boasts sleek black granite worktops, integrated appliances, and
								French doors opening to your private garden - perfect for al fresco dining.
							</p>
						</div>
						<p>
							Throughout the cottage, large bay windows flood the space with natural light, while the
							warm wooden floors and sophisticated décor create an atmosphere of refined coastal
							living. Every detail has been carefully considered to provide the perfect blend of
							Victorian charm and modern comfort.
						</p>
					</div>
				</div>

				<div class="lg:flex lg:flex-col">
					<h3 class="text-2xl font-bold mb-6 text-slate-800">Amenities & Features</h3>
					<div class="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-200 flex-grow">
						<div class="grid gap-3">
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Victorian period features & high ceilings</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Open-plan living with original fireplace</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Modern kitchen with granite worktops</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">French doors to private garden</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Beautiful bay windows throughout</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Wooden flooring & contemporary décor</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">High-speed WiFi & modern amenities</span>
							</div>
							<div class="flex items-start space-x-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all">
								<div class="h-6 w-6 rounded-full bg-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
									<Check class="h-4 w-4 text-white" />
								</div>
								<span class="text-gray-700">Welcome pack with local treats</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Key Details -->
		<KeyDetails />

		<!-- Image Gallery -->
		<RoomGallery />

		<!-- Room Details -->
		<div class="mb-12 rounded-lg bg-white p-8">
			<h2 class="text-nautical-navy mb-8 text-center text-3xl font-bold">Room by Room</h2>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Living Area -->
				<Card class="border-nautical-teal/20">
					<CardHeader>
						<div class="flex items-center space-x-3">
							<Home class="text-nautical-teal h-6 w-6" />
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
							<Coffee class="text-nautical-teal h-6 w-6" />
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
							<Bed class="text-nautical-teal h-6 w-6" />
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
							<Bed class="text-nautical-teal h-6 w-6" />
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
		<div class="bg-gradient-to-br from-sky-50 to-blue-100 rounded-lg p-8 text-center border border-sky-200">
			<h2 class="mb-4 text-2xl font-bold text-slate-800">Ready for Your Royal Arrival</h2>
			<p class="mx-auto mb-6 max-w-2xl text-lg text-slate-700">
				Elsinore will be prepared with fresh linens, towels, and a welcome pack featuring local
				treats. We'll provide all check-in details and house information before your arrival at your
				castle by the sea.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<Button size="lg" class="bg-sky-600 hover:bg-sky-700 text-white" href="/guide">
					<Home class="mr-2 h-5 w-5" />
					House Guide
				</Button>
				<Button
					size="lg"
					variant="outline"
					class="border-sky-600 text-sky-700 hover:bg-sky-600 hover:text-white"
					href="/area"
				>
					<MapPin class="mr-2 h-5 w-5" />
					Explore Bembridge
				</Button>
			</div>
		</div>
	</div>
</div>
