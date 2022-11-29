<script setup lang="ts">
import { CheckCircleIcon, CheckIcon, DocumentPlusIcon } from '@heroicons/vue/20/solid';
import { PlusCircleIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '~~/store/useUserStore';

const emits = defineEmits<{
	(e: 'reload'): void;
}>();

const isOpen = ref(false);
function openModal() {
	isOpen.value = true;
}
function closeModal() {
	isOpen.value = false;
}

const config = useRuntimeConfig();
type Subject = {
	subId: string;
	name: string;
	classes: {
		DoW: number;
		period: number;
		span: number;
	}[];
};
const { data: subjects } = await useFetch<Subject[]>(config.public.apiEndpoint + '/subjects');


let selectedSubject = ref<any>();
let query = ref('');

let filteredSubject = computed(() => {
	if (!subjects.value) return [];
	if (query.value === '') {
		return subjects.value;
	} else {
		return subjects.value.filter((subject) =>
			// use string like library later
			subject.name
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(query.value.toLowerCase().replace(/\s+/g, ''))
		);
	}
});

const create = reactive<{
	title?: string | null,
	detail?: string | null,
	dueDate?: string | null,
	dueTime?: string | null,
}>({});

const titleRequiredError = ref(false);
async function handleSubmit() {
	if (!create.title) {
		console.error('title needed');
		titleRequiredError.value = true;
		return;
	}

	// console.log(selected.value.subId);
	// return;

	const getDueDate = () => {
		if (create.dueDate) {
			if (create.dueTime)
				return `${create.dueDate} ${create.dueTime}`;
			else
				return create.dueDate;
		} else return null;
	};

	await $fetch(config.public.apiEndpoint + '/homeworks', {
		method: 'POST',
		body: {
			title: create.title,
			detail: create.detail,
			subject: selectedSubject.value?.subId,
			author: useUserStore().nickname,
			dueDate: getDueDate()
		}
	});
	emits('reload');
	handleReset();
	closeModal();
}

function handleReset() {
	create.title = null;
	create.detail = null;
	create.dueDate = null;
	create.dueTime = null;
	selectedSubject.value = null;
	titleRequiredError.value = false;
}

function handleCancel() {
	handleReset();
	closeModal();
}
</script>
<template>
	<div class="px-4 py-2 bg-white hover:bg-transparent hover:text-white border border-white text-black rounded cursor-pointer transition-colors"
		@click="openModal">
		<p class="flex justify-center items-center font-medium font-prompt text-center">
			<DocumentPlusIcon class="inline w-6 h-6 mr-2" />
			<!-- ครูสั่งงาน? กดตรงนี้เลย -->
			เพิ่มงาน
		</p>
		<HeadlessTransitionRoot appear :show="isOpen" as="template">
			<HeadlessDialog as="div" class="relative z-10">
				<div class="fixed inset-0 bg-black/30" aria-hidden="true" />
				<HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
					enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
					<div class="fixed inset-0 bg-black bg-opacity-25" />
				</HeadlessTransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center">
						<HeadlessTransitionChild as="template" enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95">
							<HeadlessDialogPanel
								class="w-full max-w-md transform rounded-2xl bg-accent p-6 text-left align-middle shadow-xl transition-all">
								<HeadlessDialogTitle as="h3" class="text-lg font-bold leading-6 text-white">
									Create Homework
								</HeadlessDialogTitle>
								<div class="mt-4 space-y-6">
									<div class="mt-0">
										<label for="title" class="font-medium text-sm text-slate-400">
											Title
											<span class="text-rose-400">*</span>
										</label>
										<div class="mt-1">
											<input type="text" id="title" placeholder="Ex. ทำชีท / หนังสือหน้า 8"
												v-model="create.title"
												class="w-full border-none focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-neutral/20 font-prompt text-white placeholder:text-slate-400 rounded shadow-sm shadow-black transition-colors" />
											<p v-if="titleRequiredError" class="mt-1 font-medium text-sm text-rose-400">
												This field is required</p>
										</div>
									</div>
									<div>
										<label for="detail" class="font-medium text-sm text-slate-400">Detail</label>
										<div class="mt-1">
											<textarea v-model="create.detail"
												class="w-full border-none focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-neutral/20 font-prompt text-white rounded shadow-sm shadow-black transition-colors" />
										</div>
									</div>
									<HeadlessCombobox v-model="selectedSubject">
										<div class="relative mt-1">
											<label for="subject" class="font-medium text-sm text-slate-400">
												Subject
											</label>
											<div class="relative mt-1">
												<HeadlessComboboxInput
													class="w-full border-none focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-neutral/20 font-prompt text-white placeholder:text-slate-400 rounded shadow-sm shadow-black transition-colors"
													id="subject" placeholder="ไม่ระบุ" autocomplete="off"
													:displayValue="(subject) => subject?.name"
													@change="query = $event.target.value" />
												<HeadlessComboboxButton
													class="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon class="h-5 w-5 text-gray-400"
														aria-hidden="true" />
												</HeadlessComboboxButton>
											</div>
											<HeadlessTransitionRoot leave="transition ease-in duration-100"
												leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
												<HeadlessComboboxOptions
													class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													<div v-if="filteredSubject.length === 0 && query !== ''"
														class="relative cursor-default select-none py-2 px-4 text-slate-600">
														Nothing found.
													</div>

													<HeadlessComboboxOption v-for="subject in filteredSubject"
														as="template" :key="subject.subId" :value="subject"
														v-slot="{ selected, active }">
														<li class="relative font-prompt cursor-default select-none py-2 pl-10 pr-4"
															:class="{
																'bg-indigo-500 text-white': active,
																'text-gray-900': !active,
															}">
															<span class="block truncate"
																:class="{ 'font-medium': selected, 'font-normal': !selected }">
																{{ subject?.name ?? 'ไม่ระบุ' }}
															</span>
															<span v-if="selected"
																class="absolute inset-y-0 left-0 flex items-center pl-3"
																:class="{ 'text-white': active, 'text-indigo-600': !active }">
																<CheckCircleIcon class="h-5 w-5" aria-hidden="true" />
															</span>
														</li>
													</HeadlessComboboxOption>
												</HeadlessComboboxOptions>
											</HeadlessTransitionRoot>
										</div>
									</HeadlessCombobox>
									<div class="flex space-x-2">
										<div class="flex-grow">

											<label for="datetime" class="font-medium text-sm text-slate-400">Due
												Date</label>
											<div class="flex space-x-2 mt-1" id="datetime">
												<input type="date" placeholder="เลือกวันส่ง (ถ้ามี)"
													v-model="create.dueDate"
													class="w-full border-none focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-neutral/20 font-prompt text-white rounded shadow-sm shadow-black transition-colors" />
											</div>
										</div>
										<div>
											<label for="datetime" class="font-medium text-sm text-slate-400">Due
												Time</label>
											<div class="flex space-x-2 mt-1" id="datetime">
												<input type="time" placeholder="เลือกวันส่ง (ถ้ามี)"
													v-model="create.dueTime"
													class="w-full border-none focus:ring-2 focus:ring-indigo-500 border-gray-300 bg-neutral/20 font-prompt text-white rounded shadow-sm shadow-black transition-colors" />
											</div>
										</div>
									</div>
								</div>

								<div class="flex space-x-2 mt-6">
									<!-- <button type="submit"
										class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										@click="handleSubmit">
										Submit
									</button> -->
									<button
										class="group w-full px-3 py-2 bg-rose-500 text-white font-medium shadow-lg rounded-md transition-all hover:bg-rose-600 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed"
										@click="handleCancel">
										<p class="group-disabled:animate-pulse">
											Cancel
										</p>
									</button>
									<button type="submit"
										class="group w-full px-3 py-2 bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed"
										@click="handleSubmit">
										<p class="group-disabled:animate-pulse">
											Submit
										</p>
									</button>
								</div>
							</HeadlessDialogPanel>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>
	</div>
</template>