import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ParamListRequestProductModel } from "src/types/params-list-request.model";
import { ApiListProductsSections } from "src/types/api-list.model";
import { ProductSectionModel } from "src/types/internal-product-section-loop.model";
import {
  FETCH_PRODUCT_SECTION_LIST,
  WatcherProductSectionListType,
} from "./internal-product-section.type";
import {
  productSectionListingFulfilled,
  productSectionListingPending,
  productSectionListingRejected,
} from "./internal-product-section.slice";

const getProductSection = async (params: ParamListRequestProductModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/products-sections`, {
    params,
  })) as ApiListProductsSections<ProductSectionModel>;
  return response;
};

export function* watchFetchProductSectionList(action: WatcherProductSectionListType) {
  try {
    yield put(productSectionListingPending());
    const { payload } = action;
    const response: Promise<ApiListProductsSections<ProductSectionModel>> = yield getProductSection(
      payload,
    );

    yield put(productSectionListingFulfilled(response));
  } catch (error) {
    yield put(productSectionListingRejected());
  }
}

export const fetchProductSectionList = (payload: ParamListRequestProductModel) => ({
  type: FETCH_PRODUCT_SECTION_LIST,
  payload,
});
