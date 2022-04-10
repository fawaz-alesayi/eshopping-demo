<header class="header">
	<slot />
</header>

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 50px;
	}

	.header > :global(*) {
		margin-left: 10px;
		margin-right: 10px;
	}
</style>
