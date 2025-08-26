<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Anchor, Calendar, Home, MapPin } from '@lucide/svelte';
</script>

<div class="hero-section relative flex min-h-screen items-center">
	<div class="absolute inset-0">
		<img src="/elsinore-1.jpg" alt="Elsinore cottage" class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
	</div>
	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-6 flex items-center justify-center space-x-3">
				<Anchor class="h-12 w-12 text-white" />
			</div>
			<h1 class="mb-4 text-5xl font-bold text-white">Welcome to Elsinore</h1>
			<p class="mb-8 text-xl text-white/90">Your castle by the sea in beautiful Bembridge</p>

			<div class="mx-auto mb-8 max-w-3xl">
				<p class="text-lg leading-relaxed text-white/95">
					Discover the charm of the Isle of Wight from Elsinore, your distinguished cottage in the
					heart of Bembridge. With stunning coastal views, modern amenities, and the regal
					atmosphere of your castle by the sea, your perfect royal retreat awaits.
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-4">
				<Button size="lg" class="text-nautical-navy bg-white hover:bg-white/90" href="/booking">
					<Calendar class="mr-2 h-5 w-5" />
					Book Your Stay
				</Button>
				<Button
					size="lg"
					variant="ghost"
					class="border border-white text-white hover:bg-white/20"
					href="/cottage"
				>
					<Home class="mr-2 h-5 w-5" />
					Explore the Cottage
				</Button>
				<Button
					size="lg"
					variant="ghost"
					class="border border-white text-white hover:bg-white/20"
					href="/area"
				>
					<MapPin class="mr-2 h-5 w-5" />
					Discover Bembridge
				</Button>
			</div>
		</div>
	</div>

	<div class="absolute right-0 bottom-0 left-0">
		<svg class="h-16 w-full text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
		</svg>
	</div>
</div>
