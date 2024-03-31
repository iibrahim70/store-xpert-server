import { Router } from 'express';
import { UserRoutes } from './user.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
