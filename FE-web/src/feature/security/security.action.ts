import { put } from "redux-saga/effects";

import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

import {
  SecurityState,
  generateSecurity2FAFulfilled,
  generateSecurity2FAPending,
  generateSecurity2FARejected,
  securityStateFulfilled,
  securityStatePending,
  securityStateRejected,
} from "./security.slice";
import { FETCH_GENERATE_SECURITY_2FA, FETCH_SECURITY_STATE } from "./type";

const getSecurityState = async () => {
  const response = await axios.get(`${apiRoute.security.getState}`);
  return response.data;
};

const generateSecurity2FA = async () => {
  const response = await axios.post(`${apiRoute.security.generateSecurity}`);
  return response.data;
};

export function* watcherFetchSecurityState() {
  try {
    yield put(securityStatePending());
    const response: Promise<SecurityState> = yield getSecurityState();
    yield put(securityStateFulfilled(response));
  } catch (error) {
    yield put(securityStateRejected());
  }
}

export function* watcherFetchGenerateSecurity2FA() {
  try {
    yield put(generateSecurity2FAPending());
    const response: Promise<SecurityState> = yield generateSecurity2FA();
    yield put(generateSecurity2FAFulfilled(response));
  } catch (error) {
    yield put(generateSecurity2FARejected());
  }
}

export const fetchSecurityState = () => ({
  type: FETCH_SECURITY_STATE,
});

export const fetchGenerateSecurity2FA = () => ({
  type: FETCH_GENERATE_SECURITY_2FA,
});
