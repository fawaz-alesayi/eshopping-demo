<script>
	import Icon from '@iconify/svelte';
	export let title;
	export let allowBack = true;
</script>

<header class="header">
	{#if allowBack}
		<i id="back" on:click={() => history.back()}>
			<Icon icon="akar-icons:arrow-left" height={24} width={24} />
		</i>
	{:else}
		<div style="width: 24px; height: 24px;" />
	{/if}

	<h4 id="title">{title}</h4>
	<slot class="slot">
		<div></div>
	</slot>
</header>

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 50px;
		margin: auto;
	}

	.header > :global(*) {
		margin-left: 10px;
		margin-right: 10px;
	}

	#title {
		margin-left: 0;
		flex-basis: 2;
	}

	.slot {
		width: 24px;
	}

	#back {
		cursor: pointer;
	}
</style>
