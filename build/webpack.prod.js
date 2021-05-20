const webpack = require('webpack');
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = merge(common, {
	plugins: [
		new MiniCssPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].css',
			ignoreOrder: false
		}),
		new webpack.BannerPlugin({
			raw: true,
			banner: `/** Want to see the source code? No need to be so troublesome. Portal:  */`
		}),
		new CleanWebpackPlugin()
	]
})
