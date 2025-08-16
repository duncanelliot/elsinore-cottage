import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		login: (password: string) => {
			const correctPassword = 'seaside2024';
			if (password === correctPassword) {
				set(true);
				if (browser) {
					sessionStorage.setItem('admin_authenticated', 'true');
				}
				return true;
			}
			return false;
		},
		logout: () => {
			set(false);
			if (browser) {
				sessionStorage.removeItem('admin_authenticated');
			}
		},
		checkAuth: () => {
			if (browser) {
				const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
				set(isAuth);
				return isAuth;
			}
			return false;
		}
	};
}

export const adminAuth = createAuthStore();