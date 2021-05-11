const HtmlWebpackPlugin 		= require('html-webpack-plugin');
const MiniCssExtractPlugin 	= require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin 					= require('copy-webpack-plugin');
const CssMinimizerPlugin 		= require('css-minimizer-webpack-plugin');
const TerserPlugin 				= require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	output: {
		clean: true,
		filename: 'main.[contenthash].js',
	},
	optimization: {
		minimize: true,
		minimizer: [ new OptimizeCssAssetsPlugin(), new CssMinimizerPlugin(), new TerserPlugin() ],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /styles\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /styles\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
			},
			{
				test: /\.html$/i,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: false },
					},
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets/', to: './assets/' }],
		}),
	],
};
