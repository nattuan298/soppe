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
    jwtAccessToken: string;
    refreshToken: string;
    statusCode: number;
    message: string;
    data: {
      jwtAccessToken: string;
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
    jwtAccessToken: "",
    refreshToken: "",
    statusCode: 0,
    message: "",
    data: {
      jwtAccessToken: cookies.get("jwtToken") as string,
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


const ConfigAxios = axios.create({ ...getHeaderConfig() });
export default ConfigAxios;


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
        jwtAccessToken: "",
        refreshToken: "",
        statusCode: 0,
        message: "",
        data: {
          jwtAccessToken: "",
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

      if (!getStr(payload, "data.jwtAccessToken", "")) {
        state.payload.data.jwtAccessToken = "default";
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
      console.log(payload);
      if (!getStr(payload, "data.jwtAccessToken", "")) {
        state.payload.data.jwtAccessToken = "default";
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
