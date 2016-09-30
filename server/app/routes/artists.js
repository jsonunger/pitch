/* eslint-disable new-cap */
import { Router } from 'express';
import { Artist } from '../../db/models';

const router = Router();

router.get('/', (req, res, next) => {
  Artist.findAll({ where: req.query })
    .then(artists => res.json(artists))
    .catch(next);
});

router.param('artistId', (req, res, next, id) => {
  Artist.findById(id)
    .then(artist => {
      if (!artist) {
        const err = new Error('Artist not found!');
        err.status = 404;
        throw err;
      }
      req.artist = artist;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:artistId', (req, res) => res.json(req.artist));

router.get('/:artistId/albums', (req, res, next) => {
  req.artist.getAlbums()
    .then(albums => res.json(albums))
    .catch(next);
});

router.get('/:artistId/songs', (req, res, next) => {
  req.artist.getSongs({
      include: [Artist]
    })
    .then(songs => res.json(songs))
    .catch(next);
});

export { router as default };
