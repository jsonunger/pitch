/* eslint-disable new-cap */
import { Router } from 'express';
import { User } from '../../db/models';
import { assertAdmin, assertSelf, assertAdminOrSelf } from './middleware/auth';
import playlistRoutes from './playlists';

const router = Router();

router.get('/', assertAdmin, (req, res, next) => {
  User.findAll({ where: req.query })
    .then(users => res.json(users))
    .catch(next);
});

router.param('userId', (req, res, next, id) => {
  User.scope('populated').findById(id)
    .then(user => {
      if (!user) {
        const err = new Error('User not found!');
        err.status = 404;
        throw err;
      }
      req.requestedUser = user;
      next();
      return null;
    })
    .catch(next);
});

router.route('/:userId')
  .get(assertAdminOrSelf, (req, res) => res.json(req.requestedUser))
  .put(assertSelf, (req, res, next) => {
    req.requestedUser.update(req.body)
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(next);
  })
  .delete(assertAdmin, (req, res, next) => {
    req.requestedUser.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  });

router.use('/:userId/playlists', playlistRoutes);

export {
  router as
  default
};
