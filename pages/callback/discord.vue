<script setup lang="ts">
import axios from 'axios';

const { apiEndpoint } = useRuntimeConfig().public;

const route = useRoute();
const router = useRouter();


const msg = ref('');
const error = ref('');
const pending = ref(true);

function showError(value: string) {
	if (value === 'Field is required') value = "You've cancelled the sign-in process.";
	router.replace(`/login?error=${value}`);
}

onMounted(async () => {
	try {
		const { data } = await axios.post(apiEndpoint + '/auth/discord', route.query);
		const userData = useUserData();
		userData.id = data.id;
		userData.token = data.access_token; msg.value = data;
		router.replace('/dashboard');
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
			if (!e.response?.data) {
				showError('No response from server');
				return;
			}
			showError((e.response?.data as any).message);
		} else {
			showError(e as string);
		}
	} finally {
		pending.value = false;
	}
});


</script>

<template>
	<div>
		<p> Redirecting...</p>
		<!-- <p>Pending: {{ pending }}</p> -->
		<!-- <p v-if="msg">Response: {{ msg }}</p> -->
		<p v-if="error">Error: {{ error }}</p>
	</div>
</template>