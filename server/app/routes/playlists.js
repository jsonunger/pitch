import { Router } from 'express';
import { Playlist } from '../../db/models';

const router = Router();

router.route('/')
  .get((req, res, next) => {
    Playlist.findAll({ where: req.query })
      .then(playlists => res.json(playlists))
      .catch(next);
  })
  .post((req, res, next) => {
    Playlist.create(req.body)
      .then(playlist => res.status(201).json(playlist))
      .catch(next);
  });

router.param('playlistId', function(req, res, next, id) {
  Playlist.scope('populated').findById(id)
    .then(playlist => {
      if (!playlist) throw new Error('Playlist not found!');
      req.playlist = playlist;
      next();
      return null;
    })
    .catch(next);
});

router.route('/:playlistId')
  .get((req, res) => res.json(req.playlist))
  .put((req, res, next) => {
    req.playlist.update(req.body)
      .then(playlist => res.status(200).json(playlist))
      .catch(next);
  })
  .delete((req, res, next) => {
    req.playlist.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  });

router.route('/:playlistId/songs')
  .get((req, res) => res.json(req.playlist.songs))
  .post((req, res, next) => {
    const id = req.body.id || req.body.song.id;
    req.playlist.addAndReturnSong(id)
      .then(song => res.status(201).json(song))
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.status = 409;
          err.message = 'Song is already in the playlist.';
        }
        next(err);
      });
  });

router.route('/:playlistId/songs/:songId')
  .get((req, res, next) => {
    const song = req.playlist.songs.find(s => s.id === Number(req.params.songId));
    if (!song) {
      const err = new Error('Playlist song not found');
      err.status(404);
      return next(err);
    }
    res.json(song);
  })
  .delete((req, res, next) => {
    req.playlist.removeSong(req.params.songId)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

export { router as default };
