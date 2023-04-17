import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Status, Gender, Role } from './../../common/common.constants';
import { defaultAvatar } from './user.constant';

const USER_MODEL = 'users';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    avatar: {
      type: String,
      default: defaultAvatar,
    },
    dateOfBirth: Date,
    salt: String,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.InActive,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
    updatedPasswordAt: Date,
    code: String,
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(mongoosePaginate);
export { UserSchema, USER_MODEL };
