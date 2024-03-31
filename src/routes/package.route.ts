import { Router } from 'express';
import { PackageControllers } from '../controllers/package.controller';
import validateRequest from '../middlewares/validateRequest';
import { PackageValidationSchema } from '../validations/package.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(PackageValidationSchema),
  PackageControllers.createPackage,
);
router.get('/', PackageControllers.getAllPackages);
router.patch('/update/:packageId', PackageControllers.updatePackage);
router.patch('/delete/:packageId', PackageControllers.deletePackage);

export const PackageRoutes = router;
