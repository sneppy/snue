<template>
	<div class="loading-widget">
		<div v-for="i in 4" :key="i"
			:class="'rect'+i">
		</div>
	</div>
</template>

<script>
export default {
	name: 'loading-widget',

	props: {
		color: {
			type: String,
			default: 'white'
		}
	}
}
</script>
