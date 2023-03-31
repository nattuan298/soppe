import { Document } from 'mongoose';
import { Gender, Role, Status } from 'src/common/common.constants';
export interface IUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  avatar: string;
  dateOfBirth: Date;
  status?: Status;
  role?: Role;
  updatedPasswordAt?: Date;
  code: string;
}

export type UserDocument = IUser & Document;
