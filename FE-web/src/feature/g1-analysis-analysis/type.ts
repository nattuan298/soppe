export interface G1AnalysisModel {
  memberId: string;
  memberName: string;
  applyDate: string;
  expDate: string;
  upgradeExpDate: string;
  applyLevel: string;
  maxPin: string;
  lastPin: string;
  star: string;
  newSponsor: string;
  newSup: string;
  newEx: string;
  supToEx: string;
  ownPv: string;
  leftPv: string;
  rightPv: string;
  pvLevel: string;
  side: string;
  document: string;
  autoShip: string;
  statusMember: string;
}
export const GET_G1_ANALYSIS = "GET_G1_ANALYSIS";
export type payloadProps = {
  paramsURL: string;
};
export type getG1AnalysisProps = {
  type: typeof GET_G1_ANALYSIS;
  payload: payloadProps;
};
