import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_TRIP_PROCESS } from "src/modules/trip-process/trip-process.constant";
import { TripProcessType } from "./type";

// export const getTripPV = createAsyncThunk("tripProcessPV/getTripPV", async () => {
//   const response = await axios.get<TripProcessType[]>(`${apiRoute.trip.processPV}`);
//   return response.data;
// });

interface TripProcessState {
  tripPV: TripProcessType[];
  idGettingTripPV: boolean;
}

const initialState: TripProcessState = {
  tripPV: [DEFAULT_TRIP_PROCESS],
  idGettingTripPV: false,
};

export const tripProcessSlice = createSlice({
  name: "trip-process-pv",
  initialState,
  reducers: {
    getTripPvPending: (state) => {
      state.idGettingTripPV = true;
    },
    getTripPVFulfilled: (state, action: PayloadAction<Array<TripProcessType>>) => {
      state.tripPV = action.payload;
      state.idGettingTripPV = false;
    },
    getTripPVReject: (state) => {
      state.idGettingTripPV = false;
    },
  },
  extraReducers: {
    // [getTripPV.pending.toString()]: (state) => {
    //   state.idGettingTripPV = true;
    // },
    // [getTripPV.fulfilled.toString()]: (state, action: PayloadAction<Array<TripProcessType>>) => {
    //   state.tripPV = action.payload;
    //   state.idGettingTripPV = false;
    // },
    // [getTripPV.rejected.toString()]: (state) => {
    //   state.idGettingTripPV = false;
    // },
  },
});
export const { getTripPvPending, getTripPVFulfilled, getTripPVReject } = tripProcessSlice.actions;

export default tripProcessSlice.reducer;
