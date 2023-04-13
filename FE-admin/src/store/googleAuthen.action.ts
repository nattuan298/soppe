import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { setGenerate, setLoadingAuthen } from "./googleAuthen.slice";

// get generate
export const FETCH_GENERATE = "FETCH_GENERATE";
const getGenerate = async () => {
  const response = await authorizedRequest.post(
    `${config.apiBaseUrl}/admin/users/security/2fa/generate`,
  );
  return response;
};
export function* watcherGenerateAuthentication() {
  try {
    yield put(setLoadingAuthen({ loading: true }));
    const response: Promise<any> = yield call(() => getGenerate());
    yield put(setGenerate(response));
  } catch (error) {
    yield put(setLoadingAuthen({ loading: true }));
  }
}
export const getGenerateAction = () => ({
  type: FETCH_GENERATE,
});
