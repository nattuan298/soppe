import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { apiRoute } from "src/constants/apiRoutes";
// import axios from "src/lib/client/request";
import { PopularKeyWord } from "./searching.type";

// export const getPopularKeyWords = createAsyncThunk("searching/popular-keywords ", async () => {
//   const response = await axios.get(`${apiRoute.search.popular}`);
//   return response.data;
// });

interface InitialStateType {
  searchValue: string;
  keySort: string;
  popularKeyWords: Array<PopularKeyWord>;
}

const initialState: InitialStateType = {
  searchValue: "",
  keySort: "",
  popularKeyWords: [],
};

export const SearchValueSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    updateKeySort: (state, action) => {
      state.keySort = action.payload;
    },
    getPopularKeyWordsFulfilled: (state, action: PayloadAction<Array<PopularKeyWord>>) => {
      state.popularKeyWords = action.payload;
    },
  },
  extraReducers: {
    // [getPopularKeyWords.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<Array<PopularKeyWord>>,
    // ) => {
    //   state.popularKeyWords = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchValue, updateKeySort, getPopularKeyWordsFulfilled } =
  SearchValueSlice.actions;

export default SearchValueSlice.reducer;
