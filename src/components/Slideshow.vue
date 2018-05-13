<template>
	<div class="slideshow">
		<div ref="container" class="container">
			<div
				v-for="(slide, i) in slides"
				:key="slide.id || i"
				class="slides s-fill"
				:class="{moving: moving}"
				:style="{left: slideOffset(i)+'%', zIndex: i, backgroundColor: slide.background || 'gold'}"
				@click="navigateTo(slide.link || null)">
				<img class="cover" :src="slide.image || slide.backgroundImage" v-if="slide.image || slide.backgroundImage"/>

				<position pos="left bottom" method="stretch" v-if="slide.title || slide.subtitle">
					<div class="pad-s-m bg-secondary c-light" style="margin: 10%;">
						<h2 style="margin: 0.2em 0;">
							<span class="t-middle">{{ slide.title }}</span>
							<span class="icon-md t-middle" v-if="slide.link">open_in_new</span>
						</h2>
						<small class="f-s">{{ slide.subtitle }}</small>
					</div>
				</position>
			</div>
		</div>

		<div class="nav d-flex between">
			<div class="nav-controls d-flex middle icon-md f-l f-bold" @click="prev">navigate_before</div>
			<div class="nav-controls d-flex middle icon-md f-l f-bold" @click="next">navigate_next</div>
		</div>
		
		<position class="quick-nav" pos="center bottom" method="stretch">
			<div class="d-flex center middle" style="height: 15%;">
				<span
					v-for="(slide, i) in slides"
					:key="i"
					class="dot"
					:style="{transform: 'scale('+(1 + slideWeight(i) * 0.5)+')'}"
					@click="jump(i)"></span>
			</div>
		</position>
	</div>
</template>

<script>
/**
 * Position any component
 */
export default {
	name: "slideshow",
	props: {
		slides: {
			type: Array,
			required: true
		}
	},
	data() {

		return {
			current: 0,
			moving: false
		}
	},
	methods: {
		/**
		 * On click, follow link
		 */
		navigateTo(uri) {

			if (uri) window.location.href = uri;
		},
		/**
		 * Get left value for i-th slide
		 * 
		 * @param {Number} i slide index
		 * 
		 * @return {Number}
		 */
		slideOffset(i) {

			return Math.max(i - this.current, 0) * 100;
		},
		/**
		 * Get slide weight based on current value
		 * 
		 * @param {Number} i slide index
		 * 
		 * @return {Number}
		 */
		slideWeight(i) {

			return Math.max(1 - Math.abs(this.current - i), 0);
		},
		// Slide controls
		prev() {
			
			this.current = Math.max(this.current - 1, 0)
		},
		next() {
			
			this.current = Math.min(this.current + 1, this.slides.length - 1)
		},
		jump(i) {
			
			this.current = Math.max(Math.min(i, this.slides.length - 1), 0)
		},
		/**
		 * Handle touch movement
		 * 
		 * @param {Number} dx absolute delta movement
		 */
		handleTouchmove(dx) {

			if (this.moving)
			{
				const width	= this.$el.clientWidth;
				const delta	= dx / width;

				// Update current slide
				this.current	= Math.max(Math.min(this.current - delta, this.slides.length - 1), 0);
				// Update velocity
				this.velocity	= dx;
			}
		},
		/**
		 * Handle tocuhstart event
		 * 
		 * @param {Number} x touch x location
		 */
		handleTouchstart(x) {

			// Start moving
			this.moving	= true;
			// Register touch location
			this.lastX	= this.x0 = x;
		},
		/**
		 * Handle touchend event
		 * 
		 * @param {Number} x touch x location
		 */
		handleTouchend(x) {

			// Stop moving
			this.moving	= false;

			// Calc final position
			// Using current velocity
			const direction	= x - this.x0 >= 0 ? 1 : -1;
			const decel		= 200 * direction;
			const max		= 0.5;
			const delta		= 0.5 * (this.velocity * this.velocity) / decel;
			const final		= this.current - Math.max(Math.min(delta, max), -max);

			// Update current value
			this.current	= Math.round(final);
		},
		/**
		 * Bind touch events
		 */
		bind() {

			// Define handlers
			const self		= this;
			self.handlers	= {
				touchstart:	(e) => self.handleTouchstart(e.touches[0].clientX),
				touchend:	(e) => self.handleTouchend(self.lastX),
				touchmove:	(e) => {

					const x = e.touches[0].clientX;
					self.handleTouchmove(x - self.lastX);

					// Update last x
					self.lastX = x;
				}
			};

			// Add touch event listeners
			this.$el.addEventListener("touchstart", this.handlers.touchstart);
			window.addEventListener("touchend", this.handlers.touchend);
			window.addEventListener("touchmove", this.handlers.touchmove)
		},
		/**
		 * Unbind touch events
		 */
		unbind() {
				
			// Remove listeners
			this.$el.removeEventListener("touchstart", this.handlers.touchstart);
			window.removeEventListener("touchend", this.handlers.touchend);
			window.removeEventListener("touchmove", this.handlers.touchmove)
		}
	},
	mounted() {

		this.bind();
	},
	destroyed() {

		this.unbind();
	}
}
</script>
