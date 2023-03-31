import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoriteMemberModel } from "./types";

interface FavoriteMemberState {
  favoriteMembers: Array<FavoriteMemberModel>;
  loading: boolean;
}

const initialState: FavoriteMemberState = {
  favoriteMembers: [],
  loading: false,
};

export const favoriteMemberSlice = createSlice({
  name: "favorite-member",
  initialState,
  reducers: {
    removeMember: (state, action: PayloadAction<string>) => {
      state.favoriteMembers = state.favoriteMembers.filter(
        (item) => item.memberId !== action.payload,
      );
    },
    favoriteMemberPending: (state) => {
      state.loading = true;
    },
    favoriteMemberFulfilled: (state, action) => {
      state.favoriteMembers = action.payload;
      state.loading = false;
    },
    favoriteMemberRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  removeMember,
  favoriteMemberFulfilled,
  favoriteMemberPending,
  favoriteMemberRejected,
} = favoriteMemberSlice.actions;

export default favoriteMemberSlice.reducer;
