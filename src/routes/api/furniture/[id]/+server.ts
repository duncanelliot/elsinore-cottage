import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const { id } = params;
		const updates = await request.json();

		// Define allowed fields for updates
		const allowedFields = [
			'item',
			'product',
			'price',
			'room',
			'roomDisplayName',
			'roomColor',
			'primaryImage',
			'priority',
			'isActive',
			'buy',
			'notes'
		];

		// Filter to only include allowed fields
		const sanitizedUpdates: any = {};
		for (const [key, value] of Object.entries(updates)) {
			if (allowedFields.includes(key)) {
				sanitizedUpdates[key] = value;
			}
		}

		// Validate that we have at least one field to update
		if (Object.keys(sanitizedUpdates).length === 0) {
			return json({ error: 'No valid fields provided for update' }, { status: 400 });
		}

		// Update the furniture item
		const updatedItem = await prisma.furnitureItem.update({
			where: { id },
			data: {
				...sanitizedUpdates,
				updatedAt: new Date()
			},
			include: {
				images: {
					orderBy: [
						{ isPrimary: 'desc' },
						{ priority: 'asc' }
					]
				}
			}
		});

		// Transform the response to match the expected format
		const response = {
			...updatedItem,
			primaryImageSource: updatedItem.images.find(img => img.isPrimary)?.sourceUrl || null,
			primaryImageRetailer: updatedItem.images.find(img => img.isPrimary)?.retailerName || null,
			allImages: updatedItem.images.map(img => ({
				url: img.url,
				description: img.description,
				isPrimary: img.isPrimary
			}))
		};

		return json(response);
	} catch (error) {
		console.error('Error updating furniture item:', error);

		// Handle specific Prisma errors
		if (error instanceof Error && error.message.includes('Record to update not found')) {
			return json({ error: 'Furniture item not found' }, { status: 404 });
		}

		return json({ error: 'Failed to update furniture item' }, { status: 500 });
	}
};