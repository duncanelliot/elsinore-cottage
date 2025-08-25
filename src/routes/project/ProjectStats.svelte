<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	let { todosByStatus } = $props();
</script>

<!-- Summary Cards -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
	<Card>
		<CardContent class="p-4">
			<div class="text-2xl font-bold text-red-600">{todosByStatus.pending?.length || 0}</div>
			<div class="text-sm text-gray-600">Pending</div>
		</CardContent>
	</Card>
	<Card>
		<CardContent class="p-4">
			<div class="text-2xl font-bold text-blue-600">
				{todosByStatus.in_progress?.length || 0}
			</div>
			<div class="text-sm text-gray-600">In Progress</div>
		</CardContent>
	</Card>
	<Card>
		<CardContent class="p-4">
			<div class="text-2xl font-bold text-purple-600">
				{todosByStatus.scheduled?.length || 0}
			</div>
			<div class="text-sm text-gray-600">Scheduled</div>
		</CardContent>
	</Card>
	<Card>
		<CardContent class="p-4">
			<div class="text-2xl font-bold text-gray-600">{todosByStatus.future?.length || 0}</div>
			<div class="text-sm text-gray-600">Future</div>
		</CardContent>
	</Card>
</div>