import { put } from "redux-saga/effects";

import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import {
  ApiListModel,
  FETCH_ORGANIZATION_CHART,
  FETCH_ORGANIZATION_TREE,
  OrganizationTreeType,
  WatcherFetchOrganization,
} from "./types";
import { FavoriteMemberModel } from "../favorite-member/types";
import {
  getOrgniztionChartFulfilled,
  getOrgniztionChartPending,
  getOrgniztionChartRejected,
  getOrgniztionTreeFulfilled,
} from "./organization.slice";

const getOrgniztionChart = async (paramsURL: string) => {
  const response = await axios.get(`${apiRoute.members.organizationList}${paramsURL}`);
  return response.data as ApiListModel<FavoriteMemberModel>;
};

const getOrgniztionTree = async (paramsURL: string) => {
  const response = await axios.get(`${apiRoute.members.organizationTree}${paramsURL}`);
  return response.data as ApiListModel<FavoriteMemberModel>;
};

export function* watcherFetchOrganizationChart(action: WatcherFetchOrganization) {
  try {
    yield put(getOrgniztionChartPending());
    const { payload } = action;
    const response: Promise<ApiListModel<FavoriteMemberModel>> = yield getOrgniztionChart(payload);
    yield put(getOrgniztionChartFulfilled(response));
  } catch (error) {
    yield put(getOrgniztionChartRejected());
  }
}

export function* watcherFetchOrganizationTree(action: WatcherFetchOrganization) {
  try {
    yield put(getOrgniztionChartPending());
    const { payload } = action;
    const response: Promise<ApiListModel<OrganizationTreeType>> = yield getOrgniztionTree(payload);
    yield put(getOrgniztionTreeFulfilled(response));
  } catch (error) {
    yield put(getOrgniztionChartRejected());
  }
}

export const fetchOrganizationChart = (payload: string) => ({
  type: FETCH_ORGANIZATION_CHART,
  payload,
});

export const fetchOrganizationTree = (payload: string) => ({
  type: FETCH_ORGANIZATION_TREE,
  payload,
});
