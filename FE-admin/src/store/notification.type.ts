import { ParamListRequestPushNotificationModel } from "src/types/params-list-request.model";

export const FETCH_NOTIFICATION_LIST = "internalNotification/pushNotificationList";

export const FETCH_SELECTED_NOTIFICATION = "internalNotification/internalSelectedNotification";

export const FETCH_INTERNAL_NOTIFICATION_LIST = "internalNotification/internalNotificationList";

export const FETCH_COUNT_ALL_UNREAD_NOTIFICATION =
  "internalNotification/countAllUnreadNotification";

export const FETCH_TOPIC_NOTIFICATION = "notification/topic";

export interface WatcherFetchNotificationList {
  type: string;
  payload: ParamListRequestPushNotificationModel;
}

export interface WatcherFetchGetSelectedNotification {
  type: string;
  payload: string;
}
