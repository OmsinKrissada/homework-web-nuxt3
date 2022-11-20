<script setup lang="ts">
const userData = useUserData();
const isExpanded = ref(false);
const hover = ref(false);
</script>
<template>
	<div class="relative group w-fit hover:px-2 hover:py-1 hover:bg-indigo-500 rounded-[50%] hover:rounded-md hover:shadow duration-500 transition-all"
		:style="{ 'background-color': userData.bannerColor }">
		<button class="flex items-center space-x-3 p-1 rounded overflow-clip" @click="isExpanded = !isExpanded"
			@mouseenter="hover = true" @mouseleave="hover = false">
			<img :src="userData.avatarURL" class="w-12 hover:shadow-xl rounded-full">
			<!-- <p class="font-bold text-white duration-500 origin-left w-0 group-hover:w-full" v-if="hover">Omsin</p> -->
		</button>
		<!-- <ul class="p-3 bg-slate-300">
			<li class="font-medium text-gray-700">something idk</li>
		</ul> -->
	</div>
</template>

<style>
/* .banner-bg {
	background-color: ;
} */
</style>