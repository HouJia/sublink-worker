import { describe, expect, it } from 'vitest';
import { basePathFromEnv, normalizeBasePath, withBase, wrapFetch } from '../src/runtime/basePath.js';

describe('basePath', () => {
	it('defaults to /sublink when BASE_PATH unset', () => {
		expect(basePathFromEnv({}).basePath).toBe('/sublink');
	});

	it('supports root mode', () => {
		expect(basePathFromEnv({ BASE_PATH: '/' }).basePath).toBe('');
		expect(basePathFromEnv({ BASE_PATH: '' }).basePath).toBe('');
	});

	it('withBase joins paths', () => {
		expect(withBase('/sublink', '/clash')).toBe('/sublink/clash');
		expect(withBase('', '/clash')).toBe('/clash');
	});

	it('wrapFetch strips prefix and rewrites redirects', async () => {
		const inner = async (request) => {
			const url = new URL(request.url);
			if (url.pathname === '/clash') {
				return new Response('ok', { status: 200 });
			}
			if (url.pathname === '/redirect') {
				return new Response(null, { status: 302, headers: { Location: '/clash' } });
			}
			return new Response('missing', { status: 404 });
		};

		const wrapped = wrapFetch(inner, { basePath: '/sublink' });
		const root = await wrapped(new Request('http://localhost/'));
		expect(root.status).toBe(302);
		expect(root.headers.get('Location')).toBe('http://localhost/sublink/');

		const clash = await wrapped(new Request('http://localhost/sublink/clash'));
		expect(clash.status).toBe(200);

		const redirect = await wrapped(new Request('http://localhost/sublink/redirect'));
		expect(redirect.status).toBe(302);
		expect(redirect.headers.get('Location')).toBe('/sublink/clash');
	});
});
