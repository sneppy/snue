// Import components
import Drawer		from "./components/Drawer"
import LineGraph	from "./components/LineGraph"
import Notification	from "./components/Notification"
import Position		from "./components/Position"
const components = [
	Drawer,
	LineGraph,
	Notification,
	Position
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