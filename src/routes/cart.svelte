<script lang="ts">
	import { cartStore, totalPrice } from '$lib/cartStore';

	import CheckoutProduct from '$lib/CheckoutProduct.svelte';
	import Header from '$lib/Header.svelte';
	import type { CartItem, Product } from '$lib/types';
	import Icon from '@iconify/svelte';

	console.log($cartStore);

	const handleClick = (product) => {
		const index = $cartStore.indexOf(product);
		$cartStore.splice(index, 1);
		$cartStore = $cartStore;
	};
</script>

<Header title={'Cart'}>
	<i>
		<Icon icon="fluent:delete-20-regular" height={24} width={24} />
	</i>
</Header>

<div class="checkoutGrid">
	{#each $cartStore as product}
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
	<strong>Total: {$totalPrice} SR</strong>
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
