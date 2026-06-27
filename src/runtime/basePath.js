/** @typedef {{ basePath: string, publicOrigin: string }} BasePathConfig */

export const DEFAULT_BASE_PATH = '/sublink';

/**
 * @param {string} [raw]
 * @returns {string}
 */
export function normalizeBasePath(raw) {
	const value = String(raw ?? '').trim();
	if (!value || value === '/') {
		return '';
	}
	const withSlash = value.startsWith('/') ? value : `/${value}`;
	return withSlash.replace(/\/$/, '');
}

/**
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {BasePathConfig}
 */
export function basePathFromEnv(env = process.env) {
	const configured = env.BASE_PATH;
	const basePath = normalizeBasePath(
		configured === undefined || configured === '' ? DEFAULT_BASE_PATH : configured
	);
	const publicOrigin = String(env.PUBLIC_ORIGIN || '').trim().replace(/\/$/, '');
	return { basePath, publicOrigin };
}

/**
 * @param {string} basePath
 * @param {string} path
 */
export function withBase(basePath, path) {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return basePath ? `${basePath}${normalized}` : normalized;
}

/**
 * @param {typeof fetch} fetchImpl
 * @param {{ basePath?: string }} [options]
 */
export function wrapFetch(fetchImpl, { basePath = '' } = {}) {
	if (!basePath) {
		return fetchImpl;
	}

	return async (request) => {
		const url = new URL(request.url);

		if (url.pathname === '/' || url.pathname === '') {
			return Response.redirect(`${url.origin}${basePath}/`, 302);
		}
		if (url.pathname === basePath) {
			return Response.redirect(`${url.origin}${basePath}/`, 302);
		}

		let nextRequest = request;
		if (url.pathname.startsWith(`${basePath}/`)) {
			url.pathname = url.pathname.slice(basePath.length) || '/';
			nextRequest = new Request(url.toString(), request);
		}

		const response = await fetchImpl(nextRequest);
		const location = response.headers.get('Location');
		if (!location || !location.startsWith('/') || location.startsWith(`${basePath}/`) || location === basePath) {
			return response;
		}
		if (location.includes('://') || location.startsWith('//')) {
			return response;
		}

		const headers = new Headers(response.headers);
		headers.set('Location', withBase(basePath, location));
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers
		});
	};
}
