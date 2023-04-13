import { RoleModel } from "src/types/role.model";

export type PreviewType = {
  lastModified: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  twoFaStatus: string;
  roles: RoleModel[];
};
