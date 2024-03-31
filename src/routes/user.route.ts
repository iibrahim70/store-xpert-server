import { Router } from 'express';
import { UserControllers } from '../controllers/user.controller';
import validateRequest from '../middlewares/validateRequest';
import { UserValidations } from '../validations/user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
