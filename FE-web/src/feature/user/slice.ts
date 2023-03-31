import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { UserInforType, UserSliceType } from "./type";

const initialState: UserSliceType = {
  userInfor: null,
  urlRedirect: "",
  scmPoint: 0,
  productValueRight: 0,
  productValueLeft: 0,
  eCommission: 0,
  expireDate: "",
  joinedDate: "",
  preUrl: "",
  currUrl: "",
};

export const handleChangeFieldUserInfor =
  createAction<Partial<UserInforType>>("user/handleChangeField");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changePhoneConnectStatus: (state, action: PayloadAction<boolean>) => {
      if (state.userInfor) {
        state.userInfor.smsAuth = action.payload;
      }
    },
    changeFacebookConnectStatus: (state, action: PayloadAction<boolean>) => {
      if (state.userInfor) {
        state.userInfor.facebookAuth = action.payload;
      }
    },
    changeAvatar: (state, action: PayloadAction<string>) => {
      if (state.userInfor) {
        state.userInfor.avatar = action.payload;
      }
    },
    changeRedirectUrl: (state, action: PayloadAction<string>) => {
      state.urlRedirect = action.payload;
    },
    updatePreUrl: (state, action: PayloadAction<string>) => {
      state.preUrl = state.currUrl;
      state.currUrl = action.payload;
    },
    getUserInformationFulfilled: (state, { payload }) => {
      return { ...state, userInfor: payload };
    },
    getPointsFulfilled: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  // .addCase(getUserInformation.fulfilled, (state, { payload }: PayloadAction<UserInforType>) => {
  //   return { ...state, userInfor: payload };
  // })
  //     .addCase(
  //       getPoints.fulfilled,
  //       (
  //         state,
  //         {
  //           payload,
  //         }: PayloadAction<{
  //           scmPoint: number;
  //           productValueRight: number;
  //           productValueLeft: number;
  //           eCommission: number;
  //           expireDate: string;
  //           joinedDate: string;
  //         }>,
  //       ) => {
  //         return {
  //           ...state,
  //           ...payload,
  //         };
  //       },
  //     );
  // },
});

// Action creators are generated for each case reducer function
export const {
  changePhoneConnectStatus,
  changeFacebookConnectStatus,
  changeRedirectUrl,
  updatePreUrl,
  changeAvatar,
  getUserInformationFulfilled,
  getPointsFulfilled,
} = userSlice.actions;

export default userSlice.reducer;
