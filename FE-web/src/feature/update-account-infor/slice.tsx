import { createSlice } from "@reduxjs/toolkit";

interface UpdateaccountInforType {
  screen: string;
}

const initialState: UpdateaccountInforType = {
  screen: "",
};

export const updateaccountInfor = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateScreen: (state, action) => {
      state.screen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateScreen } = updateaccountInfor.actions;

export default updateaccountInfor.reducer;
