import { ParamListRequestModel } from "src/types/params-list-request.model";

export const FETCH_DATA_EXPORT_HISTORY = "data export history/ get list";

export interface WatcherFetchDataExportHistoryListType {
  type: string;
  payload: ParamListRequestModel;
}
