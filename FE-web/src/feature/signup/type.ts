import { FieldUrlType } from "src/constants/app";

export interface SignupState {
  mainStep: number;
  memberType: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  showOtpPage: boolean;
  password: string;
  otp: string;
  prefixName: string;
  firstName: string;
  userName:string;
  lastName: string;
  birth: string;
  gender: string;
  avatar:string;
  citizenship: string;
  city: AddresObjectType;
  district: AddresObjectType;
  subDistrict: AddresObjectType;
  address: string;
  country: string;
  postalCode: string;
  isSelectCountry: boolean;
  childStep4: number;
  idCardNumber: string;
  bankCode: string;
  bankBranch: string;
  accountNumber: string;
  accountName: string;
  paymentMethod: string;
  cardNumber: string;
  expiredMonth: string;
  expiredYear: string;
  ccv: string;
  sponsor: {
    avatar: string;
    fullName: string;
    sponsorId: string;
    isVerified: boolean;
  };
  loadingNextStep: boolean;
  requestIdPhone: string;
  listCity: Array<ItemArraySelect>;
  listDistrict?: Array<ItemArraySelect>;
  litSubDistrict?: Array<ItemArraySelect>;
  listBank: Array<{ _id: string; name: string; code: string }>;
  idCartPhoto: FieldUrlType;
  beneficiaryPhoto: FieldUrlType;
  bank_photo: FieldUrlType;
  relationship_certificate: FieldUrlType;
  upload_payment_evidence: string;
  isEdit: boolean;
  prePhoneNumber: string;
  preCountry: string;
  preCitizen: string;
  loadingAddress: boolean;
  orderId: string;
  chargeId: string;
  side: string;
  paymentStatusForNonSecure: string;
  redirect_url: string;
  coupon: string;
  couponDraft: string;
  couponRedeemAmount: number;
  orderIdForQR: string;
  isRemarked: boolean;
}

export interface ErrorsType {
  [key: string]: string | undefined;
}

export interface ItemArraySelect {
  _id: string;
  name: string;
  nameEng: string;
  code?: string;
}

export interface AddresObjectType {
  id: string;
  title: string;
  titleEng: string;
}

export interface BodyPost {
  sponsorId: string;
  phoneNumber: string;
  phoneCode: string;
  prefixName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  postalCode: string;
  province: string;
  district?: string;
  subDistrict?: string;
  address: string;
  idCard?: string;
  passportNumber?: string;
  bankCode: string;
  bankBranch: string;
  accountNumber: string;
  accountName: string;
  citizenship: string;
  email?: string;
  images: Array<{
    type: string;
    key: string;
  }>;
  referenceOrder: string;
  memberType: number;
  side: string;
  couponCode: string;
  provinceEng: string;
  districtEng?: string;
  subDistrictEng?: string;
  isRemarked: boolean;
}

export const FETCH_GET_SPONSER_INFO = "members/sponser";
export const FETCH_GET_CITY = "signup/getCity";
export const FETCH_GET_DISTRICT = "signup/getDistrict";
export const FETCH_GET_SUB_DISTRICT = "signup/getSubDistrict";
export const FETCH_GET_BANK = "signup/getBank";
export const FETCH_POST_PHONE_NUMBER_SIGNUP = "signup/sms/sendOtp";
export const FETCH_POST_OTP_SIGNUP = "sms/verifyOtp";
export const FETCH_POST_VERIFY_ID_CARD = "signup/verifyIdCard";
export const FETCH_POST_PAYMENT_SIGN_UP = "signup/paymentSignUp";
export const FETCH_POST_SIGN_UP = "signup/signUp";
export interface WatcherFetchGetSponserInfo {
  type: string;
  payload: string;
}

export interface WatcherFetchGetDistrict {
  type: string;
  payload: string;
}

export interface WatcherFetchGetSubDistrict {
  type: string;
  payload: string;
}

export interface WatcherFetchPostOTPSignup {
  type: string;
  payload: string;
}

export interface SignupPhonePayload {
  phoneNumber: string;
  phoneCode: string;
}

export interface PaymentSignUpPayload {
  token?: string;
  data: SignupState;
  callbackError: (message: string) => void;
  urlObject?: URL;
}

export interface WatcherFetchPaymentSignUpType {
  type: string;
  payload: PaymentSignUpPayload;
}
export interface WatcherFetchSignUpType {
  type: string;
  payload: PayloadSignUp;
}

export interface PayloadSignUp {
  avatar: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  email: string,
  phoneNumber: string,
  gender: string,
  dateOfBirth: string,
}
