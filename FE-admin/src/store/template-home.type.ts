import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

export interface WatcherFetchHomeTemplateListType {
  type: string;
  payload: ParamListRequestBannerLoopModel;
}

export interface WatcherFetchHomeTemplateSelectedType {
  type: string;
  payload: string;
}

export const FETCH_HOME_TEMPLATE_LIST = "hometemplate/hometemplate-list";

export const FETCH_HOME_TEMPLATE_SELECTED = "hometemplate/hometemplate-selected";
