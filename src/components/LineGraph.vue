<template>
	<div class="graph-line">
		<svg :viewBox="viewBox">
			<g class="line"
				fill="none"
				:stroke="strokeColor"
				:stroke-width="strokeWidth / (bounds.upper - bounds.lower)">
				<polyline :points="svgPoints"/>
			</g>
		</svg>
	</div>
</template>

<script>
/**
 * Display data in a line graph
 */
export default {
	name: "line-graph",
	props: {
		data: {
			type: Array,
			required: true,
			default: []
		},
		strokeColor: {
			type: String,
			default: "black"
		},
		strokeWidth: {
			type: Number,
			default: 2
		}
	},
	computed: {
		bounds() {

			let min	= this.data[0]
			let max	= this.data[0];
			for (const val of this.data)
			{
				min = val < min ? val : min;
				max = val > max ? val : max;
			}

			return {lower: min, upper: max}
		},
		viewBox() {

			return `0 0 ${this.data.length} 1`;
		},
		// Get svg line
		svgLine() {

			if (this.data.length === 0) return "";

			const num	= this.data.length;
			const min	= this.bounds.lower;
			const max	= this.bounds.upper;
			const delta	= max - min;

			// Normalize data between min and max
			const norm = this.data.map((val) => 1 - (val - min) / delta);

			let line = `M 0 ${norm[1]}`;
			for (let i = 1; i < num; i++) line += ` L ${i} ${norm[i]}`;
			return line;
		},
		// Get svg points
		svgPoints() {

			if (this.data.length === 0) return "";

			const num	= this.data.length;
			const min	= this.bounds.lower;
			const max	= this.bounds.upper;
			const delta	= max - min;

			// Normalize data between min and max
			const norm = this.data.map((val) => 1 - (val - min) / delta);

			let points = `0,${norm[0]}`;
			for (let i = 1; i < num; i++) points += ` ${i},${norm[i]}`;
			return points;
		}
	}
}
</script>
