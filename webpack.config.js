const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'browser');

const config = {
  entry: `${APP_DIR}/js/index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: `${APP_DIR}/js`,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.unshift(new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.DedupePlugin());
}

module.exports = config;
