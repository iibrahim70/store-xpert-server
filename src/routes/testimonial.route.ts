import { Router } from 'express';
import { TestimonialControllers } from '../controllers/testimonial.controller';
const router = Router();

router.post('/create', TestimonialControllers.createTestimonial);
router.get('/', TestimonialControllers.getAllTestimonials);

export const TestimonialRoutes = router;
