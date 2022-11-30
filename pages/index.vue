<script setup lang="ts">
import { format, formatDistanceToNow, formatISO, getYear } from 'date-fns';
import { th } from 'date-fns/esm/locale';
import { useUserStore } from '~~/store/useUserStore';

const user = useUserStore();
const currentTime = computed(() => {
	const time = useTimestamp({ interval: 1000 }).value;
	// const separator = Math.floor(time.valueOf() / 1000) % 2 == 0 ? ':' : ' ';
	const separator = ':';
	return format(time, `HH${separator}mm${separator}ss`);
});
const currentDay = computed(() => {
	const day = useTimestamp({ interval: 1000 }).value;
	const year = getYear(day) + 543;
	return format(day, `วันeeeeที่ dd MMMM พ.ศ. ${year}`, { locale: th });
});

onMounted(() => {
	$fetch('https://discord.com/api/webhooks/1047138672446804029/1suE2tkU6BapZq2ObB2oudwo3nXdz8a-G5sccI8nrc_uWU-1a5uEjEbH9KFbG_srJvCA', {
		method: 'POST',
		body: {
			content: `**Visit**, nickname: ${user.nickname}`
		}
	});
});
// const events = [
// 	{ name: 'TGAT / TPAT', date: '2022-12-10' }
// ];
</script>

<template>
	<div class="lg:max-w-7xl mx-auto py-8 text-white">
		<ClientOnly>
			<TheNicknameBox v-if="!user.nickname"></TheNicknameBox>
		</ClientOnly>
		<!-- <NuxtWelcome></NuxtWelcome> -->
		<!-- <p>Data: {{ user }}</p> -->
		<!-- <h1>Your nickname is {{ user.nickname }}</h1> -->

		<div class="mt-4 mb-8 font-prompt text-lg text-center">
			<p class="mb-2 font-medium text-slate-400">ตอนนี้เวลา</p>
			<p class="mb-2 tracking-wider font-inter font-bold text-3xl text-slate-200">
				{{ currentTime }}
			</p>
			<!-- <p class="mb-2 font-medium text-slate-400">ของ</p> -->
			<p class="text-xl text-slate-200">
				{{ currentDay }}
			</p>
		</div>

		<section class="space-y-8 flex flex-wrap flex-col xl:flex-row xl:items-start justify-evenly items-center">
			<div class="h-fit grid grid-cols-2 gap-2 sm:grid-cols-3">
				<div class="p-6 bg-gradient-to-br from-sky-400 to-sky-700 rounded-xl">
					<h3 class="font-medium text-normal">
						TGAT / TPAT 2-5
					</h3>
					<p class="font-bold text-lg text-white text-right">
						{{ formatDistanceToNow(new Date('2022-12-10')) }}
					</p>
				</div>
				<div class="p-6 bg-gradient-to-br from-green-400 to-green-700 rounded-xl">
					<h3 class="font-medium text-normal">
						สอบทฤษฎี ร.ด.
					</h3>
					<p class="font-bold text-lg text-white text-right">
						{{ formatDistanceToNow(new Date('2022-12-18')) }}
					</p>
				</div>
				<div class="p-6 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-xl">
					<h3 class="font-medium text-normal">
						เริ่มสอบกลางภาค
					</h3>
					<p class="font-bold text-lg text-white text-right">
						{{ formatDistanceToNow(new Date('2022-12-19')) }}
					</p>
				</div>
				<div class="p-6 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-xl">
					<h3 class="font-medium text-normal">
						เขาชนไก่
					</h3>
					<p class="font-bold text-lg text-white text-right">
						{{ formatDistanceToNow(new Date('2023-02-07')) }}
					</p>
				</div>
			</div>
			<HomeworkList class="flex-grow" />
		</section>
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
