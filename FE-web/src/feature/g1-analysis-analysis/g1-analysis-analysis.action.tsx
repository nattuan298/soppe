import { call, put } from "redux-saga/effects";
import {
  getG1AnalysisFulfilled,
  getG1AnalysisPending,
  getG1AnalysisReject,
} from "./g1-analysis-analysis.slice";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { G1AnalysisModel, GET_G1_ANALYSIS, getG1AnalysisProps } from "./type";
import { ApiListModelG1 } from "../direct-sponsor-analysis/type";

const getG1Analysis = async (paramsURL: string) => {
  const response = await axiosCutome.get(`${apiRoute.sponsors.g1Analysis}${paramsURL}`);
  return response.data;
};
export function* getG1AnalysisAction(action: getG1AnalysisProps) {
  try {
    yield put(getG1AnalysisPending());
    const res: ApiListModelG1<G1AnalysisModel> = yield call(() =>
      getG1Analysis(action.payload.paramsURL),
    );
    yield put(getG1AnalysisFulfilled(res));
  } catch (error) {
    yield put(getG1AnalysisReject());
  }
}

export const getG1AnalysisDispatch = (payload: { paramsURL: string }) => ({
  type: GET_G1_ANALYSIS,
  payload,
});
