import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { InternalUserModel } from "src/types/internal-user.model";

export function deleteInternalUser(id: string): Promise<void> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/users/${id}`);
}
export function activateInternalUser(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/users/activate/${id}`);
}
export function deactivateInternalUser(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/users/deactivate/${id}`);
}
export function createInternalUser(body: InternalUserModel): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/users`, { ...body });
}
export function updateInternalUser(params: {
  id: string;
  body: InternalUserModel;
}): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/users/${params.id}`, {
    ...params.body,
  });
}
