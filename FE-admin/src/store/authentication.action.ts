import { call, put } from "redux-saga/effects";
import publicIp from "public-ip";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { AuthenticationAdmin } from "src/types/authentication.model";

import { loginFulfilled, setLoading } from "./authentication.slice";
import { FETCH_LOGIN, FETCH_LOGIN_REQUEST, LoginPayloadType } from "./authentication.type";

let OSName = "Unknown OS";
if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "MacOS";
if (navigator.userAgent.indexOf("X11") !== -1) OSName = "UNIX";
if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";

const login = async ({ username, password }: { username: string; password: string }) => {
  const response = (await authorizedRequest.post(`${config.apiBaseUrl}/admin/signin`, {
    username,
    password,
  })) as AuthenticationAdmin;
  console.log(response);

  if (response.jwtAccessToken) {
    window.location.href = "/admin-dashboard/user-management/user-list";
    localStorage.setItem("token", JSON.stringify(response));
  }
  return Promise.resolve(response);
};

export type FetchLogin = {
  type: typeof FETCH_LOGIN_REQUEST;
  payload: LoginPayloadType;
};

export function* handleLogin(action: FetchLogin) {
  try {
    yield put(setLoading({ loading: true, status: "loading" }));
    const { username, password } = action.payload;
    const response: Promise<any> = yield call(() => login({ username, password }));
    yield put(loginFulfilled(response));
  } catch (error) {
    yield put(setLoading({ loading: false, status: "failed" }));
  }
}

export const loginAction = (payload: LoginPayloadType) => ({ type: FETCH_LOGIN, payload });
