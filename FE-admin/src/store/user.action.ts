import { call, put } from "redux-saga/effects";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import {
  setLoadingDetail,
  setLoadingUser,
  setProvince,
  setUser,
  setUserDetail,
} from "./user.slice";
import { FETCH_GET_DETAIL_USER, FETCH_GET_PROVINCE, FETCH_GET_USER } from "./user.type";
// get user list
export type FetchUser = {
  type: string;
  payload: ParamListRequestModel;
};
const getUserList = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/members`, {
    params,
  })) as any;
  return response;
};
export function* watcherListUser(action: FetchUser) {
  try {
    yield put(setLoadingUser({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield getUserList(params);
    yield put(setUser(response));
  } catch (error) {
    yield put(setLoadingUser({ loading: false }));
  }
}
export const getUserAction = (payload: ParamListRequestModel) => ({
  type: FETCH_GET_USER,
  payload,
});

// get user id
export type FetchUserId = {
  type: string;
  payload: string;
};
const getUserId = async (id: string) => {
  const response = await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/members/detail?memberId=${id}`,
  );
  return response;
};
export function* watcherGetUserId(action: FetchUserId) {
  try {
    yield put(setLoadingDetail({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield getUserId(id);
    yield put(setUserDetail(response));
  } catch (error) {
    yield put(setLoadingDetail({ loading: true }));
  }
}
export const getUserIdAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_USER,
  payload,
});

// get province
export type FetchProvince = {
  type: string;
  payload: string | undefined;
};
const getProvince = async (country: string | undefined) => {
  if (country) {
    const response = await authorizedRequest.get(
      `${config.apiBaseUrl}/provinces/find-by-country/?country=${country}`,
    );
    return response;
  }
};
export function* watcherGetProvince(action: FetchProvince) {
  try {
    const country = action.payload;
    const response: Promise<any> = yield getProvince(country);
    yield put(setProvince(response));
  } catch (error) {
    console.log(error);
  }
}
export const getProvinceAction = (payload: string | undefined) => ({
  type: FETCH_GET_PROVINCE,
  payload,
});
