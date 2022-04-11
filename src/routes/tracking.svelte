<script>
	import Header from '$lib/Header.svelte';
	import Icon from '@iconify/svelte';
	let randomNumber = Math.floor(Math.random() * 1000) + 1;
</script>

<Header title={'Order Placed'}>
	<a href="/">
		<i>
			<Icon icon="eva:home-outline" height={24} width={24} />
		</i>
	</a>
</Header>

<main class="content">
	<h4>Order #{randomNumber} has been placed</h4>

	<p>You can track your orders in the order tab</p>

	<button class="button primary">Track Order</button>
</main>

<style>
	.content {
		margin-left: auto;
		margin-right: auto;
		padding: 20px;
		text-align: center;
	}
</style>
