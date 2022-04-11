// src/stores/content.js
import { browser } from '$app/env';
import { derived, writable } from 'svelte/store';

// Set the stored value or a sane default.
export const cartStore = writable(browser && JSON.parse(localStorage.getItem('eshopping-cart')));

export const totalPrice = derived(cartStore, ($cartContents) => {
	let price = 0;
	$cartContents.forEach((e) => (price = price + e.price * e.quantity));
	return price;
});

// Anytime the store changes, update the local storage value.
cartStore.subscribe((value) => {
	if (browser) return localStorage.setItem('eshopping-cart', JSON.stringify(value));
});
