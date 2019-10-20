<template>
	<component :is="tag" class="drag-slider" :class="{'drag-slider-active': active}">
		<slot/>
	</component>
</template>

<script>
export default {
	name: 'drag-slider',

	props: {
		/// Starting value
		value: {
			type: Number,
			required: true
		},

		/// Enclosing tag
		tag: {
			type: String,
			default: 'div'
		},

		/// Axis, 'x' or 'y'
		axis: {
			type: String,
			default: 'y',
			validator: (val) => val === 'x' || val === 'y'
		},
		
		/**
		 * Number of steps necessary to increment value by one
		 * If this value is zero, value is treated as a floating point value
		 */
		steps: {
			type: Number,
			default: 10
		},

		/// Flag to invert axis direction
		invertAxis: {
			type: Boolean,
			default: true
		},

		/// Min value, value will not be decremented below this
		min: {
			type: Number,
			required: false
		},

		/// Max value, value will not be incremented beyond this value
		max: {
			type: Number,
			required: false
		}
	},

	data() {

		return {
			/// Flag to indicate that is dragging
			active: false
		}
	},

	methods: {
		/// On mouse down, start dragging
		dragStart(ev) {

			this.startX		= ev.clientX
			this.startY		= ev.clientY
			this.startValue	= this.value

			// Set active
			this.active = true

			// Attach events to document
			document.addEventListener('mousemove', this.dragMove)
			document.addEventListener('mouseup', this.dragEnd)
		},

		/// Mobile equivalent of @see dragStart
		touchStart(ev) {

			const touch		= ev.changedTouches[0]
			this.startX		= touch.clientX
			this.startY		= touch.clientY
			this.startValue	= this.value

			// Set active
			this.active = true

			// Attach events to document
			document.addEventListener('touchmove', this.touchMove)
			document.addEventListener('touchend', this.touchEnd)
		},

		/// Called on mouse move, fires input event with udpated value
		dragMove(ev) {

			const deltaX = ev.clientX - this.startX
			const deltaY = ev.clientY - this.startY

			// Compute effective offset
			let val = this.axis === 'x' ? deltaX : deltaY
			if (this.steps) val = (val / this.steps) | 0
			if (this.invertAxis) val = -val

			let finalVal = this.startValue + val

			/// Apply constraints
			if (this.min)
				finalVal = Math.max(finalVal, this.min)
			if (this.max)
				finalVal = Math.min(finalVal, this.max)

			// Emit input event, compatible with v-model
			this.$emit('input', finalVal)
		},

		/// Mobile equivalent of @see dragMove
		touchMove(ev) {

			// Prevent page scrolling
			ev.preventDefault()
			
			// Delegate to desktop method
			// It's ok because we are providing
			// touch clientX and clientY properties
			this.dragMove(ev.changedTouches[0])
		},

		/// Removes this and move event listeners
		dragEnd() {

			this.active = false

			// Destroy document events
			document.removeEventListener('mouseup', this.dragEnd)
			document.removeEventListener('mousemove', this.dragMove)
		},

		/// Same as @ref dragEnd
		touchEnd() {

			this.active = false

			// Destroy document events
			document.removeEventListener('touchmove', this.touchMove)
			document.removeEventListener('touchend', this.touchEnd)
		}
	},

	mounted() {
		
		// Attach start event
		this.$el.addEventListener('mousedown', this.dragStart)
		this.$el.addEventListener('touchstart', this.touchStart)
	},

	beforeDestroy() {

		// Detach start event
		this.$el.removeEventListener('mousedown', this.dragStart)
	}
}
</script>