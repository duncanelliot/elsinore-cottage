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
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table/index.js';
	import { 
		Calendar, 
		Users, 
		PoundSterling, 
		Mail, 
		Phone, 
		Eye,
		Edit,
		Trash2,
		Plus,
		Search,
		Filter,
		Download
	} from '@lucide/svelte';

	// Mock booking data - in real app this would come from a database
	let bookings = $state([
		{
			id: 'BK001',
			guestName: 'Sarah Johnson',
			email: 'sarah.johnson@email.com',
			phone: '+44 7700 900123',
			checkIn: '2024-08-20',
			checkOut: '2024-08-27',
			guests: 4,
			nights: 7,
			totalPrice: 1575.00,
			status: 'confirmed',
			specialRequests: 'Late check-in requested',
			bookingDate: '2024-07-15'
		},
		{
			id: 'BK002',
			guestName: 'Michael Smith',
			email: 'michael.smith@email.com',
			phone: '+44 7700 900456',
			checkIn: '2024-09-03',
			checkOut: '2024-09-10',
			guests: 2,
			nights: 7,
			totalPrice: 1200.00,
			status: 'confirmed',
			specialRequests: '',
			bookingDate: '2024-07-20'
		},
		{
			id: 'BK003',
			guestName: 'Emma Williams',
			email: 'emma.williams@email.com',
			phone: '+44 7700 900789',
			checkIn: '2024-09-15',
			checkOut: '2024-09-17',
			guests: 2,
			nights: 2,
			totalPrice: 340.00,
			status: 'pending',
			specialRequests: 'Ground floor access needed',
			bookingDate: '2024-08-01'
		},
		{
			id: 'BK004',
			guestName: 'David Brown',
			email: 'david.brown@email.com',
			phone: '+44 7700 900012',
			checkIn: '2024-10-01',
			checkOut: '2024-10-08',
			guests: 6,
			nights: 7,
			totalPrice: 1890.00,
			status: 'confirmed',
			specialRequests: 'Anniversary celebration',
			bookingDate: '2024-08-10'
		}
	]);

	let searchTerm = $state('');
	let statusFilter = $state('all');
	let selectedBooking = $state<any>(null);

	const filteredBookings = $derived(bookings.filter(booking => {
		const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 booking.id.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
		
		return matchesSearch && matchesStatus;
	}));

	const totalRevenue = $derived(bookings
		.filter(b => b.status === 'confirmed')
		.reduce((sum, booking) => sum + booking.totalPrice, 0));

	const upcomingBookings = $derived(bookings
		.filter(b => new Date(b.checkIn) > new Date() && b.status === 'confirmed')
		.length);

	const pendingBookings = $derived(bookings.filter(b => b.status === 'pending').length);

	function getStatusColor(status: string) {
		switch (status) {
			case 'confirmed': return 'bg-green-100 text-green-800';
			case 'pending': return 'bg-yellow-100 text-yellow-800';
			case 'cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function formatPrice(price: number) {
		return `£${price.toFixed(2)}`;
	}

	function viewBooking(booking: any) {
		selectedBooking = booking;
	}

	function closeBookingDetail() {
		selectedBooking = null;
	}

	function updateBookingStatus(bookingId: string, newStatus: string) {
		bookings = bookings.map(booking => 
			booking.id === bookingId 
				? { ...booking, status: newStatus }
				: booking
		);
		if (selectedBooking && selectedBooking.id === bookingId) {
			selectedBooking = { ...selectedBooking, status: newStatus };
		}
	}

	function deleteBooking(bookingId: string) {
		if (confirm('Are you sure you want to delete this booking?')) {
			bookings = bookings.filter(booking => booking.id !== bookingId);
			if (selectedBooking && selectedBooking.id === bookingId) {
				selectedBooking = null;
			}
		}
	}

	function exportBookings() {
		// Simulate CSV export
		alert('Bookings exported to CSV (feature not implemented in demo)');
	}
</script>

<svelte:head>
	<title>Booking Management - Admin Dashboard</title>
</svelte:head>

<div class="container mx-auto">
	{#if !selectedBooking}
		<!-- Header -->
		<div class="mb-8">
			<div class="flex justify-between items-center">
				<div>
					<h1 class="text-3xl font-bold text-nautical-navy mb-2">Booking Management</h1>
					<p class="text-gray-600">Manage reservations and guest information</p>
				</div>
				<div class="flex gap-3">
					<Button variant="outline" onclick={exportBookings}>
						<Download class="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button href="/booking">
						<Plus class="h-4 w-4 mr-2" />
						New Booking
					</Button>
				</div>
			</div>
		</div>

		<!-- Stats Cards -->
		<div class="grid md:grid-cols-4 gap-6 mb-8">
			<Card>
				<CardHeader class="pb-3">
					<div class="flex items-center justify-between">
						<Calendar class="h-6 w-6 text-blue-600" />
						<Badge variant="default">{upcomingBookings}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<p class="font-semibold text-gray-800">Upcoming Bookings</p>
					<p class="text-sm text-gray-600">Next 30 days</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="pb-3">
					<div class="flex items-center justify-between">
						<Users class="h-6 w-6 text-green-600" />
						<Badge variant="default">{bookings.length}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<p class="font-semibold text-gray-800">Total Bookings</p>
					<p class="text-sm text-gray-600">All time</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="pb-3">
					<div class="flex items-center justify-between">
						<PoundSterling class="h-6 w-6 text-purple-600" />
						<Badge variant="default">{formatPrice(totalRevenue)}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<p class="font-semibold text-gray-800">Total Revenue</p>
					<p class="text-sm text-gray-600">Confirmed bookings</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="pb-3">
					<div class="flex items-center justify-between">
						<Filter class="h-6 w-6 text-orange-600" />
						<Badge variant={pendingBookings > 0 ? 'destructive' : 'default'}>
							{pendingBookings}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<p class="font-semibold text-gray-800">Pending</p>
					<p class="text-sm text-gray-600">Needs attention</p>
				</CardContent>
			</Card>
		</div>

		<!-- Filters and Search -->
		<Card class="mb-6">
			<CardContent class="pt-6">
				<div class="flex flex-wrap gap-4 items-end">
					<div class="flex-1 min-w-64">
						<Label for="search">Search Bookings</Label>
						<div class="relative">
							<Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								id="search"
								bind:value={searchTerm}
								placeholder="Search by name, email, or booking ID..."
								class="pl-10"
							/>
						</div>
					</div>
					<div>
						<Label for="status">Status Filter</Label>
						<select
							id="status"
							bind:value={statusFilter}
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						>
							<option value="all">All Statuses</option>
							<option value="confirmed">Confirmed</option>
							<option value="pending">Pending</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Bookings Table -->
		<Card>
			<CardHeader>
				<CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Booking ID</TableHead>
							<TableHead>Guest</TableHead>
							<TableHead>Dates</TableHead>
							<TableHead>Guests</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each filteredBookings as booking}
							<TableRow>
								<TableCell class="font-mono">{booking.id}</TableCell>
								<TableCell>
									<div>
										<p class="font-medium">{booking.guestName}</p>
										<p class="text-sm text-gray-600">{booking.email}</p>
									</div>
								</TableCell>
								<TableCell>
									<div>
										<p class="font-medium">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
										<p class="text-sm text-gray-600">{booking.nights} nights</p>
									</div>
								</TableCell>
								<TableCell>{booking.guests}</TableCell>
								<TableCell class="font-medium">{formatPrice(booking.totalPrice)}</TableCell>
								<TableCell>
									<Badge class={getStatusColor(booking.status)}>
										{booking.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div class="flex gap-2">
										<Button size="sm" variant="outline" onclick={() => viewBooking(booking)}>
											<Eye class="h-3 w-3" />
										</Button>
										<Button size="sm" variant="outline">
											<Edit class="h-3 w-3" />
										</Button>
										<Button 
											size="sm" 
											variant="outline"
											onclick={() => deleteBooking(booking.id)}
										>
											<Trash2 class="h-3 w-3" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</CardContent>
		</Card>

	{:else}
		<!-- Booking Detail View -->
		<div class="mb-6">
			<Button variant="outline" onclick={closeBookingDetail}>
				← Back to Bookings
			</Button>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<div class="lg:col-span-2 space-y-6">
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center justify-between">
							Booking Details
							<Badge class={getStatusColor(selectedBooking.status)}>
								{selectedBooking.status}
							</Badge>
						</CardTitle>
						<CardDescription>Booking ID: {selectedBooking.id}</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<Label class="text-sm font-medium text-gray-600">Check-in Date</Label>
								<p class="text-lg font-semibold">{formatDate(selectedBooking.checkIn)}</p>
							</div>
							<div>
								<Label class="text-sm font-medium text-gray-600">Check-out Date</Label>
								<p class="text-lg font-semibold">{formatDate(selectedBooking.checkOut)}</p>
							</div>
							<div>
								<Label class="text-sm font-medium text-gray-600">Number of Guests</Label>
								<p class="text-lg font-semibold">{selectedBooking.guests}</p>
							</div>
							<div>
								<Label class="text-sm font-medium text-gray-600">Number of Nights</Label>
								<p class="text-lg font-semibold">{selectedBooking.nights}</p>
							</div>
						</div>

						<Separator />

						<div>
							<Label class="text-sm font-medium text-gray-600">Total Price</Label>
							<p class="text-2xl font-bold text-green-600">{formatPrice(selectedBooking.totalPrice)}</p>
						</div>

						{#if selectedBooking.specialRequests}
							<div>
								<Label class="text-sm font-medium text-gray-600">Special Requests</Label>
								<p class="text-gray-800">{selectedBooking.specialRequests}</p>
							</div>
						{/if}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Guest Information</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						<div>
							<Label class="text-sm font-medium text-gray-600">Full Name</Label>
							<p class="text-lg font-semibold">{selectedBooking.guestName}</p>
						</div>
						<div>
							<Label class="text-sm font-medium text-gray-600">Email Address</Label>
							<div class="flex items-center gap-2">
								<Mail class="h-4 w-4 text-gray-600" />
								<a href="mailto:{selectedBooking.email}" class="text-blue-600 hover:underline">
									{selectedBooking.email}
								</a>
							</div>
						</div>
						<div>
							<Label class="text-sm font-medium text-gray-600">Phone Number</Label>
							<div class="flex items-center gap-2">
								<Phone class="h-4 w-4 text-gray-600" />
								<a href="tel:{selectedBooking.phone}" class="text-blue-600 hover:underline">
									{selectedBooking.phone}
								</a>
							</div>
						</div>
						<div>
							<Label class="text-sm font-medium text-gray-600">Booking Date</Label>
							<p class="text-gray-800">{formatDate(selectedBooking.bookingDate)}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<div class="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent class="space-y-3">
						{#if selectedBooking.status === 'pending'}
							<Button 
								class="w-full"
								onclick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
							>
								Confirm Booking
							</Button>
						{/if}
						
						<Button variant="outline" class="w-full">
							<Mail class="h-4 w-4 mr-2" />
							Send Email
						</Button>
						
						<Button variant="outline" class="w-full">
							<Edit class="h-4 w-4 mr-2" />
							Edit Booking
						</Button>
						
						<Button 
							variant="destructive" 
							class="w-full"
							onclick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
						>
							Cancel Booking
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Booking Timeline</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-3 text-sm">
							<div class="flex justify-between">
								<span class="text-gray-600">Booked:</span>
								<span>{formatDate(selectedBooking.bookingDate)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Status:</span>
								<span class="capitalize">{selectedBooking.status}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Check-in:</span>
								<span>{formatDate(selectedBooking.checkIn)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Check-out:</span>
								<span>{formatDate(selectedBooking.checkOut)}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	{/if}
</div>