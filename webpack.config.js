const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		main: ['@babel/polyfill', './main.js',],
	},
	mode: 'development',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devtool: 'source-map',
	devServer: {
		port: 4200,
		hot: true,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.csv$/,
				use: ['csv-loader',],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
							],
						},
					},
					'eslint-loader',
				],
			},
		],
	},
}