<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid';

</script>

<template>
	<div class="flex justify-evenly mx-auto p-4 xl:max-w-7xl border-b border-slate-800">

		<!-- left hand side -->
		<div class="flex items-center flex-row w-full text-white">
			<h1 class="font-prompt font-bold">จดการบ้าน
				<span class="font-sans font-medium text-slate-500">v2.0-beta</span>
			</h1>
		</div>

		<!-- right hand side -->
		<div class="flex justify-end items-center space-x-4 w-full">
			<a href="https://homework.krissada.com/api/docs/" target="_blank"
				class="relative group flex items-center w-fit p-2 hover:bg-slate-800 text-sm text-slate-400 rounded-md hover:shadow-xl transition-colors">
				API Docs
				<ArrowTopRightOnSquareIcon class="inline w-4 h-4 ml-2" />
				<!-- <p class="font-bold text-white duration-500 origin-left w-0 group-hover:w-full" v-if="hover">Omsin</p> -->
			</a>
			<Profile></Profile>
		</div>
	</div>
</template>