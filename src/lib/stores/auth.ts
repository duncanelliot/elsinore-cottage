import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface User {
	id: string;
	email: string;
	username: string | null;
	name: string;
	role: string;
	permissions: Array<{
		canViewBookings: boolean;
		canEditBookings: boolean;
		canDeleteBookings: boolean;
		canViewUsers: boolean;
		canEditUsers: boolean;
		canDeleteUsers: boolean;
		canManageSettings: boolean;
		canViewReports: boolean;
		canManageCalendar: boolean;
		canManagePricing: boolean;
	}>;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		isAuthenticated: false,
		user: null
	});

	return {
		subscribe,
		setUser: (user: User) => {
			set({
				isAuthenticated: true,
				user
			});
			if (browser) {
				sessionStorage.setItem('admin_authenticated', 'true');
				sessionStorage.setItem('admin_user', JSON.stringify(user));
			}
		},
		logout: () => {
			set({
				isAuthenticated: false,
				user: null
			});
			if (browser) {
				sessionStorage.removeItem('admin_authenticated');
				sessionStorage.removeItem('admin_user');
			}
		},
		checkAuth: () => {
			if (browser) {
				const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
				const userStr = sessionStorage.getItem('admin_user');
				
				if (isAuth && userStr) {
					try {
						const user = JSON.parse(userStr);
						set({
							isAuthenticated: true,
							user
						});
						return true;
					} catch (error) {
						console.error('Error parsing user data:', error);
					}
				}
			}
			
			set({
				isAuthenticated: false,
				user: null
			});
			return false;
		},
		hasPermission: (permission: string, state: AuthState) => {
			if (!state.user || !state.user.permissions[0]) return false;
			return state.user.permissions[0][permission as keyof typeof state.user.permissions[0]] || false;
		}
	};
}

export const adminAuth = createAuthStore();