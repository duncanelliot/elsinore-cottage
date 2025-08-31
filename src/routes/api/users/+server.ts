import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const users = await db.user.findMany({
			include: {
				permissions: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		return json({ error: 'Failed to fetch users' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { email, username, password, name, phone, role, permissions } = data;

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user with permissions
		const user = await db.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
				name,
				phone,
				role,
				permissions: {
					create: {
						canViewBookings: permissions?.canViewBookings || false,
						canEditBookings: permissions?.canEditBookings || false,
						canDeleteBookings: permissions?.canDeleteBookings || false,
						canViewUsers: permissions?.canViewUsers || false,
						canEditUsers: permissions?.canEditUsers || false,
						canDeleteUsers: permissions?.canDeleteUsers || false,
						canManageSettings: permissions?.canManageSettings || false,
						canViewReports: permissions?.canViewReports || false,
						canManageCalendar: permissions?.canManageCalendar || false,
						canManagePricing: permissions?.canManagePricing || false
					}
				}
			},
			include: {
				permissions: true
			}
		});

		return json(user, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return json({ error: 'Failed to create user' }, { status: 500 });
	}
};