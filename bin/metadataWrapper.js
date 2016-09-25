import Promise from 'bluebird';
import { readFileSync, createReadStream } from 'fs';
import { join } from 'path';
import mm from 'musicmetadata';

const DEFAULT_ALBUM_COVER_PATH = join(__dirname, 'default-album.jpg');
const defaultAlbumCoverBuffer = readFileSync(DEFAULT_ALBUM_COVER_PATH);

export default function (name) {
  return new Promise((resolve, reject) => {
    mm(createReadStream(name), (err, metadata) => {
      if (err) return reject(err);

      metadata.path = name;
      metadata.picture = metadata.picture[0] || { data: defaultAlbumCoverBuffer, format: 'jpg' };

      let pictureBuffer = new Buffer(metadata.picture.data.length);
      metadata.picture.data.copy(pictureBuffer);
      metadata.picture.data = pictureBuffer;

      resolve(metadata);
    });
  });
}
