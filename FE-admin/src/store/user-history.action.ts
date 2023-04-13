import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { ApiListModel } from "src/types/api-list.model";
import { UserHistoryModel } from "src/types/flatform.model";
import {
  userHistoryListFulfilled,
  userHistoryListPending,
  userHistoryListRejected,
} from "./user-history.slice";
import { FETCH_USER_HISTORY_LIST, WatcherFetchUserHistoryListType } from "./user-history.type";

export const getUserHistoryList = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/user-access-history`, {
    params,
  })) as ApiListModel<UserHistoryModel>;
  return response;
};

export function* watcherFetchUserHistoryList(action: WatcherFetchUserHistoryListType) {
  try {
    yield put(userHistoryListPending());
    const { payload } = action;
    const response: Promise<ApiListModel<UserHistoryModel>> = yield getUserHistoryList(payload);
    yield put(userHistoryListFulfilled(response));
  } catch (error) {
    yield put(userHistoryListRejected());
  }
}
export const fetchUserHistoryList = (payload: ParamListRequestModel) => ({
  type: FETCH_USER_HISTORY_LIST,
  payload,
});
