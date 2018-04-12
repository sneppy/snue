/**
 * Base webpack configuration
 */
const resolve = (file) => require("path").resolve(__dirname, file);

module.exports = {
	resolve: {
		extensions: ["*", ".js", ".json", ".vue"],
		alias: {
			"@": resolve("../src")
		}
	}
}