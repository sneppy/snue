<template>
	<div class="stack">
		<slot/>
	</div>
</template>

<script>
/**
 * Stack layers on top of each other
 */
export default {
	name: "stack",
	methods: {
		render() {

			const el		= this.$el;
			const layers	= el.children;
			
			let maxW = 0, maxH = 0;
			for (const layer of layers)
			{
				maxW = layer.offsetWidth > maxW ? layer.offsetWidth : maxW;
				maxH = layer.offsetHeight > maxH ? layer.offsetHeight : maxH;
			}

			// Set height and width
			this.$el.style.width	= maxW+"px";
			this.$el.style.height	= maxH+"px";
		}
	},
	mounted() {

		// Render stack
		this.$nextTick(() => this.render());
	},
	updated() {

		// Render stack
		this.render();
	}
}
</script>