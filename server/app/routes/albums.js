import { Router as route } from 'express';
import mime from 'mime';
import { Album } from '../../db/models';

const router = route();

router.get('/', (req, res, next) => {
  Album.findAll({ where: req.query })
    .then(albums => res.json(albums))
    .catch(next);
});

router.param('albumId', (req, res, next, id) => {
  Album.scope('defaultScope', 'populated').findById(id)
    .then(album => {
      if (!album) throw new Error('Album not found!');
      req.album = album;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:albumId', (req, res) => res.json(req.album));

router.get('/:albumId/image', (req, res, next) => {
  Album.findById(req.params.albumId, {
      attributes: ['cover', 'coverType']
    })
    .then(album => {
      if (!album.cover || !album.coverType) return next(new Error('no cover'));
      res.set('Content-Type', mime.lookup(album.coverType));
      res.send(album.cover);
    })
    .catch(next);
});

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
