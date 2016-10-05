/* eslint-disable new-cap */
import { Router } from 'express';
import artistRoutes from './artists';
import albumRoutes from './albums';
import songRoutes from './songs';
import userRoutes from './users';

const routes = Router();

routes.use('/artists', artistRoutes);
routes.use('/albums', albumRoutes);
routes.use('/songs', songRoutes);
routes.use('/users', userRoutes);

routes.use(function (req, res) {
  res.sendStatus(404);
});

export default routes;
