<template>
	<transition :name="animation">
		<div class="notification"
			:class="level"
			:style="{left, right, top, bottom}"
			v-if="show">
			<span class="message"><slot/></span>
			<span class="close icon-md" role="button" @click="hide">cancel</span>
		</div>
	</transition>
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
		}
	},
	data() {

		return {
			show: false
		}
	},
	computed: {
		left() {

			const x = this.pos.split(" ")[0];
			if (x !== undefined)
			{
				if (x === "left")			return this.margin
				else if (x === "center")	return "50%"
				else						return "auto"
			}
			
			// Default value
			return this.margin;
		},
		right() {
			
			if (this.left === "auto")	return this.margin
			else						return "auto"
		},
		top() {

			const y = this.pos.split(" ")[1];
			if (y !== undefined)
			{
				if (y === "top")	return this.margin
				else				return "auto"
			}
			
			// Default value
			return this.margin;
		},
		bottom() {
			
			if (this.top === "auto")	return this.margin
			else						return "auto"
		}
	},
	methods: {
		display() {

			this.show = true;
		},
		hide() {
			
			this.show = false;
		},
		toggle() {

			this.show = !this.show;
		}
	},
	/**
	 * If position is center, set margin offset after component is updated
	 */
	updated() {

		if (this.show && this.left === "50%")
		{
			const w = this.$el.offsetWidth;
			this.$el.style.marginLeft = "-"+(w / 2)+"px";
		}
	}
}
</script>
