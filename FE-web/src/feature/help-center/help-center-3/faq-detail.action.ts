import { put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FETCH_GET_FAQ_DETAIL, WatcherFetchGetFAQDetail } from "./faq-detail.type";
import {
  getFAQDetailFulfilled,
  getFAQDetailPending,
  getFAQDetailRejected,
} from "./faq-detail.slice";
import { FAQDetailModel } from "../types";

const getFAQDetail = async (id: string) => {
  try {
    const response = await axios.get(`${apiRoute.helpCenter.getfaqs}/${id}`);
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject();
  }
};

export function* watcherFetchGetFAQDetail(action: WatcherFetchGetFAQDetail) {
  try {
    yield put(getFAQDetailPending());
    const { payload } = action;
    const res: Promise<FAQDetailModel> = yield getFAQDetail(payload);
    yield put(getFAQDetailFulfilled(res));
  } catch (error) {
    yield put(getFAQDetailRejected());
  }
}

export const fetchGetFAQDetail = (payload: string) => ({
  type: FETCH_GET_FAQ_DETAIL,
  payload,
});
