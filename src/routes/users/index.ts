import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const form = request.formData();

	return {
		status: 200
	};
};
