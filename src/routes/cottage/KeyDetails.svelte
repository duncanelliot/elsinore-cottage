<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Home, Bed, Car, MapPin } from '@lucide/svelte';
</script>

<!-- Key Details -->
<div class="mb-12 grid gap-6 lg:grid-cols-4">
	<Card class="border border-gray-200 text-center">
		<CardHeader>
			<Bed class="mx-auto mb-2 h-8 w-8 text-teal-600" />
			<CardTitle class="text-slate-800">2 Bedrooms</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-gray-600">Comfortable sleeping for up to 4 guests</p>
		</CardContent>
	</Card>

	<Card class="border border-gray-200 text-center">
		<CardHeader>
			<Home class="mx-auto mb-2 h-8 w-8 text-teal-600" />
			<CardTitle class="text-slate-800">Victorian Cottage</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-gray-600">1,400 sq ft of period charm</p>
		</CardContent>
	</Card>

	<Card class="border border-gray-200 text-center">
		<CardHeader>
			<Car class="mx-auto mb-2 h-8 w-8 text-cyan-600" />
			<CardTitle class="text-slate-800">Private Parking</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-gray-600">Dedicated parking space included</p>
		</CardContent>
	</Card>

	<Card class="border border-gray-200 text-center">
		<CardHeader>
			<MapPin class="mx-auto mb-2 h-8 w-8 text-sky-600" />
			<CardTitle class="text-slate-800">Prime Location</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-gray-600">Heart of Bembridge village</p>
		</CardContent>
	</Card>
</div>
