import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import {
  getTravelPVHistoryFulfilled,
  getTravelPVHistoryPending,
  getTravelPVHistoryReject,
  getTripFulfiller,
  getTripPending,
} from ".";
import axiosCutome from "src/lib/client/request";
import {
  GET_TRIP_TRAVEL,
  GET_TRIP_TRAVEL_HISTORY,
  TravelPVHistoryType,
  TripType,
  getTripTravelHistoryProps,
} from "./types";
import { ApiListModel } from "../direct-sponsor-analysis/type";

const getTripTravel = async () => {
  const resTripTravel = await axiosCutome.get(`${apiRoute.members.trip}`);
  return resTripTravel.data;
};

const getTripTravelHistory = async (paramsURL: string) => {
  const response = await axiosCutome.get(`${apiRoute.members.travelPVHistory}${paramsURL}`);
  console.log(response, "response");
  return response.data;
};

export function* getTripTravelActions() {
  try {
    yield put(getTripPending());
    const res: TripType[] = yield call(() => getTripTravel());
    yield put(getTripFulfiller(res));
  } catch (error) {
    yield put(getTripPending());
  }
}

export function* getTripTravelHistoryActions(action: getTripTravelHistoryProps) {
  try {
    yield put(getTravelPVHistoryPending());
    const resTripHistory: ApiListModel<TravelPVHistoryType> = yield call(() =>
      getTripTravelHistory(action.payload.paramsURL),
    );
    yield put(getTravelPVHistoryFulfilled(resTripHistory));
  } catch (error) {
    yield put(getTravelPVHistoryReject());
  }
}

export const getTripTravelDispatch = () => ({
  type: GET_TRIP_TRAVEL,
});

export const getTripTravelHistoryDispatch = (payload: { paramsURL: string }) => ({
  type: GET_TRIP_TRAVEL_HISTORY,
  payload,
});
