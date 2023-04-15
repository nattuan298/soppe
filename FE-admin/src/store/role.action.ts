import { call, put } from "redux-saga/effects";
import { authorizedRequest } from "src/lib/request";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { config } from "src/constants/config";
import { RoleModel } from "src/types/role.model";
import { ApiListModel } from "src/types/api-list.model";
import {
  setAllRoleList,
  setDetailRole,
  setListRole,
  setLoadingRole,
  setRoleActive,
} from "./role.slice";
import {
  FETCH_GET_All_ROLE_ACTIVE,
  FETCH_GET_DETAIL_ROLE,
  FETCH_GET_ROLE,
  FETCH_GET_ROLE_ACTIVE,
} from "./role.type";

// get role
export type FetchRole = {
  type: string;
  payload: ParamListRequestModel;
};
const getRole = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles`, {
    params,
  })) as ApiListModel<RoleModel>;
  return Promise.resolve(response);
};
export function* watcherListRole(action: FetchRole) {
  try {
    yield put(setLoadingRole({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getRole(params));
    yield put(setListRole(response));
  } catch (error) {
    yield put(setLoadingRole({ loading: true }));
  }
}
// get role active
export type FetchRoleActive = {
  type: string;
};
const getRoleActive = async () => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/roles/active`,
  )) as ApiListModel<RoleModel>;
  return Promise.resolve(response);
};
export function* watcherListRoleActive() {
  try {
    yield put(setLoadingRole({ loading: true }));
    const response: Promise<any> = yield call(() => getRoleActive());
    yield put(setRoleActive(response));
  } catch (error) {
    yield put(setLoadingRole({ loading: true }));
  }
}
// get all role
export type FetchListAllRole = {
  type: string;
};
const getListAllRole = async () => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles/list/all`);
  return response;
};
export function* watcherListAllRoleActive() {
  try {
    yield put(setLoadingRole({ loading: true }));
    const response: Promise<any> = yield call(() => getListAllRole());
    yield put(setAllRoleList(response));
  } catch (error) {
    yield put(setLoadingRole({ loading: true }));
  }
}

// get detail role
export type FetchDetailRole = {
  type: string;
  payload: string;
};
const getDetailRole = async (id: string) => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles/${id}`);
  return response;
};

export function* watcherDetailRole(action: FetchDetailRole) {
  try {
    yield put(setLoadingRole({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => getDetailRole(id));
    yield put(setDetailRole(response));
  } catch (error) {}
}
export const getRoleAction = (payload: ParamListRequestModel) => ({
  type: FETCH_GET_ROLE,
  payload,
});
export const getRoleActiveAction = () => ({
  type: FETCH_GET_ROLE_ACTIVE,
});
export const getAllRoleAction = () => ({
  type: FETCH_GET_All_ROLE_ACTIVE,
});
export const getDetailRoleAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_ROLE,
  payload,
});
