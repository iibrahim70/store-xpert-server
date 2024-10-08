/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { USER_ROLE } from '../constants/user.constant';

export interface IUser {
  email: string;
  password: string;
  role: 'user' | 'store-owner' | 'store-assistant' | 'admin';
  status: 'in-progress' | 'blocked';
  isBlocked: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

// for creating a static
export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
}
