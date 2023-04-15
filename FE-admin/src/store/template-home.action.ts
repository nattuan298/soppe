import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { TempateHomeBodyModel, TemplateHomeModel } from "src/types/home-template.model";
import {
  homeTemplateList,
  homeTemplatePending,
  homeTemplateRejected,
  homeTemplateSelected,
} from "./template-home.slice";
import {
  FETCH_HOME_TEMPLATE_LIST,
  FETCH_HOME_TEMPLATE_SELECTED,
  WatcherFetchHomeTemplateListType,
  WatcherFetchHomeTemplateSelectedType,
} from "./template-home.type";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

const getHomeTemplateList = async (params: ParamListRequestBannerLoopModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/home-templates`, {
    params,
  })) as ApiListModel<TemplateHomeModel>;
  return response;
};

const getHomeTemplateSelected = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/home-templates/${id}`,
  )) as TempateHomeBodyModel;
  return response;
};

export function* watcherFetchHomeTemplateList(action: WatcherFetchHomeTemplateListType) {
  try {
    yield put(homeTemplatePending());
    const { payload } = action;
    const response: Promise<ApiListModel<TemplateHomeModel>> = yield getHomeTemplateList(payload);
    yield put(homeTemplateList(response));
  } catch (error) {
    yield put(homeTemplateRejected());
  }
}

export function* watcherFetchHomeTemplateSelected(action: WatcherFetchHomeTemplateSelectedType) {
  try {
    yield put(homeTemplatePending());
    const { payload } = action;
    const response: Promise<TempateHomeBodyModel> = yield getHomeTemplateSelected(payload);
    yield put(homeTemplateSelected(response));
  } catch (error) {
    yield put(homeTemplateRejected());
  }
}

export const fetchHomeTemplateList = (payload: ParamListRequestBannerLoopModel) => ({
  type: FETCH_HOME_TEMPLATE_LIST,
  payload,
});

export const fetchHomeTemplateListSelected = (payload: string) => ({
  type: FETCH_HOME_TEMPLATE_SELECTED,
  payload,
});
