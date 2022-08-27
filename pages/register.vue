<script setup lang="ts">
import axios, { AxiosError } from "axios";
const { apiEndpoint, discord_oauth_link } = useRuntimeConfig().public;

const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const formError = ref("");

const showSendingAnimation = ref(false);

const route = useRoute();
const isExpanded = ref(!!route.query.expanded);

async function handleSubmit() {
	if (password.value !== password_confirmation.value) {
		formError.value = "Passwords do not match";
		return;
	}
	const timeout = setTimeout(() => {
		showSendingAnimation.value = true;
	}, 100);

	try {
		await axios.post(apiEndpoint + "/auth/password/register", {
			email: email.value,
			password: password.value,
		});
		navigateTo("/login?msg=Please sign in again using the password you've just entered.");
	} catch (e) {
		if (e instanceof AxiosError) formError.value = e.response?.data.message;
	} finally {
		showSendingAnimation.value = false;
		clearTimeout(timeout);
	}
}
</script>


<template>
	<div class="flex flex-col justify-center min-h-screen">
		<!-- <CustomBadge>Test</CustomBadge> -->
		<h1 class="mx-auto my-10 text-4xl text-gray-700 font-extrabold">Register</h1>

		<div class="mb-5 px-8 py-6 mx-auto w-full max-w-md bg-white shadow rounded-lg">

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

			<div class="flex items-center space-x-5 my-3">
				<div class="grow h-0.5  bg-gray-200 rounded"></div>
				<p class="text-gray-500 font-medium">OR</p>
				<div class="grow h-0.5  bg-gray-200 rounded"></div>

			</div>

			<button v-if="!isExpanded"
				class="flex justify-center px-5 py-2 w-full m-auto shadow-md bg-black text-white rounded transition-shadow hover:shadow-lg"
				@click="isExpanded = !isExpanded">
				<NuxtLink href="?expanded=true">
					<p class="font-medium">
						✉️ Register with E-mail
					</p>
				</NuxtLink>
			</button>

			<form @submit.prevent="handleSubmit" class="space-y-6 origin-top"
				:class="{ 'scale-y-0': !isExpanded, 'h-0': !isExpanded, 'transition-transform': isExpanded, 'duration-200': isExpanded }">
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
					<label for="password_confirmation" class="font-medium text-sm text-gray-700">Confirm
						Password</label>
					<div class="mt-1">
						<input type="password" autocomplete="new-password" id="password_confirmation" required
							v-model="password_confirmation"
							class="w-full border-gray-300 rounded shadow-sm transition-colors" />
					</div>
				</div>

				<p v-if="formError" class="text-center text-rose-500 font-medium">{{ formError }}</p>

				<button type="submit" :disabled="showSendingAnimation"
					class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
					<p class="group-disabled:animate-pulse">
						{{ showSendingAnimation ? 'Registering...' : 'Register' }}
					</p>
				</button>
			</form>
			<p class="mt-5 text-sm text-center text-gray-600 ">You have done this before?
				<nuxt-link href="/login" class="text-indigo-800 font-medium hover:underline">
					Sign in
				</nuxt-link>
			</p>
		</div>
	</div>
</template>
