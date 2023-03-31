export const FETCH_GET_FAQ_LIST = "getFAQList";

export interface FAQListPayload {
  category: string | string[];
  keyword: string;
}

export interface WatcherFetchFAQList {
  type: string;
  payload: FAQListPayload;
}
