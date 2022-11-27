<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
const isOpen = ref(false);
function openModal() {
	isOpen.value = true;
}
function closeModal() {
	isOpen.value = false;
}


const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
];

let selected = ref(people[0]);
let query = ref('');

let filteredPeople = computed(() =>
	query.value === ''
		? people
		: people.filter((person) =>
			person.name
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(query.value.toLowerCase().replace(/\s+/g, ''))
		)
);
</script>
<template>
	<div class="p-4 border-2 border-dashed border-slate-500 rounded cursor-pointer" @click="openModal">
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
								class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<HeadlessDialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
									Create Homework
								</HeadlessDialogTitle>
								<div class="mt-4 space-y-6">
									<div class="mt-0">
										<label for="title" class="font-medium text-sm text-gray-700">Title</label>
										<div class="mt-1">
											<input type="text" id="title" placeholder="Ex. ทำชีท / หนังสือหน้า 8"
												v-model="email"
												class="w-full border-gray-300 rounded shadow-sm transition-colors" />
										</div>
									</div>
									<div>
										<label for="detail" class="font-medium text-sm text-gray-700">Detail</label>
										<div class="mt-1">
											<input type="text" placeholder="Ex. สามารถพิมพ์หรือเขียนก็ได้"
												v-model="password"
												class="w-full border-gray-300 rounded shadow-sm transition-colors" />
										</div>
									</div>
									<HeadlessCombobox v-model="selected">
										<div class="relative mt-1">
											<div
												class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
												<HeadlessComboboxInput
													class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
													:displayValue="(person) => person.name"
													@change="query = $event.target.value" />
												<HeadlessComboboxButton
													class="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon class="h-5 w-5 text-gray-400"
														aria-hidden="true" />
												</HeadlessComboboxButton>
											</div>
											<TransitionRoot leave="transition ease-in duration-100"
												leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
												<HeadlessComboboxOptions
													class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													<div v-if="filteredPeople.length === 0 && query !== ''"
														class="relative cursor-default select-none py-2 px-4 text-gray-700">
														Nothing found.
													</div>

													<HeadlessComboboxOption v-for="person in filteredPeople"
														as="template" :key="person.id" :value="person"
														v-slot="{ selected, active }">
														<li class="relative cursor-default select-none py-2 pl-10 pr-4"
															:class="{
																'bg-teal-600 text-white': active,
																'text-gray-900': !active,
															}">
															<span class="block truncate"
																:class="{ 'font-medium': selected, 'font-normal': !selected }">
																{{ person.name }}
															</span>
															<span v-if="selected"
																class="absolute inset-y-0 left-0 flex items-center pl-3"
																:class="{ 'text-white': active, 'text-teal-600': !active }">
																<CheckIcon class="h-5 w-5" aria-hidden="true" />
															</span>
														</li>
													</HeadlessComboboxOption>
												</HeadlessComboboxOptions>
											</TransitionRoot>
										</div>
									</HeadlessCombobox>
								</div>

								<div class="mt-4">
									<button type="button"
										class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										@click="closeModal">
										Got it, thanks!
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