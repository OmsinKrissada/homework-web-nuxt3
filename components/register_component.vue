<script setup lang="ts">
import axios, { AxiosError } from "axios";
const { apiEndpoint, discord_oauth_link } = useRuntimeConfig().public;

const emit = defineEmits<{
	(e: 'error', message: string): void;
}>();

const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const isSending = ref(false);

async function handleSubmit() {
	if (password.value !== password_confirmation.value) {
		emit('error', "Passwords do not match");
		return;
	}
	const timeout = setTimeout(() => {
		isSending.value = true;
	}, 100);

	try {
		const res = await axios.post(apiEndpoint + "/auth/password/register", {
			email: email.value,
			password: password.value,
		});
		navigateTo('/login');
	} catch (e) {
		if (e instanceof AxiosError) emit('error', e.response?.data.message);
	} finally {
		isSending.value = false;
		clearTimeout(timeout);
	}
}
</script>

<template>
	<form @submit.prevent="handleSubmit" class="px-8 py-6 mx-auto space-y-6 w-full max-w-md bg-white shadow rounded-lg">

		<div class="mt-0">
			<label for="email" class="font-medium text-sm text-gray-700">Email</label>
			<div class="mt-1">
				<input type="email" autocomplete="email" id="email" placeholder="you@example.com" required
					v-model="email" class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>
		<div>
			<label for="password" class="font-medium text-sm text-gray-700">Password</label>
			<div class="mt-1">
				<input type="password" autocomplete="new-password" id="password" required v-model="password"
					class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>
		<div>
			<label for="password_confirmation" class="font-medium text-sm text-gray-700">Confirm Password</label>
			<div class="mt-1">
				<input type="password" autocomplete="new-password" id="password_confirmation" required
					v-model="password_confirmation"
					class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>

		<p v-if="error" class="text-center text-rose-500 font-medium">{{ error }}</p>

		<button type="submit" :disabled="isSending"
			class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
			<p class="group-disabled:animate-pulse">
				{{ isSending ? 'Registering...' : 'Register' }}
			</p>
		</button>

		<div class="flex items-center space-x-5">
			<div class="grow h-0.5  bg-gray-200 rounded"></div>
			<p class="text-gray-500 font-medium">OR</p>
			<div class="grow h-0.5  bg-gray-200 rounded"></div>

		</div>

		<FancyButton class="w-full shadow-md transition-shadow hover:shadow-lg">
			<a :href="discord_oauth_link">
				<div class="flex justify-center px-5 py-2 bg-blurple text-white rounded">

					<Clyde class="w-5 mr-3 fill-white" />
					<p class="font-medium">
						Continue with Discord
					</p>
				</div>
			</a>
		</FancyButton>



		<p class="text-sm text-center text-gray-600 ">You have done this before?
			<nuxt-link href="/login" class="text-indigo-800 font-medium hover:underline">
				Sign in
			</nuxt-link>
		</p>
	</form>
</template>
