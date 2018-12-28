import Vue from 'vue'

// Import style
import './style/main.styl'

const components = [];

// Globally register components
for (const comp of components)
	Vue.component(comp.name, comp);

export default components;