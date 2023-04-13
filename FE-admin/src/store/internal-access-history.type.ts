import { ParamListRequestModel } from "src/types/params-list-request.model";

export interface WatcherFetchInternalUserHistoryListType {
  type: string;
  payload: ParamListRequestModel;
}

export const FETCH_INTERNAL_USER_HISTORY_LIST = "user internal history/ get list";
