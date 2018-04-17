<template>
	<div class="notification-container"
		:style="{justifyContent, alignItems, padding: margin}">
		<transition :name="animation">
			<div class="notification"
				:class="level+' '+classes"
				v-if="show">
				<span class="message"><slot/></span>
				<span class="close icon-md" role="button" @click="hide">close</span>
			</div>
		</transition>
	</div>
</template>

<script>
/**
 * Display a notification message
 */
export default {
	name: "notification",
	props: {
		level: {
			type: String,
			default: "info"
		},
		pos: {
			type: String,
			default: "center top"
		},
		classes: {
			type: String,
			required: false
		},
		animation: {
			type: String,
			default: "fade-down"
		},
		margin: {
			type: String,
			default: "1em"
		},
		closeIconClass: {
			type: String,
			default: "md"
		},
		autoclose: {
			type: Number,
			default: 0
		}
	},
	data() {

		return {
			show: false,
			timer: null
		}
	},
	computed: {
		// Horizontal axis
		justifyContent() {

			// 'center' === 'center center'
			if (this.pos === "center") return this.pos;

			const x = this.pos.split(" ")[0];
			if (x !== undefined)
			{
				if (x === "left")		return "flex-start";
				else if (x === "right")	return "flex-end";
				else					return "center";
			}

			// Default value
			return "center";
		},
		// Vertical axis
		alignItems() {

			// 'center' === 'center center'
			if (this.pos === "center") return this.pos;

			const x = this.pos.split(" ")[1];
			if (x !== undefined)
			{
				if (x === "top")			return "flex-start";
				else if (x === "bottom")	return "flex-end";
				else						return "center";
			}

			// Default value
			return "center";
		}
	},
	methods: {
		display() {

			this.show = true;
			// Reset timer
			if (this.timer) clearTimeout(this.timer);
			if (this.autoclose > 0) this.timer = setTimeout(() => this.show = false, this.autoclose * 1000)
		},
		hide() {
			
			this.show = false;
			this.timer = null;
		},
		toggle() {

			this.show ? this.hide() : this.display();
		}
	}
}
</script>
