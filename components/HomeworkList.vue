<script setup lang="ts">
const config = useRuntimeConfig();
const { data: homeworks, error, pending, refresh } = await useFetch<{
	id: string,
	title: string,
	detail: string,
	author: string,
	dueDate: string,
	subject: { id: string, name: string; },
}[]>(config.public.apiEndpoint + '/homeworks');
console.log(homeworks);
</script>

<template>
	<div class="flex flex-col space-y-4 max-w-lg px-2">
		<HomeworkAddItem @reload="refresh" />
		<HomeworkItem v-for="hw in homeworks" :key="hw.id" :id="hw.id" :title="hw.title" :detail="hw.detail"
			:subject="hw.subject" :due-date="hw.dueDate ? new Date(hw.dueDate) : null" :author="hw.author"
			@reload="refresh" />
	</div>
	<!-- class="bg-gradient-to-r from-indigo-900/30 to-sky-900/30" -->
</template>
