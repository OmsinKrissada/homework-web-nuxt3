<script setup lang="ts">
const props = defineProps<{
	type: 'error' | 'warning' | 'success' | 'info';
}>();
</script>

<template>
	<div class="flex items-center space-x-3 px-3 py-2 bg-slate-300/30 rounded-lg">
		<div class="self-stretch w-1 bg-rose-500 rounded" :class="{
			'bg-rose-500': type === 'error',
			'bg-amber-500': type === 'warning',
			'bg-emerald-500': type === 'success',
			'bg-sky-500': type === 'info',
		}" />
		<div class="font-medium text-gray-700">
			<h1 v-if="type == 'error'" class="text-md font-extrabold">ERROR</h1>
			<h1 v-if="type == 'warning'" class="text-md font-extrabold">WARNING</h1>
			<h1 v-if="type == 'success'" class="text-md font-extrabold">SUCCESS</h1>
			<h1 v-if="type == 'info'" class="text-md font-extrabold">INFO</h1>
			<slot />
		</div>
	</div>
</template>