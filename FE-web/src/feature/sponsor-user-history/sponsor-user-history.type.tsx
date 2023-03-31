import { SponsorHistoryDetail } from "./types";

export const GET_SPONSORED_USER_HISTORY = "GET_SPONSORED_USER_HISTORY";

export interface payloadProps {
  page: number;
  pageSize: number;
  search?: string;
}

export interface PayloadTest {
  data: SponsorHistoryDetail[];
  total: number;
  page: number;
}

export type getSponsoredUserHistoryActionProps = {
  type: typeof GET_SPONSORED_USER_HISTORY;
  payload: payloadProps;
};
