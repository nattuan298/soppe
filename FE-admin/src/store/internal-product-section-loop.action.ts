import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { InternalProductSectionLoopModel } from "src/types/internal-product-section-loop.model";
import { ActiveSection } from "src/types/active-section.model";
import {
  FETCH_PRODUCT_SECTION_ACTIVE,
  FETCH_PRODUCT_SECTION_LOOP_LIST,
  FETCH_PRODUCT_SECTION_LOOP_SELECTED,
  WatcherFetchProductSectionActiveType,
  WatcherFetchProductSectionLoopListType,
  WatcherFetchProductSectionLoopSelectedType,
} from "./internal-product-section-loop.type";
import {
  productSectionActiveListFulfilled,
  productSectionLoopListFulfilled,
  productSectionLoopPending,
  productSectionLoopRejected,
  productSectionLoopSelectedFulfilled,
} from "./internal-product-section-loop.slice";

const getProductSectionLoop = async (params: ParamListRequestBannerLoopModel) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/product-section-loops`,
    {
      params,
    },
  )) as ApiListModel<InternalProductSectionLoopModel>;
  return response;
};

const getSelectedProductSectionLoop = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/product-section-loops/${id}`,
  )) as InternalProductSectionLoopModel;
  return response;
};

const getProductSectionActiveList = async (countryCode: string) => {
  const params = { countryCode };
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/product-section-loops/active`,
    { params },
  )) as Array<ActiveSection>;
  return response;
};

export function* watcherFetchProductSectionLoopList(
  action: WatcherFetchProductSectionLoopListType,
) {
  try {
    yield put(productSectionLoopPending());
    const { payload } = action;
    const response: Promise<ApiListModel<InternalProductSectionLoopModel>> =
      yield getProductSectionLoop(payload);
    yield put(productSectionLoopListFulfilled(response));
  } catch (error) {
    yield put(productSectionLoopRejected());
  }
}

export function* watcherFetchProductSectionLoopSelected(
  action: WatcherFetchProductSectionLoopSelectedType,
) {
  try {
    yield put(productSectionLoopPending());
    const { payload } = action;
    const response: Promise<InternalProductSectionLoopModel> = yield getSelectedProductSectionLoop(
      payload,
    );
    yield put(productSectionLoopSelectedFulfilled(response));
  } catch (error) {
    yield put(productSectionLoopRejected());
  }
}

export function* watcherFetchSectionActiveList(action: WatcherFetchProductSectionActiveType) {
  try {
    const { payload } = action;
    const response: Promise<InternalProductSectionLoopModel> = yield getProductSectionActiveList(
      payload,
    );
    yield put(productSectionActiveListFulfilled(response));
  } catch (error) {}
}

export const fetchProductSectionLoopList = (payload: ParamListRequestBannerLoopModel) => ({
  type: FETCH_PRODUCT_SECTION_LOOP_LIST,
  payload,
});

export const fetchProductSectionLoopSelected = (payload: string) => ({
  type: FETCH_PRODUCT_SECTION_LOOP_SELECTED,
  payload,
});

export const fetchProductSectionActiveList = (payload: string) => ({
  type: FETCH_PRODUCT_SECTION_ACTIVE,
  payload,
});
