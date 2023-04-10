/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectEffect, put, select } from "redux-saga/effects";
import { Cookies } from "react-cookie";

import { currencyUnit, getTax } from "src/hooks";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { RootState } from "src/state/store";
import { ItemArraySelect } from "../signup/type";
import {
  AddressBook,
  BodyCreateOrder,
  BodyUpdateOrder,
  CheckoutCreateOrderPayload,
  CheckoutState,
  FETCH_CHECKOUT_CREATE_DRAFT_ORDER,
  FETCH_CHECKOUT_CREATE_ORDER,
  FETCH_CHECKOUT_GET_LIST_ADDRESS,
  FETCH_CHECKOUT_GET_LIST_BRANCH,
  FETCH_CHECKOUT_GET_LIST_CITY,
  FETCH_CHECKOUT_GET_SHIPPING_FEES,
  FETCH_CHECKOUT_UPDATE_ORDER,
  FETCH_POST_PAYMENT_CHECKOUT,
  ItemBranch,
  ParamsListCity,
  PaymentCheckoutPayload,
  ShippingFeesType,
  WatcherCheckoutGetListBranch,
  WatcherCheckoutGetListCity,
  WatcherFetchCheckoutCreateOrder,
  WatcherFetchPaymentCheckoutPayload,
  WatcherFetchPostCheckoutOrder,
} from "./type";
import {
  createOrderFulfilled,
  createOrderRejected,
  getListAddressFulfilled,
  getListBranchFulfilled,
  getListBranchPending,
  getListBranchRejected,
  getListCityFulfilled,
  getListCityPending,
  getListCityRejected,
  getShippingFeesFulfilled,
  getShippingFeesPending,
  getShippingFeesRejected,
  updateOrderFulfilled,
  updateOrderPending,
  updateOrderRejected,
} from "./slice";
import { handleChangeField } from "./thunkAction";
import { getThumbimageFromMedia } from "src/utils/product";
import { OrderDetailType } from "types/orders";
// import { ProductTypeWithQty } from "../shopping-cart/type";

export const getListBranch = async (id: string) => {
  const response = await axios.get(`${apiRoute.branch.getBranchCheckout}?provinceId=${id}`);
  return response.data;
};

export const getListCity = async (country: string) => {
  const response = await axios.get(`${apiRoute.signup.getCityHasBranch}?country=${country}`);
  return response.data;
};

const getListAddress = async () => {
  const response = await axios.get(`${apiRoute.userInfors.listAddress}`);
  return response.data;
};

export function* watcherCheckoutGetListAddress() {
  try {
    const { data } : { data : Array<AddressBook>} = yield getListAddress();
    yield put(getListAddressFulfilled(data));
  } catch (error) {}
}

export function* watcherGetListBranchCheckout(action: WatcherCheckoutGetListBranch) {
  try {
    const { payload } = action;
    console.log({ payload });
    yield put(getListBranchPending());
    const listBranch: Array<ItemBranch> = yield getListBranch(payload);
    yield put(getListBranchFulfilled(listBranch));
  } catch (error) {
    yield put(getListBranchRejected());
  }
}

const getCheckout = (state: RootState) => state.checkout;

function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

export const fetchCheckoutGetListBranch = (payload: string) => ({
  type: FETCH_CHECKOUT_GET_LIST_BRANCH,
  payload,
});

export function* watcherFetchGetListCity(action: WatcherCheckoutGetListCity) {
  try {
    const { payload } = action;
    const name = payload?.name || "";
    const isFirstLoad = payload?.isFirstLoad || false;
    yield put(getListCityPending());
    const { country: defaultCountry } = yield selectState<CheckoutState>(getCheckout);
    const country = name || defaultCountry;
    const listCity: Array<ItemArraySelect> = yield getListCity(country);
    console.log(listCity, country);
    if (isFirstLoad && country === "Thailand") {
      const BangkokCity = listCity.find((item) => item.nameEng === "Bangkok");
      console.log({ BangkokCity });
      if (BangkokCity) {
        yield put({ type: FETCH_CHECKOUT_GET_LIST_BRANCH, payload: BangkokCity._id });
      }
    }
    yield put(getListCityFulfilled(listCity));
  } catch (e) {
    yield put(getListCityRejected());
  }
}

const postShippingFee = async (body: any) => {
  const response = await axios.post(`${apiRoute.orders.shippingFee}`, body);
  return response.data;
};
export function* watcherCheckoutgetShippingFees() {
  try {
    const { country, listAddress, address, totalPrice, totalWeight } =
      yield selectState<CheckoutState>(getCheckout);
    yield put(getShippingFeesPending());
    const addressDetail = listAddress.find((item: { value: any }) => item.value === address);

    const body = {
      locationBase: country,
      totalPrice,
      totalWeight,
      provinceId: addressDetail?.provinceId || "",
    };
    const shippingFees: ShippingFeesType = yield postShippingFee(body);
    yield put(getShippingFeesFulfilled(shippingFees));
  } catch (error) {
    yield put(getShippingFeesRejected());
  }
}

const updateOrder = async (type: string, orderId: string, body: any) => {
  if (type === FETCH_CHECKOUT_CREATE_DRAFT_ORDER) {
    const res = await axios.post(`${apiRoute.orders.draftOrders}/${orderId}`, body);
    return res;
  }
  const res = await axios.put(`${apiRoute.orders.listOrders}/${orderId}`, body);
  return res;
};
export function* watcherFetchPostCheckoutOrder(action: WatcherFetchPostCheckoutOrder) {
  const { type, payload: callbackError } = action;
  try {
    const {
      orderId,
      shippingType,
      realAddress,
      shippingFee,
      paymentMethod,
      country,
      city,
      branch,
      listBranch,
      sa_type,
      totalPrice,
      address,
      billingAddress: billingAddressId,
      coupon,
      couponRedeemAmount,
      listCity,
      pcode,
      price,
      isRemarked,
    } = yield selectState<CheckoutState>(getCheckout);
    const cookies = new Cookies();
    const memberCookies = cookies.get("member");
    const locationBase = memberCookies.locationBase || "Thailand";

    const shippingAddress = realAddress.find((item: any) => item._id === address);
    const billingAddress = realAddress.find((item: any) => item._id === billingAddressId);

    const tax = getTax();

    if (type === FETCH_CHECKOUT_UPDATE_ORDER) {
      yield put(updateOrderPending());
    }
    const body: BodyUpdateOrder = {
      type: shippingType,
      totalPrice: totalPrice + shippingFee - couponRedeemAmount,
      paymentMethod,
      taxes: ((totalPrice + shippingFee) / (1 + tax)) * tax,
      locationBase,
      pcode,
      price,
      status: "To Ship",
      shippingFees: shippingFee / (1 + tax),
      totalShippingFees: shippingFee,
      saType: sa_type,
      provinceId: shippingAddress?.provinceId || city.id,
      couponCode: coupon,
      isRemarked,
    };

    if (shippingType === "Pickup") {
      const currentBranch = listBranch.find((item: any) => item._id === branch.id);
      const selectedcity = listCity.find((item: any) => item._id === city.id);
      if (currentBranch && selectedcity) {
        body.pickupAddress = {
          country,
          province: selectedcity.name,
          branch: currentBranch.name,
          code: currentBranch.code,
          address: currentBranch.address,
          phoneNumbers: currentBranch.phoneNumbers,
          phoneCode: currentBranch.phoneCode,
          addressEng: currentBranch.addressEng,
          branchEng: currentBranch.nameEng,
          businessHours: currentBranch.businessHours,
          businessHoursEng: currentBranch.businessHoursEng,
          provinceEng: selectedcity.nameEng,
        };
      }
      body.status = "To Review";
    } else if (shippingAddress && billingAddress) {
      body.shippingAddress = {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        phoneCode: shippingAddress.phoneCode,
        phoneNumber: shippingAddress.phoneNumber,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode,
        province: shippingAddress.province,
        district: shippingAddress.district,
        subDistrict: shippingAddress.subDistrict,
        address: shippingAddress.address,
        provinceEng: shippingAddress.provinceEng,
        districtEng: shippingAddress.districtEng,
        subDistrictEng: shippingAddress.subDistrictEng,
      };

      body.billingAddress = {
        firstName: billingAddress.firstName,
        lastName: billingAddress.lastName,
        phoneCode: billingAddress.phoneCode,
        phoneNumber: billingAddress.phoneNumber,
        country: billingAddress.country,
        postalCode: billingAddress.postalCode,
        province: billingAddress.province,
        district: billingAddress.district,
        subDistrict: billingAddress.subDistrict,
        address: billingAddress.address,
        provinceEng: billingAddress.provinceEng,
        districtEng: billingAddress.districtEng,
        subDistrictEng: billingAddress.subDistrictEng,
      };
    }
    const res: { data: any } = yield updateOrder(type, orderId, body);
    if (type === FETCH_CHECKOUT_UPDATE_ORDER) {
      yield put(updateOrderFulfilled());
    }
    callbackError?.({ payload: res });
  } catch (e: any) {
    const message = e.response?.status !== 401 ? e.response?.data?.message : "";
    if (type === FETCH_CHECKOUT_UPDATE_ORDER) {
      yield put(updateOrderRejected());
    }
    callbackError?.({ error: { message }, payload: message });
  }
}

const postNormalCharge = async (body: any) => {
  const response = await axios.post(apiRoute.payment.normalCharge, body);
  return response;
};

export function* watcherFetchPostPaymentCheckout(action: WatcherFetchPaymentCheckoutPayload) {
  const { token, data, callbackError } = action.payload;
  if (data) {
    try {
      const {
        totalPrice,
        shippingFee,
        orderNumber,
        coupon,
        shippingType,
        realAddress,
        address,
        couponRedeemAmount,
      } = data;
      const shippingAddress = realAddress.find((item) => item._id === address);
      const body = {
        amount: totalPrice + shippingFee - couponRedeemAmount,
        currency: "THB",
        description: "Checkout Payment",
        source_type: "card",
        mode: "token",
        reference_order: orderNumber,
        token,
        ref_1: "sale",
        provinceId:
          shippingType === "Ship to address" && shippingAddress ? shippingAddress.provinceId : "",
        type: shippingType,
        couponCode: coupon,
      };
      const res2: { data: any } = yield postNormalCharge(body);

      const { id, redirect_url, status, transaction_state } = res2.data;

      // non secure
      if (status === "success" && !redirect_url && transaction_state === "Authorized") {
        yield put(handleChangeField({ paymentStatusForNonSecure: status }));
      }

      yield put(handleChangeField({ chargeId: id, redirect_url }));
    } catch (e: any) {
      const error = e.response?.status !== 401 ? e.response?.data?.message : "";
      // rejectWithValue(e.response?.status !== 401 ? e.response?.data?.message : "");
      if (error && callbackError) {
        callbackError(error);
      }
    }
  }
}

export const fetchCheckoutGetListCity = (payload: ParamsListCity | undefined) => ({
  type: FETCH_CHECKOUT_GET_LIST_CITY,
  payload,
});

export const fetchCheckoutGetListAddress = () => ({
  type: FETCH_CHECKOUT_GET_LIST_ADDRESS,
});

export const fetchCheckoutgetShippingFees = () => ({
  type: FETCH_CHECKOUT_GET_SHIPPING_FEES,
});

export const fetchCheckoutCreateDraftOrder = () => ({
  type: FETCH_CHECKOUT_CREATE_DRAFT_ORDER,
});

export const fetchCheckoutUpdateOrder = (payload: Function) => ({
  type: FETCH_CHECKOUT_UPDATE_ORDER,
  payload,
});

export const fetchPostPaymentCheckout = (payload: PaymentCheckoutPayload) => ({
  type: FETCH_POST_PAYMENT_CHECKOUT,
  payload,
});

const postCreateOrder = async (body: BodyCreateOrder) => {
  const response = await axios.post(`${apiRoute.orders.listOrders}`, body);
  return response.data;
};

const getCreateOrder = async (id: string) => {
  const response = await axios.get(`${apiRoute.orders.listOrders}/${id}`);
  return response.data;
};

export function* watcherCheckoutCreateOrder(action: WatcherFetchCheckoutCreateOrder) {
  const { checkoutProduct: products, callback: callbackError } = action.payload;
  try {
    const cookies = new Cookies();
    const memberCookies = cookies.get("member");
    const locationBase = memberCookies.locationBase || "Thailand";
    const productsBody = products.map((item) => {
      const media = item.mediaUrl;
      // const fileType: "VIDEO" | "IMAGE" = media?.fileType.toLowerCase().includes("video")
      //   ? "VIDEO"
      //   : "IMAGE";
      return {
        images: media || "",
        fileType: "IMAGE",
        productCode: item._id,
        productName: item.productName,
        price: item.price,
        quantity: item.qty,
        unit: currencyUnit[locationBase],
        categoryId: item.categoryId,
      };
    });

    const total = products.reduce(
      ({ price, qty }, item) => {
        return {
          price: price + item.qty * item.price,

          qty: qty + item.qty,
        };
      },
      { price: 0, pv: 0, qty: 0, weight: 0 },
    );
    const tax = getTax();

    yield put(handleChangeField({ preProducts: productsBody }));

    const body: BodyCreateOrder = {
      totalQuantity: total.qty,
      totalProductPrice: parseFloat((total.price / (1 + tax)).toFixed(2)),
      totalPv: total.pv,
      totalWeight: total.weight,
      totalPrice: total.price,
      paymentMethod: "Credit/ Debit Card",
      products: productsBody,
      type: "Ship to address",
      shippingAddress: null,
      billingAddress: null,
      pickupAddress: null,
      unit: currencyUnit[locationBase],
      taxes: parseFloat(((total.price / (1 + tax)) * tax).toFixed(2)),
      locationBase,
    };

    const response: OrderDetailType = yield postCreateOrder(body);
    const response2: { products: any } = yield getCreateOrder(response._id);
    yield put(createOrderFulfilled({ ...response, products: response2.products }));
    callbackError({ type: "checkout/createOrder/fulfilled" });
  } catch (e: any) {
    yield put(createOrderRejected());
    callbackError?.({
      error: true,
      payload: e.response?.status !== 401 ? e.response?.data?.message : "",
    });
  }
}
export const fetchCheckoutCreateOrder = (payload: CheckoutCreateOrderPayload) => ({
  type: FETCH_CHECKOUT_CREATE_ORDER,
  payload,
});
