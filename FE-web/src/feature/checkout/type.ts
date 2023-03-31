// import { AddresObjectType } from "../signup/type";

import { OrderAddressType, OrderProductDetailType } from "types/orders";
import { ItemArraySelect } from "../signup/type";
import { ProductTypeWithQty } from "../shopping-cart/type";

export interface AddresObjectType {
  id: string;
  title: string;
}

interface AddressTypeShort {
  infor: string;
  address: string;
  value: string;
  billAddress: boolean;
  shipAddress: boolean;
  provinceId: string;
  addressEng: string;
}

export interface ItemBranch {
  address: string;
  addressEng: string;
  code: string;
  name: string;
  nameEng: string;
  phoneCode: string;
  phoneNumbers: string[];
  _id: string;
  businessHours: string;
  businessHoursEng: string;
}

export interface CheckoutProductDetailType
  extends Omit<OrderProductDetailType, "isReviewed" | "timesTransferLeft" | "productImage"> {
  hasChangeprice?: boolean;
  productImage?: string;
}

export interface CheckoutState {
  mainStep: number;
  shippingType: string;
  country: string;
  address: string;
  paymentMethod: string;
  listAddress: AddressTypeShort[];
  billingAddress: string;
  checkoutProducts: Array<
    OrderProductDetailType & { hasChangeprice?: boolean; hasChangePV?: boolean }
  >;
  callingListProduct: boolean;
  callingAPI: boolean;
  loadingAddressPickup: boolean;
  listCity: Array<ItemArraySelect>;
  listBranch: Array<ItemBranch>;
  city: AddresObjectType;
  branch: AddresObjectType;
  shippingFee: number;
  totalPrice: number;
  totalQty: number;
  totalWeight: number;
  totalPV: number;
  realAddress: AddressBook[];
  orderId: string;
  sa_type: string;
  orderNumber: string;
  chargeId: string;
  paymentStatusForNonSecure: string;
  locationBase: string;
  addressNewCreate: boolean;
  addAddressFrom: string;
  redirect_url?: string;
  coupon: string;
  preProducts: CheckoutProductDetailType[];
  couponRedeemAmount: number;
  discountCategory: string;
  couponDraft: string;
  orderIdForQR: string;
  price: Array<number>;
  pcode: Array<string>;
  isOpenModalTopay: boolean;
  isRemarked: boolean;
}

export interface AddressBook {
  address: string;
  category: string;
  country: string;
  district: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  postalCode: string;
  province: string;
  subDistrict: string;
  shipAddress: boolean;
  billAddress: boolean;
  updatedAt?: string;
  provinceId: string;
  createdAt?: string;
  provinceEng?: string;
  districtEng?: string;
  subDistrictEng?: string;
  __v?: number;
  _id: string;
}

export interface BodyCreateOrder {
  totalQuantity: number;
  totalProductPrice: number;
  totalPv: number;
  paymentMethod: "Credit/ Debit Card";
  products: {
    images: string;
    productCode: string;
    productName: string;
    pv: number;
    price: number;
    quantity: number;
    unit: string;
    weight: number;
  }[];
  shippingAddress: OrderAddressType | null;
  billingAddress?: OrderAddressType | null;
  pickupAddress?: {
    country: string;
    province: string;
    branch: string;
    code: string;
    address: string;
    phoneNumbers: string[];
    phoneCode: string;
  } | null;
  unit: string;
  taxes: number;
  totalWeight: number;
  totalPrice: number;
  type: string;
  locationBase?: string;
}

export interface BodyUpdateOrder {
  type: string;
  shippingAddress?: OrderAddressType;
  billingAddress?: OrderAddressType;
  pickupAddress?: {
    country: string;
    province: string;
    branch: string;
    code: string;
    address: string;
    phoneNumbers: string[];
    phoneCode: string;
    provinceEng: string;
    branchEng: string;
    addressEng: string;
    businessHours: string;
    businessHoursEng: string;
  };
  locationBase: string;
  pcode: string[];
  price: number[];
  status: "To Ship" | "To Review";
  taxes: number;
  totalPrice: number;
  paymentMethod: string;
  shippingFees: number;
  totalShippingFees: number;
  saType: string;
  provinceId: string;
  couponCode: string;
  isRemarked: boolean;
}

export const FETCH_CHECKOUT_GET_LIST_BRANCH = "checkout/getListBranch";
export const FETCH_CHECKOUT_GET_LIST_CITY = "checkout/getListCity";
export const FETCH_CHECKOUT_GET_LIST_ADDRESS = "checkout/getListAddress";
export const FETCH_CHECKOUT_GET_SHIPPING_FEES = "checkout/getShippingFees";
export const FETCH_CHECKOUT_CREATE_DRAFT_ORDER = "checkout/createDraftOrder";
export const FETCH_CHECKOUT_UPDATE_ORDER = "checkout/updateOrder";
export const FETCH_CHECKOUT_CREATE_ORDER = "checkout/createOrder";

export interface WatcherFetchPostCheckoutOrder {
  type: string;
  payload: Function;
}
export interface WatcherCheckoutGetListBranch {
  type: string;
  payload: string;
}

export interface ParamsListCity {
  name?: string;
  isFirstLoad?: boolean;
}

export interface WatcherCheckoutGetListCity {
  type: string;
  payload: ParamsListCity | undefined;
}

export interface ShippingFeesType {
  totalShippingFees: number;
  pcode: Array<string>;
  price: Array<number>;
}

export interface PaymentCheckoutPayload {
  token: string;
  data: CheckoutState;
  callbackError: (message: string) => void;
}

export interface WatcherFetchPaymentCheckoutPayload {
  type: string;
  payload: PaymentCheckoutPayload;
}

export const FETCH_POST_PAYMENT_CHECKOUT = "checkout/paymentCheckout";

export interface CheckoutCreateOrderPayload {
  callback: Function;
  checkoutProduct: Array<ProductTypeWithQty>;
}
export interface WatcherFetchCheckoutCreateOrder {
  type: string;
  payload: CheckoutCreateOrderPayload;
}
