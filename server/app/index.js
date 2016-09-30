import path from 'path';
import express from 'express';
import configure from './configure';
import routes from './routes';
const app = express();

export default function (db) {
  // Pass our express application pipeline into the configuration function
  configure(app, db);

  // Define our routes
  app.use('/api', routes);

  app.use(function(req, res, next) {
    if (path.extname(req.path).length > 0) {
      res.status(404).end();
    } else {
      next(null);
    }
  });

  app.get('*', function(req, res) {
    res.sendFile(app.get('indexHTMLPath'));
  });

  // Error catching endware.
  app.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

  return app;
}
