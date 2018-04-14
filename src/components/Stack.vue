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
		/**
		 * Calculate width and height of the stack
		 */
		render() {

			const el		= this.$el;
			const layers	= el.children;

			// Using a range ensure that only true content size is evaluated
			const range = document.createRange();				
			let maxW = 0, maxH = 0;
			for (const layer of layers)
			{
				range.selectNodeContents(layer);

				const width		= range.getBoundingClientRect().width;
				const height	= range.getBoundingClientRect().height;
				maxW = width > maxW ? width : maxW;
				maxH = height > maxH ? height : maxH;
			}

			// Set height and width
			this.$el.style.width	= maxW+"px";
			this.$el.style.height	= maxH+"px";	
		}
	},
	mounted() {

		// Render stack
		this.render();

		// Register resize event
		window.addEventListener("resize", () => this.render());
	},
	updated() {

		// Render stack
		this.render();
	},
	destroyed() {

		// Remove window listener
		window.removeEventListener("resize", () => this.render());
	}
}
</script>