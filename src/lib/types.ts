export type Product = {
	imageUrl: string;
	name: string;
	price: string;
	reviewCount: number;
	rating: number;
};

export type CartItem = Product & {
	quantity: number;
};
