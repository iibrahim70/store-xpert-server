import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/auth.utils';
import config from '../config';

const createUserFromDB = async (newUserData: IUser) => {
  // Check if a user with the provided email already exists
  if (await User.isUserExistsByEmail(newUserData.email)) {
    // If user already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  // If user does not exist, create the new user
  const result = User.create(newUserData);

  return result;
};

const loginUserFromDB = async (userCredentials: Partial<IUser>) => {
  // Check if a user with the provided email exists
  const existingUser = await User.isUserExistsByEmail(
    userCredentials.email as string,
  );

  if (!existingUser) {
    // If user does not exist, throw a NOT_FOUND ApiError
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User with this email does not exist.',
    );
  }

  // Compare hashed password to provided password
  const isPasswordValid = await bcrypt.compare(
    userCredentials?.password as string,
    existingUser?.password,
  );

  if (!isPasswordValid) {
    // If password is invalid, throw a FORBIDDEN ApiError
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Password');
  }

  // Create JWT payload for token generation
  const jwtPayload = {
    email: existingUser?.email,
    role: existingUser?.role,
  };

  // Generate access token for the user
  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  createUserFromDB,
  loginUserFromDB,
};
