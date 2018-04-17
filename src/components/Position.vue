<template>
	<div class="position"
		:class="method+' '+(fixed ? 'fixed' : '')"
		:style="{justifyContent, alignItems}">
		<slot/>
	</div>
</template>

<script>
/**
 * Position any component
 */
export default {
	name: "position",
	props: {
		method: {
			type: String,
			default: "fill"
		},
		pos: {
			type: String,
			default: "center"
		},
		fixed: {
			type: Boolean,
			default: false
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
	}
}
</script>
