import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { MaxPriceLocation, ParamsMaxPrice } from "src/types/max-price.model";

// export const getMaxPriceLocation = createAsyncThunk(
//   "internalPriceLocation/getMaxPriceLocation",
//   async (params: ParamsMaxPrice) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/products/max-price-location/country`,
//       {
//         params,
//       },
//     )) as ApiListModel<MaxPriceLocation>;
//     return response;
//   },
// );

interface InitialStateType {
  maxprice: MaxPriceLocation;
}

const initialState: InitialStateType = {
  maxprice: {
    country: "Thailand",
    maxPrice: 100000,
    type: "",
  },
};

const maxPriceLocationSlice = createSlice({
  name: "maxPriceLocation",
  initialState,
  reducers: {
    resetState: () => initialState,
    setMaxPrice: (state, action) => {
      state.maxprice = action.payload;
    },
  },
  extraReducers: {
    // [getMaxPriceLocation.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<MaxPriceLocation>,
    // ) => {
    //   state.maxprice = action.payload;
    // },
  },
});

export const { resetState, setMaxPrice } = maxPriceLocationSlice.actions;
export default maxPriceLocationSlice.reducer;
