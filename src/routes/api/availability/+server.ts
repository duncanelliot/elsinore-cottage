import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

// GET availability for date range
export const GET: RequestHandler = async ({ url }) => {
	try {
		const startDate = url.searchParams.get('start');
		const endDate = url.searchParams.get('end');
		
		if (!startDate || !endDate) {
			return json({ error: 'Start and end dates are required' }, { status: 400 });
		}

		// Get availability records
		const availability = await db.availability.findMany({
			where: {
				date: {
					gte: new Date(startDate),
					lte: new Date(endDate)
				}
			},
			orderBy: {
				date: 'asc'
			}
		});

		// Get bookings in the date range
		const bookings = await db.booking.findMany({
			where: {
				AND: [
					{ status: { in: ['confirmed', 'pending'] } },
					{
						OR: [
							{
								checkIn: {
									gte: new Date(startDate),
									lte: new Date(endDate)
								}
							},
							{
								checkOut: {
									gte: new Date(startDate),
									lte: new Date(endDate)
								}
							},
							{
								AND: [
									{ checkIn: { lte: new Date(startDate) } },
									{ checkOut: { gte: new Date(endDate) } }
								]
							}
						]
					}
				]
			},
			select: {
				checkIn: true,
				checkOut: true,
				status: true
			}
		});

		return json({ availability, bookings });
	} catch (error) {
		console.error('Error fetching availability:', error);
		return json({ error: 'Failed to fetch availability' }, { status: 500 });
	}
};

// POST update availability for specific dates
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { dates, isAvailable, isBlocked, priceOverride, notes } = await request.json();
		
		if (!dates || !Array.isArray(dates)) {
			return json({ error: 'Dates array is required' }, { status: 400 });
		}

		// Update or create availability records for each date
		const updates = await Promise.all(
			dates.map(dateStr => 
				db.availability.upsert({
					where: { date: new Date(dateStr) },
					update: {
						isAvailable,
						isBlocked,
						priceOverride,
						notes
					},
					create: {
						date: new Date(dateStr),
						isAvailable: isAvailable ?? true,
						isBlocked: isBlocked ?? false,
						priceOverride,
						notes
					}
				})
			)
		);

		return json({ updated: updates.length });
	} catch (error) {
		console.error('Error updating availability:', error);
		return json({ error: 'Failed to update availability' }, { status: 500 });
	}
};