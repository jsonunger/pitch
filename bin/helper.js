import { resolve, isAbsolute } from 'path';
import userhome from 'userhome';

export function keyFor (obj, key) {
  return obj && obj[key] ||
    obj && typeof obj === 'object' && `{${Object.keys(obj).map(k => `${k}:${keyFor(obj[k], key)}`)}}` ||
    obj + '';
}

export function grabXML (filepath) {
  if (!filepath) {
    return resolve(userhome(), 'Music/iTunes/iTunes Music Library.xml');
  } else if (!isAbsolute(filepath)) {
    return resolve(__dirname, '..', filepath);
  } else {
    return filepath;
  }
}

const interp = (pieces, cooked) => pieces.map((p, i) => `${p}${i < cooked.length ? cooked[i] : ''}`).join('');

function log (pieces, ...cooked) {
  console.log(interp(pieces, cooked));
}

log.hush = () =>void 0;
log.debug = log.hush;
log.error = (pieces, ...cooked) => console.error(interp(pieces, cooked));

export { log };

export function isValidData (data) {
  return !!(data.Location && data.Name && data.Artist && data.Album && data.Kind && (data.Kind.indexOf('audio') !== -1) && (data.Kind.indexOf('Apple Lossless') === -1) && (data.Kind.indexOf('app') === -1));
}

export default { keyFor, grabXML, log, isValidData };
