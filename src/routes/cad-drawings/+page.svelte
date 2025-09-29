<script>
	let currentPage = 1;
	const totalPages = 4;

	const floorPlans = [
		{
			page: 1,
			title: 'Ground Floor Existing Plan',
			description: 'Current ground floor layout showing room dimensions and gas tube locations'
		},
		{
			page: 2,
			title: 'First Floor Existing Plan',
			description: 'Current first floor layout with note to keep door for reuse in new bathrooms'
		},
		{
			page: 3,
			title: 'New Ground Floor',
			description: 'Proposed ground floor with electrical switches, sockets, and lighting plan'
		},
		{
			page: 4,
			title: 'New First Floor',
			description: 'Proposed first floor with bathroom renovations and bedroom modifications'
		}
	];

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function goToPage(page) {
		currentPage = page;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-8 text-gray-800">CAD Drawings - Floor Plans</h1>

		<!-- Navigation Tabs -->
		<div class="mb-6 flex flex-wrap gap-2">
			{#each floorPlans as plan}
				<button
					on:click={() => goToPage(plan.page)}
					class="px-4 py-2 rounded-lg transition-colors duration-200 {currentPage === plan.page
						? 'bg-blue-600 text-white'
						: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}"
				>
					{plan.title}
				</button>
			{/each}
		</div>

		<!-- Current Plan Info -->
		<div class="bg-white rounded-lg shadow-md p-4 mb-6">
			<h2 class="text-xl font-semibold text-gray-800 mb-2">
				{floorPlans[currentPage - 1].title}
			</h2>
			<p class="text-gray-600">
				{floorPlans[currentPage - 1].description}
			</p>
		</div>

		<!-- PDF Display Options -->
		<div class="bg-white rounded-lg shadow-lg p-6">
			<div class="space-y-4">
				<!-- Option 1: Direct PDF Link -->
				<div class="border rounded-lg p-4">
					<h3 class="font-semibold mb-2">View Full PDF</h3>
					<p class="text-gray-600 mb-3">Open the complete CAD drawings document with all floor plans.</p>
					<a
						href="/cad-drawings.pdf"
						target="_blank"
						class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
					>
						Open PDF in New Tab
					</a>
				</div>

				<!-- Option 2: Embedded PDF Viewer -->
				<div class="border rounded-lg p-4">
					<h3 class="font-semibold mb-2">Embedded Viewer</h3>
					<p class="text-gray-600 mb-3">View the PDF directly on this page.</p>
					<object
						data="/cad-drawings.pdf#page={currentPage}"
						type="application/pdf"
						class="w-full h-[600px] border"
					>
						<p class="p-4 text-gray-500">
							Your browser cannot display PDFs.
							<a href="/cad-drawings.pdf" class="text-blue-600 underline">
								Click here to download the PDF
							</a>
						</p>
					</object>
				</div>

				<!-- Option 3: Download -->
				<div class="border rounded-lg p-4">
					<h3 class="font-semibold mb-2">Download for Offline Use</h3>
					<p class="text-gray-600 mb-3">Save the CAD drawings to your device for printing or offline viewing.</p>
					<a
						href="/cad-drawings.pdf"
						download="CAD-Drawings-Floor-Plans.pdf"
						class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
					>
						Download PDF
					</a>
				</div>
			</div>
		</div>

		<!-- Page Navigation -->
		<div class="mt-6 flex justify-between items-center">
			<button
				on:click={prevPage}
				disabled={currentPage === 1}
				class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
			>
				Previous
			</button>

			<span class="text-gray-600 font-medium">
				Page {currentPage} of {totalPages}
			</span>

			<button
				on:click={nextPage}
				disabled={currentPage === totalPages}
				class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
			>
				Next
			</button>
		</div>
	</div>
</div>