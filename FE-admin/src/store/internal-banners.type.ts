import { ParamListRequestBanner } from "src/types/params-list-request.model";

export const FETCH_BANNER_SECTION_LIST = "FETCH_BANNER_SECTION_LIST";
export const FETCH_BANNER_SLICE_SECTION_LIST = "internalBannerSection/internalBannerSections";
export const FETCH_BANNER_SECTION_SELECTED = "internalBanner/internalSelectedBanner";
export const FETCH_BANNER_SLICE_SECTION_SELECTED = "internalBanner/internalSelectedBannerSection";

export interface watcherBannerSectionListType {
  type: string;
  payload: ParamListRequestBanner;
}

export interface watcherBannerSectionSelectedType {
  type: string;
  payload: string;
}
