export interface SigninPayloadType {
  userID: string;
  password: string;
  OSName: string;
}

export interface Signin2FAPayloadType {
  code: string;
  OSName: string;
}

export interface SigninFacebookPayloadType {
  accessToken: string;
  OSName: string;
}

export interface SignInPhonePayload {
  phoneNumber: string;
  phoneCode: string;
}
export interface SignInPhoneOTPPayload {
  phoneNumber: string;
  phoneCode: string;
  requestId: string;
  code: string;
  OS: string;
}
export interface WatcherSigninFacebookType {
  type: string;
  payload: SigninFacebookPayloadType;
}

export const SIGNIN_ACTION = "SIGNIN_ACTION";
export const FETCH_SIGNIN_2FA = "user/login2FA";
export const FETCH_SIGNIN_FACEBOOK = "users/signin-facebook";

export type FetchSigninAction = {
  type: string;
  payload: SigninPayloadType;
};

export interface WatcherSignin2FAType {
  type: string;
  payload: Signin2FAPayloadType;
}

export const FETCH_POST_PHONE_NUMBER = "sms/signin-phone/postPhoneNumber";
export const FETCH_SIGNIN_PHONE_IN_OTP = "sms/signin-phone/verifyOtp";
