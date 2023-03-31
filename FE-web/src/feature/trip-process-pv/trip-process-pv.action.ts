import { call, put } from "redux-saga/effects";
import { getTripPVFulfilled, getTripPVReject, getTripPvPending } from "./trip-process-pv.slice";
import axiosCutome from "src/lib/client/request";
import { GET_TRIP_PROCESS_PV, TripProcessType } from "./type";
import { apiRoute } from "src/constants/apiRoutes";

const getTripProcessPv = async () => {
  const response = await axiosCutome.get<TripProcessType[]>(`${apiRoute.trip.processPV}`);
  return response.data;
};
export function* getTripProcessPvActions() {
  try {
    yield put(getTripPvPending());
    const res: TripProcessType[] = yield call(() => getTripProcessPv());
    yield put(getTripPVFulfilled(res));
  } catch (error) {
    yield put(getTripPVReject());
  }
}

export const getTripPvDispatch = () => ({
  type: GET_TRIP_PROCESS_PV,
});
