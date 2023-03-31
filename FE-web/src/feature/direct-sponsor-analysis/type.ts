export interface SponsorAnalysisModel {
  userID: string;
  userName: string;
  team: string;
  status: string;
  ownPV: string;
  leftPV: string;
  rightPV: string;
  pVLevel: string;
  document: string;
  applyDate: string;
  expireDate: string;
  upgradeExpireDate: string;
  applyLevel: string;
  maxPin: string;
  lastPin: string;
  star: string;
  newSponsor: string;
  memToSup: string;
  memToEx: string;
  autoShip: string;
}

export interface ParamsSponsorModel {
  page: number;
  pageSize: number;
  searchId: string;
}

export interface ApiListModel<T> {
  data: T[];
  totalPage: number;
  currentPage: number;
  pageLimit: number;
  totalDocs: number;
}
export interface ApiListModelG1<T> {
  docs: T[];
  totalPage: number;
  currentPage: number;
  pageLimit: number;
  totalDocs: number;
}

export const DIRECT_SPONSOR_ANALYSIS = "DIRECT_SPONSOR_ANALYSIS";
type payloadProps = { paramsURL: string };

export type getDirectSponsorAnalysisProps = {
  type: typeof DIRECT_SPONSOR_ANALYSIS;
  payload: payloadProps;
};
