import { call, put } from "redux-saga/effects";
import {
  getNotificationFulfilled,
  getNotificationPending,
  getNotificationReject,
  signOutAPIPending,
  signOutAPIReject,
  signOutAPIfulfilled,
} from "./setting.slice";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { GET_NOTIFICATION, ModelNotify, SIGN_OUT_API, signOutSettingProps } from "./setting.type";
import publicIp from "public-ip";
import { Cookies } from "react-cookie";
import { getRefreshToken, removeToken } from "src/lib/common.lib";
import { resetSignin } from "../signin/sign-in-slice";

const cookies = new Cookies();

export const getNotificationData = async () => {
  const response = await axiosCutome.get(`${apiRoute.setting.notification}`);
  return response.data;
};

export const signOut = async (OSName: string) => {
  /* @ts-ignore */
  const ip = await publicIp.v4();
  const tokenFirebase = cookies.get("tokenFirebase");
  const response = await axiosCutome.post("/auth/members/signOut", {
    tokenFirebase,
    channel: "WebApp",
    OS: OSName,
    IP: ip,
    refreshToken: getRefreshToken(),
  });
  removeToken(true);
  return response.data;
};

export function* getNotificationAction() {
  try {
    yield put(getNotificationPending());
    const response: ModelNotify = yield call(() => getNotificationData());
    yield put(getNotificationFulfilled(response));
  } catch (error) {
    yield put(getNotificationReject(error));
  }
}

export function* signOutAction(action: signOutSettingProps) {
  try {
    yield put(signOutAPIPending());
    yield call(() => signOut(action.payload.OSName));
    yield put(signOutAPIfulfilled());
    yield put(resetSignin());
    delete axiosCutome.defaults.headers.common.Authorization;
  } catch (error) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    yield put(signOutAPIReject(error));
  }
}

export const getNotificationDispatch = () => ({
  type: GET_NOTIFICATION,
});

export const signOutDispatch = (payload: { OSName: string }) => ({
  type: SIGN_OUT_API,
  payload,
});
