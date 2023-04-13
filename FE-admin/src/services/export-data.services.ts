import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import {
  ParamListRequestDashBoard,
  ParamListRequestModel,
} from "src/types/params-list-request.model";

export function getLinkUserHistory(params: ParamListRequestModel): Promise<void | any> {
  const response = authorizedRequest.get(`${config.apiBaseUrl}/user-access-history/export`, {
    params,
  }) as any;
  return response;
}
export function getLinkInternalUserHistory(params: ParamListRequestModel): Promise<void | any> {
  const response = authorizedRequest.get(`${config.apiBaseUrl}/internal-user-history/export`, {
    params,
  }) as any;
  return response;
}
export function getLinkDataExportHistory(params: ParamListRequestModel): Promise<void | any> {
  const response = authorizedRequest.get(`${config.apiBaseUrl}/data-export-history/export`, {
    params,
  }) as any;
  return response;
}

export function getLinkDataExportDashboard(params: ParamListRequestDashBoard): Promise<void | any> {
  const response = authorizedRequest.get(`${config.apiBaseUrl}/admin/users/dashboard-export`, {
    params,
  }) as any;
  return response;
}

export function getLinkDataExportPlatForm(params: ParamListRequestDashBoard): Promise<void | any> {
  const response = authorizedRequest.get(`${config.apiBaseUrl}/admin/bigquery/export-platform`, {
    params,
  }) as any;
  return response;
}
