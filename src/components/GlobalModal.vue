<template>
	<div class="global-modal">
		<transition name="fade-in">
			<div v-if="show" class="inner">
				<div ref="mountPoint"></div>
			</div>
		</transition>

		<transition name="fade">
			<div v-if="show"
				class="background"
				@click="pop()">
			</div>
		</transition>
	</div>
</template>

<script>
import Snue from '@/main.js'

export default {
	name: 'global-modal',

	data() {

		return {
			///  Stack of rendered component if any
			components: []
		}
	},

	computed: {
		/// True if at least one component in stack
		show() {

			return this.components.length > 0
		}
	},

	methods: {
		/// Handle show request
		showModal(options, Vue) {

			// Set display type and content
			if (options.type === 'component')
			{
				this.type = options.type

				// Create a new component instance
				const instance = new (Vue.extend(options.component))({
					propsData: options.props,
					parent: this
				})
				instance.$mount()

				// Register events
				for (const event in options.events)
					instance.$on(event, options.events[event])
				
				// Push on stack
				this.push(instance)
			}
		},

		/// Push component on stack
		push(instance) {

			if (instance)
			{
				this.components.push(instance)

				// We cannot append the component
				// in this tick because refs is probably empty.
				// Thus we force update the vue model
				// and wait the next tick
				this.$forceUpdate()
				this.$nextTick(() => {

					this.$refs.mountPoint.appendChild(instance.$el)
				})
			}
		},

		/// Pop last component from the stack
		pop() {

			return this.components.pop()
		}
	},

	watch: {
		show(newVal, oldVal) {

			// If we true, prevent scrolling
			document.documentElement.style.overflowY = newVal ? 'hidden' : 'auto'
		}
	},

	created() {

		// Register events
		Snue.bus.$on('show-modal', this.showModal)
		Snue.bus.$on('hide-modal', this.pop)
	}
}
</script>
