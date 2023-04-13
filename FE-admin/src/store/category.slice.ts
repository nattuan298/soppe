import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "src/types/category.model";

// export const getCategoryList = createAsyncThunk("inventoryManagement/getCategoryList", async () => {
//   const response = (await authorizedRequest.get(
//     `${config.apiBaseUrl}/categories`,
//   )) as CategoryModel;

//   return response;
// });

interface InitialStateType {
  categoryData: CategoryModel[];
  loading: boolean;
}

const initialState: InitialStateType = {
  categoryData: [
    {
      _id: "",
      categoryId: "",
      categoryName: "",
      image: "",
    },
  ],
  loading: true,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoadingCategory: (state, action) => {
      state.loading = action.payload.loading;
    },
    setCategory: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },
  },
  extraReducers: {
    // [getCategoryList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getCategoryList.fulfilled.toString()]: (state, action: PayloadAction<CategoryModel[]>) => {
    //   state.loading = false;
    //   state.categoryData = action.payload;
    // },
    // [getCategoryList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { setLoadingCategory, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
