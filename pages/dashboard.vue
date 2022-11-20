<script setup lang="ts">
import axios from 'axios';

const { apiEndpoint } = useRuntimeConfig().public;
const router = useRouter();

const userData = useUserData();

onMounted(async () => {
	if (!userData.token) router.push('/login');
	const { data } = await axios.get(apiEndpoint + '/users/' + userData.id);
	console.log(data);
	userData.avatarURL = data.avatarURL;
	userData.tag = data.tag;
	userData.accentColor = data.accentColor;
	userData.bannerColor = data.bannerColor;
});
// const { data } = await useFetch(apiEndpoint + '/homeworks');
</script>

<template>
	<div id="idk" class="min-h-screen p-5">
		<Profile />
		<HomeworkForm />
	</div>
</template>
