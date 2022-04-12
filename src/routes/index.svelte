<script context="module" lang="ts">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;

	const productEndpoint = import.meta.env.VITE_BACKEND + '/search_items';
	export const load: import('@sveltejs/kit').Load = async ({}) => {
		const products = await getProducts(productEndpoint);

		return {
			props: {
				products
			}
		};
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProductGrid from '$lib/ProductGrid.svelte';
	import type { Product } from '$lib/types';
	import Header from '$lib/Header.svelte';
	import getProducts from '$lib/getProducts';
	import { accessTokenStore } from '$lib/store';
	import { cartStore } from '$lib/cartStore';
	import { onMount } from 'svelte';

	const productEndpoint = import.meta.env.VITE_BACKEND + '/search_items';
	export let products: Product[];
	let searchTerm = '';

	onMount(() => {
		if ($accessTokenStore && products.length > 0) {
			cartStore.set([
				{
					...products[0],
					quantity: 2
				}
			]);
		}
	});

	const searchProducts = async () => {
		const result = await getProducts(productEndpoint, searchTerm);
		products = result;
	};
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<Header title="Products" allowBack={false}>
	{#if $accessTokenStore}
		<a href="/cart">
			<i>
				<Icon icon="eva:shopping-cart-outline" height={24} width={24} />
			</i>
		</a>
	{:else}
		<a href="/register" id="register"> Register </a>
	{/if}
</Header>

<form class="searchBar" on:submit|preventDefault={searchProducts}>
	<Icon icon="akar-icons:search" />
	<input id="textField" bind:value={searchTerm} type="text" placeholder="Search" />
</form>

<ProductGrid {products} />

<style>
	.searchBar {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px 15px;
		width: 80%;
		margin: 10px auto;
		background: #ffffff;
		border: 1px solid #bababa;
		border-radius: 10px;
		max-width: 600px;
	}

	#textField {
		border: none;
		transition: none;
		outline: none;
	}

	#textField:focus {
		outline: none;
	}

	#register {
		position: relative;
		right: 40px;
		max-width: 24px;
	}
</style>
