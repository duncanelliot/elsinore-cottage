import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const user = await db.user.findUnique({
			where: { id: params.id },
			include: {
				permissions: true
			}
		});

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json(user);
	} catch (error) {
		console.error('Error fetching user:', error);
		return json({ error: 'Failed to fetch user' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const data = await request.json();
		const { email, username, password, name, phone, role, permissions, isActive } = data;

		// Prepare update data
		const updateData: any = {
			email,
			username,
			name,
			phone,
			role,
			isActive
		};

		// Only hash and update password if provided
		if (password) {
			updateData.password = await bcrypt.hash(password, 12);
		}

		// Update user and permissions
		const user = await db.user.update({
			where: { id: params.id },
			data: {
				...updateData,
				permissions: permissions ? {
					upsert: {
						create: {
							canViewBookings: permissions.canViewBookings || false,
							canEditBookings: permissions.canEditBookings || false,
							canDeleteBookings: permissions.canDeleteBookings || false,
							canViewUsers: permissions.canViewUsers || false,
							canEditUsers: permissions.canEditUsers || false,
							canDeleteUsers: permissions.canDeleteUsers || false,
							canManageSettings: permissions.canManageSettings || false,
							canViewReports: permissions.canViewReports || false,
							canManageCalendar: permissions.canManageCalendar || false,
							canManagePricing: permissions.canManagePricing || false
						},
						update: {
							canViewBookings: permissions.canViewBookings || false,
							canEditBookings: permissions.canEditBookings || false,
							canDeleteBookings: permissions.canDeleteBookings || false,
							canViewUsers: permissions.canViewUsers || false,
							canEditUsers: permissions.canEditUsers || false,
							canDeleteUsers: permissions.canDeleteUsers || false,
							canManageSettings: permissions.canManageSettings || false,
							canViewReports: permissions.canViewReports || false,
							canManageCalendar: permissions.canManageCalendar || false,
							canManagePricing: permissions.canManagePricing || false
						}
					}
				} : undefined
			},
			include: {
				permissions: true
			}
		});

		return json(user);
	} catch (error) {
		console.error('Error updating user:', error);
		return json({ error: 'Failed to update user' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await db.user.delete({
			where: { id: params.id }
		});

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting user:', error);
		return json({ error: 'Failed to delete user' }, { status: 500 });
	}
};