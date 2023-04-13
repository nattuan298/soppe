import { put } from "redux-saga/effects";
import {
  FETCH_POST_SEND_OTP,
  FETCH_POST_VERIFY_OTP,
  VerifyOtpPayload,
  WatcherFetchPostOTPType,
  WatcherFetchPostVerifyOtp,
} from "./password-recovery.type";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { AuthenticationAdmin } from "src/types/authentication.model";
import { sendOtpFulfilled, sendOtpPending, sendOtpRejected } from "./password-recovery-1.slice";
import {
  verifyOtpFulfilled,
  verifyOtpPending,
  verifyOtpRejected,
} from "./password-recovery-2.slice";

const sendOtp = async (email: string | null) => {
  const response = (await authorizedRequest.post(`${config.apiBaseUrl}/auth/admin/sendOtp`, {
    email,
  })) as AuthenticationAdmin;
  return response;
};

export const verifyOtp = async ({ email, code }: VerifyOtpPayload) => {
  const response = (await authorizedRequest.post(`${config.apiBaseUrl}/auth/admin/verifyOtp`, {
    email,
    code,
  })) as AuthenticationAdmin;
  return response;
};

export function* watcherFetchPostOTP(action: WatcherFetchPostOTPType) {
  try {
    const { payload } = action;
    yield put(sendOtpPending());
    const res: AuthenticationAdmin = yield sendOtp(payload);
    yield put(sendOtpFulfilled(res));
  } catch (error) {
    yield put(sendOtpRejected());
  }
}

export function* watcherFetchPostVerifyOtp(action: WatcherFetchPostVerifyOtp) {
  try {
    yield put(verifyOtpPending());
    const { payload } = action;
    const res: AuthenticationAdmin = yield verifyOtp(payload);
    yield put(verifyOtpFulfilled(res));
  } catch (error) {
    yield put(verifyOtpRejected());
  }
}

export const fetchPostSendOPT = (payload: string | null) => ({
  type: FETCH_POST_SEND_OTP,
  payload,
});

export const fetchPostVerifyOTP = (payload: VerifyOtpPayload) => ({
  type: FETCH_POST_VERIFY_OTP,
  payload,
});
