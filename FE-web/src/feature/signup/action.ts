/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "src/lib/client/request";
import dayjs from "dayjs";
import { SelectEffect, call, put, select } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import { RootState } from "src/state/store";
import {
  BodyPost,
  FETCH_GET_BANK,
  FETCH_GET_CITY,
  FETCH_GET_DISTRICT,
  FETCH_GET_SPONSER_INFO,
  FETCH_GET_SUB_DISTRICT,
  FETCH_POST_OTP_SIGNUP,
  FETCH_POST_PAYMENT_SIGN_UP,
  FETCH_POST_PHONE_NUMBER_SIGNUP,
  FETCH_POST_SIGN_UP,
  FETCH_POST_VERIFY_ID_CARD,
  PayloadSignUp,
  PaymentSignUpPayload,
  SignupPhonePayload,
  SignupState,
  WatcherFetchGetDistrict,
  WatcherFetchGetSponserInfo,
  WatcherFetchGetSubDistrict,
  WatcherFetchPaymentSignUpType,
  WatcherFetchPostOTPSignup,
  WatcherFetchSignUpType,
} from "./type";
import {
  actionCallAPIPending,
  actionSetErrors,
  getBankFulfilled,
  getCityFulfilled,
  getCityPending,
  getDistrictFulfilled,
  getDistrictPending,
  getSponserInforFulfilled,
  getSubDistrictFulfilled,
  getSubDistrictPending,
  handleChangeField,
  postOTPFulfilled,
  postphoneNumberFulfilled,
  verifyIdCardFulfilled,
} from "./slice";

const getSignup = (state: RootState) => state.signup;

function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

const getSponserInfor = async (sponsorId: string) => {
  const response = await axios.get(`${apiRoute.members.sponsorInfor}?sponsorId=${sponsorId}`);
  return Promise.resolve(response);
};

const getCity = async (country: string) => {
  const response = await axios.get(`${apiRoute.signup.getCity}?country=${country}`);
  return response;
};

const getDistrict = async (city: string) => {
  const response = await axios.get(`${apiRoute.signup.getDistrict}/${city}`);
  return response;
};

const getSubDistrict = async (district: string) => {
  const response = await axios.get(`${apiRoute.signup.getSubDistrict}/${district}`);
  return response;
};

const getBank = async (country: string) => {
  const response = await axios.get(`${apiRoute.signup.getBank}?country=${country}`);
  return response;
};

const postNumberPhone = async ({ phoneNumber, phoneCode }: SignupPhonePayload) => {
  try {
    const response = await axios.post(apiRoute.signup.postPhoneNumber, {
      phoneNumber,
      phoneCode,
    });
    return Promise.resolve(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return Promise.reject(e);
  }
};


export function* watcherFetchGetSponserInfo(action: WatcherFetchGetSponserInfo) {
  try {
    const { payload } = action;
    const res: Promise<any> = yield getSponserInfor(payload);
    yield put(getSponserInforFulfilled(res));
  } catch (e) {}
}

export function* watcherFetchGetCity() {
  try {
    yield put(actionCallAPIPending());
    yield put(getCityPending());
    const { country } = yield selectState<SignupState>(getSignup);
    const res: Promise<any> = yield getCity(country);
    yield put(getCityFulfilled(res));
  } catch (e) {}
}

export function* watcherFetchGetDistrict(action: WatcherFetchGetDistrict) {
  try {
    const { payload } = action;
    yield put(getDistrictPending());
    const res: Promise<any> = yield getDistrict(payload);
    yield put(getDistrictFulfilled(res));
  } catch (e) {}
}

export function* watcherFetchGetSubDistrict(action: WatcherFetchGetSubDistrict) {
  try {
    const { payload } = action;
    yield put(getSubDistrictPending());
    const res: Promise<any> = yield getSubDistrict(payload);
    yield put(getSubDistrictFulfilled(res));
  } catch (e) {}
}

export function* watcherFetchGetBank() {
  try {
    const { country } = yield selectState<SignupState>(getSignup);
    const res: Promise<any> = yield getBank(country);
    yield put(getBankFulfilled(res));
  } catch (e) {}
}

export function* watcherFetchPostPhoneNumberSignup() {
  try {
    const { phoneNumber, phoneCode } = yield selectState<SignupState>(getSignup);
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }
    yield put(actionCallAPIPending());
    const response: Promise<any> = yield postNumberPhone({
      phoneCode,
      phoneNumber: newPhoneNumber,
    });
    yield put(postphoneNumberFulfilled(response));
  } catch (error: any) {
    const { message } = error.response?.data;
    yield put(actionSetErrors({ phoneNumber: message }));
  }
}

export function* watcherFetchPostOtpSignup(action: WatcherFetchPostOTPSignup) {
  try {
    const { payload } = action;
    const { phoneNumber, phoneCode, requestIdPhone } = yield selectState<SignupState>(getSignup);
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }
    yield put(actionCallAPIPending());
    const response: Promise<any> = yield call(() =>
      axios.post(apiRoute.signup.postOTP, {
        code: payload,
        phoneNumber: newPhoneNumber,
        requestId: requestIdPhone,
        phoneCode,
      }),
    );
    console.log(response);
    yield put(postOTPFulfilled());
  } catch (e: any) {
    const message = e.response?.data?.message || "";
    yield put(actionSetErrors({ otp: message }));
  }
}

export function* watcherFetchPostVerifyIDCard() {
  try {
    const { idCardNumber } = yield selectState<SignupState>(getSignup);
    yield put(actionCallAPIPending());
    yield call(() =>
      axios.post(apiRoute.signup.verifyIdCard, {
        input: idCardNumber.toString(),
      }),
    );
    yield put(verifyIdCardFulfilled());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const message = e.response?.data?.message || "";
    yield put(actionSetErrors({ idCardNumber: message }));
  }
}

const makeOrder = async (stateSignUp: SignupState) => {
  const response = await axios.post(apiRoute.sponsors.makeOrder, {
    dateOfBirth: dayjs(stateSignUp.birth).format("YYYY-MM-DD"),
    firstName: stateSignUp.firstName,
    lastName: stateSignUp.lastName,
    phoneNumber: stateSignUp.phoneNumber,
    phoneCode: stateSignUp.phoneCode,
    citizenship: stateSignUp.citizenship,
    email: stateSignUp.email,
    sponsorId: stateSignUp.sponsor.sponsorId,
    memberType: stateSignUp.memberType === "1" ? 1 : 2,
    couponCode: stateSignUp.coupon,
  });
  return response.data;
};

const createTempAccount = async (signup: SignupState, orderId: string) => {
  const { phoneCode, phoneNumber, citizenship, memberType, side, coupon } = signup;
  let newPhoneNumber = phoneNumber;
  if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
    newPhoneNumber = phoneNumber.slice(1);
  }

  const body: BodyPost = {
    sponsorId: signup.sponsor.sponsorId,
    phoneCode,
    phoneNumber: newPhoneNumber,
    prefixName: signup.prefixName,
    firstName: signup.firstName.trim(),
    lastName: signup.lastName.trim(),
    dateOfBirth: dayjs(signup.birth).format("YYYY-MM-DD"),
    gender: signup.gender,
    country: signup.country,
    postalCode: signup.postalCode,
    province: signup.city.title,
    district: signup.district.title,
    subDistrict: signup.subDistrict.title,
    address: signup.address.trim(),
    bankCode: signup.bankCode,
    bankBranch: signup.bankBranch.trim(),
    accountNumber: signup.accountNumber.trim(),
    accountName: signup.accountName.trim(),
    images: [],
    citizenship,
    memberType: memberType === "1" ? 1 : 2,
    referenceOrder: orderId,
    side,
    couponCode: coupon,
    provinceEng: signup.city.titleEng,
    districtEng: signup.district.titleEng,
    subDistrictEng: signup.subDistrict.titleEng,
    isRemarked: signup.isRemarked,
  };
  if (signup.district.title) {
    body.district = signup.district.title;
  }
  if (signup.subDistrict.title) {
    body.subDistrict = signup.subDistrict.title;
  }
  if (signup.city.titleEng) {
    body.provinceEng = signup.city.titleEng;
  }
  if (signup.district.titleEng) {
    body.districtEng = signup.district.titleEng;
  }
  if (signup.subDistrict.titleEng) {
    body.subDistrictEng = signup.subDistrict.titleEng;
  }

  if (signup.email) {
    body.email = signup.email;
  }
  const isThai = citizenship === "Thai";
  if (isThai) {
    body.idCard = signup.idCardNumber.trim();
  } else {
    body.passportNumber = signup.idCardNumber.trim();
  }

  if (signup.idCartPhoto) {
    body.images.push({
      type: isThai ? "ID_CARD_PHOTO" : "PASSPORT_PHOTO",
      key: signup.idCartPhoto.key,
    });
  }
  if (signup.beneficiaryPhoto) {
    body.images.push({
      type: isThai ? "BENEFICIARY_ID_CARD_PHOTO" : "BENEFICIARY_PASSPORT_PHOTO",
      key: signup.beneficiaryPhoto.key,
    });
  }
  if (signup.bank_photo) {
    body.images.push({
      type: isThai ? "BOOK_BANK_PHOTO" : "CASH_CARD_PHOTO",
      key: signup.bank_photo.key,
    });
  }
  if (signup.relationship_certificate) {
    body.images.push({ type: "CERTIFICATE_PHOTO", key: signup.relationship_certificate.key });
  }
  const response = await axios.post(apiRoute.signup.temporaryAccounts, body);
  return response;
};

const createOrderForQRRegister = async (
  price: number,
  stateSignUp: SignupState,
  orderId: string,
) => {
  const responseapi = await axios.post(apiRoute.payment.createOrderForQRRegister, {
    amount: price - stateSignUp.couponRedeemAmount,
    currency: "THB",
    description: "Register payment by QR code",
    source_type: "qr",
    reference_order: orderId,
    ref_1: "register",
    couponCode: stateSignUp.coupon,
  });
  return responseapi;
};

const registerCharge = async (
  price: number,
  stateSignUp: SignupState,
  orderId: string,
  token: string,
) => {
  const response = await axios.post(apiRoute.payment.registerCharge, {
    amount: price - stateSignUp.couponRedeemAmount,
    currency: "THB",
    description: "Register Payment",
    source_type: "card",
    mode: "token",
    reference_order: orderId,
    token,
    ref_1: "register",
    couponCode: stateSignUp.coupon,
  });
  return response;
};
export function* watcherFetchPostPaymentSignUp(action: WatcherFetchPaymentSignUpType) {
  const { token, data: stateSignUp, callbackError, urlObject } = action.payload;
  try {
    if (stateSignUp) {
      const res: { _id: string } = yield call(() => makeOrder(stateSignUp));
      const orderId = res._id;
      yield put(handleChangeField({ orderId }));
      yield call(() => createTempAccount(stateSignUp, orderId));
      const price = stateSignUp.memberType === "1" ? 300 : 100;

      if (stateSignUp.paymentMethod === "QR code" && price - stateSignUp.couponRedeemAmount !== 0) {
        const res2: { data: any } = yield call(() =>
          createOrderForQRRegister(price, stateSignUp, orderId),
        );
        if (urlObject) {
          localStorage.setItem("stateSignUp", JSON.stringify({ ...stateSignUp, orderId }));
          urlObject.searchParams.set("orderIdForQR", res2.data.id);
          urlObject.searchParams.set("paymentMethod", "qr");
          window.location.href = urlObject.href;
        }
        return;
      }

      if (!token) {
        yield put(handleChangeField({ paymentStatusForNonSecure: "success" }));
        return;
      }
      const res2: { data: any } = yield call(() =>
        registerCharge(price, stateSignUp, orderId, token),
      );

      const { id, status, redirect_url, transaction_state } = res2.data;
      // non secure
      if (status === "success" && !redirect_url && transaction_state === "Authorized") {
        yield put(handleChangeField({ paymentStatusForNonSecure: status }));
      }

      yield put(handleChangeField({ chargeId: id, redirect_url }));
    }
  } catch (e: any) {
    console.log(e);
    const error = e.response?.status !== 401 ? e.response?.data?.message : "";
    // rejectWithValue(e.response?.status !== 401 ? e.response?.data?.message : "");
    if (error && callbackError) {
      callbackError(error);
    }
  }
}


export function* watcherFetchPostSignup(action: WatcherFetchSignUpType) {
  try {
    const { phoneNumber, phoneCode, requestIdPhone } = yield selectState<SignupState>(getSignup);
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }
    yield put(actionCallAPIPending());
    const response: Promise<any> = yield call(() =>
      axios.post(apiRoute.signup.signUp, action.payload),
    );
    yield put(postOTPFulfilled());
  } catch (e: any) {
    const message = e.response?.data?.message || "";
    yield put(actionSetErrors({ otp: message }));
  }
}

export const fetchGetSponserInfo = (payload: string) => ({
  type: FETCH_GET_SPONSER_INFO,
  payload,
});

export const fetchGetCity = () => ({
  type: FETCH_GET_CITY,
});

export const fetchGetDistrict = (payload: string) => ({
  type: FETCH_GET_DISTRICT,
  payload,
});

export const fetchGetSubDistrict = (payload: string) => ({
  type: FETCH_GET_SUB_DISTRICT,
  payload,
});

export const fetchGetBank = () => ({
  type: FETCH_GET_BANK,
});

export const fetchPostPhoneNumber = () => ({
  type: FETCH_POST_PHONE_NUMBER_SIGNUP,
});

export const fetchPostOtpSignup = (payload: string) => ({
  type: FETCH_POST_OTP_SIGNUP,
  payload,
});

export const fetchPostVerifyIDCard = () => ({
  type: FETCH_POST_VERIFY_ID_CARD,
});

export const fetchPostPaymentSignup = (payload: PaymentSignUpPayload) => ({
  type: FETCH_POST_PAYMENT_SIGN_UP,
  payload,
});

export const fetchSignup = (payload: PayloadSignUp) => (
  {
    type: FETCH_POST_SIGN_UP,
    payload,
  });
