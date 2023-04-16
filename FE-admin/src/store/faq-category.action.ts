import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { toQueryString } from "src/lib/common.lib";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { CallbackResponse } from "src/types/common.modal";
import { InternalUserModel } from "src/types/internal-user.model";
import { ParamsListRequestFAQ } from "src/types/params-list-request.model";
import {
  setDetailCategoryFaq,
  setFAQCategoryList,
  setLoadingCategory,
  setLoadingDeletingCates,
} from "./faq-category.slice";
import {
  FETCH_GET_DELETE_FAQ,
  FETCH_GET_DETAIL_CATEGORY,
  FETCH_GET_FAQ_CATEGORY,
} from "./faq-category.type";
import { deleteFAQCategoryAPI } from "src/services/faq-category.services";

// get category list
export type FetchCategoryList = {
  type: string;
  payload: ParamsListRequestFAQ;
};
const getListCategory = async (params: ParamsListRequestFAQ) => {
  try {
    const response = (await authorizedRequest.get(
      toQueryString(`${config.apiBaseUrl}/products/category`),
    )) as ApiListModel<InternalUserModel>;
    return response;
  } catch (error) {
    throw error;
  }
};
export function* watcherListCategoryAction(action: FetchCategoryList) {
  try {
    yield put(setLoadingCategory({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getListCategory(params));
    yield put(setFAQCategoryList(response));
  } catch (error) {
    yield put(setLoadingCategory({ loading: true }));
  }
}
export const getListCategoryAction = (payload: ParamsListRequestFAQ) => ({
  type: FETCH_GET_FAQ_CATEGORY,
  payload,
});

// get detail category faq
export type FetchDetailCategoryFaq = {
  type: string;
  payload: string;
};
const getDetailCategoryFaq = async (id: string) => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/faq-categories/${id}`);
  return response;
};
export function* watcherDetailCategoryAction(action: FetchDetailCategoryFaq) {
  try {
    yield put(setLoadingCategory({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => getDetailCategoryFaq(id));
    yield put(setDetailCategoryFaq(response));
  } catch (error) {
    yield put(setLoadingCategory({ loading: true }));
  }
}
export const getDetailCategoryAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_CATEGORY,
  payload,
});

// delete category
export type FetchDelete = {
  type: string;
  payload: CallbackResponse & { id: string };
};
const handleDeleteCategory = async ({
  id,
  onSuccess,
  onError,
}: CallbackResponse & { id: string }) => {
  const res = await deleteFAQCategoryAPI(id);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherDeleteCategory(action: FetchDelete) {
  try {
    yield put(setLoadingDeletingCates({ loading: true }));
    yield call(() => handleDeleteCategory(action.payload));
    yield put(setLoadingDeletingCates({ loading: false }));
  } catch (error) {
    yield put(setLoadingDeletingCates({ loading: true }));
  }
}
export const getDeleteCategoryAction = (payload: CallbackResponse & { id: string }) => ({
  type: FETCH_GET_DELETE_FAQ,
  payload,
});
