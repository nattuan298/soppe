import { createSlice } from "@reduxjs/toolkit";
import { modelGG } from "src/types/googleAuthen.model";

// export const getGenerate = createAsyncThunk("googleAuthen/generate", async () => {
//   const response = await authorizedRequest.post(
//     `${config.apiBaseUrl}/admin/users/security/2fa/generate`,
//   );
//   return response;
// });

const initialState: modelGG = {
  generate: {
    qrCode: "",
    secret: "",
  },
  loading: false,
};

const googleAuthenSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoadingAuthen: (state, action) => {
      state.loading = action.payload.loading;
    },
    setGenerate: (state, action) => {
      state.loading = action.payload;
      state.generate = action.payload;
    },
  },
  extraReducers: {
    // [getGenerate.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getGenerate.fulfilled.toString()]: (state, action: PayloadAction<GoogleGenerate>) => {
    //   state.loading = false;
    //   state.generate = action.payload;
    // },
    // [getGenerate.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});
export const { setLoadingAuthen, setGenerate } = googleAuthenSlice.actions;

export default googleAuthenSlice.reducer;
