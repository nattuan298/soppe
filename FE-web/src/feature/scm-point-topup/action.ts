/* eslint-disable @typescript-eslint/no-explicit-any */
import { delay, put, spawn } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import {
  changeError,
  changeOpenOTP,
  changefieldStatus,
  decreaseEcommissionFulfilled,
  getDetailFulfilled,
  getEcommissionFulfilled,
  handleChangeField,
  totalSCMPFulfilled,
} from "./slice";

import {
  FETCH_GET_DETAIL_POINTTOPUP,
  FETCH_GET_ECOMMISSION,
  FETCH_GET_TOTAL_SCMP,
  FETCH_PAYMENT_CHECKOUT_POINT,
  FETCH_PUT_DECREASE_ECOMMISSION,
  PayLoadPaymentCheckoutType,
  ResponseChargePaymentType,
  WatcherFetchGetDetailPointTopup,
  WatcherPaymentCheckoutPointType,
  WatcherPaymentDecreaseEcommissionType,
  orderDetailModel,
  totalEcommissionModel,
  totalPointModel,
} from "./type";

const createChargePayment = async (amount: number, reference_order: string, token: string) => {
  const payload = {
    amount,
    currency: "THB",
    description: "Checkout Payment",
    source_type: "card",
    mode: "token",
    reference_order,
    token,
    ref_1: "scm-point",
  };
  try {
    const res = await axios.post(apiRoute.payment.normalCharge, payload);
    return res.data;
  } catch (e: any) {
    return { error: e.response.data.message };
  }
};

export function* watcherFetchPaymentCheckoutPoint(action: WatcherPaymentCheckoutPointType) {
  try {
    const { token, data } = action.payload;
    if (data) {
      const { total, OrderId } = data;
      const { id, redirect_url, status, transaction_state, error }: ResponseChargePaymentType =
        yield createChargePayment(total, OrderId, token);
      if (error) {
        yield put(changeError(error));
      }
      if (status === "success" && !redirect_url && transaction_state === "Authorized") {
        yield put(changefieldStatus("success"));
      }
      yield put(handleChangeField({ chargeId: id }));
      if (redirect_url) {
        const newWindow = window.open(
          redirect_url,
          "_blank",
          "location=yes,height=600,width=1000,scrollbars=yes,status=yes,left=100,resizable=yes",
        );
        yield put(changeOpenOTP(true));
        yield spawn(function* () {
          let isloop = true;
          while (isloop) {
            if (newWindow) {
              if (newWindow.closed) {
                isloop = false;
                yield put(changeOpenOTP(false));
              }
            }
            yield delay(3000);
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const getTotalSCMP = async () => {
  const response = await axios.get(`${apiRoute.pointTopup.totalSCMP}`);
  return response;
};

export function* watcherFetchGetTotalSCMP() {
  try {
    const response: Promise<totalPointModel> = yield getTotalSCMP();
    yield put(totalSCMPFulfilled(response));
  } catch (error) {}
}

const getEcommission = async () => {
  const response = await axios.get(`${apiRoute.pointTopup.Ecommission}`);
  return response;
};

export function* watcherFetchGetEcommission() {
  try {
    const response: Promise<totalEcommissionModel> = yield getEcommission();
    yield put(getEcommissionFulfilled(response));
  } catch (error) {}
}

const decreaseEcommission = async (total: number) => {
  const bodyRequest = {
    total,
  };
  const response = await axios.put(`${apiRoute.pointTopup.decreaseEcommission}`, bodyRequest);
  return response;
};

export function* watcherFetchPutDecreaseEcommission(action: WatcherPaymentDecreaseEcommissionType) {
  try {
    const { payload } = action;
    const response: Promise<{ data: string }> = yield decreaseEcommission(payload);
    yield put(decreaseEcommissionFulfilled(response));
  } catch (error) {}
}

const getDetail = async (id: string) => {
  const response = await axios.get(`${apiRoute.pointTopup.detail}?orderId=${id}`);
  return response;
};

export function* watcherFetchGetDetailPointTopup(action: WatcherFetchGetDetailPointTopup) {
  try {
    const { payload } = action;
    const response: Promise<{ data: orderDetailModel }> = yield getDetail(payload);
    yield put(getDetailFulfilled(response));
  } catch (error) {}
}

export const fetchPayLoadPaymentCheckout = (payload: PayLoadPaymentCheckoutType) => ({
  type: FETCH_PAYMENT_CHECKOUT_POINT,
  payload,
});

export const fetchGetTotalSCMP = () => ({
  type: FETCH_GET_TOTAL_SCMP,
});

export const fetchGetEcommission = () => ({
  type: FETCH_GET_ECOMMISSION,
});

export const fetchPutDecreaseEcommission = (payload: number) => ({
  payload,
  type: FETCH_PUT_DECREASE_ECOMMISSION,
});

export const fetchGetDetailPointTopup = (payload: string) => ({
  payload,
  type: FETCH_GET_DETAIL_POINTTOPUP,
});
