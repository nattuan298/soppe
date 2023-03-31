import { put } from "redux-saga/effects";

import paramsSerializer from "src/lib/paramsSerializer";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import {
  ApiListModel,
  FETCH_COMMON_NOTIFICATIONS,
  FETCH_GET_TOPIC,
  FETCH_NOTIFICATION_COUNT_ALL_UNREAD,
  FETCH_PAGE_NOTIFiCATION,
  NotificationModel,
  ParamsNotificationAPI,
  WatcherFetchPageNotification,
} from "./type";
import {
  getCommonNotificationsFulfilled,
  getCommonNotificationsPending,
  getCommonNotificationsRejected,
  getCountAllUnreadNotificationsFulfilled,
  getPageNotificationsFulfilled,
  getPageNotificationsPending,
  getPageNotificationsRejected,
  getTopicNotificationFulfilled,
} from "./notification.slice";

const getNotifications = async (config: ParamsNotificationAPI) => {
  const params = paramsSerializer(config);
  const paramsURL = params !== "" ? `?${params}` : "";
  const response = await axios.get(`${apiRoute.notifications.getNotifications}${paramsURL}`);
  return response;
};

const getPageNotifications = async (config: ParamsNotificationAPI) => {
  const response = await getNotifications(config);
  return response.data;
};

const getCountAllUnreadNotifications = async () => {
  const response = await axios.get(`${apiRoute.notifications.countAllUnreadNotifications}`);
  return response.data;
};

const getTopicNotification = async () => {
  const response = await axios.get(`${apiRoute.notifications.topic}`);
  return response.data;
};

export const getCommonNotifications = async (config: ParamsNotificationAPI) => {
  const response = await getNotifications(config);
  return response.data;
};

export function* watcherFetchPageNotifications(action: WatcherFetchPageNotification) {
  try {
    yield put(getPageNotificationsPending());
    const { payload } = action;
    const response: Promise<ApiListModel<NotificationModel>> = yield getPageNotifications(payload);
    yield put(getPageNotificationsFulfilled(response));
  } catch (error) {
    yield put(getPageNotificationsRejected());
  }
}

export function* watcherFetchCommonNotifications(action: WatcherFetchPageNotification) {
  try {
    yield put(getCommonNotificationsPending());
    const { payload } = action;
    const response: Promise<ApiListModel<NotificationModel>> = yield getCommonNotifications(
      payload,
    );
    yield put(getCommonNotificationsFulfilled(response));
  } catch (error) {
    yield put(getCommonNotificationsRejected());
  }
}

export function* watcherFetchCountAllUnreadNotifications() {
  try {
    const response: Promise<number> = yield getCountAllUnreadNotifications();
    yield put(getCountAllUnreadNotificationsFulfilled(response));
  } catch (error) {}
}

export function* watcherFetchGetTopic() {
  try {
    const response: Promise<{ topic: string; notifyStatus: boolean }> =
      yield getTopicNotification();
    yield put(getTopicNotificationFulfilled(response));
  } catch (error) {}
}

export const fetchPageNotifications = (payload: ParamsNotificationAPI) => ({
  type: FETCH_PAGE_NOTIFiCATION,
  payload,
});

export const fetchCountNotificationUnread = () => ({
  type: FETCH_NOTIFICATION_COUNT_ALL_UNREAD,
});

export const fetchGetTopic = () => ({
  type: FETCH_GET_TOPIC,
});

export const fetchCommonNotifications = (payload: ParamsNotificationAPI) => ({
  type: FETCH_COMMON_NOTIFICATIONS,
  payload,
});
