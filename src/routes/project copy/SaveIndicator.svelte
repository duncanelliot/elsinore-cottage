<script lang="ts">
	let { showSaveIndicator, lastModified } = $props();
</script>

{#if showSaveIndicator && lastModified}
	<div
		class="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm"
	>
		<div class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
		Changes saved at {lastModified}
	</div>
{/if}