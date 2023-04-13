import { put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";
import {
  selectedBannerLoopFulfilled,
  selectedBannerLoopPending,
  selectedBannerLoopRejected,
} from "./internal-selected-banner-loop.slice";
import {
  FETCH_BANNER_LOOP_ACTION,
  WatcherSelectedBannerLoop,
} from "./internal-selected-banner-loop.type";

const getSelectedBannerLoop = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/banner-loops/${id}`,
  )) as InternalBannerLoopModel;
  return response;
};

export function* watcherFetchSelectedBannerLoop(action: WatcherSelectedBannerLoop) {
  try {
    const { payload } = action;
    yield put(selectedBannerLoopPending());
    const response: Promise<InternalBannerLoopModel> = yield getSelectedBannerLoop(payload);
    yield put(selectedBannerLoopFulfilled(response));
  } catch (error) {
    yield put(selectedBannerLoopRejected());
  }
}

export const fetchSelectedBannerLoop = (payload: string) => ({
  type: FETCH_BANNER_LOOP_ACTION,
  payload,
});
