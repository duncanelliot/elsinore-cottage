<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	
	let { 
		message = '',
		onUndo = () => {},
		onDismiss = () => {},
		duration = 5000
	} = $props();
	
	let timeRemaining = $state(duration / 1000);
	let progressWidth = $state(100);
	
	onMount(() => {
		console.log('UndoToast mounted with message:', message);
		
		const interval = setInterval(() => {
			timeRemaining -= 0.1;
			progressWidth = (timeRemaining / (duration / 1000)) * 100;
			
			if (timeRemaining <= 0) {
				clearInterval(interval);
				onDismiss();
			}
		}, 100);
		
		return () => clearInterval(interval);
	});
</script>

<div 
	class="fixed bottom-6 left-1/2 transform -translate-x-1/2"
	style="z-index: 9999;"
	in:fly={{ y: 100, duration: 300 }}
	out:fade={{ duration: 200 }}
>
	<div class="bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden min-w-[350px] max-w-md">
		<div class="p-4">
			<div class="flex items-center justify-between gap-4">
				<div class="flex-1">
					<p class="text-sm font-medium">{message}</p>
				</div>
				<div class="flex items-center gap-2">
					<button
						on:click={onUndo}
						class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
					>
						Undo
					</button>
					<button
						on:click={onDismiss}
						class="p-1.5 hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
						aria-label="Dismiss"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="h-1 bg-gray-800">
			<div 
				class="h-full bg-blue-600 transition-all duration-100 ease-linear"
				style="width: {progressWidth}%"
			></div>
		</div>
	</div>
</div>

<style>
	@keyframes countdown {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>