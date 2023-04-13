import { put } from "redux-saga/effects";

import { DashBoardModel } from "src/types/dashboard.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { FETCH_DASHBOARD_ACTION, payloadFetchDashboard } from "./dashboard.type";
import {
  getHomeDashboardFulfilled,
  getHomeDashboardPending,
  getHomeDashboardRejected,
} from "./dashboard.slice";

const getHomeDashboard = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/users/home-dashboard`, {
    params,
  })) as DashBoardModel;
  return Promise.resolve(response);
};

export function* watcherFetchHomeDashboard(action: payloadFetchDashboard) {
  const { payload } = action;
  try {
    yield put(getHomeDashboardPending());
    const response: Promise<DashBoardModel> = yield getHomeDashboard(payload);
    yield put(getHomeDashboardFulfilled(response));
  } catch (error) {
    yield put(getHomeDashboardRejected());
  }
}

export const fetchHomeDashboard = (payload: ParamListRequestModel) => ({
  type: FETCH_DASHBOARD_ACTION,
  payload,
});
