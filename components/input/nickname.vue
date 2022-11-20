<script setup lang="ts">
const userData = useUserData();
const nicknameTemp = ref('');

function handleSubmit() {
	userData.nickname = nicknameTemp.value;
	// alert(`Welcome, ${nickname.value}.`);
};
</script>

<template>
	<div class="fixed inset-0 backdrop-blur-md">

		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto px-8 py-6 w-full max-w-md bg-accent shadow rounded-lg">

			<form @submit.prevent="handleSubmit" class="space-y-6">
				<h1 class="mx-auto text-xl text-secondary font-extrabold">Please tell me your name
					{{ userData.nickname }}</h1>
				<div class="">
					<label for="nickname" class="font-medium text-sm text-secondary">Nickname</label>
					<div class="mt-1">
						<input type="nickname" name="nickname" autocomplete="nickname" placeholder="Ex. Nok Dodo"
							v-model="nicknameTemp" autofocus required
							class="w-full p-2 bg-neutral/10 border-none text-slate-300 font-medium focus:ring-2 focus:ring-indigo-400 rounded shadow-sm transition-[color_box-shadow]" />
					</div>
				</div>

				<button type="submit"
					class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
					<p class="group-disabled:animate-pulse">
						Continue
					</p>
				</button>
			</form>
			<!-- <p class="mt-5 text-sm text-center text-neutral">Don't have an account?
				<nuxt-link href="/register" class="font-medium text-primary hover:underline">
					Register
				</nuxt-link>
			</p> -->
		</div>
	</div>
</template>