import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { UpdateUserRequestModel } from "src/types/user.model";

export function getProvinceAPI(country: string | undefined): Promise<void> {
  return authorizedRequest.get(
    `${config.apiBaseUrl}/provinces/find-by-country/?country=${country}`,
  );
}
export function getDistrictAPI(id: string | undefined): Promise<void> {
  return authorizedRequest.get(`${config.apiBaseUrl}/districts/get-by-province/${id}`);
}
export function getSubDistrictAPI(id: string | undefined): Promise<void> {
  return authorizedRequest.get(`${config.apiBaseUrl}/sub-districts/get-by-district/${id}`);
}
export function updateUser(body: UpdateUserRequestModel): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/members`, { ...body });
}
