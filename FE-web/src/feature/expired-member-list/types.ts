export interface ExpiredMemberListType {
  userId: string;
  userName: string;
  expireDate: string;
  gen: string;
  sponsorId: string;
  sponsorName: string;
}
export interface ExpiredMemberType {
  total: number;
  page: number;
  limit: number;
  data: [];
}

export const GET_EXPRIRE_MEMBER_LIST = "GET_EXPRIRE_MEMBER_LIST";

export type payloadProps = {
  paramsURL: string;
};
export type getExpiredMemberListProps = {
  type: typeof GET_EXPRIRE_MEMBER_LIST;
  payload: payloadProps;
};
