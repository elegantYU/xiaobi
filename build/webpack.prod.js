const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new MiniCssPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].css',
			ignoreOrder: false
		}),
		// 清除冗余css
		new PurgecssPlugin({
			paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*.{scss,css,tsx}`, { nodir: true }),
			whitelist: ['html', 'body']
		}),
		new webpack.BannerPlugin({
			raw: true,
			banner: `/** Want to see the source code? No need to be so troublesome. Portal:  */`
		}),
		new CleanWebpackPlugin()
	]
})
