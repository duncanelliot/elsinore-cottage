<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	interface ImageData {
		url: string;
		description?: string | null;
		isPrimary: boolean;
	}

	let {
		images,
		alt,
		className = ""
	}: {
		images: ImageData[];
		alt: string;
		className?: string;
	} = $props();

	let currentIndex = $state(0);
	let imageLoaded = $state(false);
	let imageError = $state(false);

	// Reset index when images change
	$effect(() => {
		if (images.length > 0) {
			currentIndex = 0;
			imageLoaded = false;
			imageError = false;
		}
	});

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
		imageLoaded = false;
		imageError = false;
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		imageLoaded = false;
		imageError = false;
	}

	function goToImage(index: number) {
		currentIndex = index;
		imageLoaded = false;
		imageError = false;
	}

	const currentImage = $derived(images[currentIndex]);
	const hasMultipleImages = $derived(images.length > 1);
</script>

<div class="relative w-full h-full {className}" role="img" aria-label={alt}>
	{#if currentImage && !imageError}
		<img
			src={currentImage.url}
			{alt}
			class="w-full h-full object-cover transition-opacity duration-300"
			class:opacity-0={!imageLoaded}
			class:opacity-100={imageLoaded}
			onload={() => imageLoaded = true}
			onerror={() => imageError = true}
		/>
	{:else}
		<!-- Placeholder when no image or error -->
		<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
			<div class="text-center">
				<svg class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<p class="text-xs text-gray-500 font-medium">{alt}</p>
			</div>
		</div>
	{/if}

	{#if hasMultipleImages}
		<!-- Navigation Arrows -->
		<button
			class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors duration-200 opacity-0 group-hover:opacity-100"
			onclick={prevImage}
			aria-label="Previous image"
		>
			<ChevronLeft class="h-4 w-4" />
		</button>

		<button
			class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors duration-200 opacity-0 group-hover:opacity-100"
			onclick={nextImage}
			aria-label="Next image"
		>
			<ChevronRight class="h-4 w-4" />
		</button>

		<!-- Image Indicators -->
		<div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
			{#each images as _, index}
				<button
					class="w-2 h-2 rounded-full transition-colors duration-200 {index === currentIndex ? 'bg-white' : 'bg-white/50'}"
					onclick={() => goToImage(index)}
					aria-label="Go to image {index + 1}"
				></button>
			{/each}
		</div>

		<!-- Image Counter -->
		<div class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
			{currentIndex + 1} / {images.length}
		</div>
	{/if}
</div>

<style>
	/* Ensure hover states work on the parent container */
	:global(.group:hover .opacity-0) {
		opacity: 1;
	}
</style>