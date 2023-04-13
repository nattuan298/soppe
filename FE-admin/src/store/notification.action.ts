import { put } from "redux-saga/effects";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { InternalNotificationModel, NotificationModel } from "src/types/notification.model";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestPushNotificationModel } from "src/types/params-list-request.model";
import {
  FETCH_COUNT_ALL_UNREAD_NOTIFICATION,
  FETCH_INTERNAL_NOTIFICATION_LIST,
  FETCH_NOTIFICATION_LIST,
  FETCH_SELECTED_NOTIFICATION,
  FETCH_TOPIC_NOTIFICATION,
  WatcherFetchGetSelectedNotification,
  WatcherFetchNotificationList,
} from "./notification.type";

import {
  getCountAllUnreadNotificationFulfilled,
  getTopicNotificationFulfilled,
  internalNotificationFulfilled,
  internalNotificationPending,
  internalNotificationRejected,
  pushNotificationFulfilled,
  pushNotificationPending,
  pushNotificationRejected,
  pushSelectedNotificationFulfilled,
} from "./notification.slice";

const getPushNotificationList = async (params: ParamListRequestPushNotificationModel) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/notification-management`,
    {
      params,
    },
  )) as ApiListModel<NotificationModel>;
  return response;
};

const getSelectedPushNotification = async (id: string) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/notification-management/${id}`,
  )) as NotificationModel;
  return response;
};

const getInternalNotifications = async (params: ParamListRequestPushNotificationModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/notifications`, {
    params,
  })) as ApiListModel<InternalNotificationModel>;
  return response;
};

const getCountAllUnreadNotification = async () => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/notifications/list`,
  )) as number;
  return response;
};

const getTopicNotification = async () => {
  const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/notifications/topic`);
  return response;
};

export function* watcherNotificationList(action: WatcherFetchNotificationList) {
  try {
    yield put(pushNotificationPending());
    const { payload } = action;
    const response: Promise<ApiListModel<NotificationModel>> = yield getPushNotificationList(
      payload,
    );
    yield put(pushNotificationFulfilled(response));
  } catch (error) {
    yield put(pushNotificationRejected());
  }
}

export function* watcherFetchSelectedNotification(action: WatcherFetchGetSelectedNotification) {
  try {
    yield put(pushNotificationPending());
    const { payload } = action;
    const response: Promise<NotificationModel> = yield getSelectedPushNotification(payload);
    yield put(pushSelectedNotificationFulfilled(response));
  } catch (error) {
    yield put(pushNotificationRejected());
  }
}

export function* watcherInternalNotificationList(action: WatcherFetchNotificationList) {
  try {
    yield put(internalNotificationPending());
    const { payload } = action;
    const response: Promise<ApiListModel<InternalNotificationModel>> =
      yield getInternalNotifications(payload);
    yield put(internalNotificationFulfilled(response));
  } catch (error) {
    yield put(internalNotificationRejected());
  }
}

export function* watcherCountAllUnreadNotification() {
  try {
    const response: Promise<ApiListModel<number>> = yield getCountAllUnreadNotification();
    yield put(getCountAllUnreadNotificationFulfilled(response));
  } catch (error) {}
}

export function* watcherGetTopicNotification() {
  try {
    const response: Promise<ApiListModel<string>> = yield getTopicNotification();
    yield put(getTopicNotificationFulfilled(response));
  } catch (error) {}
}

export const fetchNotificationList = (payload: ParamListRequestPushNotificationModel) => ({
  type: FETCH_NOTIFICATION_LIST,
  payload,
});

export const fetchSelectedNotification = (payload: string) => ({
  type: FETCH_SELECTED_NOTIFICATION,
  payload,
});

export const fetchInternalNotificationList = (payload: ParamListRequestPushNotificationModel) => ({
  type: FETCH_INTERNAL_NOTIFICATION_LIST,
  payload,
});

export const fetchCountAllUnreadNotification = () => ({
  type: FETCH_COUNT_ALL_UNREAD_NOTIFICATION,
});

export const fetchGetTopicNotification = () => ({
  type: FETCH_TOPIC_NOTIFICATION,
});
