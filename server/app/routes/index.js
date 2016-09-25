import { Router } from 'express';
import artistRoutes from './artists';
import albumRoutes from './albums';
import playlistRoutes from './playlists';
import songRoutes from './songs';

const routes = Router();

routes.use('/artists', artistRoutes);
routes.use('/albums', albumRoutes);
routes.use('/playlists', playlistRoutes);
routes.use('/songs', songRoutes);

routes.use(function (req, res) {
  res.status(404).end();
});

export default routes;
