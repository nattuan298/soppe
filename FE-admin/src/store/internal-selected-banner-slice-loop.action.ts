import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { InternalBannerSectionModel } from "src/types/internal-banner-loop.model";
import {
  FETCH_BANNER_SLICE_LOOP_SELECTED,
  WatcherBannerSliceLoopSelectedType,
} from "./internal-selected-banner-slice-loop.type";
import {
  bannerSectionLoopSelectedFulfilled,
  bannerSectionLoopSelectedPending,
  bannerSectionLoopSelectedRejected,
} from "./internal-selected-banner-slice-loop.slice";

const getInternalBannerSliceSectionLoop = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/banner-section-loops/${id}`,
  )) as InternalBannerSectionModel;
  return response;
};

export function* watcherFetchBannerSectionLoopSelected(action: WatcherBannerSliceLoopSelectedType) {
  try {
    yield put(bannerSectionLoopSelectedPending());
    const { payload } = action;
    const response: Promise<InternalBannerSectionModel> = yield getInternalBannerSliceSectionLoop(
      payload,
    );
    yield put(bannerSectionLoopSelectedFulfilled(response));
  } catch (error) {
    yield put(bannerSectionLoopSelectedRejected());
  }
}

export const fetchBannerSliceLoopSelected = (payload: string) => ({
  type: FETCH_BANNER_SLICE_LOOP_SELECTED,
  payload,
});
