<script lang="ts">
	import type { Product } from './types';
	import Icon from '@iconify/svelte';

	export let products: Product[];
</script>

<div class="grid">
	{#each products as product}
		<div class="item">
			<img src={product.imageUrl} alt="A product" height="200px" width="150px" />

			<div class="middleInfo">
				<div class="name">{product.name}</div>
				<div class="price">
					<span>USD</span>
					{product.price}
				</div>
			</div>

			<div class="bottomInfo">
				<div class="rating">
					<i class="icon">
						<Icon icon="ant-design:star-filled" />
					</i>
					<span>{product.rating}</span>
				</div>

				<div class="reviewCount">
					<span>{product.reviewCount}</span>
					<span>Reviews</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		/* Auto layout */

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		padding: 24px;

		/* Colors / Grey Light 2 */

		background: #f3f3f3;
		border-radius: 30px 30px 0px 0px;

		width: 100%;
		min-height: 100vh;
	}

	.item {
		/* Auto layout */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 15px 40px;
		margin: 20px 20px;

		/* Colors / White */

		background: #ffffff;
		/* Effect / Shadow */

		box-shadow: 0px 4px 30px rgba(104, 117, 130, 0.05);
		border-radius: 15px;
	}

	.price {
		font-weight: bold;
	}

	.icon {
		position: relative;
		top: 2px;
	}

	.middleInfo {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.bottomInfo {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px;
		column-gap: 10px;
	}
</style>
