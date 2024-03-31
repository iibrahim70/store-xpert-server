import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/auth.utils';
import config from '../config';
// import config from '../config';

const registerUserFromDB = async (newUserData: IUser) => {
  // Check if a user with the provided email already exists
  if (await User.isUserExistsByEmail(newUserData.email)) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  // If user does not exist, create the new user
  const result = User.create(newUserData);

  return result;
};

const LoginUserFromDB = async (userCredentials: Partial<IUser>) => {
  // Check if a user with the provided email exists
  const existingUser = await User.isUserExistsByEmail(
    userCredentials.email as string,
  );

  if (!existingUser) {
    // If user does not exist, throw an ApiError with status code 404
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User with this email does not exist.',
    );
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(
    userCredentials?.password as string,
    existingUser?.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Password');
  }

  //create token and sent to the  client

  const jwtPayload = {
    email: existingUser?.email,
    role: existingUser?.role,
  };

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
  registerUserFromDB,
  LoginUserFromDB,
};
