import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const client = new PrismaClient();
	const form = await request.formData()

	client.user.create({
		data: {
			address: {
				create: [
					{
						country: "Saudi Arabia",
						city: "Khobar",
						addressLine: "55th Street"
					}
				]
			},
			email: "fawaz@gmail.com",
			password: "12345678",
			firstName: "Fawaz",
			lastName: "Alesayi",
			creditCard: {
				create: [
					{
						number: "123456789",
						holderName: "Fawaz Alesayi",
						expiry: new Date(),
					}
				]
			},
		}
	})

	return {
		status: 200
		
	};
};
