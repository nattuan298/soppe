import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

// export const getSecurityState = createAsyncThunk("security/security-state", async () => {
//   const response = await axios.get(`${apiRoute.security.getState}`);
//   return response.data;
// });

// export const generateSecurity2FA = createAsyncThunk(
//   "security/security-generate-security",
//   async () => {
//     const response = await axios.post(`${apiRoute.security.generateSecurity}`);
//     return response.data;
//   },
// );

export const turnOnSecurityGoogle = async (twoFactorAuthenticationCode: string) => {
  const response = await axios.put(`${apiRoute.security.turnOnSecurity}`, {
    twoFactorAuthenticationCode,
  });
  return response;
};

export const turnOffSecurityGoogle = async (twoFactorAuthenticationCode: string) => {
  const response = await axios.put(`${apiRoute.security.turnOffSecurity}`, {
    twoFactorAuthenticationCode,
  });
  return response;
};

export interface SecurityState {
  googleAuth: boolean;
  _id?: string;
}

export interface SecurityCodeGenerate {
  qrcode: string;
  secret: string;
}

interface InitialStateType {
  securityState: SecurityState;
  loading: boolean;
  securityCode: SecurityCodeGenerate | null;
  loadingsecurityCode: boolean;
  isHidenContent: boolean;
}

const initialState: InitialStateType = {
  securityState: { googleAuth: false },
  securityCode: null,
  loading: true,
  loadingsecurityCode: true,
  isHidenContent: true,
};

export const SecuritySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setHidenContent: (state, action: PayloadAction<boolean>) => {
      state.isHidenContent = action.payload;
    },
    securityStatePending: (state) => {
      state.loading = true;
    },
    securityStateFulfilled: (state, action) => {
      state.loading = false;
      state.securityState = action.payload;
    },
    securityStateRejected: (state) => {
      state.loading = false;
    },
    generateSecurity2FAPending: (state) => {
      state.loadingsecurityCode = true;
    },
    generateSecurity2FAFulfilled: (state, action) => {
      state.loadingsecurityCode = false;
      state.securityCode = action.payload;
    },
    generateSecurity2FARejected: (state) => {
      state.loadingsecurityCode = false;
    },
  },
  extraReducers: {
    // [getSecurityState.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getSecurityState.fulfilled.toString()]: (state, action: PayloadAction<SecurityState>) => {
    //   state.loading = false;
    //   state.securityState = action.payload;
    // },
    // [getSecurityState.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [generateSecurity2FA.pending.toString()]: (state) => {
    //   state.loadingsecurityCode = true;
    // },
    // [generateSecurity2FA.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<SecurityCodeGenerate>,
    // ) => {
    //   state.loadingsecurityCode = false;
    //   state.securityCode = action.payload;
    // },
    // [generateSecurity2FA.rejected.toString()]: (state) => {
    //   state.loadingsecurityCode = false;
    // },
  },
});

export const {
  setHidenContent,
  securityStateFulfilled,
  securityStatePending,
  securityStateRejected,
  generateSecurity2FAFulfilled,
  generateSecurity2FAPending,
  generateSecurity2FARejected,
} = SecuritySlice.actions;

export default SecuritySlice.reducer;
