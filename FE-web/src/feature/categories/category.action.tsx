import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import {
  getCategoriesFulfilled,
  getCategoriesPending,
  getCategoriesReject,
} from "./category.slice";
import { CategoryModel, GET_CATEGORIES } from "./types";
import axiosCutome from "src/lib/client/request";

const getCategories = async () => {
  const response = await axiosCutome.get(`${apiRoute.categories.getCategories}`);
  return response.data;
};
export function* getCategoriesActions() {
  try {
    yield put(getCategoriesPending());
    const resCate: CategoryModel[] = yield call(() => getCategories());
    yield put(getCategoriesFulfilled(resCate));
  } catch (error) {
    yield put(getCategoriesReject());
  }
}

export const getCategoriesDispatch = () => ({
  type: GET_CATEGORIES,
});
