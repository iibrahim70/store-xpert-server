import { Router } from 'express';
import { UserRoutes } from './user.route';
import { TestimonialRoutes } from './testimonial.route';

const router = Router();

const routes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/testimonials',
    route: TestimonialRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
