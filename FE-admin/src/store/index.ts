import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import routerParamsSlice from "./router-params.slice";
import internalUserSlice from "./internal-user.slice";
import rolesSlice from "./role.slice";
import permissionSlice from "./permission.slice";
import internalBannerLoopSlice from "./internal-banner-loop.slice";
import internalBannerSlice from "./internal-banners.slice";
import internalSelectedBannerLoopSlice from "./internal-selected-banner-loop.slice";
import internalSelectedBannerSectionLoopSlice from "./internal-selected-banner-slice-loop.slice";
import internalBannersSlice from "./internal-banner-slice.slice";
import inventoryManagementSlice from "./inventory-management.slice";
import categorySlice from "./category.slice";
import authenticationSlice from "./authentication.slice";
import userSlice from "./user.slice";
import faqSlice from "./faq.slice";
import ordersSlice from "./order.slice";
import reviewSlice from "./review.slice";
import { sendOtpSlice } from "./reset-password/password-recovery-1.slice";
import { verifyOtpSlice } from "./reset-password/password-recovery-2.slice";
import { resetPasswordSlice } from "./reset-password/change-password.slice";
import {
  emailChangePasswordSlice,
  verifyTokenSlice,
} from "./reset-password/email-change-password.slice";
import internalProductSectionLoopSlice from "./internal-product-section-loop.slice";
import internalProductSectionSlice from "./internal-product-section.slice";
import templatehomeSlice from "./template-home.slice";
import notificationSlice from "./notification.slice";
import googleAuthenSlice from "./googleAuthen.slice";
import newsArtCatesSlice from "./news-article-categories.slice";
import newsArtSlice from "./news-articles.slice";
import couponSlice from "./coupons.slice";
import userHistorySlice from "./user-history.slice";
import dashboardSlice from "./dashboard.slice";
import internalUserHistorySlice from "./internal-access-history.slice";
import platformDashboardSlice from "./platform-dashboard.slice";
import dataExportHistorySlice from "./data-export-history.slice";
import faqCategorySlice from "./faq-category.slice";
import maxPriceLocationSlice from "./max-price.slice";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    routerParams: routerParamsSlice,
    internalUsers: internalUserSlice,
    roles: rolesSlice,
    permissions: permissionSlice,
    internalBannerLoop: internalBannerLoopSlice,
    internalBanners: internalBannerSlice,
    internalBannersSlice,
    internalSelectedBannerSectionLoop: internalSelectedBannerSectionLoopSlice,
    internalSelectedBannerLoop: internalSelectedBannerLoopSlice,
    inventoryManagements: inventoryManagementSlice,
    categories: categorySlice,
    authentications: authenticationSlice,
    users: userSlice,
    faq: faqSlice,
    orders: ordersSlice,
    review: reviewSlice,
    sendOtp: sendOtpSlice.reducer,
    verifyOtp: verifyOtpSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    emailChangePassword: emailChangePasswordSlice.reducer,
    verifyToken: verifyTokenSlice.reducer,
    internalProductSectionLoop: internalProductSectionLoopSlice,
    internalProductSection: internalProductSectionSlice,
    internalHometemplate: templatehomeSlice,
    notification: notificationSlice,
    GoogleAuthen: googleAuthenSlice,
    newsArtCates: newsArtCatesSlice,
    newsArt: newsArtSlice,
    coupons: couponSlice,
    userHistory: userHistorySlice,
    dashboard: dashboardSlice,
    internalUserHistory: internalUserHistorySlice,
    platformDashboard: platformDashboardSlice,
    dataExportHistory: dataExportHistorySlice,
    faqCategory: faqCategorySlice,
    maxPriceLocation: maxPriceLocationSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: true }), sagaMiddleware],
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
