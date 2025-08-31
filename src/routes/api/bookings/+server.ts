import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

// GET all bookings or filter by status
export const GET: RequestHandler = async ({ url }) => {
	try {
		const status = url.searchParams.get('status');
		
		const bookings = await db.booking.findMany({
			where: status ? { status } : undefined,
			include: {
				user: true
			},
			orderBy: {
				checkIn: 'asc'
			}
		});

		return json(bookings);
	} catch (error) {
		console.error('Error fetching bookings:', error);
		return json({ error: 'Failed to fetch bookings' }, { status: 500 });
	}
};

// POST create new booking
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		
		// Generate booking reference
		const date = new Date();
		const bookingRef = `ELS-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
		
		const booking = await db.booking.create({
			data: {
				...data,
				bookingRef,
				checkIn: new Date(data.checkIn),
				checkOut: new Date(data.checkOut),
				status: 'pending'
			}
		});

		return json(booking, { status: 201 });
	} catch (error) {
		console.error('Error creating booking:', error);
		return json({ error: 'Failed to create booking' }, { status: 500 });
	}
};