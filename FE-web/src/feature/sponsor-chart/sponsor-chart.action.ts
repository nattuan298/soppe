import { put } from "redux-saga/effects";

import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FavoriteMemberModel } from "../favorite-member/types";
import { ApiListModel, FETCH_SPONSOR_CHART, WatcherFetchSponsorChart } from "./types";
import {
  getSponsorChartFulfilled,
  getSponsorChartPending,
  getSponsorChartRejected,
} from "./sponsor-chart.slice";

const getSponsorChart = async (paramsURL: string) => {
  const response = await axios.get(`${apiRoute.members.sponsorChart}${paramsURL}`);
  return response.data as ApiListModel<FavoriteMemberModel>;
};

export function* watcherFetchSponsorChart(action: WatcherFetchSponsorChart) {
  try {
    yield put(getSponsorChartPending());
    const { payload } = action;
    const response: Promise<ApiListModel<FavoriteMemberModel>> = yield getSponsorChart(payload);
    yield put(getSponsorChartFulfilled(response));
  } catch (error) {
    yield put(getSponsorChartRejected());
  }
}
export const fetchSponsorChart = (payload: string) => ({
  type: FETCH_SPONSOR_CHART,
  payload,
});
