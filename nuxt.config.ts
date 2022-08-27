import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	typescript: {
		shim: false
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt'
	],
	runtimeConfig: {
		public: {
			apiEndpoint: '',
			discord_oauth_link: '',
		}
	}
});
