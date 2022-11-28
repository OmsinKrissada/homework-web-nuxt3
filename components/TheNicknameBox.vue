<script setup lang="ts">
import { useUserStore } from '~~/store/useUserStore';

const user = useUserStore();
const nicknameTemp = ref('');

function handleSubmit() {
	user.nickname = nicknameTemp.value;
	// alert(`Welcome, ${nickname.value}.`);
};
</script>

<template>
	<div class="fixed inset-0 backdrop-blur-md z-10">
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto px-8 py-6 w-full max-w-md bg-accent shadow sm:rounded-lg">

			<form @submit.prevent="handleSubmit" class="space-y-6">
				<h1 class="mx-auto font-prompt text-xl text-secondary font-extrabold">
					กรุณาระบุตัวตน
				</h1>

				<div>
					<label for="nickname" class="font-prompt font-medium text-sm text-secondary">ชื่อเล่น</label>
					<input type="nickname" id="nickname" autocomplete="off" placeholder="Ex. Kingau" autofocus required
						v-model="nicknameTemp"
						class="mt-1 w-full p-2 bg-neutral/10 focus:outline-none text-slate-300 font-medium focus:ring-2 focus:ring-indigo-400 rounded shadow-sm transition-[color_box-shadow]" />

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