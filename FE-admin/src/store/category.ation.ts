import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { CategoryModel } from "src/types/category.model";
import { setCategory, setLoadingCategory } from "./category.slice";
// get list category
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export type FetchCategory = {
  type: string;
};
const getCategory = async () => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/categories`,
  )) as CategoryModel;

  return response;
};

export function* watcherCategory() {
  try {
    yield put(setLoadingCategory({ loading: true }));
    const response: Promise<any> = yield call(() => getCategory());
    yield put(setCategory(response));
  } catch (error) {
    yield put(setLoadingCategory({ loading: false }));
  }
}
export const getCategoryAction = () => ({
  type: "FETCH_CATEGORY",
});
