import { put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FETCH_POST_STATUS_QR_FEATURE, WatcherFetchPostStatusQRFeature } from "./qr-feature.type";
import {
  CheckQRStatus,
  getStatusQRFeatureFulfilled,
  getStatusQRFeaturePending,
  getStatusQRFeatureRejected,
} from "./qr-feature.slice";

const getStatusQRFeature = async (memberId: string) => {
  const response = await axios.post(`${apiRoute.payment.qrFeatureCheckStatus}/${memberId}`);
  return response.data;
};

export function* watcherFetchPostStatusQRFeature(action: WatcherFetchPostStatusQRFeature) {
  try {
    const { payload } = action;
    yield put(getStatusQRFeaturePending());
    const checkQRStatus: CheckQRStatus = yield getStatusQRFeature(payload);
    yield put(getStatusQRFeatureFulfilled(checkQRStatus));
  } catch (error) {
    yield put(getStatusQRFeatureRejected());
  }
}

export const fetchPostStatusQRFeature = (payload: string) => ({
  type: FETCH_POST_STATUS_QR_FEATURE,
  payload,
});
