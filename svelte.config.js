/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			out: 'build',
			precompress: false,
			env : {
				host: '127.0.0.1',
				port: '4444'
			}
		})
	}
};

export default config;
