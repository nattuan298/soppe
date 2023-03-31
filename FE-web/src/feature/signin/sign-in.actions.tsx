/* eslint-disable @typescript-eslint/no-explicit-any */
import publicIp from "public-ip";
import { SelectEffect, call, put, select } from "redux-saga/effects";
import { Cookies } from "react-cookie";

import { RootState } from "src/state/store";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import {
  FETCH_POST_PHONE_NUMBER,
  FETCH_SIGNIN_2FA,
  FETCH_SIGNIN_FACEBOOK,
  FETCH_SIGNIN_PHONE_IN_OTP,
  FetchSigninAction,
  SIGNIN_ACTION,
  SignInPhoneOTPPayload,
  SignInPhonePayload,
  Signin2FAPayloadType,
  SigninFacebookPayloadType,
  SigninPayloadType,
  WatcherSignin2FAType,
  WatcherSigninFacebookType,
} from "./sign-in.type";

import {
  signInFacebookFulfilled,
  signInFacebookPending,
  signInFacebookRejected,
} from "./sign-in-facebook-slice";

import {
  SigninState,
  actionSetErrors,
  postNumberPhoneFulfilled,
  signInOtpFulfilled,
} from "./sign-in-phone-number-slice";

import ConfigAxios, {
  login2FAFulfilled,
  login2FAPending,
  login2FARejected,
  loginUserFulfilled,
  loginUserPending,
  loginUserRejected,
} from "./sign-in-slice";

export const loginUser = async ({
  userID,
  password,
  OSName,
}: {
  userID: string;
  password: string;
  OSName: string;
}) => {
  /* @ts-ignore */
  const ip = await publicIp.v4();
  const bodyRequest = {
    memberId: userID?.trim(),
    password,
    OS: OSName,
    IP: ip,
    channel: "WebApp",
  };
  try {
    const response = await axiosCutome.post(`${apiRoute.signIn.MEMBER_ID}`, bodyRequest);
    const data = await response;
    if (response.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  } catch (e: any) {
    return Promise.reject(e?.response.data);
  }
};

const login2FA = async ({ code, OSName }: Signin2FAPayloadType) => {
  const cookies = new Cookies();
  /* @ts-ignore */
  const ip = await publicIp.v4();
  if (cookies.get("jwtToken")) {
    ConfigAxios.defaults.headers.common.Authorization = `Bearer ${cookies.get("jwtToken")}`;
  }
  try {
    const response = await ConfigAxios.post(`${apiRoute.signIn.TWOFA}`, {
      twoFactorAuthenticationCode: code,
      OS: OSName,
      IP: ip,
      channel: "WebApp",
    });
    const data = await response;
    if (data.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
};

const signInFacebook = async ({ accessToken, OSName }: SigninFacebookPayloadType) => {
  /* @ts-ignore */
  const ip = await publicIp.v4();
  try {
    const response = await axiosCutome.post(`${apiRoute.signIn.FACEBOOK}`, {
      accessToken,
      channel: "WebApp",
      IP: ip,
      OS: OSName,
    });
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return Promise.reject(e.response.data);
  }
};

const postNumberPhone = async ({ phoneNumber, phoneCode }: SignInPhonePayload) => {
  try {
    const response = await axiosCutome.post(apiRoute.signIn.PHONENUMBER, {
      phoneNumber,
      phoneCode,
    });
    return Promise.resolve(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return Promise.reject(e);
  }
};

const signInNumberPhoneOTP = async ({
  phoneNumber,
  phoneCode,
  requestId,
  code,
  OS,
}: SignInPhoneOTPPayload) => {
  try {
    /* @ts-ignore */
    const ip = await publicIp.v4();
    const response = await axiosCutome.post(apiRoute.signIn.SENDOTP, {
      code,
      phoneNumber,
      requestId,
      phoneCode,
      OS,
      IP: ip,
      channel: "WebApp",
    });
    return Promise.resolve(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return Promise.reject(e);
  }
};

export function* watcherSigninAction(action: FetchSigninAction) {
  try {
    yield put(loginUserPending());
    const { userID, password, OSName } = action.payload;
    const response: Promise<any> = yield call(() => loginUser({ userID, password, OSName }));
    yield put(loginUserFulfilled(response));
  } catch (error) {
    yield put(loginUserRejected(error));
  }
}

export function* watcherFetchSignin2FA(action: WatcherSignin2FAType) {
  try {
    yield put(login2FAPending());
    const { payload } = action;
    const response: Promise<any> = yield call(() => login2FA(payload));
    yield put(login2FAFulfilled(response));
  } catch (error) {
    yield put(login2FARejected(error));
  }
}

export function* watcherFetchSigninFacebook(action: WatcherSigninFacebookType) {
  try {
    yield put(signInFacebookPending());
    const { payload } = action;
    const response: Promise<any> = yield signInFacebook(payload);
    yield put(signInFacebookFulfilled(response));
  } catch (error) {
    yield put(signInFacebookRejected(error));
  }
}
function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

const getSigninPhoneNumberState = (state: RootState) => state.signinPhoneNumber;

export function* watcherFetchPostPhoneNumber() {
  try {
    const { phoneNumber, phoneCode } = yield selectState<SigninState>(getSigninPhoneNumberState);
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }
    const response: Promise<any> = yield postNumberPhone({
      phoneCode,
      phoneNumber: newPhoneNumber,
    });
    yield put(postNumberPhoneFulfilled(response));
  } catch (error: any) {
    const { message } = error.response?.data;
    yield put(actionSetErrors({ phoneNumber: message }));
  }
}

export function* watcherFetchSigninPhoneInOTP(action: WatcherSignin2FAType) {
  try {
    const { phoneNumber, phoneCode, requestId } = yield selectState<SigninState>(
      getSigninPhoneNumberState,
    );
    const { payload } = action;
    const { OSName, code } = payload;
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }
    const response: Promise<any> = yield signInNumberPhoneOTP({
      phoneCode,
      phoneNumber: newPhoneNumber,
      requestId,
      OS: OSName,
      code,
    });
    yield put(signInOtpFulfilled(response));
  } catch (error: any) {
    const { message } = error.response?.data;
    yield put(actionSetErrors({ otp: message }));
  }
}

export const signinAction = (payload: SigninPayloadType) => ({ type: SIGNIN_ACTION, payload });

export const fetchSignin2FA = (payload: Signin2FAPayloadType) => ({
  type: FETCH_SIGNIN_2FA,
  payload,
});

export const fetchSigninFacebook = (payload: SigninFacebookPayloadType) => ({
  type: FETCH_SIGNIN_FACEBOOK,
  payload,
});

export const fetchPostPhoneNumber = () => ({
  type: FETCH_POST_PHONE_NUMBER,
});

export const fetchSigninPhoneOTP = (payload: Signin2FAPayloadType) => ({
  type: FETCH_SIGNIN_PHONE_IN_OTP,
  payload,
});
