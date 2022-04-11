import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const client = new PrismaClient();
	const form = await request.formData()
	console.log(form)

	return {
		status: 200
		
	};
};
