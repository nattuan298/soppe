import { put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import paramsSerializer from "src/lib/paramsSerializer";
import { FAQListPayload, FETCH_GET_FAQ_LIST, WatcherFetchFAQList } from "./faqs.type";
import { getFAQsFulfilled, getFAQsPending, getFAQsRejected } from "./faqs.slice";
import { FAQs } from "../types";

const getFAQs = async ({ category, keyword }: { category: string | string[]; keyword: string }) => {
  try {
    const params = paramsSerializer({ keyword });
    const paramsURL = params !== "" ? `&${params}` : "";
    let url = `${apiRoute.helpCenter.getfaqs}?category=${category}`;
    if (keyword) {
      url += `${paramsURL}`;
    }

    const response = await axios.get(url);
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data);
  } catch (error) {}
};

export function* watcherFetchFAQList(action: WatcherFetchFAQList) {
  try {
    yield put(getFAQsPending());
    const { payload } = action;
    const res: FAQs = yield getFAQs(payload);
    yield put(getFAQsFulfilled(res));
  } catch (error) {
    yield put(getFAQsRejected());
  }
}

export const fetchGetFAQList = (payload: FAQListPayload) => ({
  type: FETCH_GET_FAQ_LIST,
  payload,
});
