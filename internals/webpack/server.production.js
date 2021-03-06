const PATH = process.cwd();
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = require('./base')({

	entry: path.join(PATH, 'src/server'),

	target: 'node',

	output: {
		path: path.join(PATH, 'build'),
		publicPath: '/',
		filename: 'bundle.server.js',
		libraryTarget: 'commonjs2',
	},

	plugins: [
		new ExtractTextPlugin('bundle.[name].[contenthash].css'),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') },
		}),
	],

	eslint: {
		configFile: path.join(PATH, '.eslintrc'),
	},

	cssLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader?modules&importLoaders=1' +
		'&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
	),

	cssVendorLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader'
	),
});
