const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './client',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 8080,
		hot: true,
		historyApiFallback: true,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: { loader: 'babel-loader', query: { compact: false } },
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
	resolve: {
		alias: {
			SharedComponents: path.resolve(__dirname, 'client/sharedComponents'),
			Utils: path.resolve(__dirname, 'client/utils'),
		},
		extensions: ['.js', '.jsx'],
	},
};
