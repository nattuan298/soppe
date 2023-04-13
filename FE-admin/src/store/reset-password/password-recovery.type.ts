export const FETCH_POST_SEND_OTP = "authentication/sendOtp";
export const FETCH_POST_VERIFY_OTP = "authentication/verifyOtp";

export interface WatcherFetchPostOTPType {
  payload: string | null;
  type: string;
}

export interface VerifyOtpPayload {
  email?: string | null;
  code: string;
}

export interface WatcherFetchPostVerifyOtp {
  payload: VerifyOtpPayload;
  type: string;
}
