<template>
	<div class="keypad">
		<div class="key" :class="keyClasses" @click="keyDown(1)">1</div>
		<div class="key" :class="keyClasses" @click="keyDown(2)">2</div>
		<div class="key" :class="keyClasses" @click="keyDown(3)">3</div>

		<div class="key" :class="keyClasses" @click="keyDown(4)">4</div>
		<div class="key" :class="keyClasses" @click="keyDown(5)">5</div>
		<div class="key" :class="keyClasses" @click="keyDown(6)">6</div>

		<div class="key" :class="keyClasses" @click="keyDown(7)">7</div>
		<div class="key" :class="keyClasses" @click="keyDown(8)">8</div>
		<div class="key" :class="keyClasses" @click="keyDown(9)">9</div>

		<div class="key" :class="keyClasses" @click="keyDown(10)">*</div>
		<div class="key" :class="keyClasses" @click="keyDown(0)">0</div>
		<div class="key" :class="keyClasses" @click="keyDown(11)">#</div>
	</div>
</template>

<script>
export default {
	name: "keypad",
	props: {
		keyClasses: String
	},
	methods: {
		keyDown(val) {

			this.$emit("keydown", val)
		}
	}
}
</script>
