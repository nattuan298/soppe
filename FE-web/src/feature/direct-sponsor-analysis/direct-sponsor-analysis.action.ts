import {
  ApiListModel,
  DIRECT_SPONSOR_ANALYSIS,
  SponsorAnalysisModel,
  getDirectSponsorAnalysisProps,
} from "./type";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { call, put } from "redux-saga/effects";
import {
  getDirectSponsorAnalysisFulfilled,
  getDirectSponsorAnalysisPending,
  getDirectSponsorAnalysisReject,
} from "./direct-sponsor-analysis.slice";

export const getDirectSponsorAnalysis = async (paramsURL: string) => {
  const response = await axiosCutome.get(`${apiRoute.sponsors.directAnalysis}${paramsURL}`);
  return response.data;
};

export function* getDirectSponsorAnalysisActions(action: getDirectSponsorAnalysisProps) {
  try {
    yield put(getDirectSponsorAnalysisPending());
    const res: ApiListModel<SponsorAnalysisModel> = yield call(() =>
      getDirectSponsorAnalysis(action.payload.paramsURL),
    );
    yield put(getDirectSponsorAnalysisFulfilled(res));
  } catch (error) {
    yield put(getDirectSponsorAnalysisReject());
  }
}

export const getDirectSponsorAnalysisDispatch = (payload: { paramsURL: string }) => ({
  type: DIRECT_SPONSOR_ANALYSIS,
  payload,
});
