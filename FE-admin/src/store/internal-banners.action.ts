import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestBanner } from "src/types/params-list-request.model";
import { InternalBannerModel, InternalBannerSectionModel } from "src/types/internal-banner.model";
import {
  bannerSectionListFulfilled,
  bannerSectionPending,
  bannerSectionRejected,
  bannerSectionSelectedFulfilled,
} from "./internal-banners.slice";
import {
  FETCH_BANNER_SECTION_LIST,
  FETCH_BANNER_SECTION_SELECTED,
  FETCH_BANNER_SLICE_SECTION_LIST,
  FETCH_BANNER_SLICE_SECTION_SELECTED,
  watcherBannerSectionListType,
  watcherBannerSectionSelectedType,
} from "./internal-banners.type";

const getInternalBanners = async (params: ParamListRequestBanner) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banners`, {
    params,
  })) as ApiListModel<InternalBannerModel>;
  return response;
};

const getInternalBannerSections = async (params: ParamListRequestBanner) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banner-sections`, {
    params,
  })) as ApiListModel<InternalBannerSectionModel>;
  return response;
};

const getInternalBannerSectionSelected = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/banners/${id}`,
  )) as InternalBannerModel;
  return response;
};

const getInternalBannerSliceSectionSelected = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/banner-sections/${id}`,
  )) as InternalBannerModel;
  return response;
};

export function* watcherBannerSectionList(action: watcherBannerSectionListType) {
  try {
    yield put(bannerSectionPending());
    const { payload, type } = action;
    const response: Promise<ApiListModel<InternalBannerModel>> =
      type === FETCH_BANNER_SECTION_LIST
        ? yield getInternalBanners(payload)
        : yield getInternalBannerSections(payload);
    yield put(bannerSectionListFulfilled(response));
  } catch (error) {
    yield put(bannerSectionRejected());
  }
}

export function* watcherBannerSectionSelected(action: watcherBannerSectionSelectedType) {
  try {
    yield put(bannerSectionPending());
    const { payload, type } = action;
    const response: Promise<InternalBannerModel> =
      type === FETCH_BANNER_SECTION_SELECTED
        ? yield getInternalBannerSectionSelected(payload)
        : yield getInternalBannerSliceSectionSelected(payload);
    yield put(bannerSectionSelectedFulfilled(response));
  } catch (error) {
    yield put(bannerSectionRejected());
  }
}

export const fetchBannerSectionList = (payload: ParamListRequestBanner) => ({
  type: FETCH_BANNER_SECTION_LIST,
  payload,
});

export const fetchBannerSliceSectionList = (payload: ParamListRequestBanner) => ({
  type: FETCH_BANNER_SLICE_SECTION_LIST,
  payload,
});

export const fetchBannerSectionSelected = (payload: string) => ({
  type: FETCH_BANNER_SECTION_SELECTED,
  payload,
});

export const fetchBannerSliceSectionSelected = (payload: string) => ({
  type: FETCH_BANNER_SLICE_SECTION_SELECTED,
  payload,
});
