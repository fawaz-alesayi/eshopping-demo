<script lang="ts">
	import { cartStore, totalPrice } from '$lib/cartStore';
	import CheckoutProduct from '$lib/CheckoutProduct.svelte';
	import Header from '$lib/Header.svelte';
	import Icon from '@iconify/svelte';

	const deleteProduct = (product) => {
		const index = $cartStore.indexOf(product);
		$cartStore.splice(index, 1);
		$cartStore = $cartStore;
	};

	const deleteAllProducts = () => {
		$cartStore = [];
		$cartStore = $cartStore;
	};
</script>

<Header title={'Cart'}>
	<i on:click={deleteAllProducts}>
		<Icon icon="fluent:delete-20-regular" height={24} width={24} />
	</i>
</Header>

<div class="checkoutGrid">
	{#each $cartStore as product}
		<div class="product">
			<CheckoutProduct {product} />
			<i
				class="delete"
				on:click={() => {
					deleteProduct(product);
				}}
			>
				<Icon icon="fluent:delete-20-regular" height={24} width={24} />
			</i>
		</div>
	{/each}
	<footer class="footer">
		<strong>Total: {$totalPrice} SR</strong>
		<!--Checkout Button-->
		<a href="/checkout">
			<button class="button primary" disabled={$totalPrice < 1}>Checkout</button>
		</a>
	</footer>
</div>

<style>
	.checkoutGrid {
		/* Auto layout */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: 20px;
		row-gap: 20px;
		height: 90vh;
		margin: auto;
	}

	.product {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.footer {
		margin-left: auto;
		margin-right: auto;
	}

	.footer > :global(*) {
		display: block;
	}

	.delete {
		cursor: pointer;
	}
</style>
