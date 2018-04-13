<template>
	<div class="card">
		<h2 class="title" v-if="title !== undefined">{{ title }}</h2>
		<slot/>
	</div>
</template>

<script>
/**
 * Material design like card component
 */
export default {
	name: "card",
	props: {
		title: String
	}
}
</script>
