<template>
	<form @submit.prevent="handleSubmit" class="space-y-6 origin-top"
		:class="{ 'scale-y-0': !isExpanded, 'h-0': !isExpanded, 'transition-transform': isExpanded, 'duration-200': isExpanded }">
		<div class="mt-0">
			<label for="email" class="font-medium text-sm text-gray-700">Email</label>
			<div class="mt-1">
				<input type="email" autocomplete="email" id="email" placeholder="you@example.com" required
					v-model="email" class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>
		<div>
			<label for="password" class="font-medium text-sm text-gray-700">Password</label>
			<div class="mt-1">
				<input type="password" autocomplete="new-password" id="password" required v-model="password"
					class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>
		<div>
			<label for="password_confirmation" class="font-medium text-sm text-gray-700">Confirm
				Password</label>
			<div class="mt-1">
				<input type="password" autocomplete="new-password" id="password_confirmation" required
					v-model="password_confirmation"
					class="w-full border-gray-300 rounded shadow-sm transition-colors" />
			</div>
		</div>

		<p v-if="formError" class="text-center text-rose-500 font-medium">{{ formError }}</p>

		<button type="submit" :disabled="showSendingAnimation"
			class="group w-full px-3 py-2 bg-indigo-600 text-white font-medium shadow-lg rounded-md transition-all hover:bg-indigo-700 hover:tracking-widest disabled:tracking-widest disabled:bg-indigo-800 disabled:cursor-not-allowed">
			<p class="group-disabled:animate-pulse">
				{{ showSendingAnimation ? 'Registering...' : 'Register' }}
			</p>
		</button>
	</form>
</template>