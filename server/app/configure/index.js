import webpackMiddleware from './webpack-middleware';
import variableMiddleware from './variable-middleware';
import staticMiddleware from './static-middleware';
import parsingMiddleware from './parsing-middleware';

export default function configure (app) {
  app.setValue = app.set.bind(app);
  app.getValue = path => app.get(path);

  webpackMiddleware(app);
  variableMiddleware(app);
  staticMiddleware(app);
  parsingMiddleware(app);

  app.use(app.getValue('log'));
}
