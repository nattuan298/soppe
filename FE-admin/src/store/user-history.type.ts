import { ParamListRequestModel } from "src/types/params-list-request.model";

export interface WatcherFetchUserHistoryListType {
  type: string;
  payload: ParamListRequestModel;
}

export const FETCH_USER_HISTORY_LIST = "userHistory/getList";
