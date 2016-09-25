import path from 'path';
import util from 'util';
import chalk from 'chalk';
import env from '../../../server/env';

const rootPath = path.join(__dirname, '../../../');
const indexPath = path.join(rootPath, './public/index.html');
const faviconPath = path.join(rootPath, './public/favicon.ico');

function logMiddleware (req, res, next) {
  util.log('---NEW REQUEST---');
  console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST', req.method, req.path));
  console.log(util.format(chalk.yellow('%s: %s'), 'QUERY', util.inspect(req.query)));
  console.log(util.format(chalk.cyan('%s: %s'), 'BODY', util.inspect(req.body)));
  next();
}

export default function (app) {
  app.setValue('env', env);
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);
}
