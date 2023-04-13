import { PermissionModel } from "./permission.model";

export interface RoleModel {
  permissions: PermissionModel[];
  _id: string;
  name: string;
  status: string;
  fullAccess: boolean;
  updatedAt?: string;
}

export interface RoleRequestModel {
  name: string;
  status: string;
  permissions: string[];
  fullAccess: boolean;
}
