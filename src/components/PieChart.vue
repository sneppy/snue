<template>
	<div class="pie-chart">
		<svg class="part" viewBox="0 0 100 100" width="100%" height="100%" fill="transparent"
			:style="{strokeWidth}">
			<circle v-for="stroke in strokes"
			r="50" cx="50" cy="50"
			:stroke-dasharray="stroke.dasharray+', 360'"
			:stroke-dashoffset="stroke.dashoffset"
			:stroke="'hsl('+Math.abs(stroke.dashoffset)+', '+(stroke.negative ? '20%' : '60%')+', 50%)'"/>
		</svg>
	</div>
</template>

<script>
/**
 * Display data in a pie chart
 */
export default {
	name: "pie-chart",
	props: {
		data: {
			type: Array,
			default: []
		},
		strokeWidth: {
			type: String,
			default: "100%"
		}
	},
	computed: {
		strokes() {

			if (!this.data || this.data.length === 0) return;

			// Compute normalized data
			const total	= this.data.reduce((tot, val) => tot + Math.abs(val), 0);
			const norm	= this.data.map((val) => Math.abs(val) / total);

			// Computed parts
			let offset = 0;
			return norm.map((val, i, data) => {

				const dasharray = val * 100 * Math.PI;
				const negative = this.data[i] < 0;
				offset = i > 0 ? offset + data[i - 1] * 100 * Math.PI : 0;

				return {
					dasharray,
					dashoffset: -offset,
					negative
				}
			});
		}
	}
}
</script>
