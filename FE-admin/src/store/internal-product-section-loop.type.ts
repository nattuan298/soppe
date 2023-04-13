import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

export const FETCH_PRODUCT_SECTION_LOOP_LIST =
  "internalProductSectionLoop/internalProductSectionLoops";

export const FETCH_PRODUCT_SECTION_LOOP_SELECTED =
  "internalProductSectionLoop/internalProductSectionSelected";

export const FETCH_PRODUCT_SECTION_ACTIVE =
  "internalProductSectionLoop/internalActiveProductSectionLoop";

export interface WatcherFetchProductSectionLoopListType {
  payload: ParamListRequestBannerLoopModel;
  type: string;
}

export interface WatcherFetchProductSectionLoopSelectedType {
  payload: string;
  type: string;
}

export interface WatcherFetchProductSectionActiveType {
  payload: string;
  type: string;
}
