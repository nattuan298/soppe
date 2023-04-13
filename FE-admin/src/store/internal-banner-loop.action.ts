import { put } from "redux-saga/effects";

import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";
import {
  FETCH_BANNER_LOOP_LIST_ACTION,
  WatcherPayloadBannerLoop,
} from "./internal-banner-loop.type";
import {
  bannerLoopListFulfilled,
  bannerLoopListPending,
  bannerLoopListRejected,
} from "./internal-banner-loop.slice";

const getInternalBannerLoopList = async (params: ParamListRequestBannerLoopModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banner-loops`, {
    params,
  })) as ApiListModel<InternalBannerLoopModel>;
  return response;
};

export function* watcherFetchBannerLoopList(action: WatcherPayloadBannerLoop) {
  try {
    const { payload } = action;
    yield put(bannerLoopListPending());
    const response: Promise<ApiListModel<InternalBannerLoopModel>> =
      yield getInternalBannerLoopList(payload);
    yield put(bannerLoopListFulfilled(response));
  } catch (error) {
    yield put(bannerLoopListRejected());
  }
}

export const fetchBannerLoopList = (payload: ParamListRequestBannerLoopModel) => ({
  type: FETCH_BANNER_LOOP_LIST_ACTION,
  payload,
});
