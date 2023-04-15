import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { InternalBannerSectionModel } from "src/types/internal-banner-loop.model";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import {
  FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION,
  FETCH_BANNER_SLICE_LIST_ACTION,
  watcherActionType,
  watcherBannerActiveActionType,
} from "./internal-banner-slice.type";
import {
  bannerSectionActiveListFulfilled,
  bannerSliceListFulfilled,
  bannerSliceListPending,
  bannerSliceListRejected,
} from "./internal-banner-slice.slice";
import { ActiveSection } from "src/types/active-section.model";

const getInternalBannerSliceList = async (params: ParamListRequestBannerLoopModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banner-section-loops`, {
    params,
  })) as ApiListModel<InternalBannerSectionModel>;
  return response;
};

const getBannerSectionActiveList = async () => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/banner-section-loops/active`,
  )) as Array<ActiveSection>;
  return response;
};

export function* watcherFetchBannerSliceList(action: watcherActionType) {
  try {
    yield put(bannerSliceListPending());
    const { payload } = action;
    const response: Promise<ApiListModel<InternalBannerSectionModel>> =
      yield getInternalBannerSliceList(payload);
    yield put(bannerSliceListFulfilled(response));
  } catch (error) {
    yield put(bannerSliceListRejected());
  }
}

export function* watcherFetchBannerActiveSliceList(action: watcherBannerActiveActionType) {
  try {
    const response: Promise<Array<ActiveSection>> = yield getBannerSectionActiveList();
    yield put(bannerSectionActiveListFulfilled(response));
  } catch (error) {}
}

export const fetchBannerSliceList = (payload: ParamListRequestBannerLoopModel) => ({
  type: FETCH_BANNER_SLICE_LIST_ACTION,
  payload,
});

export const fetchBannerSliceActiveList = () => ({
  type: FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION,
});
