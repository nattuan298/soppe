import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PermissionFeatureModel, PermissionModel } from "src/types/permission.model";

interface InitialStateType {
  permissionList: PermissionModel[];
  allPermissions: any;
  homeFeaturePermission: PermissionFeatureModel;
  orderFeaturePermission: PermissionFeatureModel;
  inventoryFeaturePermission: PermissionFeatureModel;
  reviewApprovalFeaturePermission: PermissionFeatureModel;
  userManagementFeaturePermission: PermissionFeatureModel;
  internalUserManagementFeaturePermission: PermissionFeatureModel;
  rolePermissionManagementFeaturePermission: PermissionFeatureModel;
  newsArticleManagementFeaturePermission: PermissionFeatureModel;
  bannerManagementFeaturePermission: PermissionFeatureModel;
  sectionBannerSlideManagementFeaturePermission: PermissionFeatureModel;
  sectionProductSlideManagementFeaturePersmission: PermissionFeatureModel;
  homePageTemplateManagementFeaturePermission: PermissionFeatureModel;
  helpCenterManagementFeaturePermission: PermissionFeatureModel;
  platformInformationPermission: PermissionFeatureModel;
  pushNotificationManagementFeaturePermission: PermissionFeatureModel;
  platformStatisticPermission: PermissionFeatureModel;
  userAccessHistoryPermission: PermissionFeatureModel;
  dataExportHistoryPermission: PermissionFeatureModel;
  categoriesManagementFeaturePermission: PermissionFeatureModel;
  couponManagementFeaturePermission: PermissionFeatureModel;
  internalUserAccessHistory: PermissionFeatureModel;
  loading: boolean;
}

const initialState: InitialStateType = {
  permissionList: [],
  allPermissions: {},
  homeFeaturePermission: {
    access: "",
    export: "",
  },
  orderFeaturePermission: {
    access: "",
    update: "",
  },
  inventoryFeaturePermission: {
    access: "",
    update: "",
  },
  reviewApprovalFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  userManagementFeaturePermission: {
    access: "",
    update: "",
  },
  internalUserManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  rolePermissionManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  newsArticleManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  bannerManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  sectionBannerSlideManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  sectionProductSlideManagementFeaturePersmission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  homePageTemplateManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  helpCenterManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  platformInformationPermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  pushNotificationManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  platformStatisticPermission: {
    access: "",
    export: "",
  },
  userAccessHistoryPermission: {
    access: "",
    export: "",
  },
  dataExportHistoryPermission: {
    access: "",
    export: "",
  },
  categoriesManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  couponManagementFeaturePermission: {
    access: "",
    create: "",
    update: "",
    delete: "",
  },
  internalUserAccessHistory: {
    access: "",
    create: "",
  },
  loading: true,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    getHomeFeaturePermissions: (state, action) => {
      state.homeFeaturePermission = action.payload;
    },
    getOrderFeaturePermissions: (state, action) => {
      state.orderFeaturePermission = action.payload;
    },
    getInventoryFeaturePermissions: (state, action) => {
      state.inventoryFeaturePermission = action.payload;
    },
    getReviewApprovalFeaturePermissions: (state, action) => {
      state.reviewApprovalFeaturePermission = action.payload;
    },
    getUserManagementFeaturePermissions: (state, action) => {
      state.userManagementFeaturePermission = action.payload;
    },
    getInternalUserManagementFeaturePermission: (state, action) => {
      state.internalUserManagementFeaturePermission = action.payload;
    },
    getRolePermissionManagementFeaturePermission: (state, action) => {
      state.rolePermissionManagementFeaturePermission = action.payload;
    },
    getNewsArticleManagementFeaturePermission: (state, action) => {
      state.newsArticleManagementFeaturePermission = action.payload;
    },
    getBannerManagementFeaturePermission: (state, action) => {
      state.bannerManagementFeaturePermission = action.payload;
    },
    getSectionBannerSlideManagementFeaturePermission: (state, action) => {
      state.sectionBannerSlideManagementFeaturePermission = action.payload;
    },
    getSectionProductSlideManagementFeaturePersmission: (state, action) => {
      state.sectionProductSlideManagementFeaturePersmission = action.payload;
    },
    getHomePageTemplateManagementFeaturePermission: (state, action) => {
      state.homePageTemplateManagementFeaturePermission = action.payload;
    },
    getHelpCenterManagementFeaturePermission: (state, action) => {
      state.helpCenterManagementFeaturePermission = action.payload;
    },
    getPlatformInformationPermission: (state, action) => {
      state.platformInformationPermission = action.payload;
    },
    getPushNotificationManagementFeaturePermission: (state, action) => {
      state.pushNotificationManagementFeaturePermission = action.payload;
    },
    getPlatformStatisticPermission: (state, action) => {
      state.platformStatisticPermission = action.payload;
    },
    getUserAccessHistoryPermission: (state, action) => {
      state.userAccessHistoryPermission = action.payload;
    },
    getDataExportHistory: (state, action) => {
      state.dataExportHistoryPermission = action.payload;
    },
    getCategoriesManagementFeaturePermission: (state, action) => {
      state.categoriesManagementFeaturePermission = action.payload;
    },
    setCouponManagementFeaturePermission: (state, action) => {
      state.couponManagementFeaturePermission = action.payload;
    },
    setInternalUserAccessHistory: (state, action) => {
      state.internalUserAccessHistory = action.payload;
    },
    resetPermissions: (state) => {
      state.homeFeaturePermission = {};
      state.orderFeaturePermission = {};
      state.inventoryFeaturePermission = {};
      state.reviewApprovalFeaturePermission = {};
      state.userManagementFeaturePermission = {};
      state.internalUserManagementFeaturePermission = {};
      state.rolePermissionManagementFeaturePermission = {};
      state.newsArticleManagementFeaturePermission = {};
      state.bannerManagementFeaturePermission = {};
      state.sectionBannerSlideManagementFeaturePermission = {};
      state.sectionProductSlideManagementFeaturePersmission = {};
      state.homePageTemplateManagementFeaturePermission = {};
      state.helpCenterManagementFeaturePermission = {};
      state.platformInformationPermission = {};
      state.pushNotificationManagementFeaturePermission = {};
      state.platformStatisticPermission = {};
      state.userAccessHistoryPermission = {};
      state.dataExportHistoryPermission = {};
      state.categoriesManagementFeaturePermission = {};
      state.internalUserAccessHistory = {};
    },
    getPermissionListPending: (state) => {
      state.loading = true;
    },
    getPermissionListFulfilled: (state, action: PayloadAction<PermissionModel[]>) => {
      state.loading = false;
      state.permissionList = action.payload;
      const all: any = {};
      for (let i = 0; i < action.payload.length; i++) {
        all[action.payload[i].action] = action.payload[i];
      }
      state.allPermissions = all;
    },
    getPermissionListRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  getHomeFeaturePermissions,
  getOrderFeaturePermissions,
  getInventoryFeaturePermissions,
  getReviewApprovalFeaturePermissions,
  getUserManagementFeaturePermissions,
  getInternalUserManagementFeaturePermission,
  getRolePermissionManagementFeaturePermission,
  getNewsArticleManagementFeaturePermission,
  getBannerManagementFeaturePermission,
  getSectionBannerSlideManagementFeaturePermission,
  getSectionProductSlideManagementFeaturePersmission,
  getHomePageTemplateManagementFeaturePermission,
  getHelpCenterManagementFeaturePermission,
  getPlatformInformationPermission,
  getPushNotificationManagementFeaturePermission,
  getPlatformStatisticPermission,
  getUserAccessHistoryPermission,
  getDataExportHistory,
  getCategoriesManagementFeaturePermission,
  resetPermissions,
  setCouponManagementFeaturePermission,
  setInternalUserAccessHistory,
  getPermissionListFulfilled,
  getPermissionListPending,
  getPermissionListRejected,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
