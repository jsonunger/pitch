/* eslint-disable new-cap */
import { Router } from 'express';
import { Album } from '../../db/models';

const router = Router();

router.get('/', (req, res, next) => {
  Album.scope('songIds').findAll({ where: req.query })
    .then(albums => res.json(albums))
    .catch(next);
});

router.param('albumId', (req, res, next, id) => {
  Album.scope('populated').findById(id)
    .then(album => {
      if (!album) {
        const err = new Error('Album not found!');
        err.status = 404;
        throw err;
      }
      req.album = album;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:albumId', (req, res) => res.json(req.album));

router.get('/:albumId/image', (req, res) => res.redirect(`/api/songs/${req.album.songs[0].id}/image`));

router.get('/:albumId/songs/', (req, res) => res.json(req.album.songs));

router.get('/:albumId/songs/:songId', (req, res, next) => {
  const song = req.album.songs.find(s => s.id === Number(req.params.songId));
  if (!song) {
    const err = new Error('Album song not found');
    err.status(404);
    return next(err);
  }
  res.json(song);
});

export { router as default };
