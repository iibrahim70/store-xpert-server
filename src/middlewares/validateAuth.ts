import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../helpers/catchAsync';
import ApiError from '../errors/ApiError';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../helpers/auth.utils';
import { TUserRole } from '../interfaces/user.interface';
import { User } from '../models/user.model';

const validateAuth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking if the token is missing
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus['401_MESSAGE']);
    }

    let decoded: JwtPayload | undefined; // Declare decoded outside of the callback

    // Verifying the token
    verifyToken(token, config.jwtAccessSecret as string, (err, result) => {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus['401_MESSAGE']);
      }

      decoded = result as JwtPayload;
    });

    // Checking if the user exists in the database
    const existingUser = await User.isUserExistsByEmail(decoded?.email);

    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    }

    // Checking if the user's role matches the required roles
    if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus['401_MESSAGE']);
    }

    // Assigning decoded payload to request object
    req.user = decoded as JwtPayload;
    next();
  });
};

export default validateAuth;
