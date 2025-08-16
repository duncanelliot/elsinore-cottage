<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { 
		Phone, 
		AlertTriangle, 
		Hospital, 
		Car,
		Flame,
		Shield,
		MapPin,
		Clock
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Emergency Information - Important Contacts</title>
	<meta
		name="description"
		content="Important emergency contacts and procedures for your stay in Bembridge, Isle of Wight."
	/>
</svelte:head>

<!-- Header -->
<div class="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl">
			<div class="flex items-center space-x-3 mb-6">
				<Phone class="h-10 w-10" />
				<div>
					<h1 class="text-4xl font-bold mb-2">Emergency Information</h1>
					<p class="text-xl text-white/90">Important contacts and procedures</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="py-16 bg-slate-50">
	<div class="container mx-auto px-4">
		<!-- Emergency Services -->
		<div class="mb-12">
			<div class="bg-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
				<div class="flex items-center">
					<AlertTriangle class="h-8 w-8 text-red-600 mr-3" />
					<div>
						<h2 class="text-2xl font-bold text-red-800">Emergency Services</h2>
						<p class="text-red-700">For life-threatening emergencies, fire, or serious crime</p>
					</div>
				</div>
				<div class="mt-4">
					<a href="tel:999" class="inline-block">
						<Button size="lg" class="bg-red-600 hover:bg-red-700 text-white text-2xl py-4 px-8">
							<Phone class="h-6 w-6 mr-3" />
							Call 999
						</Button>
					</a>
				</div>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				<Card class="border-red-200">
					<CardHeader>
						<Flame class="h-8 w-8 text-red-600 mb-2" />
						<CardTitle class="text-red-700">Fire & Rescue</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">Isle of Wight Fire Service</p>
						<p class="font-mono text-lg">999</p>
						<p class="text-sm text-gray-600 mt-2">Nearest station: Newport (15 mins)</p>
					</CardContent>
				</Card>

				<Card class="border-blue-200">
					<CardHeader>
						<Shield class="h-8 w-8 text-blue-600 mb-2" />
						<CardTitle class="text-blue-700">Police</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">Hampshire Constabulary</p>
						<p class="font-mono text-lg">999 or 101</p>
						<p class="text-sm text-gray-600 mt-2">Local station: Newport</p>
					</CardContent>
				</Card>

				<Card class="border-green-200">
					<CardHeader>
						<Hospital class="h-8 w-8 text-green-600 mb-2" />
						<CardTitle class="text-green-700">Ambulance</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 mb-2">NHS Emergency Services</p>
						<p class="font-mono text-lg">999</p>
						<p class="text-sm text-gray-600 mt-2">Response time: 10-15 mins</p>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Medical Services -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Medical Services</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-green-200">
					<CardHeader>
						<Hospital class="h-8 w-8 text-green-600 mb-2" />
						<CardTitle class="text-green-700">St Mary's Hospital</CardTitle>
						<CardDescription>Main hospital with A&E</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<p><strong>Address:</strong> Parkhurst Road, Newport PO30 5TG</p>
							<p><strong>Phone:</strong> 01983 524081</p>
							<p><strong>Distance:</strong> 20 minutes drive</p>
							<p><strong>Services:</strong> 24/7 A&E, all departments</p>
						</div>
					</CardContent>
				</Card>

				<Card class="border-blue-200">
					<CardHeader>
						<MapPin class="h-8 w-8 text-blue-600 mb-2" />
						<CardTitle class="text-blue-700">Bembridge Medical Centre</CardTitle>
						<CardDescription>Local GP surgery</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<p><strong>Address:</strong> Church Road, Bembridge PO35 5NA</p>
							<p><strong>Phone:</strong> 01983 872570</p>
							<p><strong>Distance:</strong> 6 minutes walk</p>
							<p><strong>Hours:</strong> Mon-Fri 8:30-18:00</p>
						</div>
					</CardContent>
				</Card>

				<Card class="border-purple-200">
					<CardHeader>
						<Clock class="h-8 w-8 text-purple-600 mb-2" />
						<CardTitle class="text-purple-700">NHS 111</CardTitle>
						<CardDescription>Non-emergency medical advice</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<p><strong>Phone:</strong> 111 (free from any phone)</p>
							<p><strong>Online:</strong> 111.nhs.uk</p>
							<p><strong>Available:</strong> 24/7</p>
							<p><strong>For:</strong> Health advice, pharmacy info, out-of-hours GP</p>
						</div>
					</CardContent>
				</Card>

				<Card class="border-orange-200">
					<CardHeader>
						<MapPin class="h-8 w-8 text-orange-600 mb-2" />
						<CardTitle class="text-orange-700">Bembridge Pharmacy</CardTitle>
						<CardDescription>Local pharmacy services</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<p><strong>Address:</strong> High Street, Bembridge PO35 5SD</p>
							<p><strong>Phone:</strong> 01983 872210</p>
							<p><strong>Distance:</strong> 4 minutes walk</p>
							<p><strong>Hours:</strong> Mon-Fri 9:00-17:30, Sat 9:00-13:00</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Property & Host Contacts -->
		<div class="mb-12">
			<h2 class="text-3xl font-bold text-nautical-navy mb-8 text-center">Property & Host Contacts</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<Card class="border-nautical-teal/20 bg-nautical-teal/5">
					<CardHeader>
						<Phone class="h-8 w-8 text-nautical-teal mb-2" />
						<CardTitle class="text-nautical-navy">Property Host</CardTitle>
						<CardDescription>For property issues and general assistance</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							<div>
								<p class="font-semibold text-gray-800">Sarah Mitchell</p>
								<a href="tel:07123456789" class="text-nautical-teal hover:underline">
									📱 07123 456789
								</a>
							</div>
							<div>
								<p class="font-semibold text-gray-800">Email:</p>
								<a href="mailto:sarah@seasideretreat.co.uk" class="text-nautical-teal hover:underline">
									sarah@seasideretreat.co.uk
								</a>
							</div>
							<div>
								<p class="text-sm text-gray-600">
									<strong>Available:</strong> 8:00 AM - 10:00 PM daily<br>
									<strong>Response time:</strong> Usually within 1 hour
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="border-gray-200">
					<CardHeader>
						<Car class="h-8 w-8 text-gray-600 mb-2" />
						<CardTitle class="text-gray-700">Maintenance & Utilities</CardTitle>
						<CardDescription>For urgent property maintenance</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							<div>
								<p class="font-semibold text-gray-800">Emergency Plumber:</p>
								<a href="tel:01983400999" class="text-blue-600 hover:underline">
									01983 400999
								</a>
							</div>
							<div>
								<p class="font-semibold text-gray-800">Emergency Electrician:</p>
								<a href="tel:01983401000" class="text-blue-600 hover:underline">
									01983 401000
								</a>
							</div>
							<div>
								<p class="font-semibold text-gray-800">Gas Emergency:</p>
								<a href="tel:0800111999" class="text-red-600 hover:underline">
									0800 111 999
								</a>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Useful Local Numbers -->
		<div class="bg-white rounded-lg p-8 mb-12">
			<h2 class="text-2xl font-bold text-nautical-navy mb-6 text-center">Useful Local Numbers</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div>
					<h3 class="font-semibold text-gray-800 mb-3">Transport</h3>
					<ul class="space-y-2 text-sm">
						<li><strong>Island Line Taxis:</strong> 01983 400400</li>
						<li><strong>IOW Radio Taxis:</strong> 01983 400222</li>
						<li><strong>Bus Enquiries:</strong> 01983 827005</li>
						<li><strong>Ferry Booking:</strong> 0330 321 0001</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-gray-800 mb-3">Utilities</h3>
					<ul class="space-y-2 text-sm">
						<li><strong>Southern Water:</strong> 0330 303 0277</li>
						<li><strong>Southern Electric:</strong> 0845 770 1900</li>
						<li><strong>BT/Openreach:</strong> 0800 800 151</li>
						<li><strong>Council (IOW):</strong> 01983 821000</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-gray-800 mb-3">Local Services</h3>
					<ul class="space-y-2 text-sm">
						<li><strong>Bembridge Harbour:</strong> 01983 872828</li>
						<li><strong>Tourist Information:</strong> 01983 813818</li>
						<li><strong>Veterinary (pets):</strong> 01983 872333</li>
						<li><strong>Post Office:</strong> 01983 872626</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Property Safety Information -->
		<div class="bg-amber-50 border border-amber-200 rounded-lg p-8">
			<h2 class="text-2xl font-bold text-amber-800 mb-6 text-center">Property Safety Information</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="font-semibold text-amber-700 mb-3">Fire Safety</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• Smoke alarms on each floor (tested monthly)</li>
						<li>• Fire extinguisher in kitchen</li>
						<li>• Fire blanket in kitchen above hob</li>
						<li>• Main exit: Front door (keys always left inside)</li>
						<li>• Alternative exit: Back door through garden</li>
						<li>• Assembly point: Front garden by car</li>
					</ul>
				</div>
				
				<div>
					<h3 class="font-semibold text-amber-700 mb-3">Utility Locations</h3>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>• <strong>Electricity:</strong> Main fuse box in utility cupboard</li>
						<li>• <strong>Water:</strong> Stopcock under kitchen sink</li>
						<li>• <strong>Gas:</strong> Meter outside front door (left side)</li>
						<li>• <strong>Boiler:</strong> Utility cupboard, ground floor</li>
						<li>• <strong>WiFi Router:</strong> Hallway, on shelf by stairs</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>