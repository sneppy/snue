const path = require('path')

module.exports = {
	css: {
		extract: false
	},
	
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'stylus',
			patterns: [
				path.resolve(__dirname, 'src/style/vars.styl')
			]
		}
	}
}
