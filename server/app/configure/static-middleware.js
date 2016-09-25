import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

export default function (app) {
  const root = app.getValue('projectRoot');
  const npmPath = path.join(root, './node_modules');
  const publicPath = path.join(root, './public');
  const srcPath = path.join(root, './src');

  app.use(favicon(app.getValue('faviconPath')));
  app.use(express.static(npmPath));
  app.use(express.static(publicPath));
  app.use(express.static(srcPath));
}
