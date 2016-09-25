import { Router } from 'express';
import mime from 'mime';
import chalk from 'chalk';
import sendSeekable from './middleware/sendSeekable';
import { Song } from '../../db/models';

const router = Router();

router.get('/', (req, res, next) => {
  Song.findAll({ where: req.query })
    .then(songs => res.json(songs))
    .catch(next);
});

router.param('songId', (req, res, next, id) => {
  Song.findById(id)
    .then(song => {
      if (!song) throw new Error('Song not found!');
      req.song = song;
      return next();
    })
    .catch(next);
});

router.get('/:songId', (req, res) => res.json(req.song));

router.get('/:songId/image', (req, res, next) => {
  req.song.getAlbum({
      attributes: ['cover', 'coverType']
    })
    .then(album => {
      if (!album.cover || !album.coverType) throw new Error('no cover');
      res.set('Content-Type', mime.lookup(album.coverType));
      res.send(album.cover);
    })
    .catch(next);
});

/**
 * I am storing song audio directly in the db as `bytea` columns.
 * However, retrieving this data is slow for anything over a couple Mb.
 * This is mitigated by adding audio to an in-memory cache on the first load
 * so that subsequent requests do not hit the slow db retrieval.
 * That cache is lost on every server restart.
 *
 * In production, the audio files would be stored fully in something like S3, and
 * the db songs would have filepaths. Then Express could stream the file
 * contents near-instantly, plus there would be no need for a cache.
 */

const audioCache = {}; // stores entire song buffers; bad idea for production

router.get('/:songId/audio', sendSeekable, (req, res, next) => {
  if (!req.song.extension) return next(new Error('No audio for song'));
  const id = req.params.songId;
  // caching to help overcome PSQL's sllloowwww byte array format
  const cached = audioCache[id];
  if (cached) return res.sendSeekable(cached.buffer, cached.options);
  // first-time lookup is still slow :-(
  console.log(chalk.yellow(`Audio ${id}: fetching for the first time.`));
  const options = {
    type: mime.lookup(req.song.extension),
    length: req.song.size
  };
  Song.findById(id, {
      attributes: ['buffer']
    })
    .then(song => {
      console.log(chalk.blue(`Audio ${id}: fetched; now caching and sending.`));
      audioCache[id] = {
        options: options,
        buffer: song.buffer
      };
      res.sendSeekable(song.buffer, options);
    })
    .catch(next);
});

export { router as default };
