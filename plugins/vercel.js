export default defineNuxtPlugin(nuxtApp => {
	if (process.env.VERCEL) {
		import('@vercel/analytics').then(r => r.inject());
		console.log('injecting vercel analytics');
	};
});
