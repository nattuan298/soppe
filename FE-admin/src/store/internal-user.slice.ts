import { createSlice } from "@reduxjs/toolkit";
import { InternalUserModel } from "src/types/internal-user.model";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { getInternalUserAction } from "./internal-user.action";
import { getAllRoleAction } from "./role.action";

export const getInternalUserListThenAllRole =
  (params: ParamListRequestModel) => async (dispatch: (arg0: any) => any) => {
    await dispatch(getInternalUserAction(params));
    return await dispatch(getAllRoleAction());
  };

interface InitialStateType {
  internalUserData: ApiListModel<InternalUserModel>;
  internalUserDetail: InternalUserModel;
  loading: boolean;
  errorMessage: string;
  emailSuccess: string;
  checkChangePassword: string;
  urlUser: string;
}

const initialState: InitialStateType = {
  internalUserData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  errorMessage: "",
  internalUserDetail: {
    roles: [],
    _id: "",
    firstName: "",
    lastName: "",
    status: "",
    jobType: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    citizenship: "",
    gender: "",
    dateOfBirth: "",
    updatedAt: "",
  },
  emailSuccess: "",
  checkChangePassword: "",
  loading: true,
  urlUser: "",
};

const internalUsersSlice = createSlice({
  name: "internalUsers",
  initialState,
  reducers: {
    resetCurrentInteralUser: (state) => {
      state.internalUserDetail = {
        roles: [],
        _id: "",
        firstName: "",
        lastName: "",
        status: "",
        jobType: "",
        email: "",
        phoneCode: "",
        phoneNumber: "",
        citizenship: "",
        gender: "",
        dateOfBirth: "",
        updatedAt: "",
      };
    },
    changeImageAvatar: (state, action) => {
      state.internalUserDetail.avatarUrl = action.payload;
      state.urlUser = action.payload;
    },
    setLoadingGetUser: (state, action) => {
      state.loading = action.payload.loading;
    },
    getInternalUser: (state, action) => {
      state.loading = false;
      state.internalUserData = action.payload;
    },
    getDetailUser: (state, action) => {
      const myaccountId = JSON.parse(localStorage.getItem("token") || "{}")._id;
      if (myaccountId === action.payload._id) {
        state.urlUser = action.payload.avatarUrl;
      }
      state.loading = false;
      state.internalUserDetail = action.payload;
    },
    changePass: (state, action) => {
      state.checkChangePassword = action.payload.status;
    },
    getUrl: (state, action) => {
      if (action.payload.avatarUrl) {
        state.urlUser = action.payload.avatarUrl;
      }
    },
  },
  extraReducers: {},
});

export const {
  resetCurrentInteralUser,
  changeImageAvatar,
  setLoadingGetUser,
  getInternalUser,
  getDetailUser,
  changePass,
  getUrl,
} = internalUsersSlice.actions;

export default internalUsersSlice.reducer;
