import Vue from 'vue'

import {components} from './components'
import {directives} from './directives'

const plugin = {
	/// Installation script
	install(Vue, options) {

		// Do not install twice
		if (this.installed) return
		this.installed = true

		// Create a bus for internal components
		this.bus = new Vue()

		// Globally register components
		for (const comp of components)
			Vue.component(comp.name, comp)
		
		// Register directives
		for (const dir of directives)
			Vue.directive(dir.name, dir)
		
		// Register global modal access
		Vue.prototype.$modal = {
			// Display modal
			show(options) {

				plugin.bus.$emit('show-modal', options, Vue)
			},

			// Hide modal
			hide(options) {

				plugin.bus.$emit('hide-modal', options, Vue)
			}
		}
	}
}

export default plugin
export {components}