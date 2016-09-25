import Bluebird from 'bluebird';
import { extname } from 'path';
import fs from 'fs';

Bluebird.promisifyAll(fs);

export function isMp3(filePath) {
  return ['.mp3', '.m4a', '.mp4'].includes(extname(filePath));
}

export function dirWalk(all, root) {
  if (!root) [root, all] = [all, []];

  const add = elem => all.concat(elem);
  const fullPath = filepath => `${root}/${filepath}`;

  return fs.statAsync(root)
    .then(stats => {
      if (stats.isDirectory()) {
        return fs.readdirAsync(root)
          .map(fullPath)
          .reduce(dirWalk, all);
      } else if (stats.isFile()) {
        return add(root);
      }
    });
}

export default { isMp3, dirWalk };
