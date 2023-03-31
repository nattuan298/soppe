export interface NotificationModel {
  channel: Array<string>;
  publishDate: string;
  status: string;
  _id: string;
  topic: string;
  detail: string;
  target: string;
  category: string;
  state: string;
  hyperlink?: string;
}

export interface ParamsNotificationAPI {
  page: number;
  pageSize: number;
  sortBy?: string;
  category?: string;
  keyword?: string;
}

export interface ApiListModel<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export const FETCH_PAGE_NOTIFiCATION = "notifications/notifications-page";

export const FETCH_NOTIFICATION_COUNT_ALL_UNREAD = "notification/count-all-unread";

export const FETCH_GET_TOPIC = "notification/topic";

export const FETCH_COMMON_NOTIFICATIONS = "notifications/notifications-common";
export interface WatcherFetchPageNotification {
  type: string;
  payload: ParamsNotificationAPI;
}
