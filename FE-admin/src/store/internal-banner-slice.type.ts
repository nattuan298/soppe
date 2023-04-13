import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

export const FETCH_BANNER_SLICE_LIST_ACTION = "FETCH_BANNER_SLICE_LIST_ACTION";
export const FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION = "FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION";

export interface watcherActionType {
  type: string;
  payload: ParamListRequestBannerLoopModel;
}

export interface watcherBannerActiveActionType {
  type: string;
  payload: ParamListRequestBannerLoopModel;
}
