import { put } from "redux-saga/effects";

import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { getPointsFulfilled, getUserInformationFulfilled } from "./slice";
import { FETCH_POINTS, FETCH_USER_INFORMATION, PointType, UserInforType } from "./type";

const getUserInformation = async () => {
  try {
    const response = await axios.get(`${apiRoute.members.accountInformation}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

const getPoints = async () => {
  try {
    const response = await axios.get(`${apiRoute.members.getPoints}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export function* watcherFetchUserInfomation() {
  try {
    const response: Promise<UserInforType> = yield getUserInformation();
    yield put(getUserInformationFulfilled(response));
  } catch (error) {}
}

export function* watcherFetchGetPoints() {
  try {
    const response: Promise<PointType> = yield getPoints();
    yield put(getPointsFulfilled(response));
  } catch (error) {}
}

export const fetchUserInformation = () => ({
  type: FETCH_USER_INFORMATION,
});

export const fetchPoints = () => ({
  type: FETCH_POINTS,
});
