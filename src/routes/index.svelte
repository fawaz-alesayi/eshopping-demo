<script context="module" lang="ts">
	// return test product props
	const products = [
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 1',
			price: '10.00',
			reviewCount: 5,
			rating: 4.5
		},
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 2',
			price: '20.00',
			reviewCount: 10,
			rating: 4.0
		},
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 3',
			price: '30.00',
			reviewCount: 15,
			rating: 4.5
		},
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 4',
			price: '40.00',
			reviewCount: 20,
			rating: 4.0
		},
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 5',
			price: '50.00',
			reviewCount: 25,
			rating: 4.5
		}
	];

	export const load: import('@sveltejs/kit').Load = async ({}) => {
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

	export let products: Product[];
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<Header>
	<i on:click={() => history.back()}>
		<Icon icon="akar-icons:arrow-left" height={24} width={24} />
	</i>
	<h4>Search</h4>
	<a href="/cart">
		<i>
			<Icon icon="eva:shopping-cart-outline" height={24} width={24} />
		</i>
	</a>
</Header>

<div class="searchBar">
	<Icon icon="akar-icons:search" />
	<input id="textField" type="text" placeholder="Search"/>
</div>

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
	}

	#textField {
		border: none;
		transition: none;
		outline: none;
	}

	#textField:focus {
		outline: none;
	}
</style>
