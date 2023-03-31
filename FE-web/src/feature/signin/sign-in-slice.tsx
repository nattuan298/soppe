import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { getStr } from "src/utils";
// import axiosCutome from "src/lib/client/request";
import axios from "axios";
// import publicIp from "public-ip";
import { getHeaderConfig, updateToken } from "src/lib/common.lib";

const cookies = new Cookies();

export interface SigninType {
  payload: {
    accessToken: string;
    refreshToken: string;
    statusCode: number;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
      memberType: number;
      firstName: string;
      lastName: string;
      prefixName: string;
      googleAuth: boolean;
    };
  };
  status: string;
  status2fa: string;
  errorMessage: string;
  tokenVerifyCode: string;
}
const initialState: SigninType = {
  payload: {
    accessToken: "",
    refreshToken: "",
    statusCode: 0,
    message: "",
    data: {
      accessToken: cookies.get("token") as string,
      refreshToken: cookies.get("refreshToken") as string,
      memberType: 0,
      firstName: "",
      lastName: "",
      prefixName: "",
      googleAuth: false,
    },
  },
  status: "",
  status2fa: "",
  errorMessage: "",
  tokenVerifyCode: "",
};

// export const loginUser = createAsyncThunk(
//   "users/login",
//   async (
//     { userID, password, OSName }: { userID: string; password: string; OSName: string },
//     thunkAPI,
//   ) => {
//     const ip = await publicIp.v4();
//     const bodyRequest = {
//       memberId: userID?.trim(),
//       password,
//       OS: OSName,
//       IP: ip,
//       channel: "WebApp",
//     };
//     try {
//       const response = await axiosCutome.post(`${apiRoute.signIn.MEMBER_ID}`, bodyRequest);
//       const data = await response;
//       if (response.status === 200) {
//         return data;
//       }
//       return thunkAPI.rejectWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   },
// );
const ConfigAxios = axios.create({ ...getHeaderConfig() });
export default ConfigAxios;

// export const login2FA = createAsyncThunk(
//   "user/login2FA",
//   async ({ code, OSName }: { code: string; OSName: string }, thunkAPI) => {
//     const ip = await publicIp.v4();
//     if (cookies.get("jwtToken")) {
//       ConfigAxios.defaults.headers.common.Authorization = `Bearer ${cookies.get("jwtToken")}`;
//     }
//     try {
//       const response = await ConfigAxios.post(`${apiRoute.signIn.TWOFA}`, {
//         twoFactorAuthenticationCode: code,
//         OS: OSName,
//         IP: ip,
//         channel: "WebApp",
//       });
//       const data = await response;
//       if (data.status === 200) {
//         return data;
//       }
//       return thunkAPI.rejectWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

export const signInSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenVerify: (state) => {
      if (state.payload.data.googleAuth) {
        state.tokenVerifyCode = cookies.get("tokenVerify");
      }
    },
    resetSignin: (state) => {
      state.payload = {
        accessToken: "",
        refreshToken: "",
        statusCode: 0,
        message: "",
        data: {
          accessToken: "",
          refreshToken: "",
          memberType: 0,
          firstName: "",
          lastName: "",
          prefixName: "",
          googleAuth: false,
        },
      };
      state.status = "";
      state.status2fa = "";
      state.errorMessage = "";
      state.tokenVerifyCode = "";
    },
    loginUserPending: (state) => {
      state.status = "loading";
      return state;
    },
    loginUserFulfilled: (state, { payload }) => {
      state.payload = payload;
      if (!getStr(payload, "data.accessToken", "")) {
        state.payload.data.accessToken = "default";
      }
      cookies.remove("LocationBase");
      state.status = "success";
      return state;
    },
    loginUserRejected: (state, { payload }) => {
      state.status = "failed";
      state.payload = payload;
      return state;
    },
    login2FAPending: (state) => {
      state.status2fa = "loading";
    },
    login2FAFulfilled: (state, { payload }) => {
      const token = getStr(payload, "data.accessToken", "default");
      const refreshToken = getStr(payload, "data.refreshToken", "default");
      state.payload = payload;
      if (!getStr(payload, "data.accessToken", "")) {
        state.payload.data.accessToken = "default";
      }
      cookies.remove("LocationBase");
      cookies.set("member", payload.data);
      updateToken(token, refreshToken);
      state.status2fa = "success";
      return state;
    },
    login2FARejected: (state, { payload }) => {
      state.status2fa = "failed";
      state.payload = payload;
      return state;
    },
  },
  extraReducers: {},
});

export const {
  loginUserPending,
  loginUserFulfilled,
  loginUserRejected,
  setTokenVerify,
  resetSignin,
  login2FAFulfilled,
  login2FAPending,
  login2FARejected,
} = signInSlice.actions;
