const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Test webpack configuration.
 */
const path = require('path');
const webpack = require('webpack');
const modules = [
	'src/app',
	'node_modules',
];

module.exports = {
	devtool: 'cheap-module-source-map',

	module: {
		// Some libraries don't like being run through babel.
		// If they gripe, put them here.
		noParse: [
			/node_modules(\\|\/)sinon/,
			/node_modules(\\|\/)acorn/,
		],

		/**
		 * Define the preloaders.
		 *
		 * @type {Array}
		 */
		preLoaders: [
			{ test: /\.jsx?$/,
				loader: 'isparta',
				include: path.resolve('src/app/'),
				exclude: /.*?(\.spec).js/,
			},
		],

		/**
		 * Define the loaders.
		 *
		 * @type {Array}
		 */
		loaders: [
			{
				test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
				loader: 'imports?define=>false&this=>window',
			},
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					`css-loader?modules&importLoaders=1
					&localIdentName=[local]!postcss-loader`
				),
			},

			// sinon.js--aliased for enzyme--expects/requires global vars.
			// imports-loader allows for global vars to be injected into the module.
			// See https://github.com/webpack/webpack/issues/304
			{ test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
				loader: 'imports?define=>false,require=>false',
			},
			{ test: /\.jsx?$/,
				loader: 'babel',
				exclude: [/node_modules/],
			},
			{ test: /\.jpe?g$|\.gif$|\.png$/i,
				loader: 'null-loader',
			},
		],
	},

	/**
	 * Define the plugins.
	 *
	 * @type {Array}
	 */
	plugins: [
		new ExtractTextPlugin('main.css'),

		// Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
		// inside your code for any environment checks; UglifyJS will automatically
		// drop any unreachable code.
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		})],

	// Some node_modules pull in Node-specific dependencies.
	// Since we're running in a browser we have to stub them out. See:
	// https://webpack.github.io/docs/configuration.html#node
	// https://github.com/webpack/node-libs-browser/tree/master/mock
	// https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
	node: {
		fs: 'empty',
		child_process: 'empty',
		net: 'empty',
		tls: 'empty',
	},

	// required for enzyme to work properly
	externals: {
		jsdom: 'window',
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': 'window',
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json', '.css'],
		modulesDirectories: modules,
		modules,
		alias: {
			// required for enzyme to work properly
			sinon: 'sinon/pkg/sinon',
		},
	},
};
