/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { USER_ROLE } from '../constants/user.constant';

export interface IUser {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  role: 'admin' | 'user';
}

export type TUserRole = keyof typeof USER_ROLE;

// for creating a static
export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
}
