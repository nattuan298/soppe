export interface NearExpireMemberListType {
  userId: string;
  userName: string;
  expireDate: string;
  gen: string;
  sponsorId: string;
  sponsorName: string;
}
export interface NearExpireMemberType {
  total: number;
  page: number;
  limit: number;
  data: [];
}
// getNearExpireMemberList
export const GET_NEAR_EXPIRE_MEMBER_LIST = "GET_NEAR_EXPIRE_MEMBER_LIST";
export type payloadProps = {
  paramsURL: string;
};
export type getNearExpireProps = {
  type: typeof GET_NEAR_EXPIRE_MEMBER_LIST;
  payload: payloadProps;
};
