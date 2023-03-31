import { createSlice } from "@reduxjs/toolkit";

import paramsSerializer from "src/lib/paramsSerializer";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { ApiListModel, NotificationModel, ParamsNotificationAPI } from "./type";

export const getNotifications = async (config: ParamsNotificationAPI) => {
  const params = paramsSerializer(config);
  const paramsURL = params !== "" ? `?${params}` : "";
  const response = await axios.get(`${apiRoute.notifications.getNotifications}${paramsURL}`);
  return response;
};

export const readNotification = async (id: string) => {
  const response = await axios.put(`${apiRoute.notifications.readNotifications}`, { id: [id] });
  return response;
};

export const readAllNotification = async () => {
  const response = await axios.put(`${apiRoute.notifications.readAllNotifications}`);
  return response;
};

// export const getPageNotifications = createAsyncThunk(
//   "notifications/notifications-page",
//   async (config: ParamsNotificationAPI) => {
//     const response = await getNotifications(config);
//     return response.data;
//   },
// );

// export const getCommonNotifications = createAsyncThunk(
//   "notifications/notifications-common",
//   async (config: ParamsNotificationAPI) => {
//     const response = await getNotifications(config);
//     return response.data;
//   },
// );

// export const getCountAllUnreadNotifications = createAsyncThunk(
//   "notification/count-all-unread",
//   async () => {
//     const response = await axios.get(`${apiRoute.notifications.countAllUnreadNotifications}`);
//     return response.data;
//   },
// );

// export const getTopicNotification = createAsyncThunk("notification/topic", async () => {
//   const response = await axios.get(`${apiRoute.notifications.topic}`);
//   return response.data;
// });
interface InitialState {
  notificationPage: ApiListModel<NotificationModel>;
  notificaitonCommon: ApiListModel<NotificationModel>;
  loadingPage: boolean;
  loadingCommon: boolean;
  countUnreadCommon: number;
  topic: string;
  notifyStatus: boolean;
}

const initialState: InitialState = {
  notificationPage: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  notificaitonCommon: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  topic: "",
  notifyStatus: false,
  loadingPage: false,
  loadingCommon: false,
  countUnreadCommon: 0,
};

const updatedNotifications = (data: Array<NotificationModel>, id?: string) =>
  data.map((notify: NotificationModel) => {
    if (!id || notify._id === id) {
      return { ...notify, state: "Read" };
    }
    return notify;
  });

export const NotificationsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    readPageNotification: (state, action) => {
      const { notificationPage, notificaitonCommon } = state;
      const newDataPage = updatedNotifications(notificationPage.data, action.payload);
      const newDataCommon = updatedNotifications(notificaitonCommon.data, action.payload);
      state.notificationPage = { ...notificationPage, data: newDataPage };
      state.notificaitonCommon = { ...notificaitonCommon, data: newDataCommon };
    },
    readAllNotifications: (state) => {
      const { notificationPage, notificaitonCommon } = state;
      const newDataPage = updatedNotifications(notificationPage.data);
      const newDataCommon = updatedNotifications(notificaitonCommon.data);
      state.notificationPage = { ...notificationPage, data: newDataPage };
      state.notificaitonCommon = { ...notificaitonCommon, data: newDataCommon };
    },
    pushNotification: (state) => {
      state.countUnreadCommon += 1;
    },
    setNotifyStatus: (state, action) => {
      state.notifyStatus = action.payload;
    },
    getPageNotificationsPending: (state) => {
      state.loadingPage = true;
    },
    getPageNotificationsFulfilled: (state, action) => {
      state.loadingPage = false;
      if (action.payload.page === 1) {
        state.notificationPage = action.payload;
      } else {
        state.notificationPage = {
          ...state.notificationPage,
          data: [...state.notificationPage.data, ...action.payload.data],
        };
      }
    },
    getPageNotificationsRejected: (state) => {
      state.loadingPage = false;
    },
    getCountAllUnreadNotificationsFulfilled: (state, action) => {
      state.countUnreadCommon = action.payload;
    },
    getTopicNotificationFulfilled: (state, action) => {
      state.topic = action.payload.topic;
      state.notifyStatus = action.payload.notifyStatus;
    },
    getCommonNotificationsPending: (state) => {
      state.loadingCommon = true;
    },
    getCommonNotificationsFulfilled: (state, action) => {
      state.loadingCommon = false;
      if (action.payload.page === 1) {
        state.notificaitonCommon = action.payload;
      } else {
        state.notificaitonCommon = {
          ...state.notificaitonCommon,
          data: [...state.notificaitonCommon.data, ...action.payload.data],
        };
      }
    },
    getCommonNotificationsRejected: (state) => {
      state.loadingCommon = false;
    },
  },
  extraReducers: {
    // [getPageNotifications.pending.toString()]: (state) => {
    //   state.loadingPage = true;
    // },
    // [getPageNotifications.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<NotificationModel>>,
    // ) => {
    //   state.loadingPage = false;
    //   if (action.payload.page === 1) {
    //     state.notificationPage = action.payload;
    //   } else {
    //     state.notificationPage = {
    //       ...state.notificationPage,
    //       data: [...state.notificationPage.data, ...action.payload.data],
    //     };
    //   }
    // },
    // [getPageNotifications.rejected.toString()]: (state) => {
    //   state.loadingPage = false;
    // },
    // [getCountAllUnreadNotifications.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<number>,
    // ) => {
    //   state.countUnreadCommon = action.payload;
    // },
    // [getCommonNotifications.pending.toString()]: (state) => {
    //   state.loadingCommon = true;
    // },
    // [getCommonNotifications.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<NotificationModel>>,
    // ) => {
    //   state.loadingCommon = false;
    //   if (action.payload.page === 1) {
    //     state.notificaitonCommon = action.payload;
    //   } else {
    //     state.notificaitonCommon = {
    //       ...state.notificaitonCommon,
    //       data: [...state.notificaitonCommon.data, ...action.payload.data],
    //     };
    //   }
    // },
    // [getCommonNotifications.rejected.toString()]: (state) => {
    //   state.loadingCommon = false;
    // },
    // [getTopicNotification.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<{ topic: string; notifyStatus: boolean }>,
    // ) => {
    //   state.topic = action.payload.topic;
    //   state.notifyStatus = action.payload.notifyStatus;
    // },
  },
});

export const {
  readAllNotifications,
  readPageNotification,
  pushNotification,
  setNotifyStatus,
  getPageNotificationsPending,
  getPageNotificationsFulfilled,
  getPageNotificationsRejected,
  getCountAllUnreadNotificationsFulfilled,
  getTopicNotificationFulfilled,
  getCommonNotificationsFulfilled,
  getCommonNotificationsPending,
  getCommonNotificationsRejected,
} = NotificationsSlice.actions;
