import webpackMiddleware from './webpack-middleware';
import variableMiddleware from './variable-middleware';
import staticMiddleware from './static-middleware';
import parsingMiddleware from './parsing-middleware';
import authenticationMiddleware from './auth';

export default function (app, db) {
  app.setValue = app.set.bind(app);
  app.getValue = path => app.get(path);

  webpackMiddleware(app);
  variableMiddleware(app);
  staticMiddleware(app);
  parsingMiddleware(app);

  app.use(app.getValue('log'));

  authenticationMiddleware(app, db);
}
