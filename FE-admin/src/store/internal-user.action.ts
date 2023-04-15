import { call, put } from "redux-saga/effects";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { InternalUserModel } from "src/types/internal-user.model";
import {
  changePass,
  getDetailUser,
  getInternalUser,
  getUrl,
  setLoadingGetUser,
} from "./internal-user.slice";
import { config } from "src/constants/config";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import {
  FETCH_CHANGE_PASSWORD,
  FETCH_GET_DETAIL_INTERNAL_USER,
  FETCH_GET_INTERNAL_USER,
  FETCH_UPLOAD_AVATAR,
} from "./internal-user.type";

// user list
export type FetchGetInternalUser = {
  type: string;
  payload: ParamListRequestModel;
};
const GetUser = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/users`, {
    params,
  })) as ApiListModel<InternalUserModel>;

  return Promise.resolve(response);
};
export function* handleUser(action: FetchGetInternalUser) {
  try {
    yield put(setLoadingGetUser({ loading: true, status: "loading" }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => GetUser(params));
    yield put(getInternalUser(response));
  } catch (error) {
    put(setLoadingGetUser({ loading: false, status: "failed" }));
  }
}

// detail user by id
export type FetchGetInternalUserDetail = {
  type: string;
  payload: string;
};
const GetDetailUser = async (id: string) => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/user/${id}`);
  return Promise.resolve(response);
};
export function* handleDetailUser(action: FetchGetInternalUserDetail) {
  try {
    yield put(setLoadingGetUser({ loading: true, status: "loading" }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => GetDetailUser(id));
    yield put(getDetailUser(response));
  } catch (error) {
    put(setLoadingGetUser({ loading: false, status: "failed" }));
  }
}

// change password
export type FetchChangePass = {
  type: string;
  payload: { id: string; password: string };
};
const changePasswordById = async ({ id, password }: { id: string; password: String }) => {
  const response = await authorizedRequest.put(
    `${config.apiBaseUrl}/admin/users/change-password/${id}`,
    { password },
  );
  return Promise.resolve(response);
};
export function* handleChangePassword(action: FetchChangePass) {
  try {
    yield put(changePass({ status: "loading" }));
    const { id, password } = action.payload;
    yield call(() => changePasswordById({ id, password }));
    yield put(changePass({ status: "success" }));
  } catch (error) {
    console.log(error);
    yield put(changePass({ loading: false, status: "failed" }));
  }
}

// upload avartar
export type FetchUrlUser = {
  type: string;
  payload: { id: string; avatar: string };
};
const uploadAvatar = async ({ id, avatar }: { id: string; avatar: string }) => {
  const response = await authorizedRequest.put(
    `${config.apiBaseUrl}/admin/users/upload-avatar/${id}`,
    { avatar },
  );
  return Promise.resolve(response);
};
export function* handleChangeAvatar(action: FetchUrlUser) {
  try {
    const { id, avatar } = action.payload;
    const response: Promise<any> = yield call(() => uploadAvatar({ id, avatar }));
    yield put(getUrl(response));
  } catch (error) {}
}

export const getInternalUserAction = (payload: ParamListRequestModel) => ({
  type: FETCH_GET_INTERNAL_USER,
  payload,
});
export const getDetailInternalUserAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_INTERNAL_USER,
  payload,
});
export const callChangePassword = (payload: { id: string; password: string }) => ({
  type: FETCH_CHANGE_PASSWORD,
  payload,
});
export const getUrlAvatar = (payload: { id: string; avatar: string }) => ({
  type: FETCH_UPLOAD_AVATAR,
  payload,
});
