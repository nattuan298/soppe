import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { InternalUserHistoryModel } from "src/types/flatform.model";
import {
  FETCH_INTERNAL_USER_HISTORY_LIST,
  WatcherFetchInternalUserHistoryListType,
} from "./internal-access-history.type";
import {
  internalUserHistoryListFulfilled,
  internalUserHistoryListPending,
  internalUserHistoryListRejected,
} from "./internal-access-history.slice";

const getInternalUserHistoryList = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/internal-user-history`, {
    params,
  })) as ApiListModel<InternalUserHistoryModel>;
  return response;
};

export function* watcherFetchInternalUserHistoryList(
  action: WatcherFetchInternalUserHistoryListType,
) {
  try {
    const { payload } = action;
    yield put(internalUserHistoryListPending());
    const response: Promise<ApiListModel<InternalUserHistoryModel>> =
      yield getInternalUserHistoryList(payload);
    yield put(internalUserHistoryListFulfilled(response));
  } catch (error) {
    yield put(internalUserHistoryListRejected());
  }
}

export const fetchInternalUserHistoryList = (payload: ParamListRequestModel) => ({
  type: FETCH_INTERNAL_USER_HISTORY_LIST,
  payload,
});
