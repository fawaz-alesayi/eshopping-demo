// src/stores/content.js
import { browser } from '$app/env';
import { writable } from 'svelte/store';

// Set the stored value or a sane default.
export const accessToken = writable(browser && localStorage.getItem('eshopping_access_token'));

// Anytime the store changes, update the local storage value.
accessToken.subscribe((value) => {
	if (browser) return localStorage.setItem('eshopping_access_token', value);
});
