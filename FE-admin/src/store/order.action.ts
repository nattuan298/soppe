import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { ApiListModel } from "src/types/api-list.model";
import { authorizedRequest } from "src/lib/request";
import { OrderModel, TrackingStatusModel } from "src/types/order.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import {
  FETCH_GET_ODDER_BY_ID,
  FETCH_GET_ORDER_LIST,
  FETCH_GET_ORDER_TRACKING_DETAIL,
  WatcherFetchGetOrderByIdType,
  WatcherFetchGetOrderListType,
  WatcherFetchGetOrderTrackingDetailType,
} from "./order.type";

import {
  getOrderDetailFulfilled,
  getOrderDetailPending,
  getOrderDetailRejected,
  getOrderListFulfilled,
  getOrderListPending,
  getOrderListRejected,
  getOrderTrackingDetailFulfilled,
} from "./order.slice";

const getOrderList = async (params: ParamListRequestModel) => {
  try {
    const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/orders`, {
      params,
    })) as ApiListModel<OrderModel>;
    if (response.error) return Promise.reject(response.data);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getOrderById = async (id: string) => {
  try {
    const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/orders/${id}`);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getOrderTrackingDetail = async (id: string) => {
  try {
    const response = await authorizedRequest.get(
      `${config.apiBaseUrl}/admin/orders/tracking-status/${id}`,
    );
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

export function* watcherFetchGetOrderListType(action: WatcherFetchGetOrderListType) {
  try {
    yield put(getOrderListPending());
    const { payload } = action;
    const response: Promise<ApiListModel<OrderModel>> = yield getOrderList(payload);
    yield put(getOrderListFulfilled(response));
  } catch (error: any) {
    yield put(getOrderListRejected(error?.message));
  }
}

export function* watcherFetchOrderById(action: WatcherFetchGetOrderByIdType) {
  try {
    yield put(getOrderDetailPending());
    const { payload } = action;
    const response: Promise<OrderModel> = yield getOrderById(payload);
    yield put(getOrderDetailFulfilled(response));
  } catch (error: any) {
    yield put(getOrderDetailRejected(error?.message));
  }
}

export function* watcherFetchOrderDetailTrackingDetail(
  action: WatcherFetchGetOrderTrackingDetailType,
) {
  try {
    yield put(getOrderDetailPending());
    const { payload } = action;
    const response: Promise<TrackingStatusModel> = yield getOrderTrackingDetail(payload);
    yield put(getOrderTrackingDetailFulfilled(response));
  } catch (error: any) {
    yield put(getOrderDetailRejected(error?.message));
  }
}

export const fetchGetOrderList = (payload: ParamListRequestModel) => ({
  type: FETCH_GET_ORDER_LIST,
  payload,
});

export const fetchOrderDetailByID = (payload: string) => ({
  type: FETCH_GET_ODDER_BY_ID,
  payload,
});

export const fetchOrderDetailTrackingDetail = (payload: string) => ({
  type: FETCH_GET_ORDER_TRACKING_DETAIL,
  payload,
});
