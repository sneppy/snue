<template>
	<div class="drawer"
		:class="side"
		:style="{top: margin}">
		<transition :name="animation">
			<div class="inner"
				:class="theme"
				:style="{height: 'calc(100vh - '+margin+')'}"
				v-if="show">
				<slot/>
			</div>
		</transition>

		<transition :name="backdropAnimation">
			<div class="backdrop"
				v-if="backdrop && show">
			</div>
		</transition>
	</div>
</template>

<script>
/**
 * Off screen drawer
 */
export default {
	name: "drawer",
	props: {
		// Side of the drawer ('left'|'right')
		side: {
			type: String,
			default: "left"
		},
		// Top margin applied to the drawer
		margin: {
			type: String,
			default: "0"
		},
		// Drawer animation
		animation: {
			type: String,
			default: "slide"
		},
		// Drawer colors
		theme: {
			type: String,
			default: "dark"
		},
		// Enable backdrop
		backdrop: {
			type: Boolean,
			default: false
		},
		// Backdrop animation
		backdropAnimation: {
			type: String,
			default: "fade"
		}
	},
	data() {
		
		return {
			show: false
		}
	},
	methods: {
		open() {

			this.show = true;
		},
		close() {

			this.show = false;
		},
		toggle() {

			this.show = !this.show;
		}
	}
}
</script>
