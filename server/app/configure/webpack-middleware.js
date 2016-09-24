'use strict';

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../../../webpack.dev.config');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
  }
};
