<script context="module">
	const products = [
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 1',
			price: '10.00',
			reviewCount: 5,
			rating: 4.5,
			count: 1
		},
		{
			imageUrl: 'https://picsum.photos/200/300',
			name: 'Product 2',
			price: '20.00',
			reviewCount: 10,
			rating: 4.0,
			count: 2
		}
	];

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export const load = async ({}) => {
		return {
			props: {
				products
			}
		};
	};
</script>

<script lang="ts">
	import CheckoutProduct from '$lib/CheckoutProduct.svelte';
	import Header from '$lib/Header.svelte';
	import type { Product } from '$lib/types';
	import Icon from '@iconify/svelte';

	export let products: Product[] & {
		count: number;
	};

	const handleClick = (product) => {
		const index = products.indexOf(product);
		products.splice(index, 1);
		products = products;
	};
</script>

<Header title={'Cart'}>
	<i>
		<Icon icon="fluent:delete-20-regular" height={24} width={24} />
	</i>
</Header>

<div class="checkoutGrid">
	{#each products as product (product)}
		<div class="product">
			<CheckoutProduct {product} />
			<i
				on:click={() => {
					handleClick(product);
				}}
			>
				<Icon icon="fluent:delete-20-regular" height={24} width={24} />
			</i>
		</div>
	{/each}
</div>

<style>
	.checkoutGrid {
		/* Auto layout */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 20px;
		row-gap: 20px;
	}

	.product {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;
		max-width: 600px;
		margin: auto;
	}
</style>
