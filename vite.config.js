import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs'

export default defineConfig({
	plugins: [sveltekit()],
	server : {
		host:'0.0.0.0',
		port:5173,
		strictPort:true,
		watch: {
			usePolling:true
		},
		proxy:{}
	}
});
