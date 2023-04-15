import {
  ParamListRequestDashBoard,
  ParamListRequestModel,
} from "src/types/params-list-request.model";

export interface WatcherFetchPlatformDashboard {
  type: string;
  payload: ParamListRequestDashBoard;
}

export interface WatcherFetchReportIssue {
  type: string;
  payload: ParamListRequestModel;
}

export const FETCH_REPORT_ISSUES = "platform-home/getReportIssues";
export const FETCH_PLATFORM_DASHBOARD = "platform-home/getDataDashboard";
