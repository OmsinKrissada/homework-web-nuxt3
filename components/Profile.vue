<script setup lang="ts">
import { useUserStore } from '~~/store/useUserStore';
import { PencilSquareIcon } from '@heroicons/vue/20/solid';

const user = useUserStore();
const isExpanded = ref(false);
const hover = ref(false);

function removeNickname() {
	user.nickname = '';
}
</script>
<template>
	<!-- <div
		class="relative group w-fit bg-white hover:bg-indigo-500 rounded-[50%] hover:rounded-md shadow-xl shadow-indigo-500/60 transition-all">

	</div> -->
	<HeadlessMenu as="div" class="relative inline-block text-left">
		<div>
			<HeadlessMenuButton
				class="relative group w-fit p-2 bg-white hover:bg-indigo-500 ui-open:bg-indigo-500 rounded-md hover:shadow-xl hover:shadow-indigo-500/60 transition-all">

				<img v-if="user.avatarURL" :src="user.avatarURL" class="w-12 hover:shadow-xl rounded-full">
				<svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6 group-hover:stroke-white ui-open:stroke-white">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>

				<!-- <p class="font-bold text-white duration-500 origin-left w-0 group-hover:w-full" v-if="hover">Omsin</p> -->
			</HeadlessMenuButton>
		</div>

		<transition enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0">
			<HeadlessMenuItems
				class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
				<div class="px-1 py-1">
					<HeadlessMenuItem v-slot="{ active }" @click="removeNickname">
						<button :class="[
							active ? 'bg-indigo-500 text-white' : 'text-gray-900',
							'group flex w-full items-center rounded-md px-2 py-2 text-sm',
						]">
							<PencilSquareIcon :active="active"
								class="mr-2 h-5 w-5 text-indigo-400 group-hover:text-white" aria-hidden="true" />
							Change Nickname
						</button>
					</HeadlessMenuItem>
				</div>
			</HeadlessMenuItems>
		</transition>
	</HeadlessMenu>
</template>

<style>
/* .banner-bg {
	background-color: ;
} */
</style>