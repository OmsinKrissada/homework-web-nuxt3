<script setup lang="ts">
const { apiEndpoint } = useRuntimeConfig().public;
const { id, token } = useUserData();
const router = useRouter();

const { data } = await useFetch(apiEndpoint + '/homeworks');

onMounted(() => {
	if (!token.value) router.push('/login');
});
</script>

<template>
	<div>
		<p>Data: {{ data }}</p>
		<input type="text" v-model="id">
		{{ id }}
		<button @click="token = ''">Clear</button>
	</div>
</template>