import { createSlice } from "@reduxjs/toolkit";
// import { config } from "src/constants/config";
// import { authorizedRequest } from "src/lib/request";
import { AuthenticationAdmin } from "src/types/authentication.model";
// import publicIp from "public-ip";

// let OSName = "Unknown OS";

// if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
// if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "MacOS";
// if (navigator.userAgent.indexOf("X11") !== -1) OSName = "UNIX";
// if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";

// const login = createAsyncThunk(
//   "authentication/getToken",
//   async ({ username, password }: { username: string; password: string }) => {
//     const ip = await publicIp.v4();
//     const response = (await authorizedRequest.post(`${config.apiBaseUrl}/auth/admin/login`, {
//       username,
//       password,
//       OS: OSName,
//       IP: ip,
//     })) as AuthenticationAdmin;

//     if (response.jwtAccessToken && response.googleAuth === false) {
//       window.location.href = "/admin-dashboard/home";
//       localStorage.setItem("token", JSON.stringify(response));
//     } else if (response.jwtAccessToken && response.googleAuth === true) {
//       window.location.href = "/signin-2fa";
//       localStorage.setItem("tokenGoogleVerify", JSON.stringify(response));
//     }

//     return response;
//   },
// );

const logout = () => {
  window.location.href = "/signin";
  localStorage.removeItem("token");
};

interface InitialStateType {
  loading: boolean;
  authenticationDetail: AuthenticationAdmin;
  statusCode: number;
  status: string;
}

export const authenticationService = {
  logout,
};

const initialState: InitialStateType = {
  loading: true,
  authenticationDetail: {
    jwtAccessToken: "",
    _id: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    googleAuth: false,
    email: "",
    topic: "",
  },
  status: "",
  statusCode: 0,
};

const authenticationSlice = createSlice({
  name: "authentications",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      state.status = action.payload.status;
    },
    loginFulfilled: (state, action) => {
      state.loading = false;
      state.status = "success";

      state.authenticationDetail = action.payload;
      if (action.payload.statusCode === 400) {
        state.statusCode = 400;
      }
    },
  },
  extraReducers: {
    // [login.pending.toString()]: (state) => {
    //   state.loading = true;
    //   state.status = "loading";
    // },
    // [login.fulfilled.toString()]: (state, action: PayloadAction<AuthenticationAdmin>) => {
    //   state.loading = false;
    //   state.status = "success";
    //   state.authenticationDetail = action.payload;
    //   if (action.payload.statusCode === 400) {
    //     state.statusCode = 400;
    //   }
    // },
    // [login.rejected.toString()]: (state) => {
    //   state.loading = false;
    //   state.status = "failed";
    // },
  },
});

export const { setLoading, loginFulfilled } = authenticationSlice.actions;

export default authenticationSlice.reducer;
