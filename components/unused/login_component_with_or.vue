<script setup lang="ts">
import axios, { AxiosError } from "axios";
const { apiEndpoint, discord_oauth_link } = useRuntimeConfig().public;
const emit = defineEmits<{
	(e: 'error', message: string): void;
}>();


const route = useRoute();
const email = ref("");
const password = ref("");
const keep_signed = ref(true);
const error = ref("");

const isSending = ref(false);


async function handleSubmit() {
	const timeout = setTimeout(() => {
		isSending.value = true;
	}, 100);

	try {
		await axios.post(apiEndpoint + "/auth/password/login", {
			email: email.value,
			password: password.value,
		});
	} catch (e) {
		if (e instanceof AxiosError) {
			console.log('error in axios');
			if (!e.response?.data) emit('error', 'No response from server');
			emit('error', e.response?.data.message);
		} else
			emit('error', String(e));
	} finally {
		isSending.value = false;
		clearTimeout(timeout);
	}
}
</script>

<template>
	<div class="px-8 py-6 mx-auto  bg-white shadow rounded-lg">
		<div class="flex flex-col sm:flex-row items-stretch">
			<form @submit.prevent="handleSubmit" class="space-y-6">
				<div class="mt-0">
					<label for="email" class="font-medium text-sm text-gray-700">Email</label>
					<div class="mt-1">
						<input type="email" autocomplete="email" name="email" placeholder="you@example.com"
							v-model="email" class="w-full border-gray-300 rounded shadow-sm transition-colors" />
					</div>
				</div>
				<div>
					<label for="password" class="font-medium text-sm text-gray-700">Password</label>
					<div class="mt-1">
						<input type="password" autocomplete="new-password" name="password" v-model="password"
							class="w-full border-gray-300 rounded shadow-sm transition-colors" />
					</div>
				</div>
				<div class="flex items-center">
					<input type="checkbox" id="keep_signed" v-model="keep_signed"
						class="rounded transition-all focus:ring-1">
					<label for="keep_signed" class="ml-2 block text-sm">Keep me signed in</label>
				</div>

				<p v-if="error" class="text-center text-rose-500 font-medium">{{ error }}</p>

				<button type="submit" :disabled="isSending"
					class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
					<p class="group-disabled:animate-pulse">
						{{ isSending ? 'Signing in...' : 'Sign in' }}
					</p>
				</button>
			</form>

			<div class="flex flex-col items-center space-y-5 min-h-full m-10">
				<div class="grow w-0.5 bg-gray-200 rounded"></div>
				<p class="text-gray-500 font-medium">OR</p>
				<div class="grow w-0.5 bg-gray-200 rounded"></div>
			</div>

			<FancyButton class="h-fit m-auto shadow-md transition-shadow hover:shadow-lg">
				<a :href="discord_oauth_link">
					<div class="flex justify-center px-5 py-2 bg-blurple text-white  rounded ">

						<Clyde class="w-5 mr-3 fill-white" />
						<p class="font-medium">
							Continue with Discord
						</p>
					</div>
				</a>
			</FancyButton>
		</div>
		<p class="mt-5 text-sm text-center text-gray-600 ">Don't have an account?
			<nuxt-link href="/register" class="text-indigo-800 font-medium hover:underline">
				Register
			</nuxt-link>
		</p>
	</div>

</template>
