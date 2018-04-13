// Import components
import Notification from "./components/Notification"
const components = [
	Notification
];

// Import styles
import "./stylus/main.styl";

// Export install script
components.install = (Vue, options = {}) => {

	for (const name in components)
	{
		const component = components[name];
		if (component && name !== "install") Vue.component(component.name, component);
	}
}
export default components;