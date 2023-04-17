import { Role } from './../../../common/common.constants';

export default interface IJwtPayload {
  username: string;
  email: string;
  role: Role;
  salt: string;
  updatedPasswordAt: Date;
  id: string;
}
