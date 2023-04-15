import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { DataExportModel } from "src/types/flatform.model";
import {
  FETCH_DATA_EXPORT_HISTORY,
  WatcherFetchDataExportHistoryListType,
} from "./data-export-history.type";
import {
  dataExportHistoryListFulfilled,
  dataExportHistoryListPending,
  getDataExportHistoryListRejected,
} from "./data-export-history.slice";

const getDataExportHistoryList = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/data-export-history`, {
    params,
  })) as ApiListModel<DataExportModel>;
  return response;
};

export function* watcherFetchDataExportHistoryList(action: WatcherFetchDataExportHistoryListType) {
  try {
    const { payload } = action;
    yield put(dataExportHistoryListPending());
    const response: Promise<ApiListModel<DataExportModel>> = yield getDataExportHistoryList(
      payload,
    );
    yield put(dataExportHistoryListFulfilled(response));
  } catch (error) {
    yield put(getDataExportHistoryListRejected());
  }
}

export const fetchDataExportHistoryList = (payload: ParamListRequestModel) => ({
  type: FETCH_DATA_EXPORT_HISTORY,
  payload,
});
