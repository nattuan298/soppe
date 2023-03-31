import { call, put } from "redux-saga/effects";
import {
  getNearExpireMemberListFulfilled,
  getNearExpireMemberListPending,
  getNearExpireMemberListReject,
} from "./near-expire-member-list.slice";
import { GET_NEAR_EXPIRE_MEMBER_LIST, NearExpireMemberType, getNearExpireProps } from "./types";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";

async function getNearExpire(paramsURL: string) {
  const response = await axiosCutome.get(`${apiRoute.agentReports.nearExpireList}${paramsURL}`);
  return response.data;
}
export function* getNearExpireActions(action: getNearExpireProps) {
  try {
    yield put(getNearExpireMemberListPending());
    const res: NearExpireMemberType = yield call(() => getNearExpire(action.payload.paramsURL));
    yield put(getNearExpireMemberListFulfilled(res));
  } catch (error) {
    yield put(getNearExpireMemberListReject());
  }
}

export const getNearExpireDispatch = (payload: { paramsURL: string }) => ({
  type: GET_NEAR_EXPIRE_MEMBER_LIST,
  payload,
});
