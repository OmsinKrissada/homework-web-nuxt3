<script setup lang="ts">
const config = useRuntimeConfig();
const { data, error, pending, refresh } = await useFetch<{
	id: string,
	title: string,
	detail: string,
	author: string,
	dueDate: string,
	subject: { id: string, name: string; },
}[]>(config.public.apiEndpoint + '/homeworks');
const homeworks = computed(() => data.value?.sort((a, b) => {
	if (!a.dueDate && !b.dueDate) return 0;
	if (!a.dueDate) return 1;
	if (!b.dueDate) return -1;
	return a.dueDate?.valueOf() - b.dueDate?.valueOf();
}));

const count = computed(() => homeworks.value?.length);
console.log(homeworks);
</script>

<template>
	<div class="flex flex-col space-y-4 max-w-lg px-2">
		<div class="flex items-center mb-4">
			<div class="flex-grow font-prompt text-2xl">จำนวนงาน: {{ count }}</div>
			<HomeworkAddItem @reload="refresh" />
		</div>
		<ul class="space-y-4">
			<li v-for="hw in homeworks" :key="hw.id">
				<HomeworkItem :id="hw.id" :title="hw.title" :detail="hw.detail" :subject="hw.subject"
					:due-date="hw.dueDate ? new Date(hw.dueDate) : null" :author="hw.author" @reload="refresh" />
			</li>
		</ul>
	</div>
	<!-- class="bg-gradient-to-r from-indigo-900/30 to-sky-900/30" -->
</template>
