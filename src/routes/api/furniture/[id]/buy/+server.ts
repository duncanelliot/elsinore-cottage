import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const { id } = params;
		const { buy } = await request.json();

		if (typeof buy !== 'boolean') {
			return json({ error: 'buy field must be a boolean' }, { status: 400 });
		}

		const updatedItem = await prisma.furnitureItem.update({
			where: { id },
			data: { buy },
			select: {
				id: true,
				buy: true,
				item: true,
				price: true
			}
		});

		return json(updatedItem);
	} catch (error) {
		console.error('Error updating furniture buy status:', error);
		return json({ error: 'Failed to update furniture item' }, { status: 500 });
	}
};