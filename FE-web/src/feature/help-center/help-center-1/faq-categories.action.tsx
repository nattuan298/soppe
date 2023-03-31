import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import {
  getFAQCategoriesFulfilled,
  getFAQCategoriesPending,
  getFAQCategoriesReject,
} from "./faq-categories.slice";
import axiosCutome from "src/lib/client/request";
import { FAQCategoriesModel } from "../types";
import { HELP_CENTER_GET_CATEGORIES } from "./faq-categories.type";

export const getHelpCenterData = async () => {
  const response = await axiosCutome.get(`${apiRoute.helpCenter.getfaqCategories}`);
  return response.data;
};

export function* helpCenterGetCategoriesAction() {
  try {
    yield put(getFAQCategoriesPending());
    const response: FAQCategoriesModel[] = yield call(() => getHelpCenterData());
    yield put(getFAQCategoriesFulfilled(response));
  } catch (error) {
    yield put(getFAQCategoriesReject());
  }
}
export const getHelpCenterDispatch = () => ({
  type: HELP_CENTER_GET_CATEGORIES,
});
