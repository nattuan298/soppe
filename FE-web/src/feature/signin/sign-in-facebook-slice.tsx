import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export interface SigninType {
  payload: {
    accessToken: string;
    statusCode: number;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
  status: string;
  errorMessage: string;
}

// export const signInFacebook = createAsyncThunk(
//   "users/signin-facebook",
//   async ({ accessToken, OSName }: { accessToken: string; OSName: string }, thunkAPI) => {
//     const ip = await publicIp.v4();
//     try {
//       const response = await axios.post(`${apiRoute.signIn.FACEBOOK}`, {
//         accessToken,
//         channel: "WebApp",
//         IP: ip,
//         OS: OSName,
//       });
//       if (response.status === 200) {
//         return response;
//       }
//       return thunkAPI.rejectWithValue(response);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   },
// );

// export const actionResetState = createAsyncThunk("signup/resetStateFace", () => true);

export const signInFacebookSlice = createSlice({
  name: "user",
  initialState: {
    payload: "",
    status: "",
    errorMessage: "",
  },
  reducers: {
    resetOrder: (state) => {
      state.payload = "";
      state.status = "";
      state.errorMessage = "";
    },
    signInFacebookPending: (state) => {
      state.status = "loading";
    },
    signInFacebookFulfilled: (state, { payload }) => {
      state.payload = payload;
      cookies.remove("LocationBase");
      state.status = "success";
      return state;
    },
    signInFacebookRejected: (state, { payload }) => {
      state.status = "failed";
      state.errorMessage = payload.message;
      return state;
    },
    actionResetState: () => {
      return {
        payload: "",
        status: "",
        errorMessage: "",
      };
    },
  },
  extraReducers: {
    // [signInFacebook.pending.toString()]: (state) => {
    //   state.status = "loading";
    // },
    // [signInFacebook.fulfilled.toString()]: (state, { payload }) => {
    //   state.payload = payload;
    //   cookies.remove("LocationBase");
    //   state.status = "success";
    //   return state;
    // },
    // [signInFacebook.rejected.toString()]: (state, { payload }) => {
    //   state.status = "failed";
    //   state.errorMessage = payload.message;
    //   return state;
    // },
    // [actionResetState.fulfilled.toString()]: () => {
    //   return {
    //     payload: "",
    //     status: "",
    //     errorMessage: "",
    //   };
    // },
  },
});
export const {
  resetOrder,
  actionResetState,
  signInFacebookFulfilled,
  signInFacebookPending,
  signInFacebookRejected,
} = signInFacebookSlice.actions;
