/* eslint-disable new-cap */
import { Router } from 'express';
import mime from 'mime';
import { parse } from 'url';
import request from 'request';
import fs from 'fs';
import mm from 'musicmetadata';
import { Song } from '../../db/models';

const router = Router();

router.get('/', (req, res, next) => {
  Song.scope('defaultScope', 'populated').findAll({ where: req.query })
    .then(songs => res.json(songs))
    .catch(next);
});

router.param('songId', (req, res, next, id) => {
  Song.scope('defaultScope', 'populated').findById(id)
    .then(song => {
      if (!song) {
        const err = new Error('Song not found!');
        err.status = 404;
        throw err;
      }
      req.song = song;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:songId', (req, res) => res.json(req.song));

function open (url) {
  const parsed = parse(url);
  return parsed.protocol === 'file:' ? fs.createReadStream(decodeURIComponent(parsed.path)) : request(url);
}

router.get('/:songId/image', (req, res, next) => {
  mm(open(req.song.url), (err, metadata) => {
    if (err) return next(err);
    const pic = metadata.picture[0];
    pic ? res.set('Content-Type', mime.lookup(pic.format)).send(pic.data) : res.redirect('/default-album.jpg');
  });
});

router.get('/:songId/audio', (req, res, next) => {
  const url = parse(req.song.url);
  url.protocol === 'file:' ? res.sendFile(decodeURIComponent(url.path)) : res.redirect(req.song.url);
});

export { router as default };
