import { Router } from 'express';
import { UserControllers } from '../controllers/user.controller';
import validateRequest from '../middlewares/validateRequest';
import userValidationSchema from '../validations/user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
