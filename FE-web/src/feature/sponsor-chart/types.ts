export interface ApiListModel<T> {
  data: Array<T>;
  currentPage: number;
  pageLimit: number;
  totalDocs: number;
  totalPage: number;
}

export const FETCH_SPONSOR_CHART = "analysis/sponsor-chart";

export interface WatcherFetchSponsorChart {
  payload: string;
  type: string;
}
