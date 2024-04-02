import { Router } from 'express';
import { AuthControllers } from '../controllers/auth.controller';
import validateRequest from '../middlewares/validateRequest';
import { AuthValidations } from '../validations/auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidations.registerSchema),
  AuthControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginSchema),
  AuthControllers.loginUser,
);

export const UserRoutes = router;
