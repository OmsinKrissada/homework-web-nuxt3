<script setup lang="ts">
import { CheckCircleIcon, CheckIcon } from '@heroicons/vue/20/solid';
import { PlusCircleIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline';
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


let selected = ref(subjects.value ? subjects.value[0] : { id: 0, name: 'error' });
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

const create = reactive({
	title: null as string | null,
	detail: null as string | null,
	subId: null as string | null,
	dueDate: null as Date | null,
	dueTime: null as Date | null,
});

function handleSubmit() {
	console.log(JSON.stringify(create));
	if (!create.title || !create.subId) {

	}
}

function handleCancel() {
	create.title = null;
	create.detail = null;
	create.subId = null;
	create.dueDate = null;
	create.dueTime = null;
	closeModal();
}
</script>
<template>
	<div class="p-4 border-2 border-dashed border-slate-500 hover:border-slate-400 rounded cursor-pointer transition-colors"
		@click="openModal">
		<p class="font-prompt text-center">
			<PlusCircleIcon class="inline mx-auto w-6 h-6" />
			ครูสั่งงาน? กดตรงนี้เลย
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
								class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<HeadlessDialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
									Create Homework
								</HeadlessDialogTitle>
								<div class="mt-4 space-y-6">
									<div class="mt-0">
										<label for="title" class="font-medium text-sm text-gray-700">
											Title
											<span class="text-rose-500">*</span>
										</label>
										<div class="mt-1">
											<input type="text" id="title" placeholder="Ex. ทำชีท / หนังสือหน้า 8"
												v-model="create.title"
												class="w-full focus:ring-2 focus:ring-indigo-500 border-gray-300 font-prompt rounded shadow-sm transition-colors" />
											<p class="mt-1 font-medium text-sm text-rose-600">This field is required</p>
										</div>
									</div>
									<div>
										<label for="detail" class="font-medium text-sm text-gray-700">Detail</label>
										<div class="mt-1">
											<textarea v-model="create.detail"
												class="w-full focus:ring-2 focus:ring-indigo-500 border-gray-300 font-prompt rounded shadow-sm transition-colors" />
										</div>
									</div>
									<HeadlessCombobox v-model="selected">
										<div class="relative mt-1">
											<label for="subject" class="font-medium text-sm text-gray-700">
												Subject
											</label>
											<div class="relative mt-1">
												<HeadlessComboboxInput
													class="w-full focus:ring-2 focus:ring-indigo-500 border-gray-300 font-prompt rounded shadow-sm transition-colors"
													id="subject" :displayValue="(subject) => subject.name"
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
														class="relative cursor-default select-none py-2 px-4 text-gray-700">
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
																{{ subject.name }}
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

											<label for="datetime" class="font-medium text-sm text-gray-700">Due
												Date</label>
											<div class="flex space-x-2 mt-1" id="datetime">
												<input type="date" placeholder="เลือกวันส่ง (ถ้ามี)"
													v-model="create.dueDate"
													class="w-full focus:ring-2 focus:ring-indigo-500 border-gray-300 font-prompt rounded shadow-sm transition-colors" />
											</div>
										</div>
										<div>
											<label for="datetime" class="font-medium text-sm text-gray-700">Due
												Time</label>
											<div class="flex space-x-2 mt-1" id="datetime">
												<input type="time" placeholder="เลือกวันส่ง (ถ้ามี)"
													v-model="create.dueTime"
													class="w-full focus:ring-2 focus:ring-indigo-500 border-gray-300 font-prompt rounded shadow-sm transition-colors" />
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