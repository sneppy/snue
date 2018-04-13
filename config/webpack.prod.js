/**
 * Production webpack configuration
 */
const merge				= require("webpack-merge");
const ExtractTextPlugin	= require("extract-text-webpack-plugin");

const cssSourceMaps		= process.env.TARGET === 'development'
const extractPlugin		= ExtractTextPlugin.extract({
	use: [
		{ loader: 'css-loader', options: { sourceMap: cssSourceMaps } },
		{ loader: 'stylus-loader', options: { sourceMap: cssSourceMaps, compress: true } },
	]
});

// Import base configuration
const base		= require("./webpack.base");
const resolve	= (file) => require("path").resolve(__dirname, file);

// Export configuration
module.exports = merge(base, {
	entry: {
		app: "./src/main.js"
	},
	output: {
		path: resolve("../dist"),
		publicPath: "/dist/",
		library: "Snue",
		libraryTarget: "umd",
		libraryExport: "default"
	},
	module: {
		noParse: /es6-promise\.js/,
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader"
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
						stylus: extractPlugin
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.styl$/,
				use: extractPlugin,
				exclude: /node_modules/
			}
		]
	}
});