import { Document } from 'mongoose';
import {
  CreateRequest,
  Gender,
  Role,
  Status,
} from 'src/common/common.constants';
export interface IUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  generation: string;
  gender: Gender;
  avatar: string;
  dateOfBirth: Date;
  status?: Status;
  createRequest?: CreateRequest;
  role?: Role;
  updatedPasswordAt?: Date;
  code: string;
}

export type UserDocument = IUser & Document;
