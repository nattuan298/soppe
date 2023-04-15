import { RoleModel } from "./role.model";

export interface InternalUserModel {
  roles: string;
  _id: string;
  firstName: string;
  lastName: string;
  status: string;
  jobType: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  citizenship: string;
  dateOfBirth: string;
  salt?: string;
  lastSignin?: string;
  updatedAt: string;
  twoFaStatus?: string;
  gender: string;
  googleAuth?: boolean;
  avatar?: string;
  avatarUrl?: string;
}
