import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { IPackage } from '../interfaces/testimonial.interface';
import { Package } from '../models/testimonial.model';

const createPackageFromDB = async (packageData: IPackage) => {
  const packagesLimit = 3;

  const existingPackagesCount = await Package.countDocuments({
    isDeleted: false,
  });

  if (existingPackagesCount >= packagesLimit) {
    throw new ApiError(
      httpStatus.TOO_MANY_REQUESTS,
      'Maximum package creation limit reached!',
    );
  }

  const result = Package.create(packageData);
  return result;
};

const getAllPackagesFromDB = async () => {
  const result = Package.find({ isDeleted: false });

  return result;
};

const updatePackageFromDB = async (
  packageId: string,
  packageData: Partial<IPackage>,
) => {
  const existingPackage = await Package.findById(packageId);
  if (!existingPackage || existingPackage.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found!');
  }

  const result = Package.findByIdAndUpdate(packageId, packageData, {
    new: true,
  });
  return result;
};

const deletePackageFromDB = async (packageId: string) => {
  const existingPackage = await Package.findById(packageId);
  if (!existingPackage || existingPackage.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found!');
  }

  const result = Package.findByIdAndUpdate(
    packageId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const PackageServices = {
  createPackageFromDB,
  getAllPackagesFromDB,
  updatePackageFromDB,
  deletePackageFromDB,
};
