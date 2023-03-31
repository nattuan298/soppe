export interface topUpType {
  totalSCMP: totalPointModel;
  OrderId: string;
  statusMakePayment: string;
  total: number;
  errorMessage: string;
  paymentStatusForNonSecure: string;
  statusMakeOrder: string;
  paymentMethod: string;
  TotalEcommission: totalEcommissionModel;
  chargeId: string;
  orderDetail: orderDetailModel;
  orderIdForQR: string;
  openOTPPopup: boolean;
}
export interface CheckoutState {
  totalSCMP: totalPointModel;
  OrderId: string;
  statusMakePayment: string;
  total: number;
  statusMakeOrder: string;
  errorMessage: string;
  paymentStatusForNonSecure: string;
  paymentMethod: string;
  TotalEcommission: totalEcommissionModel;
  chargeId: string;
  orderDetail: orderDetailModel;
}

export interface pointAndValue {
  scmPoint: number;
  productValueLeft: number;
  productValueRight: number;
  expireDate: string;
}
export interface totalPointModel {
  data: pointAndValue;
}
export interface totalEcommissionModel {
  data: number;
}
export interface orderDetailModel {
  _id: string;
  total: number;
  fullName: string;
  orderNumber: string;
  paymentState?: string;
}

export interface ResponseChargePaymentType {
  id: string;
  redirect_url: string;
  status: string;
  transaction_state: string;
  error?: string;
}

export interface WatcherPaymentCheckoutPointType {
  type: string;
  payload: PayLoadPaymentCheckoutType;
}

export interface PayLoadPaymentCheckoutType {
  token: string;
  data: CheckoutState;
}

export interface WatcherPaymentDecreaseEcommissionType {
  type: string;
  payload: number;
}

export interface WatcherFetchGetDetailPointTopup {
  type: string;
  payload: string;
}

export const FETCH_PAYMENT_CHECKOUT_POINT = "PointTopup/paymentCheckout";
export const FETCH_GET_TOTAL_SCMP = "PointTopup/total";
export const FETCH_GET_ECOMMISSION = "PointTopup/e-commission";
export const FETCH_PUT_DECREASE_ECOMMISSION = "PointTopup/decrease-e-commission";
export const FETCH_GET_DETAIL_POINTTOPUP = "PointTopup/detail";
