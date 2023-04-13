import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "src/constants/config";
import axios from "axios";
import { notifyToast } from "src/constants/toast";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

export const ResetPassword = createAsyncThunk(
  "authentication/resetPassword",
  async ({
    email,
    password,
    token,
  }: {
    email?: string;
    password: string;
    token: string | null;
  }) => {
    const configs = {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    };
    axios
      .put(
        `${config.apiBaseUrl}/auth/admin/resetPassword`,
        {
          email,
          password,
        },
        configs,
      )
      .then((response) => {
        return response;
      })
      .catch();
  },
);

interface InitialStateType {
  loading: string;
  statusCode: number | undefined;
  status: string;
}

const initialState: InitialStateType = {
  loading: "",
  statusCode: 0,
  status: "",
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    deleteStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [ResetPassword.pending.toString()]: (state) => {
      state.loading = "loading";
    },
    [ResetPassword.fulfilled.toString()]: (state, action) => {
      state.loading = "success";
      state.status = action.meta.requestStatus;
    },
    [ResetPassword.rejected.toString()]: (state) => {
      state.loading = "failed";
    },
  },
});

export const { deleteStatus } = resetPasswordSlice.actions;
