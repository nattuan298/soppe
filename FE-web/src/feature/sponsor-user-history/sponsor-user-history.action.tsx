import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import {
  resetSponsorHistoryFulfiller,
  resetSponsorHistoryPending,
  resetSponsorHistoryReject,
} from "./sponsor-user-history.slice";
import {
  GET_SPONSORED_USER_HISTORY,
  PayloadTest,
  getSponsoredUserHistoryActionProps,
  payloadProps,
} from "./sponsor-user-history.type";
import axiosCutome from "src/lib/client/request";

export const getSponsoredUserHistory = async (url: string) => {
  const res = await axiosCutome.get(url);
  return res.data;
};

export function* getSponsoredUserHistoryAction(action: getSponsoredUserHistoryActionProps) {
  try {
    const { page, pageSize, search } = action.payload;
    let url = `${apiRoute.sponsor.listSponsorHistory}?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url = `${apiRoute.sponsor.listSponsorHistory}?page=${page}&pageSize=${pageSize}&keyword=${search}`;
    }
    yield put(resetSponsorHistoryPending());
    const response: PayloadTest = yield call(() => getSponsoredUserHistory(url));
    yield put(resetSponsorHistoryFulfiller(response));
  } catch (error) {
    yield put(resetSponsorHistoryReject());
  }
}

export const getHistorySponsoredAction = (payload: payloadProps) => ({
  type: GET_SPONSORED_USER_HISTORY,
  payload,
});
