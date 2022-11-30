<script setup lang="ts">
const config = useRuntimeConfig();
const { data, error, pending, refresh } = await useFetch<{
	id: string,
	title: string,
	detail?: string,
	author: string,
	dueDate?: Date,
	subject?: { id: string, name: string; },
	deletedAt?: Date,
}[]>(config.public.apiEndpoint + '/homeworks?withDeleted=true');

const showOld = useLocalStorage('show_old', false);
const homeworks = computed(() => data.value?.filter(h => !h.deletedAt || showOld.value).sort((a, b) => {
	if (!a.dueDate && !b.dueDate) return 0;
	if (!a.dueDate) return 1;
	if (!b.dueDate) return -1;
	return a.dueDate?.valueOf() - b.dueDate?.valueOf();
}));

const count = computed(() => homeworks.value?.length);

onMounted(() => {
	setInterval(refresh, 1000);
});
</script>

<template>
	<div class="flex flex-col space-y-4 max-w-lg px-2">
		<div class="flex items-center mb-2">
			<p class="flex-grow font-prompt text-2xl">จำนวนงาน: {{ count }}</p>
			<HomeworkAddItem @reload="refresh" />
		</div>
		<div class="flex items-center mb-4">
			<input type="checkbox" name="show-old" id="show-old"
				class="m-2 text-indigo-500 focus:ring-0 focus:ring-offset-0 bg-slate-600 rounded" v-model="showOld">
			<label for="show-old">แสดงงานเก่า</label>
		</div>
		<TransitionGroup name="list" tag="ul" class="relative space-y-4">
			<li v-for="hw in homeworks" :key="hw.id">
				<HomeworkItem :id="hw.id" :title="hw.title" :detail="hw.detail" :subject="hw.subject"
					:due-date="hw.dueDate ? new Date(hw.dueDate) : null" :author="hw.author" @reload="refresh" />
			</li>
		</TransitionGroup>
	</div>
	<!-- class="bg-gradient-to-r from-indigo-900/30 to-sky-900/30" -->
</template>

<style>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
	width: 100%;
}
</style>