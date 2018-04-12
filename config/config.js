/**
 * Main configuration file
 */
const webpack			= require("webpack");
const merge				= require("webpack-merge");
const ExtractTextPlugin	= require("extract-text-webpack-plugin");

const prod		= require("./webpack.prod");
const package	= require("../package.json");

const version	= process.env.VERSION || package.version;

const builds	= {
	production: {
		config: {
			output: {
				filename: "snue.min.js",
				libraryTarget: "umd"
			},
			mode: "production",
			plugins : [
				new ExtractTextPlugin("snue.min.css")
			]
		},
		base: prod
	}
}

/**
 * Generate configuration file
 * 
 * @param {Object} target target environment
 */
function config(target)
{
	// Merge configurations
	return merge(target.base, target.config);
}

// Export configuration (production by default)
module.exports = process.env.TARGET ? config(builds[process.env.TARGET]) : config(builds.production);