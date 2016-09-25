import { extname, resolve, isAbsolute } from 'path';
import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs-extra';
import chalk from 'chalk';
import { dirWalk, isMp3 } from './helper';
import grabMetadata from './metadataWrapper';
import db from '../server/db/db';
import { Artist, Album, Song } from '../server/db/models';

let dir = process.argv[2];
if (!dir) {
  console.error('Please provide the path to your music folder.');
  process.exit();
} else if (!isAbsolute(dir)) {
  dir = resolve(__dirname, '..', dir);
}

Promise.promisifyAll(fs);

const B_PER_KB = 1000;
const KB_PER_MB = 1000;

const extractMetaData = filepath => dirWalk(filepath)
  .then(filesNames => filesNames.filter(isMp3))
  .map(name => grabMetadata(name));

const formatSize = bytes => `${Math.round(bytes / B_PER_KB) / KB_PER_MB} MB`;

const myThis = {};

const start = new Date();

Promise.resolve(db.drop({ cascade: true })) // clear the database
  .bind({ docsToSave: {} })
  .then(() => { // get song metadata and sync db at same time
    console.log('reading file metadata and emptying database');
    return Promise.join(extractMetaData(dir), db.sync({ force: true }));
  })
  .spread(metadata => { // create the artists
    console.log('creating unique artists by name');
    myThis.analyzedFiles = metadata;
    let artistNames = _(myThis.analyzedFiles)
      .map('artist')
      .flatten()
      .uniq()
      .value();
    return Promise.map(artistNames, artistName => {
      return Artist.findOrCreate({
          where: {
            name: artistName
          }
        })
        .then(artists => artists[0]);
    });
  })
  .then(artists => { // create the albums
    console.log('creating albums by name');
    myThis.artists = _.keyBy(artists, instance => instance.dataValues.name);
    let albumNames = _(myThis.analyzedFiles)
      .map('album')
      .uniq()
      .value();
    return Promise.map(albumNames, albumName => {
      return Album.findOrCreate({
          where: {
            name: albumName
          }
        })
        .then(albums => albums[0]);
    });
  })
  .then(albums => {
    myThis.albums = _.keyBy(albums, instance => instance.dataValues.name);
  })
  .then(() => { // create the songs
    console.log('creating songs and reading in files');
    myThis.totalSize = 0;
    let savedCount = 0;
    let limit = myThis.analyzedFiles.length;
    let allSongsProcessed = myThis.analyzedFiles.map(file => {
      // create initial un-persisted song instance
      file.song = Song.build({
        name: file.title,
        genres: file.genre,
        extension: extname(file.path),
      });
      // determine foreign keys
      let artistIds = file.artist.map(artist => myThis.artists[artist].dataValues.id);
      let albumId = myThis.albums[file.album].dataValues.id;
      // save binary data into song
      return fs.readFileAsync(file.path)
        .then(buffer => {
          console.log(chalk.grey('read: ' + file.song.name));
          myThis.totalSize += buffer.length;
          file.song.buffer = buffer;
          file.song.size = buffer.length;
          return file.song.save();
        })
        .then(song => {
          savedCount++;
          file.song = song;
          console.log(chalk.green('✓') + chalk.grey(` saved: ${song.name} — ${formatSize(song.size)} (${savedCount}/${limit})`));
          // write to the song-artist & song-album join tables
          let madeArtistAssociations = song.addArtists(artistIds);
          let madeAlbumAssociation = song.setAlbum(albumId);
          return Promise.all([madeArtistAssociations, madeAlbumAssociation]);
        });
    });
    return Promise.all(allSongsProcessed);
  })
  .then(() => {
    console.log('seeded ' + myThis.analyzedFiles.length + ' songs (' + formatSize(myThis.totalSize) + ')');
    console.log('adding covers to albums based on song data');
    myThis.analyzedFiles.forEach(file => {
      var album = myThis.albums[file.album];
      if (file.picture && file.picture.data) {
        album.cover = file.picture.data;
        album.coverType = file.picture.format;
      }
    });
    // save albums
    let albums = _(myThis.albums)
      .values()
      .invokeMap('save')
      .value();
    return Promise.all(albums);
  })
  .then(saved => {
    console.log(chalk.green(`seeding of ${saved.length} albums complete!`));
  })
  .catch(err => {
    console.error(chalk.red(err));
    console.error(err.stack);
  })
  .finally(() => {
    const end = new Date();
    console.log('Terminated after %ds', (end - start) / 1000);
    // Sequelize holds the connection open for ~10 secs unless we tell it not to
    db.close();
    return null; // silences Bluebird warning about non-returned promise
  });
