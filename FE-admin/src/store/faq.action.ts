import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { toQueryString } from "src/lib/common.lib";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { CategoryFAQ } from "src/types/faq.model";
import { InternalUserModel } from "src/types/internal-user.model";
import { ParamsListRequestFAQ } from "src/types/params-list-request.model";
import { setCategoryFaq, setFaqDetail, setFaqList, setLoadingFaq } from "./faq.slice";
import { FETCH_GET_CATEGORY_FAQ, FETCH_GET_DETAIL_FAQ, FETCH_GET_FAQ } from "./faq.type";

// get list faq
export type FetchListFaq = {
  type: string;
  payload: ParamsListRequestFAQ;
};
const getFAQ = async (params: ParamsListRequestFAQ) => {
  const response = (await authorizedRequest.get(
    toQueryString(`${config.apiBaseUrl}/admin/faqs`, params),
  )) as ApiListModel<InternalUserModel>;
  return response;
};
export function* watcherListFaq(action: FetchListFaq) {
  try {
    yield put(setLoadingFaq({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getFAQ(params));
    yield put(setFaqList(response));
  } catch (error) {
    yield put(setLoadingFaq({ loading: true }));
  }
}

export const getFaqAction = (payload: ParamsListRequestFAQ) => ({
  type: FETCH_GET_FAQ,
  payload,
});

// get detail faq
export type FetchDetailFaq = {
  type: string;
  payload: string;
};
const getFaqDetail = async (id: string) => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/faqs/${id}`);
  return response;
};
export function* watcherDetailFaq(action: FetchDetailFaq) {
  try {
    yield put(setLoadingFaq({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => getFaqDetail(id));
    yield put(setFaqDetail(response));
  } catch {
    yield put(setLoadingFaq({ loading: true }));
  }
}
export const getDetailFaqAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_FAQ,
  payload,
});

// get category faq
export type FetchCategoryFaq = {
  type: string;
};
const getCategory = async () => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/faq-categories`,
  )) as CategoryFAQ;
  return response;
};
export function* watcherCategoryFaq() {
  try {
    yield put(setLoadingFaq({ loading: true }));
    const response: Promise<any> = yield call(() => getCategory());
    yield put(setCategoryFaq(response));
  } catch {
    yield put(setLoadingFaq({ loading: true }));
  }
}
export const getCategoryFaqAction = () => ({
  type: FETCH_GET_CATEGORY_FAQ,
});
