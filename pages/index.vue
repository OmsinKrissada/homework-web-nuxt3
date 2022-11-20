<script setup lang="ts">
const userData = useUserData();
</script>

<template>
	<div class="text-white">
		<!-- <NuxtWelcome></NuxtWelcome> -->
		<p>Data: {{ userData }}</p>
		<h1>Your nickname is {{ userData.nickname }}</h1>
		<div>
			<NuxtLink href="/login">Login Page</NuxtLink>
		</div>
		<div>
			<NuxtLink href="/register">Register Page</NuxtLink>
		</div>
		<div>
			<NuxtLink href="/dashboard">Dashboard</NuxtLink>
		</div>
		<!-- <div class="mx-auto max-w-7xl bg-slate-800 rounded-md">
			<h3 class="py-6 font-medium text-center text-2xl">Timetable</h3>
			<SvgTimetable></SvgTimetable>
		</div> -->

		<InputNickname v-if="!userData.nickname"></InputNickname>
	</div>
</template>
