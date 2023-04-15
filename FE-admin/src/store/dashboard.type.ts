import { ParamListRequestModel } from "src/types/params-list-request.model";

export const FETCH_DASHBOARD_ACTION = "FETCH_DASHBOARD_ACTION";

export interface payloadFetchDashboard {
  type: typeof FETCH_DASHBOARD_ACTION;
  payload: ParamListRequestModel;
}
