import type { Writable } from 'svelte/store';

export const setAccessToken = (token: string, store: Writable<string>) => {
	store.set(token);
};
