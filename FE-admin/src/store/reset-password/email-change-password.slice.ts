import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface emailType {
  email: string;
}
interface verifyTokenType {
  verifyToken: string;
}

const initialStateEmail: emailType = {
  email: "",
};

const initialStateToken: verifyTokenType = {
  verifyToken: "",
};

export const emailChangePasswordSlice = createSlice({
  name: "emailChangePassword",
  initialState: initialStateEmail,
  reducers: {
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    deleteEmail: (state) => {
      state.email = "";
    },
  },
});

export const verifyTokenSlice = createSlice({
  name: "verifyToken",
  initialState: initialStateToken,
  reducers: {
    verifyToken: (state, action: PayloadAction<string>) => {
      state.verifyToken = action.payload;
    },
    deleteVerifyToken: (state) => {
      state.verifyToken = "";
    },
  },
});

export const { changeEmail, deleteEmail } = emailChangePasswordSlice.actions;
export const { verifyToken, deleteVerifyToken } = verifyTokenSlice.actions;
