<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { 
		Calendar, 
		Home, 
		MapPin, 
		Phone, 
		Wifi, 
		Key,
		FileText,
		Clock,
		Users,
		Mail,
		LogOut,
		Download
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';

	// Mock guest data - in a real app this would come from authentication
	const guestData = {
		name: 'Sarah Johnson',
		email: 'sarah.johnson@email.com',
		booking: {
			checkIn: '2024-08-20',
			checkOut: '2024-08-27',
			guests: 4,
			totalAmount: '£1,575.00',
			status: 'confirmed',
			bookingRef: 'ELS-2024-0820'
		}
	};

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function getDaysUntilCheckIn() {
		const checkIn = new Date(guestData.booking.checkIn);
		const today = new Date();
		const diffTime = checkIn.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	const daysUntilCheckIn = getDaysUntilCheckIn();

	function handleLogout() {
		goto('/login');
	}
</script>

<svelte:head>
	<title>Guest Dashboard - Elsinore Cottage</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b">
		<div class="container mx-auto px-4 py-4">
			<div class="flex justify-between items-center">
				<div>
					<h1 class="text-2xl font-bold text-slate-800">Welcome, {guestData.name}</h1>
					<p class="text-sm text-slate-600">Your Elsinore booking dashboard</p>
				</div>
				<Button variant="outline" onclick={handleLogout}>
					<LogOut class="h-4 w-4 mr-2" />
					Logout
				</Button>
			</div>
		</div>
	</header>

	<div class="container mx-auto px-4 py-8">
		<!-- Booking Status Alert -->
		{#if daysUntilCheckIn > 0}
			<Card class="mb-6 border-green-200 bg-green-50">
				<CardContent class="pt-6">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-green-100 rounded-full">
								<Calendar class="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p class="font-semibold text-green-900">Your stay is coming up!</p>
								<p class="text-sm text-green-700">{daysUntilCheckIn} days until check-in</p>
							</div>
						</div>
						<Badge class="bg-green-600">Confirmed</Badge>
					</div>
				</CardContent>
			</Card>
		{/if}

		<div class="grid lg:grid-cols-3 gap-6">
			<!-- Main Booking Details -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Booking Information -->
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<Calendar class="h-5 w-5" />
							Booking Details
						</CardTitle>
						<CardDescription>Reference: {guestData.booking.bookingRef}</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<p class="text-sm text-muted-foreground mb-1">Check-in</p>
								<p class="font-semibold">{formatDate(guestData.booking.checkIn)}</p>
								<p class="text-sm text-muted-foreground">After 3:00 PM</p>
							</div>
							<div>
								<p class="text-sm text-muted-foreground mb-1">Check-out</p>
								<p class="font-semibold">{formatDate(guestData.booking.checkOut)}</p>
								<p class="text-sm text-muted-foreground">Before 10:00 AM</p>
							</div>
							<div>
								<p class="text-sm text-muted-foreground mb-1">Number of Guests</p>
								<p class="font-semibold flex items-center gap-2">
									<Users class="h-4 w-4" />
									{guestData.booking.guests} Guests
								</p>
							</div>
							<div>
								<p class="text-sm text-muted-foreground mb-1">Total Amount</p>
								<p class="font-semibold text-green-600">{guestData.booking.totalAmount}</p>
								<p class="text-sm text-green-600">Paid in Full</p>
							</div>
						</div>

						<Separator />

						<div class="flex gap-3">
							<Button variant="outline" class="flex-1">
								<Download class="h-4 w-4 mr-2" />
								Download Confirmation
							</Button>
							<Button variant="outline" class="flex-1">
								<Mail class="h-4 w-4 mr-2" />
								Email Confirmation
							</Button>
						</div>
					</CardContent>
				</Card>

				<!-- Property Information -->
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<Home class="h-5 w-5" />
							Property Information
						</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="grid md:grid-cols-2 gap-4">
							<div class="space-y-3">
								<div class="flex items-start gap-3">
									<MapPin class="h-4 w-4 mt-1 text-muted-foreground" />
									<div>
										<p class="font-medium">Address</p>
										<p class="text-sm text-muted-foreground">
											Elsinore Cottage<br />
											Bembridge<br />
											Isle of Wight<br />
											PO35 5XY
										</p>
									</div>
								</div>
								
								<div class="flex items-start gap-3">
									<Wifi class="h-4 w-4 mt-1 text-muted-foreground" />
									<div>
										<p class="font-medium">WiFi Details</p>
										<p class="text-sm text-muted-foreground">
											Network: Elsinore_Guest<br />
											Password: Will be provided on arrival
										</p>
									</div>
								</div>
							</div>

							<div class="space-y-3">
								<div class="flex items-start gap-3">
									<Key class="h-4 w-4 mt-1 text-muted-foreground" />
									<div>
										<p class="font-medium">Key Collection</p>
										<p class="text-sm text-muted-foreground">
											Key safe location and code will be<br />
											sent 24 hours before check-in
										</p>
									</div>
								</div>

								<div class="flex items-start gap-3">
									<Phone class="h-4 w-4 mt-1 text-muted-foreground" />
									<div>
										<p class="font-medium">Emergency Contact</p>
										<p class="text-sm text-muted-foreground">
											Property Manager: 07123 456789<br />
											Available 24/7 for emergencies
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Sidebar Quick Links -->
			<div class="lg:col-span-1 space-y-6">
				<!-- Quick Actions -->
				<Card>
					<CardHeader>
						<CardTitle>Quick Links</CardTitle>
						<CardDescription>Helpful resources for your stay</CardDescription>
					</CardHeader>
					<CardContent class="space-y-3">
						<Button variant="outline" class="w-full justify-start" href="/guide">
							<FileText class="h-4 w-4 mr-2" />
							House Guide
						</Button>
						<Button variant="outline" class="w-full justify-start" href="/area">
							<MapPin class="h-4 w-4 mr-2" />
							Local Area Guide
						</Button>
						<Button variant="outline" class="w-full justify-start" href="/activities">
							<Users class="h-4 w-4 mr-2" />
							Things to Do
						</Button>
						<Button variant="outline" class="w-full justify-start" href="/emergency">
							<Phone class="h-4 w-4 mr-2" />
							Emergency Contacts
						</Button>
					</CardContent>
				</Card>

				<!-- Important Information -->
				<Card>
					<CardHeader>
						<CardTitle>Important Notes</CardTitle>
					</CardHeader>
					<CardContent class="space-y-3 text-sm">
						<div class="p-3 bg-blue-50 rounded-lg">
							<p class="font-medium text-blue-900 mb-1">Check-in Instructions</p>
							<p class="text-blue-700">You'll receive key safe details 24 hours before arrival</p>
						</div>
						
						<div class="p-3 bg-amber-50 rounded-lg">
							<p class="font-medium text-amber-900 mb-1">Parking</p>
							<p class="text-amber-700">Private parking available for 2 cars</p>
						</div>

						<div class="p-3 bg-green-50 rounded-lg">
							<p class="font-medium text-green-900 mb-1">Welcome Pack</p>
							<p class="text-green-700">Complimentary tea, coffee, and local biscuits provided</p>
						</div>
					</CardContent>
				</Card>

				<!-- Contact Support -->
				<Card>
					<CardHeader>
						<CardTitle>Need Help?</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground mb-4">
							Our team is here to help make your stay perfect
						</p>
						<Button class="w-full">
							<Mail class="h-4 w-4 mr-2" />
							Contact Support
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</div>