<script setup lang="ts">
const button = ref<HTMLButtonElement | null>(null);
const effect_element = ref<HTMLSpanElement | null>(null);
const offset_left = ref(0);
const offset_top = ref(0);

function handleMove(mouse: MouseEvent) {
	if (!button.value) return;
	const { x, y } = button.value.getBoundingClientRect();
	offset_left.value = mouse.clientX - x;
	offset_top.value = mouse.clientY - y;
}
</script>

<template>
	<button @mousemove="handleMove" ref="button" class="relative group overflow-hidden">
		<span id="" class="slot-span z-20">
			<slot />
		</span>
		<span id="effect_element" ref="effect_element" :style="{ top: `${offset_top}px`, left: `${offset_left}px` }"
			class="z-10 absolute left-0 top-0 w-0 h-0 -translate-x-1/2 -translate-y-1/2 group-hover:w-[300px] group-hover:h-[300px] ">
		</span>
	</button>
</template>

<style>
#effect_element {
	background: radial-gradient(circle closest-side, #6696ff, transparent);
	transition: width 0.2s ease, height 0.2s ease;
}

.slot-span * {
	z-index: 20;
}
</style>