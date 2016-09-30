export default function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const config = require('../../../webpack.dev.config.js');
    const compiler = require('webpack')(config);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }
}
