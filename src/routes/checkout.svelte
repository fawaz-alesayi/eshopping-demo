<script>
	import Header from '$lib/Header.svelte';
	import PaymentInfo from '$lib/PaymentInfo.svelte';
	import { cartStore } from '$lib/cartStore';
	import { onMount } from 'svelte';
	import { api } from '$lib/api';
	import { accessTokenStore } from '$lib/store';

	let userInfo = {};

	onMount(async () => {
		const token = $accessTokenStore;
		const result = await api('GET', '/get_profile', undefined, token);

		if (result.status < 300) {
			const data = await result.json();
			userInfo = data;
		}
	});

	const checkout = async (e) => {
		// get form data
		const formData = new FormData(e.target);
		const json = Object.fromEntries(formData.entries());

		const itemsToCheckout = $cartStore.map((item) => {
			return {
				item_name: item.name,
				item_price: item.price.toString(),
				quantity: item.quantity.toString()
			};
		});

		const checkoutPayload = {
			email: userInfo.email,
			items: [...itemsToCheckout]
		};

		const result = await api('POST', '/checkout', checkoutPayload, $accessTokenStore);

		if (result.status === 200 || result.status === 201) {
			const data = await result.json();
			console.log(data);
			if (window) {
				window.location.href = '/tracking';
			}
		}
	};
</script>

<Header title={'Payment Method'} />

<!-- A radio group that has the choices: Mada, Visa, MasterCard-->
<div id="container">
	<form class="form-group" on:submit|preventDefault={checkout}>
		<div class="vertical-text">
			<h2 for="paymentMethod">Finish Payment</h2>
			<p>We will use the card information that you provided in your registration</p>
		</div>

		<!-- <PaymentInfo buttonName={'Send Payment'} /> -->
		<!--CVV -->
		<input type="text" class="form-control" id="cvv" placeholder="CVV" name="cvv" maxlength="3" />
		<button class="button primary"> Send Payment </button>
	</form>
</div>

<style>
	#container {
		margin-left: auto;
		margin-right: auto;
		padding: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		margin-bottom: 20px;
		row-gap: 10px;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
	}

	.vertical-text {
		text-align: center;
	}

	.form-check {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.form-check-input {
		margin-left: auto;
		margin-right: auto;
		background-color: #d1d3d1;
	}

	#cvv {
		width: 100px;
	}
</style>
