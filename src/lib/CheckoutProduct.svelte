<script>
	export let product;
</script>

<div class="productContainer">
	<img src={product.imageUrl} width={90} height={90} alt="A product" />
	<div class="details">
		<p>{product.name}</p>
		<p class="price">{product.price}</p>

		<div class="actions">
			<i
				class="changeCount"
				on:click={() => {
                    if (product.count > 1) {
                        product.count--;
                    }
					product = product;
				}}
			>
				-
			</i>
			{product.count}
			<i
				class="changeCount"
				on:click={() => {
					product.count++;
					product = product;
				}}
			>
				+
			</i>
		</div>
	</div>
</div>

<style>
	.productContainer {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 0px;
		width: 100%;
	}

	.details {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0px;
	}

	.details > * {
		flex: none;
		order: 1;
		align-self: stretch;
		flex-grow: 1;
		margin: 0px 15px;
	}

	.actions {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px;
		width: 100%;
	}

	.price {
		font-weight: bold;
	}

	.changeCount {
		font-weight: bold;
		font-size: 2em;
		height: 48px;
		width: 48px;
		vertical-align: middle;

		/* Auto layout */

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-left: 5px;
		padding-right: 5px;

		/* Colors / White */

		background: #ffffff;
		/* Colors / Grey */

		border: 1px solid #bababa;
		box-sizing: border-box;
		border-radius: 10px;
	}
</style>
