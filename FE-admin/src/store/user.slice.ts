import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ItemArrayConvert, ItemArraySelect, userModel } from "src/types/user.model";
import { ApiListModel } from "src/types/api-list.model";

// export const getUserList = createAsyncThunk(
//   "User/getUserList",
//   async (params: ParamListRequestModel, { rejectWithValue }) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/members`, {
//       params,
//     })) as any;
//     if (response.statusCode === 503) return rejectWithValue(response);
//     return response;
//   },
// );
const convertDataBuCountry = ({
  data,
  country,
}: {
  data: Array<ItemArraySelect>;
  country: string | undefined;
}) => {
  if (country === "Thailand") {
    return data?.map((item) => ({
      title: item.name,
      value: item._id,
    }));
  }

  return data?.map((item) => ({
    title: item.nameEng,
    value: item._id,
  }));
};
// export const getUserById = createAsyncThunk("User/UserById", async (id: string) => {
//   const response = await authorizedRequest.get(
//     `${config.apiBaseUrl}/admin/members/detail?memberId=${id}`,
//   );
//   return response;
// });
// export const getProvince = createAsyncThunk(
//   "signup/getCity",
//   async (country: string | undefined, thunkAPI) => {
//     if (country) {
//       const response = await authorizedRequest.get(
//         `${config.apiBaseUrl}/provinces/find-by-country/?country=${country}`,
//       );
//       return response;
//     }
//   },
// );
// export const getDistrict = createAsyncThunk(
//   "signup/getDistrict",
//   async (province: string | undefined, thunkAPI) => {
//     if (province) {
//       const response = await authorizedRequest.get(
//         `${config.apiBaseUrl}/districts/get-by-province/${province}`,
//       );
//       return response;
//     }
//   },
// );
// export const getSubDistrict = createAsyncThunk(
//   "signup/getSubDistrict",
//   async (district: string | undefined) => {
//     if (district) {
//       const response = await authorizedRequest.get(
//         `${config.apiBaseUrl}/sub-districts/get-by-district/${district}`,
//       );
//       return response;
//     }
//   },
// );
interface InitialStateType {
  userData: ApiListModel<userModel>;
  loading: boolean;
  userDetail: userModel;
  loadingDetail: boolean;
  listProvince: Array<ItemArrayConvert>;
  listDistrict: Array<ItemArrayConvert>;
  listSubDistrict: Array<ItemArrayConvert>;
  errorMessage: string;
}

const initialState: InitialStateType = {
  userData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
    statusCode: 0,
  },
  userDetail: {
    memberId: "",
    name: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    status: "",
    matching: "",
    expiredDate: "",
    phoneNumber: "",
    citizenship: "",
    avatar: {
      key: "",
      url: "",
    },
    gender: "",
    documentStatus: "",
    twoFaStatus: "",
    googleAuth: false,
    smsAuth: false,
    dateOfBirth: "",
    facebookAuth: false,
    email: "",
    sponsor: {
      avatar: "",
      name: "",
      sponsorId: "",
    },
    shippingAddress: {
      firstName: "",
      lastName: "",
      phoneCode: "",
      phoneNumber: "",
      country: "",
      postalCode: "",
      province: "",
      provinceEng: "",
      district: "",
      districtEng: "",
      subDistrict: "",
      subDistrictEng: "",
      address: "",
      default: false,
      category: "",
    },
    billingAddress: {
      firstName: "",
      lastName: "",
      phoneCode: "",
      phoneNumber: "",
      country: "",
      postalCode: "",
      province: "",
      provinceEng: "",
      district: "",
      districtEng: "",
      subDistrict: "",
      subDistrictEng: "",
      address: "",
      default: false,
      category: "",
    },
    images: [
      {
        key: "",
        type: "",
        url: "",
      },
    ],
  },
  loading: true,
  loadingDetail: true,
  errorMessage: "",
  listProvince: [],
  listDistrict: [],
  listSubDistrict: [],
};

const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userDetail = {
        memberId: "",
        name: "",
        firstName: "",
        lastName: "",
        phoneCode: "",
        status: "",
        matching: "",
        expiredDate: "",
        phoneNumber: "",
        citizenship: "",
        avatar: {
          key: "",
          url: "",
        },
        gender: "",
        documentStatus: "",
        twoFaStatus: "",
        googleAuth: false,
        smsAuth: false,
        dateOfBirth: "",
        facebookAuth: false,
        email: "",
        sponsor: {
          avatar: "",
          name: "",
          sponsorId: "",
        },
        shippingAddress: {
          firstName: "",
          lastName: "",
          phoneCode: "",
          phoneNumber: "",
          country: "",
          postalCode: "",
          province: "",
          provinceEng: "",
          district: "",
          districtEng: "",
          subDistrict: "",
          subDistrictEng: "",
          address: "",
          default: false,
          category: "Other",
        },
        billingAddress: {
          firstName: "",
          lastName: "",
          phoneCode: "",
          phoneNumber: "",
          country: "",
          postalCode: "",
          province: "",
          provinceEng: "",
          district: "",
          districtEng: "",
          subDistrict: "",
          subDistrictEng: "",
          address: "",
          default: false,
          category: "Other",
        },
        images: [
          {
            key: "",
            type: "",
            url: "",
          },
        ],
      };
    },
    setLoadingUser: (state, action) => {
      state.loading = action.payload.loading;
    },
    setUser: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload.loading;
    },
    setUserDetail: (state, action) => {
      state.loadingDetail = false;
      state.userDetail = action.payload;
    },
    setProvince: (state, action) => {
      const newProvince =
        action.payload && convertDataBuCountry({ data: action.payload, country: "ThaiLand" });
      state.listProvince = newProvince;
    },
  },
  extraReducers: {
    // [getUserList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getUserList.fulfilled.toString()]: (state, action: PayloadAction<ApiListModel<userModel>>) => {
    //   state.loading = false;
    //   state.userData = action.payload;
    // },
    // [getUserList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.error.message;
    // },
    // [getUserById.pending.toString()]: (state) => {
    //   state.loadingDetail = true;
    // },
    // [getUserById.fulfilled.toString()]: (state, action) => {
    //   state.loadingDetail = false;
    //   state.userDetail = action.payload;
    // },
    // [getProvince.fulfilled.toString()]: (state, action) => {
    //   const newProvince =
    //     action.payload && convertDataBuCountry({ data: action.payload, country: "ThaiLand" });
    //   state.listProvince = newProvince;
    // },
    // [getDistrict.fulfilled.toString()]: (state, action) => {
    //   const newProvince =
    //     action.payload && convertDataBuCountry({ data: action.payload, country: "ThaiLand" });
    //   state.listDistrict = newProvince;
    // },
    // [getSubDistrict.fulfilled.toString()]: (state, action) => {
    //   const newProvince =
    //     action.payload && convertDataBuCountry({ data: action.payload, country: "ThaiLand" });
    //   state.listSubDistrict = newProvince;
    // },
  },
});
export const { resetUser, setLoadingUser, setUser, setLoadingDetail, setUserDetail, setProvince } =
  usersSlice.actions;

export default usersSlice.reducer;
