const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    `${APP_DIR}/js/index.js`
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)|(bower_components)/,
      loader: 'babel'
    }, {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass'),
      include: /(src)|(node_modules)/
    }]
  },
  postcss() {
    return [autoprefixer, precss];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
