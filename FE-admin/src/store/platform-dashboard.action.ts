import { put } from "redux-saga/effects";

import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { DashBoardPlatFormModel } from "src/types/dashboard.model";
import { ApiListModel } from "src/types/api-list.model";
import { NotificationModel } from "src/types/notification.model";

import {
  ParamListRequestDashBoard,
  ParamListRequestModel,
} from "src/types/params-list-request.model";
import {
  getPlatformDashboardFulfilled,
  getPlatformDashboardPending,
  getPlatformDashboardRejected,
  getReportIssuesFulfilled,
  getReportIssuesPending,
  getReportIssuesRejected,
} from "./platform-dashboard.slice";
import {
  FETCH_PLATFORM_DASHBOARD,
  FETCH_REPORT_ISSUES,
  WatcherFetchPlatformDashboard,
  WatcherFetchReportIssue,
} from "./platform-dashboard.type";

const getPlatformDashboard = async (params: ParamListRequestDashBoard) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/users/home-platform`, {
    params,
  })) as DashBoardPlatFormModel;
  return response;
};

const getReportIssues = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/notification-management`,
    {
      params,
    },
  )) as ApiListModel<NotificationModel>;
  return response;
};

export function* watcherFetchReportIssue(action: WatcherFetchReportIssue) {
  try {
    yield put(getReportIssuesPending());
    const { payload } = action;
    const response: Promise<DashBoardPlatFormModel> = yield getReportIssues(payload);
    yield put(getReportIssuesFulfilled(response));
  } catch (error) {
    yield put(getReportIssuesRejected());
  }
}

export function* watcherFetchPlatformDashboard(action: WatcherFetchPlatformDashboard) {
  try {
    yield put(getPlatformDashboardPending());
    const { payload } = action;
    const response: Promise<DashBoardPlatFormModel> = yield getPlatformDashboard(payload);
    yield put(getPlatformDashboardFulfilled(response));
  } catch (error) {
    yield put(getPlatformDashboardRejected());
  }
}

export const fetchPlatformDashboard = (payload: ParamListRequestDashBoard) => ({
  type: FETCH_PLATFORM_DASHBOARD,
  payload,
});

export const fetchReportIssue = (payload: ParamListRequestModel) => ({
  type: FETCH_REPORT_ISSUES,
  payload,
});
