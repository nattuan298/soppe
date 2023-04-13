import { ParamListRequestModel } from "src/types/params-list-request.model";

export const FETCH_GET_ORDER_LIST = "order/getOrderList";
export const FETCH_GET_ODDER_BY_ID = "order/getOrderDetailById";
export const FETCH_GET_ORDER_TRACKING_DETAIL = "order/getOrderTrackingDetail";

export interface WatcherFetchGetOrderListType {
  type: string;
  payload: ParamListRequestModel;
}

export interface WatcherFetchGetOrderByIdType {
  type: string;
  payload: string;
}

export interface WatcherFetchGetOrderTrackingDetailType {
  type: string;
  payload: string;
}
