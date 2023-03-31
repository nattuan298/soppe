import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiListModel, NoteModel } from "./types";

// export const getNoteList = createAsyncThunk(
//   "Note/getNoteList",
//   async (params: ParamListRequestModel, thunkAPI) => {
//     try {
//       const config = paramsSerializer(params);
//       const paramsURL = config !== "" ? `?${config}` : "";
//       const response = await axios.get(`${apiRoute.note.note}${paramsURL}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   },
// );

// export const getNoteById = createAsyncThunk("Note/note-detail", async (id: string | string[]) => {
//   const response = await axios.get(`${apiRoute.note.note}/${id}`);
//   return response.data;
// });

interface InitialStateType {
  NoteData: ApiListModel<NoteModel>;
  loading: boolean;
  errorMessage: string;
  noteDetail: NoteModel;
}
const initialState: InitialStateType = {
  NoteData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
  errorMessage: "",
  noteDetail: {
    title: "",
    memberId: "",
    status: "",
    startDate: "",
    endDate: "",
    details: "",
    _id: "",
  },
};
export const NoteSlice = createSlice({
  name: "Note",
  initialState,
  reducers: {
    getNoteListPending: (state) => {
      state.loading = true;
    },
    getNoteListReject: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message[0];
    },
    getNoteListFulfiller: (state, action: PayloadAction<ApiListModel<NoteModel>>) => {
      state.loading = false;
      state.NoteData = action.payload;
    },
    getNoteByIdPending: (state) => {
      state.loading = true;
    },
    getNoteByIdFulfiller: (state, action: PayloadAction<NoteModel>) => {
      state.loading = false;
      state.noteDetail = action.payload;
    },
    getNoteByIdReject: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message[0];
    },
  },
  extraReducers: {
    // [getNoteList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getNoteList.fulfilled.toString()]: (state, action: PayloadAction<ApiListModel<NoteModel>>) => {
    //   state.loading = false;
    //   state.NoteData = action.payload;
    // },
    // [getNoteList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.message[0];
    // },
    // [getNoteById.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getNoteById.fulfilled.toString()]: (state, action: PayloadAction<NoteModel>) => {
    //   state.loading = false;
    //   state.noteDetail = action.payload;
    // },
    // [getNoteById.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.message[0];
    // },
  },
});

export const {
  getNoteListPending,
  getNoteListReject,
  getNoteListFulfiller,
  getNoteByIdPending,
  getNoteByIdFulfiller,
  getNoteByIdReject,
} = NoteSlice.actions;
