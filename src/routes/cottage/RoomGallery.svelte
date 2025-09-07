<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs/index.js";
	import { Dialog, DialogContent, DialogTrigger } from "$lib/components/ui/dialog/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ChevronLeft, ChevronRight, X } from "lucide-svelte";
	import { fade, fly } from "svelte/transition";
	import { browser } from '$app/environment';

	interface Room {
		id: string;
		name: string;
		images: { src: string; alt: string }[];
	}

	const rooms: Room[] = [
		{
			id: "living",
			name: "Living Area",
			images: [
				{ src: "/elsinore-1.jpg", alt: "Living room with comfortable sofa" },
				{ src: "/elsinore-2.jpg", alt: "Living room fireplace" },
				{ src: "/elsinore-3.jpg", alt: "Living room bay window" },
				{ src: "/elsinore-1.jpg", alt: "Living room entertainment area" },
				{ src: "/elsinore-2.jpg", alt: "Living room seating" },
				{ src: "/elsinore-3.jpg", alt: "Living room detail" }
			]
		},
		{
			id: "kitchen",
			name: "Kitchen",
			images: [
				{ src: "/elsinore-3.jpg", alt: "Modern kitchen with granite worktops" },
				{ src: "/elsinore-4.jpg", alt: "Kitchen dining area" },
				{ src: "/elsinore-5.jpg", alt: "Kitchen appliances" },
				{ src: "/elsinore-3.jpg", alt: "Kitchen storage" },
				{ src: "/elsinore-4.jpg", alt: "Kitchen French doors" },
				{ src: "/elsinore-5.jpg", alt: "Kitchen detail" }
			]
		},
		{
			id: "master",
			name: "Master Bedroom",
			images: [
				{ src: "/elsinore-4.jpg", alt: "Master bedroom with king-size bed" },
				{ src: "/elsinore-5.jpg", alt: "Master bedroom wardrobes" },
				{ src: "/elsinore-1.jpg", alt: "Master bedroom seating" },
				{ src: "/elsinore-4.jpg", alt: "Master bedroom window" },
				{ src: "/elsinore-5.jpg", alt: "Master bedroom decor" },
				{ src: "/elsinore-1.jpg", alt: "Master bedroom detail" }
			]
		},
		{
			id: "second",
			name: "2nd Bedroom",
			images: [
				{ src: "/elsinore-2.jpg", alt: "Second bedroom with twin beds" },
				{ src: "/elsinore-3.jpg", alt: "Second bedroom desk area" },
				{ src: "/elsinore-4.jpg", alt: "Second bedroom storage" },
				{ src: "/elsinore-2.jpg", alt: "Second bedroom window" },
				{ src: "/elsinore-3.jpg", alt: "Second bedroom decor" },
				{ src: "/elsinore-4.jpg", alt: "Second bedroom detail" }
			]
		},
		{
			id: "bathroom",
			name: "Bathroom",
			images: [
				{ src: "/elsinore-5.jpg", alt: "Bathroom with modern fixtures" },
				{ src: "/elsinore-1.jpg", alt: "Bathroom shower" },
				{ src: "/elsinore-2.jpg", alt: "Bathroom vanity" },
				{ src: "/elsinore-5.jpg", alt: "Bathroom storage" },
				{ src: "/elsinore-1.jpg", alt: "Bathroom towels" },
				{ src: "/elsinore-2.jpg", alt: "Bathroom detail" }
			]
		}
	];

	let selectedRoom = "living";
	let selectedImageIndex = 0;
	let isLightboxOpen = false;
	let currentLightboxImage = "";
	let currentLightboxAlt = "";
	let currentRoomImages: { src: string; alt: string }[] = [];

	function openLightbox(room: Room, imageIndex: number) {
		currentRoomImages = room.images;
		selectedImageIndex = imageIndex;
		currentLightboxImage = room.images[imageIndex].src;
		currentLightboxAlt = room.images[imageIndex].alt;
		isLightboxOpen = true;
	}

	function closeLightbox() {
		isLightboxOpen = false;
	}

	function nextImage() {
		selectedImageIndex = (selectedImageIndex + 1) % currentRoomImages.length;
		currentLightboxImage = currentRoomImages[selectedImageIndex].src;
		currentLightboxAlt = currentRoomImages[selectedImageIndex].alt;
	}

	function prevImage() {
		selectedImageIndex = (selectedImageIndex - 1 + currentRoomImages.length) % currentRoomImages.length;
		currentLightboxImage = currentRoomImages[selectedImageIndex].src;
		currentLightboxAlt = currentRoomImages[selectedImageIndex].alt;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isLightboxOpen) return;
		
		if (event.key === "ArrowRight") nextImage();
		else if (event.key === "ArrowLeft") prevImage();
		else if (event.key === "Escape") closeLightbox();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="mx-auto mb-12 max-w-6xl">
	<h2 class="text-slate-800 mb-6 text-center text-3xl font-bold">Gallery</h2>
	
	<Tabs value={selectedRoom}>
		<TabsList class="grid w-full grid-cols-5 mb-6">
			{#each rooms as room}
				<TabsTrigger value={room.id} class="text-sm">
					{room.name}
				</TabsTrigger>
			{/each}
		</TabsList>

		{#each rooms as room}
			<TabsContent value={room.id} class="mt-0">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each room.images as image, index}
						<button
							on:click={() => openLightbox(room, index)}
							class="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500"
						>
							<img
								src={image.src}
								alt={image.alt}
								class="h-64 w-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
								<div class="absolute bottom-4 left-4 right-4">
									<p class="text-white text-sm font-medium">Click to enlarge</p>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</TabsContent>
		{/each}
	</Tabs>
</div>

{#if browser && isLightboxOpen}
	<div
		class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
		on:click={closeLightbox}
	>
		<div class="relative h-full w-full flex items-center justify-center p-4">
			<button
				on:click|stopPropagation={closeLightbox}
				class="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
				aria-label="Close lightbox"
			>
				<X class="h-6 w-6" />
			</button>

			<button
				on:click|stopPropagation={prevImage}
				class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
				aria-label="Previous image"
			>
				<ChevronLeft class="h-6 w-6" />
			</button>

			<button
				on:click|stopPropagation={nextImage}
				class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
				aria-label="Next image"
			>
				<ChevronRight class="h-6 w-6" />
			</button>

			<div
				class="max-w-6xl max-h-[90vh]"
				on:click|stopPropagation
				transition:fly={{ y: 20, duration: 200 }}
			>
				<img
					src={currentLightboxImage}
					alt={currentLightboxAlt}
					class="w-full h-full object-contain rounded-lg"
				/>
				<div class="mt-4 text-center">
					<p class="text-white text-lg">{currentLightboxAlt}</p>
					<p class="text-white/60 text-sm mt-1">
						{selectedImageIndex + 1} / {currentRoomImages.length}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

