import itunes from 'itunes-library-stream';
import status from 'node-status';
import filesystem from 'fs';
import program from 'commander';
import Promise from 'bluebird';
import db from '../server/db/db';
import '../server/db/models';
import { keyFor, grabXML, log, isValidData } from './helper';

const fs = Promise.promisifyAll(filesystem);
const KEY = Symbol('key');
const TRACKS = Symbol('TRACKS');
const DEFAULT_TRACK_LIMIT = 150;


program
  .usage('[options] [seed.xml ...]')
  .description('Seeds the pitch database with metadata from an XML file. By default, we\'ll import your iTunes library')
  .option('-f, --force', 'Force sync (will delete everything in the db)')
  .option('-l, --limit <num>', `Limit total tracks imported to <num> (default ${DEFAULT_TRACK_LIMIT}`, parseInt)
  .option('-u, --unlimited', 'Import unlimited tracks')
  .parse(process.argv);

status[TRACKS] = {
  total: status.addItem('total', { color: 'magenta' }),
  skipped: status.addItem('skipped', { color: 'yellow' }),
  seeding: status.addItem('seeding', { color: 'green' }),
  seeded: status.addItem('seeded', { color: 'blue' })
};

program[TRACKS] = program.unlimited ? Infinity : (program.limit || DEFAULT_TRACK_LIMIT);

let xmlFile = grabXML(program.args[0]);

const [Artist, Album, Song, ArtistSong] = ['artists', 'albums', 'songs', 'artistSong'].map(table => {
  function findOrCreate(columns) {
    const key = keyFor(columns, KEY);
    if (findOrCreate[key]) {
      log.debug `cache hit for ${key}, with inner key ${findOrCreate[key][KEY]}`;
      return findOrCreate[key];
    }
    const pKeyExpr = (findOrCreate.primaryKey || ['id']).map(k => `"${k}"`).join(',');
    let keys, values;
    let self = findOrCreate[key] = Promise.props(columns)
      .then(cols => {
        keys = Object.keys(cols);
        values = keys.map(k => cols[k]);
        return cols;
      })
      .then(() => {
        return db.query(`SELECT ${pKeyExpr} from "${table}" WHERE ${keys.map(col => `"${col}"=?`).join(' AND ')}`, { replacements: values, type: 'SELECT' });
      })
      .then(results => {
        if (results.length) {
          ++findOrCreate.found;
          return results;
        } else {
          return db.query(`INSERT INTO "${table}" (${keys.map(c => `"${c}"`).join(', ')}, "createdAt", "updatedAt") VALUES (${keys.map(() => '?')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING ${pKeyExpr}`, { replacements: values, type: 'INSERT' });
        }
      })
      .then(results => {
        ++findOrCreate.created;
        return results[0].id;
      })
      .catch(err => {
        log.error `warning: ${err.message}`;
        log.error `   in findOrCreate for ${key} into ${table}`;
        ++findOrCreate.errors;
        return null;
      });
    self[KEY] = key;
    log.debug `added key ${self[KEY]}`;
    findOrCreate[key] = self;
    return self;
  }

  findOrCreate.found = findOrCreate.created = findOrCreate.errors = 0;
  findOrCreate.table = table;
  return findOrCreate;
});

ArtistSong.primaryKey = ['artistId', 'songId'];

fs.statAsync(xmlFile)
  .then(() => {
    status.start({
      interval: 125,
      pattern: 'XML tracks @ {uptime} | Total: {total.magenta} | Skipped: {skipped.yellow} | Seeding: {seeding.green} | Seeded: {seeded.blue}'
    });
    return db.sync({ force: program.force });
  })
  .then(() => {
    const tracks = [];
    return new Promise(resolve => {
      const xmlStream = fs.createReadStream(xmlFile);
      xmlStream.pipe(itunes.createTrackStream())
        .on('data', data => {
          status[TRACKS].total.inc(1);
          if (status[TRACKS].seeding.val >= program[TRACKS]) {
            status[TRACKS].skipped.inc(1);
            return;
          } else if (!isValidData(data)) {
            status[TRACKS].skipped.inc(1);
            log `SKIPPED FOR INVALID DATA: Song: ${data.Name}, Artist: ${data.Artist}, Album: ${data.Album}`;
            return;
          }
          status[TRACKS].seeding.inc(1);
          const seeding = ArtistSong({
            artistId: Artist({
              name: data.Artist,
              sortName: data['Sort Artist'] || data.Artist
            }),
            songId: Song({
              name: data.Name,
              url: data.Location,
              genre: data.Genre,
              trackNum: data['Track Number'],
              sortName: data['Sort Name'] || data.Name,
              albumId: Album({
                name: data.Album,
                sortName: data['Sort Album'] || data.Album,
                artistId: Artist({
                  name: data.Artist,
                  sortName: data['Sort Artist'] || data.Artist
                })
              })
            })
          });
          tracks.push(seeding);
          seeding.then(() => status[TRACKS].seeded.inc(1));
        })
        .on('error', err => console.error(err))
        .on('end', () => resolve(Promise.all(tracks)));
    });
  })
  .then(() => {
    process.exit();
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });

process.on('exit', code => {
  if (code === 0) {
    console.log([Artist, Album, Song, ArtistSong].map(model => `${model.table}: ${model.found} found, ${model.created} created, ${model.errors} errors`).join('\n'));
  }
});
