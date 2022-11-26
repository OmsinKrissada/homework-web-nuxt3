<script setup lang="ts">
import { useUserStore } from '~~/store/useUserStore';

const user = useUserStore();
</script>

<template>
	<div class="lg:max-w-7xl mx-auto text-white">
		<ClientOnly>
			<InputNickname v-if="!user.nickname"></InputNickname>
		</ClientOnly>
		<!-- <NuxtWelcome></NuxtWelcome> -->
		<!-- <p>Data: {{ user }}</p> -->
		<h1>Your nickname is {{ user.nickname }}</h1>

		<HomeworkItem></HomeworkItem>
		<!-- <div>
			<NuxtLink href="/login">Login Page</NuxtLink>
		</div>
		<div>
			<NuxtLink href="/register">Register Page</NuxtLink>
		</div>
		<div>
			<NuxtLink href="/dashboard">Dashboard</NuxtLink>
		</div> -->
		<!-- <div class="mx-auto max-w-7xl bg-slate-800 rounded-md">
			<h3 class="py-6 font-medium text-center text-2xl">Timetable</h3>
			<SvgTimetable></SvgTimetable>
		</div> -->
	</div>
</template>
