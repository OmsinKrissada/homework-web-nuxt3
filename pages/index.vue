<script setup lang="ts">
import { format, formatISO, getYear } from 'date-fns';
import { th } from 'date-fns/locale';
import { useUserStore } from '~~/store/useUserStore';

const user = useUserStore();
const currentTime = computed(() => {
	const time = useTimestamp({ interval: 1000 }).value;
	const separator = Math.floor(time.valueOf() / 1000) % 2 == 0 ? ':' : ' ';
	return format(time, `HH${separator}mm${separator}ss`);
});
const currentDay = computed(() => {
	const day = useTimestamp({ interval: 1000 }).value;
	// const separator = Math.floor(day.valueOf() / 1000) % 2 == 0 ? ':' : ' ';
	const year = getYear(day) + 543;
	return format(day, `วันeeeeที่ dd MMMM พ.ศ. ${year}`, { locale: th });
});
</script>

<template>
	<div class="lg:max-w-7xl mx-auto py-8 text-white">
		<ClientOnly>
			<InputNickname v-if="!user.nickname"></InputNickname>
		</ClientOnly>
		<!-- <NuxtWelcome></NuxtWelcome> -->
		<!-- <p>Data: {{ user }}</p> -->
		<!-- <h1>Your nickname is {{ user.nickname }}</h1> -->

		<div class="mt-4 mb-8 font-sarabun text-lg text-center">
			<p class="mb-2 font-medium text-slate-500">ตอนนี้เวลา</p>
			<p class="mb-2 font-inter font-bold text-3xl text-slate-300">
				{{ currentTime }}
			</p>
			<p class="mb-2 font-medium text-slate-500">ของ</p>
			<p class="font-inter text-xl text-slate-300">
				{{ currentDay }}
			</p>
		</div>

		<HomeworkList />
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
