<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { bookingStore, calculatedBooking, type BookingDetails } from '$lib/stores/booking.js';
	import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date';
	import { CalendarDays, Users, PoundSterling, Check, Calendar as CalendarIcon } from '@lucide/svelte';

	let checkInDateString = $state('');
	let checkOutDateString = $state('');
	let step = $state<'dates' | 'details' | 'confirm'>('dates');

	const booking = $derived($bookingStore);
	const pricing = $derived($calculatedBooking);

	const checkInMinDate = $derived.by(() => {
		if (checkInDateString) {
			const checkIn = new Date(checkInDateString);
			checkIn.setDate(checkIn.getDate() + 1);
			return checkIn.toISOString().split('T')[0];
		}
		return minDate.add({ days: 1 }).toString();
	});

	$effect(() => {
		if (checkInDateString) {
			const date = new Date(checkInDateString);
			const calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
			bookingStore.setCheckIn(calendarDate);
		}
	});

	$effect(() => {
		if (checkOutDateString) {
			const date = new Date(checkOutDateString);
			const calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
			bookingStore.setCheckOut(calendarDate);
		}
	});

	function proceedToDetails() {
		if (pricing.isValid && pricing.nights > 0) {
			step = 'details';
		}
	}

	function proceedToConfirm() {
		if (booking.details.guestName && booking.details.guestEmail) {
			step = 'confirm';
		}
	}

	function goBack() {
		if (step === 'details') step = 'dates';
		if (step === 'confirm') step = 'details';
	}

	function submitBooking() {
		bookingStore.setLoading(true);
		// Simulate API call
		setTimeout(() => {
			bookingStore.setLoading(false);
			alert('Booking submitted! You will receive a confirmation email shortly.');
			bookingStore.reset();
			step = 'dates';
		}, 2000);
	}

	const minDate = today(getLocalTimeZone());
	const maxDate = today(getLocalTimeZone()).add({ months: 12 });
	const minDateString = $derived(minDate.toString());
	const maxDateString = $derived(maxDate.toString());
</script>

<svelte:head>
	<title>Book Your Stay - Seaside Retreat</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Book Your Stay</h1>
			<p class="text-gray-600">Experience the perfect getaway at our seaside retreat</p>
		</div>

		<!-- Progress indicator -->
		<div class="flex items-center justify-center mb-8">
			<div class="flex items-center space-x-4">
				<div class="flex items-center">
					<div class="flex items-center justify-center w-8 h-8 rounded-full {step === 'dates' ? 'bg-blue-600 text-white' : step === 'details' || step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}">
						<CalendarIcon class="w-4 h-4" />
					</div>
					<span class="ml-2 text-sm font-medium {step === 'dates' ? 'text-blue-600' : 'text-gray-500'}">Dates</span>
				</div>
				<div class="w-8 h-0.5 bg-gray-200"></div>
				<div class="flex items-center">
					<div class="flex items-center justify-center w-8 h-8 rounded-full {step === 'details' ? 'bg-blue-600 text-white' : step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}">
						<Users class="w-4 h-4" />
					</div>
					<span class="ml-2 text-sm font-medium {step === 'details' ? 'text-blue-600' : 'text-gray-500'}">Details</span>
				</div>
				<div class="w-8 h-0.5 bg-gray-200"></div>
				<div class="flex items-center">
					<div class="flex items-center justify-center w-8 h-8 rounded-full {step === 'confirm' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}">
						<Check class="w-4 h-4" />
					</div>
					<span class="ml-2 text-sm font-medium {step === 'confirm' ? 'text-blue-600' : 'text-gray-500'}">Confirm</span>
				</div>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<!-- Main content -->
			<div class="md:col-span-2">
				{#if step === 'dates'}
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<CalendarDays class="w-5 h-5" />
								Select Your Dates
							</CardTitle>
							<CardDescription>Choose your check-in and check-out dates</CardDescription>
						</CardHeader>
						<CardContent class="space-y-6">
							<div class="grid sm:grid-cols-2 gap-6">
								<div>
									<Label for="checkin" class="text-sm font-medium mb-2 block">Check-in Date</Label>
									<Input
										id="checkin"
										type="date"
										bind:value={checkInDateString}
										min={minDateString}
										max={maxDateString}
										class="w-full"
									/>
								</div>
								<div>
									<Label for="checkout" class="text-sm font-medium mb-2 block">Check-out Date</Label>
									<Input
										id="checkout"
										type="date"
										bind:value={checkOutDateString}
										min={checkInMinDate}
										max={maxDateString}
										class="w-full"
									/>
								</div>
							</div>

							<div>
								<Label for="guests" class="text-sm font-medium mb-2 block">Number of Guests</Label>
								<Input
									id="guests"
									type="number"
									min="1"
									max="8"
									value={booking.details.guests}
									oninput={(e: any) => bookingStore.setGuests(parseInt(e.currentTarget.value) || 1)}
									class="w-32"
								/>
								<p class="text-sm text-gray-500 mt-1">Maximum 8 guests</p>
							</div>

							{#if pricing.isValid && pricing.nights > 0}
								<div class="mt-6">
									<Button onclick={proceedToDetails} class="w-full">
										Continue to Guest Details
									</Button>
								</div>
							{/if}
						</CardContent>
					</Card>

				{:else if step === 'details'}
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<Users class="w-5 h-5" />
								Guest Details
							</CardTitle>
							<CardDescription>Please provide your contact information</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div>
								<Label for="name">Full Name</Label>
								<Input
									id="name"
									value={booking.details.guestName}
									oninput={(e: any) => bookingStore.updateGuestDetails({ guestName: e.currentTarget.value })}
									placeholder="Enter your full name"
									required
								/>
							</div>

							<div>
								<Label for="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={booking.details.guestEmail}
									oninput={(e: any) => bookingStore.updateGuestDetails({ guestEmail: e.currentTarget.value })}
									placeholder="Enter your email"
									required
								/>
							</div>

							<div>
								<Label for="phone">Phone Number</Label>
								<Input
									id="phone"
									type="tel"
									value={booking.details.guestPhone}
									oninput={(e: any) => bookingStore.updateGuestDetails({ guestPhone: e.currentTarget.value })}
									placeholder="Enter your phone number"
								/>
							</div>

							<div>
								<Label for="requests">Special Requests</Label>
								<Textarea
									id="requests"
									value={booking.details.specialRequests}
									oninput={(e: any) => bookingStore.updateGuestDetails({ specialRequests: e.currentTarget.value })}
									placeholder="Any special requirements or requests..."
									class="min-h-[100px]"
								/>
							</div>

							<div class="flex gap-3 pt-4">
								<Button variant="outline" onclick={goBack} class="flex-1">
									Back to Dates
								</Button>
								{#if booking.details.guestName && booking.details.guestEmail}
									<Button onclick={proceedToConfirm} class="flex-1">
										Review Booking
									</Button>
								{/if}
							</div>
						</CardContent>
					</Card>

				{:else if step === 'confirm'}
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<Check class="w-5 h-5" />
								Confirm Your Booking
							</CardTitle>
							<CardDescription>Please review your booking details</CardDescription>
						</CardHeader>
						<CardContent class="space-y-6">
							<div>
								<h3 class="font-semibold mb-2">Stay Details</h3>
								<div class="space-y-1 text-sm">
									<div class="flex justify-between">
										<span>Check-in:</span>
										<span>{booking.details.checkIn?.toString()}</span>
									</div>
									<div class="flex justify-between">
										<span>Check-out:</span>
										<span>{booking.details.checkOut?.toString()}</span>
									</div>
									<div class="flex justify-between">
										<span>Guests:</span>
										<span>{booking.details.guests}</span>
									</div>
									<div class="flex justify-between">
										<span>Nights:</span>
										<span>{pricing.nights}</span>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 class="font-semibold mb-2">Guest Information</h3>
								<div class="space-y-1 text-sm">
									<div class="flex justify-between">
										<span>Name:</span>
										<span>{booking.details.guestName}</span>
									</div>
									<div class="flex justify-between">
										<span>Email:</span>
										<span>{booking.details.guestEmail}</span>
									</div>
									{#if booking.details.guestPhone}
										<div class="flex justify-between">
											<span>Phone:</span>
											<span>{booking.details.guestPhone}</span>
										</div>
									{/if}
								</div>
							</div>

							{#if booking.details.specialRequests}
								<div>
									<h3 class="font-semibold mb-2">Special Requests</h3>
									<p class="text-sm text-gray-600">{booking.details.specialRequests}</p>
								</div>
							{/if}

							<div class="flex gap-3 pt-4">
								<Button variant="outline" onclick={goBack} class="flex-1">
									Edit Details
								</Button>
								<Button onclick={submitBooking} disabled={booking.isLoading} class="flex-1">
									{booking.isLoading ? 'Processing...' : 'Confirm Booking'}
								</Button>
							</div>
						</CardContent>
					</Card>
				{/if}
			</div>

			<!-- Pricing sidebar -->
			<div class="md:col-span-1">
				<!-- Property Image -->
				<Card class="mb-6">
					<CardContent class="p-0">
						<img src="/elsinore-5.jpg" alt="Elsinore cottage garden view" class="w-full h-48 object-cover rounded-t-lg" />
						<div class="p-4">
							<h3 class="font-semibold text-nautical-navy">Elsinore</h3>
							<p class="text-sm text-gray-600">Your castle by the sea in Bembridge</p>
						</div>
					</CardContent>
				</Card>

				<Card class="sticky top-4">
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<PoundSterling class="w-5 h-5" />
							Pricing Summary
						</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						{#if pricing.isValid}
							<div class="space-y-2">
								<div class="flex justify-between text-sm">
									<span>Base rate per night:</span>
									<span>£{booking.basePricePerNight}</span>
								</div>
								<div class="flex justify-between text-sm">
									<span>Number of nights:</span>
									<span>{pricing.nights}</span>
								</div>
								
								{#if pricing.breakdown.some(day => day.tier !== 'Standard')}
									<Separator />
									<div class="space-y-1">
										{#each pricing.breakdown as day}
											{#if day.tier !== 'Standard'}
												<div class="flex justify-between items-center text-xs">
													<span>{day.date}</span>
													<div class="flex items-center gap-1">
														<Badge variant="secondary" class="text-xs">{day.tier}</Badge>
														<span>£{day.price.toFixed(2)}</span>
													</div>
												</div>
											{/if}
										{/each}
									</div>
								{/if}
								
								<Separator />
								<div class="flex justify-between font-semibold">
									<span>Total:</span>
									<span>£{pricing.totalPrice.toFixed(2)}</span>
								</div>
							</div>
						{:else}
							<p class="text-sm text-gray-500">Select your dates to see pricing</p>
						{/if}

						<div class="space-y-2 pt-4 border-t">
							<h4 class="font-semibold text-sm">Pricing Tiers</h4>
							{#each booking.pricingTiers as tier}
								<div class="flex justify-between items-center text-xs">
									<span>{tier.name}:</span>
									<Badge variant="outline">+{((tier.multiplier - 1) * 100).toFixed(0)}%</Badge>
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</div>