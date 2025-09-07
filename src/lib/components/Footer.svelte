<script lang="ts">
	import { MapPin, Phone, Mail, Wifi, Car, Home } from 'lucide-svelte';
	
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-slate-800 text-white">
	<div class="container mx-auto px-4 py-12">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Property Info -->
			<div>
				<h3 class="text-xl font-bold mb-4 text-sky-100">Elsinore</h3>
				<p class="text-slate-300 mb-4 text-sm leading-relaxed">
					Your distinguished Victorian cottage in the heart of Bembridge, combining period character with contemporary luxury.
				</p>
				<div class="flex items-center space-x-2 text-slate-300">
					<MapPin class="h-4 w-4 text-sky-400" />
					<span class="text-sm">Bembridge, Isle of Wight</span>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="text-lg font-semibold mb-4 text-sky-100">Quick Links</h4>
				<ul class="space-y-2">
					<li><a href="/" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">Home</a></li>
					<li><a href="/cottage" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">About the Cottage</a></li>
					<li><a href="/area" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">Local Area</a></li>
					<li><a href="/activities" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">Activities</a></li>
					<li><a href="/booking" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">Book Now</a></li>
					<li><a href="/guide" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">House Guide</a></li>
					<li><a href="/emergency" class="text-slate-300 hover:text-sky-300 transition-colors text-sm">Emergency Info</a></li>
				</ul>
			</div>

			<!-- Property Features -->
			<div>
				<h4 class="text-lg font-semibold mb-4 text-sky-100">Property Features</h4>
				<ul class="space-y-2">
					<li class="flex items-center space-x-2">
						<Home class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">2 Bedrooms</span>
					</li>
					<li class="flex items-center space-x-2">
						<Car class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">Private Parking</span>
					</li>
					<li class="flex items-center space-x-2">
						<Wifi class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">High-Speed WiFi</span>
					</li>
					<li class="flex items-center space-x-2">
						<MapPin class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">Prime Location</span>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h4 class="text-lg font-semibold mb-4 text-sky-100">Contact</h4>
				<div class="space-y-3">
					<div class="flex items-center space-x-2">
						<Phone class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">+44 (0) 1983 000 000</span>
					</div>
					<div class="flex items-center space-x-2">
						<Mail class="h-4 w-4 text-sky-400" />
						<span class="text-slate-300 text-sm">info@elsinore-cottage.co.uk</span>
					</div>
				</div>
				<div class="mt-6">
					<a 
						href="/booking" 
						class="inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
					>
						Book Your Stay
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom Border -->
		<div class="border-t border-slate-700 mt-8 pt-6">
			<div class="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs space-y-2 md:space-y-0">
				<p>&copy; {currentYear} Elsinore Cottage. All rights reserved.</p>
				<p>Your castle by the sea in beautiful Bembridge</p>
				<p>
					Made with love in 🇩🇪 by 
					<a 
						href="https://uferro.net" 
						target="_blank" 
						rel="noopener noreferrer"
						class="text-sky-400 hover:text-sky-300 transition-colors font-medium"
					>
						Ferro
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>