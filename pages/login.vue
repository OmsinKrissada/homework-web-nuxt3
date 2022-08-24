<script setup lang="ts">
const errorMsg = ref('');
function doSomething() {
	console.log('huh oh');
	// err => errorMsg = err
}
</script>
<template>
	<div class="flex flex-col justify-center items-center space-y-5 min-h-screen">
		<!-- <CustomBadge>Test</CustomBadge> -->
		<h1 class="mx-auto text-4xl text-gray-700 font-extrabold">Sign in</h1>
		<CustomBadge type="error" class="scale-0 max-w-md w-full transition-all" :class="{ 'scale-100': !!errorMsg }">{{
				errorMsg
		}}</CustomBadge>
		<!-- <CustomBadge type="error">Message here</CustomBadge> -->
		<LoginComponent class="mb-5" @error="err => errorMsg = err" />
	</div>
</template>
