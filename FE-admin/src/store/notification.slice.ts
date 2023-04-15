import { createSlice } from "@reduxjs/toolkit";

import { InternalNotificationModel, NotificationModel } from "src/types/notification.model";
import { ApiListModel } from "src/types/api-list.model";

// export const getPushNotificationList = createAsyncThunk(
//   "internalNotification/pushNotificationList",
//   async (params: ParamListRequestPushNotificationModel) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/notification-management`,
//       {
//         params,
//       },
//     )) as ApiListModel<NotificationModel>;
//     return response;
//   },
// );

// export const getSelectedPushNotification = createAsyncThunk(
//   "internalNotification/internalSelectedNotification",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/notification-management/${id}`,
//     )) as NotificationModel;
//     return response;
//   },
// );

// export const getInternalNotifications = createAsyncThunk(
//   "internalNotification/internalNotificationList",
//   async (params: ParamListRequestPushNotificationModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/notifications`, {
//       params,
//     })) as ApiListModel<InternalNotificationModel>;
//     return response;
//   },
// );

// export const getCountAllUnreadNotification = createAsyncThunk(
//   "internalNotification/countAllUnreadNotification",
//   async () => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/notifications/list`,
//     )) as number;
//     return response;
//   },
// );

// export const getTopicNotification = createAsyncThunk("notification/topic", async () => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/notifications/topic`);
//   return response;
// });

interface InitialStateType {
  pushNotifications: ApiListModel<NotificationModel>;
  selectedPushNotification: NotificationModel | null;
  pushLoading: boolean;
  internalNotifications: ApiListModel<InternalNotificationModel>;
  internalLoading: boolean;
  countAllUnreadNotifications: number;
  topic: string;
}

const initialState: InitialStateType = {
  pushNotifications: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  selectedPushNotification: null,
  internalNotifications: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  pushLoading: false,
  internalLoading: false,
  countAllUnreadNotifications: 0,
  topic: "",
};

const updatedNotifications = (data: Array<InternalNotificationModel>, id?: string) =>
  data.map((notify: InternalNotificationModel) => {
    if (!id || notify._id === id) {
      return { ...notify, state: "Read" };
    }
    return notify;
  });

const notificationManagementSlice = createSlice({
  name: "internalNotification",
  initialState,
  reducers: {
    clearSelectedPushNotification: (state) => {
      state.selectedPushNotification = null;
    },
    readPageNotification: (state, action) => {
      const { internalNotifications } = state;
      const newDataPage = updatedNotifications(internalNotifications.data, action.payload);
      state.internalNotifications = { ...internalNotifications, data: newDataPage };
    },
    readAllNotifications: (state) => {
      const { internalNotifications } = state;
      const newDataPage = updatedNotifications(internalNotifications.data);
      state.internalNotifications = { ...internalNotifications, data: newDataPage };
    },
    incressCountNotification: (state) => {
      state.countAllUnreadNotifications += 1;
    },
    resetNotification: (state) => {
      state.internalNotifications = {
        data: [],
        total: 0,
        page: 0,
        limit: 0,
      };
    },
    pushNotificationPending: (state) => {
      state.pushLoading = true;
    },
    pushNotificationFulfilled: (state, action) => {
      state.pushLoading = false;
      state.pushNotifications = action.payload;
    },
    pushNotificationRejected: (state) => {
      state.pushLoading = false;
    },
    pushSelectedNotificationFulfilled: (state, action) => {
      state.pushLoading = false;
      state.selectedPushNotification = action.payload;
    },
    internalNotificationPending: (state) => {
      state.internalLoading = true;
    },
    internalNotificationFulfilled: (state, action) => {
      state.internalLoading = false;
      if (action.payload.page === 1) {
        state.internalNotifications = action.payload;
      } else {
        state.internalNotifications = {
          ...state.internalNotifications,
          data: [...state.internalNotifications.data, ...action.payload.data],
        };
      }
    },
    internalNotificationRejected: (state) => {
      state.internalLoading = false;
    },
    getCountAllUnreadNotificationFulfilled: (state, action) => {
      state.countAllUnreadNotifications = action.payload;
    },
    getTopicNotificationFulfilled: (state, action) => {
      state.topic = action.payload.topic;
    },
  },
  extraReducers: {
    // [getPushNotificationList.pending.toString()]: (state) => {
    //   state.pushLoading = true;
    // },
    // [getPushNotificationList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<NotificationModel>>,
    // ) => {
    //   state.pushLoading = false;
    //   state.pushNotifications = action.payload;
    // },
    // [getPushNotificationList.rejected.toString()]: (state) => {
    //   state.pushLoading = false;
    // },
    // [getSelectedPushNotification.pending.toString()]: (state) => {
    //   state.pushLoading = true;
    // },
    // [getSelectedPushNotification.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<NotificationModel>,
    // ) => {
    //   state.pushLoading = false;
    //   state.selectedPushNotification = action.payload;
    // },
    // [getSelectedPushNotification.rejected.toString()]: (state) => {
    //   state.pushLoading = false;
    // },
    // [getCountAllUnreadNotification.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<number>,
    // ) => {
    //   state.countAllUnreadNotifications = action.payload;
    // },
    // [getInternalNotifications.pending.toString()]: (state) => {
    //   state.internalLoading = true;
    // },
    // [getInternalNotifications.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<InternalNotificationModel>>,
    // ) => {
    //   state.internalLoading = false;
    //   if (action.payload.page === 1) {
    //     state.internalNotifications = action.payload;
    //   } else {
    //     state.internalNotifications = {
    //       ...state.internalNotifications,
    //       data: [...state.internalNotifications.data, ...action.payload.data],
    //     };
    //   }
    // },
    // [getInternalNotifications.rejected.toString()]: (state) => {
    //   state.internalLoading = false;
    // },
    // [getTopicNotification.fulfilled.toString()]: (state, action) => {
    //   state.topic = action.payload.topic;
    // },
  },
});

export const {
  clearSelectedPushNotification,
  readPageNotification,
  readAllNotifications,
  incressCountNotification,
  resetNotification,
  pushNotificationFulfilled,
  pushNotificationPending,
  pushNotificationRejected,
  pushSelectedNotificationFulfilled,
  internalNotificationFulfilled,
  internalNotificationPending,
  internalNotificationRejected,
  getCountAllUnreadNotificationFulfilled,
  getTopicNotificationFulfilled,
} = notificationManagementSlice.actions;

export default notificationManagementSlice.reducer;
