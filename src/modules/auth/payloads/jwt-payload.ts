import { Role } from 'src/common/common.constants';

export default interface IJwtPayload {
  username: string;
  email: string;
  role: Role;
  salt: string;
  updatedPasswordAt: Date;
}
