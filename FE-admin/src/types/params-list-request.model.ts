import { SearchParams } from "./common.modal";

export interface ParamListRequestModel {
  page?: number;
  pageSize?: number;
  keyword?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  locationBase?: string;
  category?: string;
  publishEndDate?: string;
  publishStartDate?: string;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ParamListRequestProductModel {
  page?: number;
  pageSize?: number;
  keyword?: string;
  category?: string;
  price?: string;
  sortBy?: string;
  countryCode?: string;
  productLoop?: string;
}

export interface ParamListRequestBannerLoopModel extends ParamListRequestModel {
  startDate?: string;
  endDate?: string;
  keyword?: string;
  countryCode?: string;
}

export interface ParamListRequestBanner extends ParamListRequestModel {
  bannerLoop?: string;
}

export interface ParamInventoryProductModel extends ParamListRequestModel {
  countryCode?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  keySort?: string;
}

export interface ParamCategoryModel {
  categoryId: string;
  categoryName: string;
  image: string;
}

export interface ParamListRequestPushNotificationModel extends ParamListRequestModel {
  startDate?: string;
  endDate?: string;
  keyword?: string;
  channel?: Array<string>;
  target?: string;
}

export type ParamsListRequestFAQ = SearchParams & {
  publishStartDate?: string | undefined;
  publishEndDate?: string | undefined;
  category?: string;
};

export interface ParamListRequestDashBoard extends ParamListRequestModel {
  country: string;
}
