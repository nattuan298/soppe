/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosCutomse from "src/lib/client/request";
import { apiRoute } from "../../constants/apiRoutes";
import { FORGOT_ACTION, FetchForgotAction, FetchRecoverAction, ForgotPayloadType, RECOVER_ACTION, RecoverPayloadType } from "./forgot-password.type";
import { call, put } from "redux-saga/effects";
import { forgotFulfilled, forgotPending, forgotRejected, recoverFulfilled, recoverPending, recoverRejected } from "./forgot-password.slice";

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

export const recoverPassword = async ({
  code,
  newPassword,
}:{
  code:string,
  newPassword: string,
}) => {
  const bodyRequest = {
    code: code.trim(),
    newPassword,
  };
  try {
    const response = await axiosCutomse.put(`${apiRoute.fotgot.RECOVER}`, bodyRequest);

    const data = await response;
    if (response.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);

  } catch (e:any) {
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
export function* watcherRecoverAction(action: FetchRecoverAction) {
  try {
    yield put(recoverPending());
    const { code, newPassword } = action.payload;
    const response: Promise<any> = yield call(() => recoverPassword({ code, newPassword }));
    yield put(recoverFulfilled());
  } catch (error) {
    yield put(recoverRejected(error));
  }
}
export const forgotAction = (payload: ForgotPayloadType) => ({ type: FORGOT_ACTION, payload });
export const RecoverAction = (payload: RecoverPayloadType) => ({ type: RECOVER_ACTION, payload });

