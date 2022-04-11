const base = import.meta.env.VITE_BACKEND;

export function api(
	method: string,
	endpoint: string,
	data?: Record<string, unknown>,
	accessToken?: string
) {
	return fetch(`${base}/${endpoint}`, {
		method,
		headers: {
			'content-type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': accessToken ? `Bearer ${accessToken}` : undefined
		},
		body: data && JSON.stringify(data)
	});
}
