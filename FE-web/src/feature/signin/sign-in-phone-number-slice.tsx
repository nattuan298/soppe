import { createAction, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "src/state/store";
// import { apiRoute } from "src/constants/apiRoutes";
// import publicIp from "public-ip";

const initialState: SigninState & { errors: ErrorsType } = {
  showOtp: false,
  otp: "",
  phoneCode: "66",
  phoneNumber: "",
  requestId: "",
  payload: {
    data: {},
  },
  errors: {},
};
export interface SigninState {
  showOtp: boolean;
  otp: string;
  phoneCode: string;
  phoneNumber: string;
  requestId: string;
  payload: payloadState;
}
export interface ErrorsType {
  [key: string]: string | undefined;
}
export interface payloadState {
  status?: number;
  statusCode?: number;
  message?: string;
  data: { accessToken?: string; refreshToken?: string; statusCode?: number; message?: string };
}
export const handleChangeField = createAction<Partial<SigninState>>("signup/handleChangeField");
// const actionCallAPIPending = createAction("signin/actionCallAPIPending");
export const actionSetErrors = createAction<Partial<ErrorsType>>("signup/actionSetErrors");

// export const actionResetState = createAsyncThunk("signup/resetStatePhoneNumver", () => true);

// export const postNumberPhone = createAsyncThunk("sms/postPhoneNumber", async (_, thunkAPI) => {
//   try {
//     const state = thunkAPI.getState() as RootState;
//     const { phoneNumber, phoneCode } = state.signinPhoneNumber;
//     let newPhoneNumber = phoneNumber;
//     if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
//       newPhoneNumber = phoneNumber.slice(1);
//     }
//     thunkAPI.dispatch(actionCallAPIPending());
//     const response = await axios.post(apiRoute.signIn.PHONENUMBER, {
//       phoneNumber: newPhoneNumber,
//       phoneCode,
//     });
//     return response;
//   } catch (e) {
//     const message = e.response?.data?.message || "";
//     thunkAPI.dispatch(actionSetErrors({ phoneNumber: message }));
//     throw e;
//   }
// });

// export const signInOtp = createAsyncThunk(
//   "sms/verifyOtp",
//   async ({ code, OSName }: { code: string; OSName: string }, thunkAPI) => {
//     const state = thunkAPI.getState() as RootState;
//     const { phoneNumber, phoneCode, requestId } = state.signinPhoneNumber;
//     const ip = await publicIp.v4();
//     try {
//       let newPhoneNumber = phoneNumber;
//       if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
//         newPhoneNumber = phoneNumber.slice(1);
//       }
//       thunkAPI.dispatch(actionCallAPIPending());
//       const response = await axios.post(apiRoute.signIn.SENDOTP, {
//         code,
//         phoneNumber: newPhoneNumber,
//         requestId,
//         phoneCode,
//         OS: OSName,
//         IP: ip,
//         channel: "WebApp",
//       });
//       return response;
//     } catch (e) {
//       const message = e.response?.data?.message || "";
//       thunkAPI.dispatch(actionSetErrors({ otp: message }));
//       throw e;
//     }
//   },
// );

export const signInPhoneNumberSlice = createSlice({
  name: "signInPhoneNumber",
  initialState,
  reducers: {
    postNumberPhoneFulfilled: (state, { payload }) => {
      return {
        ...state,
        showOtp: true,
        requestId: payload,
      };
    },
    signInOtpFulfilled: (state, { payload }) => {
      return { ...state, payload };
    },
    actionResetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(postNumberPhone.fulfilled, (state, { payload }) => {
      //   return {
      //     ...state,
      //     showOtp: true,
      //     requestId: payload.data,
      //   };
      // })
      .addCase(handleChangeField, (state, action) => {
        return { ...state, ...action.payload };
      })
      // .addCase(signInOtp.fulfilled, (state, { payload }) => {
      //   return { ...state, payload };
      // })
      .addCase(actionSetErrors, (state, { payload }) => {
        return { ...state, errors: { ...state.errors, ...payload } };
      });
    // .addCase(actionResetState.fulfilled, () => {
    //   return initialState;
    // });
  },
});

export const { actionResetState, postNumberPhoneFulfilled, signInOtpFulfilled } =
  signInPhoneNumberSlice.actions;
export default signInPhoneNumberSlice.reducer;
