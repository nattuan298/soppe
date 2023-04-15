import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

export const FETCH_BANNER_LOOP_LIST_ACTION = "FETCH_DASHBOARD_LOOP_LIST_ACTION";

export interface WatcherPayloadBannerLoop {
  type: string;
  payload: ParamListRequestBannerLoopModel;
}
