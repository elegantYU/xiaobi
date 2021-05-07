const fs = require('fs')
const path = require('path');
const alias = require('./config/alias');
const isDev = require('./config/isDev')
const Webpackbar = require('webpackbar');
const postcssEnv = require('postcss-preset-env')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const postcssNormalize = require('postcss-normalize')
const MiniCssPlugin = require('mini-css-extract-plugin')
const postcssFlexbugs = require('postcss-flexbugs-fixes')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const resolve = p => path.resolve(__dirname, p)

module.exports = {
	entry: {
		index: resolve('../src/index.tsx'),
		background: resolve('../src/services/index.ts'),
		worker: resolve('../src/worker/index.ts')
	},
	output: {
		filename: 'static/js/[name].js',
		path: resolve('../dist'),
	},
	cache: {
		type: "memory"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
		alias
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					isDev ? "style-loader" : MiniCssPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								ident: "postcss",
								plugins: [
									postcssFlexbugs,
									postcssEnv({
										autoprefixer: {
											grid: true,
											flex: 'no-2009'
										},
										stage: 3
									}),
									postcssNormalize,
								],
								sourceMap: isDev
							}
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: isDev
						}
					}
				]
			},
			{
				test: /\.(gif|jpeg|png|jpg|svg)(\?t=\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]-[hash:6].min.[ext]",
							outputPath: "static/images/",
							limit: 10 * 1024,
						},
					},
				],
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]-[hash:6].min.[ext]",
							outputPath: "static/fonts/",
							limit: 5000,
						},
					},
				],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					cacheDirectory: true,
				},
			}
		]
	},
	optimization: {
		minimize: !isDev,
		minimizer: [
			!isDev && new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: { pure_funcs: ['console.log'] }
				}
			}),
			!isDev && new OptimizeCssPlugin()
		].filter(Boolean),
		splitChunks: {
			chunks: 'all',
			minChunks: 2,
			automaticNameDelimiter: '-',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				common: {
					priority: -20,
				}
			}
		}
	},
	plugins: [
		new ForkTsCheckerPlugin({
			typescript: {
				configFile: resolve('../tsconfig.json')
			}
		}),
		new HtmlPlugin({
			title: 'notion-cn',
			filename: 'index.html',
			template: resolve('../public/index.html'),
			chunks: ["vendors", "index"]
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "public/manifest.json",
					to: "manifest.json",
				},
				{
					from: "public/icons",
					to: "static/icons",
				},
			]
		}),
		new Webpackbar({
			name: isDev ? '编译中...' : '疯狂打包中!!!',
			color: isDev ? '#67C23A' : '#409EFF'
		}),
	]
}
