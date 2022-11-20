// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	typescript: {
		shim: false
	},
	modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxtjs/google-fonts',
	],
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			apiEndpoint: '',
			discord_oauth_link: '',
		}
	},
	googleFonts: {
		families: {
			Sarabun: [400, 500],
			Inter: [400, 500],
		}
	},
});
