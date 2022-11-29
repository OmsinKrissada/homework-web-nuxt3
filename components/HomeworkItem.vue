<script setup lang="ts">
import { ClockIcon, ExclamationTriangleIcon, CalendarDaysIcon, BookOpenIcon, EllipsisVerticalIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { formatDistanceToNow, formatDistanceToNowStrict, formatDistance, formatDistanceStrict, addHours, formatRelative } from 'date-fns';
import { th } from 'date-fns/esm/locale';

const props = defineProps<{
	id: string,
	title: string,
	detail?: string,
	author: string,
	dueDate: Date | null,
	subject?: { id: string, name: string; },
}>();

const emits = defineEmits<{
	(e: 'reload'): void;
}>();

const dueString = computed(() => {
	if (props.dueDate)
		return formatDistanceStrict(props.dueDate, useTimestamp({ interval: 1000 }).value, { locale: th });
});
const isLate = computed(() => {
	if (props.dueDate) return new Date().valueOf() - props.dueDate.valueOf() > 0;
	else return false;
});

function getBookColor() {
	if (!props.dueDate) return 'blue';
	const diff_ms = props.dueDate.valueOf() - new Date().valueOf();
	if (diff_ms < 86400000) return 'red'; // less than a day
	if (diff_ms < 259200000) return 'yellow'; // less than 3 days
	return 'green';
};

const config = useRuntimeConfig();
function editHomework() {

}

async function deleteHomework() {
	await $fetch(config.public.apiEndpoint + `/homeworks/${props.id}`, { method: 'DELETE' });
	emits('reload');
}
</script>
<template>
	<div class="p-4 space-y-4 bg-gradient-to-br from-slate-800 to-slate-700/60 shadow shadow-black rounded"
		:class="{ 'border-2 border-rose-500': isLate }">
		<div class="flex justify-between items-center pb-2 border-b border-slate-600">
			<p class="mr-4 font-prompt font-medium text-lg">
				<!-- {{ getBookIcon() }} -->
				<Book :color="getBookColor()" />
				{{ title }}
			</p>
			<!-- <div class="flex flex-col items-end space-y-2"> -->
			<div class="flex items-center font-medium">
				<span v-if="dueDate"
					class="flex whitespace-nowrap items-center px-2 py-1 bg-slate-700/60 font-prompt text-sm rounded-md">
					≈ {{ dueString }}{{ isLate ? "ที่แล้ว" : "" }}
					<!-- <CalendarDaysIcon class="w-6 h-6 ml-2 fill-emerald-400" /> -->
				</span>
				<HeadlessMenu as="div" class="relative inline-block font-normal text-left">
					<div>
						<HeadlessMenuButton>
							<EllipsisVerticalIcon class="inline w-6 h-6 ml-2" />
						</HeadlessMenuButton>
					</div>

					<transition enter-active-class="transition duration-100 ease-out"
						enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
						leave-active-class="transition duration-75 ease-in"
						leave-from-class="transform scale-100 opacity-100"
						leave-to-class="transform scale-95 opacity-0">
						<HeadlessMenuItems
							class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<!-- <div class="p-1">
								<HeadlessMenuItem v-slot="{ active }" @click="editHomework">
									<button :class="[
										active ? 'bg-indigo-500 text-white' : 'text-gray-900',
										'group flex w-full items-center rounded-md px-2 py-2 font-prompt text-sm',
									]">
										<PencilSquareIcon :active="active"
											class="mr-2 h-5 w-5 text-indigo-400 group-hover:text-white"
											aria-hidden="true" />
										แก้ไข
									</button>
								</HeadlessMenuItem>
							</div> -->
							<div class="p-1">
								<HeadlessMenuItem v-slot="{ active }" @click="deleteHomework">
									<button :class="[
										active ? 'bg-rose-500 text-white' : 'text-gray-900',
										'group flex w-full items-center rounded-md px-2 py-2 font-prompt text-sm',
									]">
										<TrashIcon :active="active"
											class="mr-2 h-5 w-5 text-rose-400 group-hover:text-white"
											aria-hidden="true" />
										ลบ
									</button>
								</HeadlessMenuItem>
							</div>
						</HeadlessMenuItems>
					</transition>
				</HeadlessMenu>
				<!-- <ExclamationTriangleIcon class="inline w-6 h-6 fill-orange-400" /> -->
			</div>
			<!-- </div> -->

		</div>
		<div class="flex space-x-2 text-sm text-slate-300">
			<p v-if="subject" class="flex items-center w-fit font-prompt font-medium rounded-md">
				<BookOpenIcon class="w-4 h-4 mr-2 fill-sky-400" />
				{{ subject.name }}
			</p>
			<p v-if="dueDate" class="flex items-center w-fit font-prompt font-medium rounded-md">
				<CalendarDaysIcon class="w-4 h-4 mr-2 fill-emerald-400" />
				{{ formatRelative(dueDate, new Date(), { locale: th }) }}
			</p>
		</div>
		<p class="font-medium font-prompt text-slate-200">
			{{ detail }}
		</p>
		<!-- <div> -->

		<p class="font-prompt font-medium text-sm text-left text-slate-400">
			เพิ่มโดย {{ author }}
		</p>
		<!-- </div> -->
	</div>
	<!-- <PlusCircleIcon class="inline mx-auto w-6 h-6" /> -->
</template>