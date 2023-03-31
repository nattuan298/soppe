import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { ErrorsType, SignupState } from "./type";
import { initValueFieldUrl } from "src/constants/app";

const initialState: SignupState & { errors: ErrorsType } = {
  mainStep: 0,
  memberType: "1",
  phoneCode: "66",
  phoneNumber: "",
  email: "",
  showOtpPage: false,
  otp: "",
  prefixName: "Mr",
  firstName: "",
  lastName: "",
  birth: Date(),
  gender: "Male",
  citizenship: "Thai",
  city: { id: "", title: "", titleEng: "" },
  district: { id: "", title: "", titleEng: "" },
  subDistrict: { id: "", title: "", titleEng: "" },
  address: "",
  country: "Thailand",
  postalCode: "",
  isSelectCountry: true,
  childStep4: 0,
  idCardNumber: "",
  bankCode: "",
  bankBranch: "",
  accountNumber: "",
  accountName: "",
  paymentMethod: "QR code",
  cardNumber: "",
  expiredMonth: "",
  expiredYear: "",
  ccv: "",
  sponsor: {
    avatar: "",
    fullName: "",
    sponsorId: "",
    isVerified: false,
  },
  errors: {},
  loadingNextStep: false,
  requestIdPhone: "",
  listCity: [],
  listDistrict: undefined,
  litSubDistrict: undefined,
  listBank: [],
  idCartPhoto: initValueFieldUrl,
  beneficiaryPhoto: initValueFieldUrl,
  bank_photo: initValueFieldUrl,
  relationship_certificate: initValueFieldUrl,
  upload_payment_evidence: "",
  isEdit: false,
  prePhoneNumber: "",
  preCountry: "",
  preCitizen: "",
  loadingAddress: false,
  orderId: "",
  chargeId: "",
  side: "A",
  paymentStatusForNonSecure: "",
  redirect_url: "",
  coupon: "",
  couponDraft: "",
  couponRedeemAmount: 0,
  orderIdForQR: "",
  isRemarked: false,
};

export const handleChangeField = createAction<Partial<SignupState>>("signup/handleChangeField");

export const actionSetErrors = createAction<Partial<ErrorsType>>("signup/actionSetErrors");
export const actionCallAPIPending = createAction("signup/actionCallAPIPending");
export const resetState = createAction("signup/resetState");
export const actionGetDataFromLocalStore = createAction<SignupState & { errors: ErrorsType }>(
  "signup/actionGetDataFromLocalStore",
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clickNext: (state) => {
      if (state.mainStep === 2 && state.isSelectCountry) {
        state.isSelectCountry = false;
      } else if (state.mainStep === 3 && state.childStep4 < 2) {
        state.childStep4 += 1;
      } else {
        state.mainStep += 1;
      }
    },
    clickBack: (state) => {
      if (state.mainStep === 0 && state.showOtpPage) {
        state.showOtpPage = false;
      } else if (state.mainStep === 2 && !state.isSelectCountry) {
        state.isSelectCountry = true;
        state.preCountry = state.country;
      } else if (state.mainStep === 3 && state.childStep4 > 0) {
        state.childStep4 -= 1;
      } else {
        if (state.mainStep === 2 && !state.isSelectCountry) {
          state.preCitizen = state.citizenship;
        }
        state.mainStep -= 1;
      }
    },
    backToStep: (state, action: PayloadAction<{ mainStep: number; childStep?: number }>) => {
      state.isEdit = true;
      const { mainStep, childStep } = action.payload;
      if (mainStep === 0) {
        state.prePhoneNumber = state.phoneNumber;
        state.preCitizen = state.citizenship;
        state.preCountry = state.country;
        state.showOtpPage = false;
        state.isSelectCountry = true;
        state.childStep4 = 0;
      }
      if (mainStep === 1) {
        state.preCitizen = state.citizenship;
        state.preCountry = state.country;
        state.isSelectCountry = true;
        state.childStep4 = 0;
      }
      if (mainStep === 2) {
        state.preCountry = state.country;
        state.isSelectCountry = true;
        state.childStep4 = 0;
      }
      if (mainStep === 3 && childStep !== undefined) {
        state.childStep4 = childStep;
      }
      state.mainStep = mainStep;
    },
    clearDataWhenChangeCountry: (state) => {
      state.city = { id: "", title: "", titleEng: "" };
      state.district = { id: "", title: "", titleEng: "" };
      state.subDistrict = { id: "", title: "", titleEng: "" };
      state.address = "";
      state.bankCode = "";
      state.bankBranch = "";
      state.accountNumber = "";
      state.accountName = "";
    },
    clearDataWhenCityzenChange: (state) => {
      state.idCardNumber = "";
      state.idCartPhoto = initValueFieldUrl;
      state.beneficiaryPhoto = initValueFieldUrl;
      state.bank_photo = initValueFieldUrl;
      state.relationship_certificate = initValueFieldUrl;
    },
    skipPhoneNumber: (state) => {
      state.mainStep = 1;
      state.showOtpPage = false;
      state.loadingNextStep = false;
    },
    getSponserInforFulfilled: (state, { payload }) => {
      return { ...state, sponsor: payload.data };
    },
    getCityPending: (state) => ({
      ...state,
      city: { id: "", title: "", titleEng: "" },
      district: { id: "", title: "", titleEng: "" },
      subDistrict: { id: "", title: "", titleEng: "" },
      listCity: [],
    }),
    getCityFulfilled: (state, { payload }) => {
      return { ...state, listCity: payload.data, isSelectCountry: false, loadingNextStep: false };
    },
    getDistrictPending: (state) => ({
      ...state,
      district: { id: "", title: "", titleEng: "" },
      subDistrict: { id: "", title: "", titleEng: "" },
      listDistrict: undefined,
      loadingAddress: true,
    }),
    getDistrictFulfilled: (state, { payload }) => {
      return { ...state, listDistrict: payload.data, loadingAddress: false };
    },
    getSubDistrictPending: (state) => ({
      ...state,
      subDistrict: { id: "", title: "", titleEng: "" },
      litSubDistrict: undefined,
      loadingAddress: true,
    }),
    getSubDistrictFulfilled: (state, { payload }) => {
      return { ...state, litSubDistrict: payload.data, loadingAddress: false };
    },
    getBankFulfilled: (state, { payload }) => {
      return { ...state, listBank: payload.data };
    },
    postphoneNumberFulfilled: (state, { payload }) => {
      return {
        ...state,
        // showOtpPage: true,
        mainStep: 1,
        showOtpPage: false,
        loadingNextStep: false,
        requestIdPhone: payload.data,
      };
    },
    postOTPFulfilled: (state) => {
      return { ...state, mainStep: 1, loadingNextStep: false };
    },
    verifyIdCardFulfilled: (state) => {
      return { ...state, childStep4: 1, loadingNextStep: false };
    },
    postSignupfulfilled: (state) => {
      return { ...state, loadingNextStep: false, mainStep: 6 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleChangeField, (state, action) => {
        const errors: ErrorsType = {};
        Object.keys(action.payload).forEach((key) => {
          errors[key] = "";
        });
        return { ...state, ...action.payload, errors };
      })
      .addCase(actionSetErrors, (state, { payload }) => {
        return { ...state, loadingNextStep: false, errors: { ...state.errors, ...payload } };
      })
      .addCase(actionGetDataFromLocalStore, (_, { payload }) => {
        return payload;
      })
      // .addCase(getSponserInfor.fulfilled, (state, { payload }) => {
      //   return { ...state, sponsor: payload.data };
      // })
      .addCase(actionCallAPIPending, (state) => {
        return { ...state, loadingNextStep: true };
      })

      .addCase(resetState, () => {
        return initialState;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clickNext,
  backToStep,
  clickBack,
  skipPhoneNumber,
  clearDataWhenChangeCountry,
  clearDataWhenCityzenChange,
  getSponserInforFulfilled,
  getCityFulfilled,
  getCityPending,
  getDistrictFulfilled,
  getDistrictPending,
  getSubDistrictFulfilled,
  getSubDistrictPending,
  getBankFulfilled,
  postphoneNumberFulfilled,
  postOTPFulfilled,
  verifyIdCardFulfilled,
  postSignupfulfilled,
} = counterSlice.actions;

export default counterSlice.reducer;
