/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosCutomse from "src/lib/client/request";
import { apiRoute } from "../../constants/apiRoutes";
import { FORGOT_ACTION, FetchForgotAction, ForgotPayloadType } from "./forgot-password.type";
import { call, put } from "redux-saga/effects";
import { forgotFulfilled, forgotPending, forgotRejected } from "./forgot-password.slice";

export const forgotPassword = async ({
  username,
  email,
}: {
  username: string,
  email: string,
}) => {
  const bodyRequest = {
    username: username.trim(),
    email,
  };
  try {
    const response = await axiosCutomse.post(`${apiRoute.fotgot.SEND_EMAIL}`, bodyRequest);
    const data = await response;
    if (response.status === 201) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  } catch (e: any) {
    return Promise.reject(e?.response.data);
  }
};
export function* watcherForgotAction(action: FetchForgotAction) {
  try {
    yield put(forgotPending());
    const { username, email } = action.payload;
    const response: Promise<any> = yield call(() => forgotPassword({ username, email }));
    yield put(forgotFulfilled());
  } catch (error) {
    yield put(forgotRejected(error));
  }
}
export const forgotAction = (payload: ForgotPayloadType) => ({ type: FORGOT_ACTION, payload });
