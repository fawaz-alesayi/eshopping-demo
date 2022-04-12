import type { Writable } from 'svelte/store';

export const setAccessToken = (token: string, store: Writable<string>) => {
	store.set(token);
};

export const handleAuthRoute = (authStore) => {
	if (authStore) {
		return true;
	} else {
		if (window) {
			window.location.href = "/"
		}
	}
}