import { put } from "redux-saga/effects";
import { config } from "src/constants/config";

import { authorizedRequest } from "src/lib/request";
import { FETCH_GET_PERMISSION_LIST } from "./permission.type";
import {
  getPermissionListFulfilled,
  getPermissionListPending,
  getPermissionListRejected,
} from "./permission.slice";
import { PermissionModel } from "src/types/permission.model";

const getPermissionList = async () => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/permissions`);
  return response;
};

export function* watcherGetPermissionList() {
  try {
    yield put(getPermissionListPending());
    const res: Array<PermissionModel> = yield getPermissionList();
    yield put(getPermissionListFulfilled(res));
  } catch (error) {
    yield put(getPermissionListRejected());
  }
}

export const fetchGetPermissionList = () => ({
  type: FETCH_GET_PERMISSION_LIST,
});
