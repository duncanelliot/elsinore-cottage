import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { Room, getRoomDisplayName, getRoomColor } from '$lib/constants';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	try {
		const furnitureItems = await prisma.furnitureItem.findMany({
			where: {
				isActive: true
			},
			include: {
				images: {
					where: {
						type: 'image'
					},
					orderBy: [
						{ isPrimary: 'desc' },
						{ priority: 'asc' }
					]
				}
			},
			orderBy: [
				{ room: 'asc' },
				{ priority: 'asc' },
				{ item: 'asc' }
			]
		});

		// Transform items with proper room mapping and image fallbacks
		const transformedItems = furnitureItems.map(item => ({
			...item,
			roomDisplayName: getRoomDisplayName(item.room as Room),
			primaryImage: item.primaryImage || item.images[0]?.url || null,
			primaryImageSource: item.images[0]?.sourceUrl || null,
			primaryImageRetailer: item.images[0]?.retailerName || null,
			allImages: item.images.map(img => ({
				url: img.url,
				description: img.description,
				isPrimary: img.isPrimary
			}))
		}));


		return {
			furnitureItems: transformedItems
		};
	} catch (error) {
		console.error('Error loading furniture items:', error);
		return {
			furnitureItems: []
		};
	}
};