import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

// GET all settings or specific setting by key
export const GET: RequestHandler = async ({ url }) => {
	try {
		const key = url.searchParams.get('key');
		
		if (key) {
			const setting = await db.adminSetting.findUnique({
				where: { key }
			});
			return json(setting);
		}

		const settings = await db.adminSetting.findMany({
			orderBy: { key: 'asc' }
		});

		// Convert to key-value object for easier use
		const settingsObject = settings.reduce((acc, setting) => {
			acc[setting.key] = {
				value: setting.value,
				type: setting.type
			};
			return acc;
		}, {} as Record<string, { value: string; type: string }>);

		return json(settingsObject);
	} catch (error) {
		console.error('Error fetching settings:', error);
		return json({ error: 'Failed to fetch settings' }, { status: 500 });
	}
};

// POST update or create setting
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { key, value, type = 'string' } = await request.json();
		
		if (!key || value === undefined) {
			return json({ error: 'Key and value are required' }, { status: 400 });
		}

		const setting = await db.adminSetting.upsert({
			where: { key },
			update: { value: String(value), type },
			create: { key, value: String(value), type }
		});

		return json(setting);
	} catch (error) {
		console.error('Error updating setting:', error);
		return json({ error: 'Failed to update setting' }, { status: 500 });
	}
};