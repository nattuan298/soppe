import { createSlice } from "@reduxjs/toolkit";
import { AddressModel } from "./type";

interface addressType {
  listAddress: modelList;
  loading: boolean;
  addressDetail: AddressModel;
}

interface modelList {
  data: AddressModel[];
}

const initialState: addressType = {
  listAddress: {
    data: [],
  },
  loading: true,
  addressDetail: {
    addressDetail: "",
    createdAt: "",
    district: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    province: "",
    subDistrict: "",
    updatedAt: "",
    userId: "",
    __v: 0,
    _id: "6431a13496b324412ccb3732",
  },
};

export const AddressBookSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setListAddress: (state, action) => {
      console.log(action);
      state.loading = false;
      state.listAddress.data = action.payload.data.data;
    },
    setDetailAddress: (state, action) => {
      state.loading = false;
      state.addressDetail = action.payload;
    },
  },
  extraReducers: {
    // [getListAddress.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getListAddress.fulfilled.toString()]: (state, action: PayloadAction<modelList>) => {
    //   state.loading = false;
    //   state.listAddress = action.payload;
    // },
    // [getListAddress.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getAddressById.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getAddressById.fulfilled.toString()]: (state, action: PayloadAction<AddressModel>) => {
    //   state.loading = false;
    //   state.addressDetail = action.payload;
    // },
    // [getAddressById.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});
export const { setLoading, setListAddress, setDetailAddress } = AddressBookSlice.actions;
