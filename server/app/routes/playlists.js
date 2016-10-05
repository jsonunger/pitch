/* eslint-disable new-cap */
import { Router } from 'express';
import { Playlist } from '../../db/models';
import { assertAdminOrSelf, assertSelf } from './middleware/auth';

const router = Router();

router.route('/')
  .get(assertAdminOrSelf, (req, res, next) => {
    req.requestedUser.getPlaylists()
      .then(playlists => res.json(playlists))
      .catch(next);
  })
  .post(assertSelf, (req, res, next) => {
    req.requestedUser.addPlaylist(req.body)
      .then(playlist => res.status(201).json(playlist))
      .catch(next);
  });

router.param('playlistId', function(req, res, next, id) {
  Playlist.scope('populated').findById(id)
    .then(playlist => {
      if (!playlist) {
        const err = new Error('Playlist not found!');
        err.status = 404;
        throw err;
      }
      req.playlist = playlist;
      next();
      return null;
    })
    .catch(next);
});

router.route('/:playlistId')
  .get(assertAdminOrSelf, (req, res) => res.json(req.playlist))
  .put(assertAdminOrSelf, (req, res, next) => {
    req.playlist.update(req.body)
      .then(playlist => res.status(200).json(playlist))
      .catch(next);
  })
  .delete(assertAdminOrSelf, (req, res, next) => {
    req.playlist.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  });

router.route('/:playlistId/songs')
  .get(assertAdminOrSelf, (req, res) => res.json(req.playlist.songs))
  .post(assertAdminOrSelf, (req, res, next) => {
    const id = req.body.id || req.body.song.id;
    req.playlist.addAndReturnSong(id)
      .then(song => res.status(201).json(song))
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.status = 409;
          err.message = 'Song is already in the playlist.';
        }
        return next(err);
      });
  });

router.delete('/:playlistId/songs/:songId', assertAdminOrSelf, (req, res, next) => {
  req.playlist.removeSong(req.params.songId)
    .then(() => res.sendStatus(204))
    .catch(next);
});

export { router as default };
