import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { RoleRequestModel } from "src/types/role.model";

export function deleteRole(id: string): Promise<void> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/roles/${id}`);
}
export function activateRole(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/roles/activate/${id}`);
}
export function deactivateRole(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/roles/deactivate/${id}`);
}
export function createRole(body: RoleRequestModel): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/roles`, { ...body });
}
export function updateRole(params: { id: string; body: RoleRequestModel }): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/roles/${params.id}`, { ...params.body });
}
