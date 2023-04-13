import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  params: string;
}

const initialState: InitialStateType = {
  params: "",
};

const routerParamsSlice = createSlice({
  name: "routerParams",
  initialState,
  reducers: {
    getParams: (state, action) => {
      state.params = action.payload;
    },
  },
});

export const { getParams } = routerParamsSlice.actions;

export default routerParamsSlice.reducer;
