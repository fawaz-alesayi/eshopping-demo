export default async function getProducts(productEndpoint: string, query?: string) {
	const result = await fetch(productEndpoint + `?search_query=${query ? query : ''}`, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'XMLHttpRequest'
		}
	});

	if (result.status !== 200) {
		return [];
	}

	const items = await result.json();
	console.log(items);

	const products = items
		.map((item) => {
			return {
				imageUrl: item.image,
				name: item.name,
				price: item.price,
				reviewCount: item.Reviews,
				rating: item.rating
			};
		})
		.filter((item) => {
			// only return valid urls
			return item.imageUrl.startsWith('http');
		});

	return products;
}
