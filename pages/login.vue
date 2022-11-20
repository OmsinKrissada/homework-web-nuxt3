<script setup lang="ts">
import axios, { AxiosError } from "axios";
const { apiEndpoint, discord_oauth_link } = useRuntimeConfig().public;
const route = useRoute();
const router = useRouter();

const msg = ref(route.query.msg);
const errorMsg = ref(route.query.error);

const email = ref("");
const password = ref("");
const keep_signed = ref(true);
const formError = ref('');

const showSendingAnimation = ref(false);

const isExpanded = ref(!!route.query.expanded);

async function handleSubmit() {
	const timeout = setTimeout(() => {
		showSendingAnimation.value = true;
	}, 100);

	try {
		const { data } = await axios.post(apiEndpoint + "/auth/password/login", {
			email: email.value,
			password: password.value,
		});
		if (data.access_token) {
			const userData = useUserData();
			userData.id = data.id;
			userData.token = data.access_token;
			router.push('/dashboard');
		}
	} catch (e) {
		if (e instanceof AxiosError) {
			console.log('error in axios');
			if (!e.response?.data) formError.value = 'No response from server';
			formError.value = e.response?.data.message;
		} else
			formError.value = String(e);
	} finally {
		showSendingAnimation.value = false;
		clearTimeout(timeout);
	}
}
</script>

<template>
	<div class="flex flex-col justify-center items-center space-y-5 min-h-screen">
		<h1 class="mx-auto text-4xl text-secondary font-extrabold">Sign in</h1>
		<CustomBadge v-if="errorMsg" type="error" class="scale-0 max-w-md w-full transition-all"
			:class="{ 'scale-100': !!errorMsg }">{{
					errorMsg
			}}
		</CustomBadge>
		<CustomBadge v-if="msg" type="info" class="scale-0 max-w-md w-full transition-all"
			:class="{ 'scale-100': !!msg }">{{
					msg
			}}
		</CustomBadge>
		<!-- <CustomBadge type="error">Message here</CustomBadge> -->
		<div class="mb-5 px-8 py-6 mx-auto w-full max-w-md bg-accent shadow rounded-lg">

			<a :href="discord_oauth_link">
				<FancyButton class="w-full shadow-md transition-shadow hover:shadow-lg">
					<div class="flex justify-center px-5 py-2 bg-blurple text-white rounded">

						<Clyde class="w-5 mr-3 fill-white" />
						<p class="font-medium">
							Continue with Discord
						</p>
					</div>
				</FancyButton>
			</a>

			<div class="flex items-center space-x-5 my-3">
				<div class="grow h-0.5 bg-slate-600 rounded"></div>
				<p class="text-neutral font-medium">OR</p>
				<div class="grow h-0.5 bg-slate-600 rounded"></div>

			</div>

			<NuxtLink href="?expanded=true" @click="isExpanded = !isExpanded">
				<button v-if="!isExpanded"
					class="flex justify-center px-5 py-2 w-full m-auto shadow-md bg-black text-white rounded transition-shadow hover:shadow-lg">
					<p class="font-medium">
						✉️ Sign in with E-mail
					</p>
				</button>
			</NuxtLink>

			<form @submit.prevent="handleSubmit" class="space-y-6 origin-top"
				:class="{ 'scale-y-0': !isExpanded, 'h-0': !isExpanded, 'transition-transform': isExpanded, 'duration-200': isExpanded }">
				<div class="mt-0">
					<label for="email" class="font-medium text-sm text-secondary">Email</label>
					<div class="mt-1">
						<input type="email" autocomplete="email" name="email" placeholder="you@example.com" required
							v-model="email"
							class="w-full bg-neutral/10 border-none text-neutral focus:text-slate-300 font-medium focus:ring-2 focus:ring-indigo-400 rounded shadow-sm transition-[color_box-shadow]" />
					</div>
				</div>
				<div>
					<label for="password" class="font-medium text-sm text-secondary">Password</label>
					<div class="mt-1">
						<input type="password" autocomplete="new-password" name="password" v-model="password" required
							class="w-full bg-neutral/10 border-none text-neutral focus:text-slate-300 font-medium focus:ring-2 focus:ring-indigo-400 rounded shadow-sm transition-[color_box-shadow]" />
					</div>
				</div>
				<div class="flex items-center">
					<input type="checkbox" id="keep_signed" v-model="keep_signed" disabled
						class="rounded transition-all focus:ring-1">
					<label for="keep_signed" class="ml-2 block text-sm text-secondary">Keep me signed in</label>
				</div>

				<p v-if="formError" class="text-center text-rose-400 font-medium">{{ formError }}</p>

				<button type="submit" :disabled="showSendingAnimation"
					class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
					<p class="group-disabled:animate-pulse">
						{{ showSendingAnimation ? 'Signing in...' : 'Sign in' }}
					</p>
				</button>
			</form>
			<p class="mt-5 text-sm text-center text-neutral">Don't have an account?
				<nuxt-link href="/register" class="font-medium text-primary hover:underline">
					Register
				</nuxt-link>
			</p>
		</div>
	</div>
</template>
