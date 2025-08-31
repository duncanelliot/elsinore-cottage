import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		// Find user by username
		const user = await db.user.findUnique({
			where: { username },
			include: {
				permissions: true
			}
		});

		if (!user) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Check if user is active
		if (!user.isActive) {
			return json({ error: 'Account is deactivated' }, { status: 401 });
		}

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Update last login
		await db.user.update({
			where: { id: user.id },
			data: { lastLogin: new Date() }
		});

		// Return user data (excluding password)
		const { password: _, ...userWithoutPassword } = user;
		
		return json({
			user: userWithoutPassword,
			message: 'Login successful'
		});

	} catch (error) {
		console.error('Login error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};