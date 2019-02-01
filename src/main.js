import {components} from './components'
import {directives} from './directives'

const plugin = {
	/// Installation script
	install(Vue, options) {

		// Do not install twice
		if (this.installed) return
		this.installed = true

		// Globally register components
		for (const comp of components)
			Vue.component(comp.name, comp)
		
		// Register directive
		for (const dir of directives)
			Vue.directive(dir.name, dir)
	}
}

export default plugin
export {components}