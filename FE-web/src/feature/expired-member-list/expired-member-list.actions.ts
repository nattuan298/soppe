import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import {
  getExpiredMemberListFulfiller,
  getExpiredMemberListPending,
  getExpiredMemberListReject,
} from "./expired-member-list.slice";
import axiosCutome from "src/lib/client/request";
import { ExpiredMemberType, GET_EXPRIRE_MEMBER_LIST, getExpiredMemberListProps } from "./types";

const getExpiredMemberList = async (params: string) => {
  const response = await axiosCutome.get(`${apiRoute.agentReports.expireList}${params}`);
  return response.data;
};

export function* getExpiredMemberListActions(action: getExpiredMemberListProps) {
  try {
    yield put(getExpiredMemberListPending());
    const res: ExpiredMemberType = yield call(() => getExpiredMemberList(action.payload.paramsURL));
    yield put(getExpiredMemberListFulfiller(res));
  } catch (error) {
    yield put(getExpiredMemberListReject());
  }
}

export const getExpiredMemberListDispatch = (payload: { paramsURL: string }) => ({
  type: GET_EXPRIRE_MEMBER_LIST,
  payload,
});
