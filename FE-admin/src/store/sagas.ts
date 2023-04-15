import { all, takeLatest } from "redux-saga/effects";
import { handleLogin } from "./authentication.action";
import { watcherFetchHomeDashboard } from "./dashboard.action";
import { watcherFetchBannerLoopList } from "./internal-banner-loop.action";
import { watcherFetchSelectedBannerLoop } from "./internal-selected-banner-loop.action";
import {
  watcherFetchBannerActiveSliceList,
  watcherFetchBannerSliceList,
} from "./internal-banner-slice.action";
import { watcherBannerSectionList, watcherBannerSectionSelected } from "./internal-banners.action";
import { watcherFetchBannerSectionLoopSelected } from "./internal-selected-banner-slice-loop.action";
import { watchFetchProductSectionList } from "./internal-product-section.action";
import {
  watcherFetchProductSectionLoopList,
  watcherFetchProductSectionLoopSelected,
  watcherFetchSectionActiveList,
} from "./internal-product-section-loop.action";
import {
  watcherFetchHomeTemplateList,
  watcherFetchHomeTemplateSelected,
} from "./template-home.action";
import {
  watcherFetchPlatformDashboard,
  watcherFetchReportIssue,
} from "./platform-dashboard.action";
import { watcherFetchUserHistoryList } from "./user-history.action";
import { watcherFetchInternalUserHistoryList } from "./internal-access-history.action";
import { watcherFetchDataExportHistoryList } from "./data-export-history.action";
import {
  watcherFetchGetOrderListType,
  watcherFetchOrderById,
  watcherFetchOrderDetailTrackingDetail,
} from "./order.action";
import {
  watcherCountAllUnreadNotification,
  watcherFetchSelectedNotification,
  watcherGetTopicNotification,
  watcherInternalNotificationList,
  watcherNotificationList,
} from "./notification.action";

import { FETCH_LOGIN } from "./authentication.type";
import { FETCH_DASHBOARD_ACTION } from "./dashboard.type";
import { FETCH_BANNER_LOOP_LIST_ACTION } from "./internal-banner-loop.type";
import { FETCH_BANNER_LOOP_ACTION } from "./internal-selected-banner-loop.type";
import {
  FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION,
  FETCH_BANNER_SLICE_LIST_ACTION,
} from "./internal-banner-slice.type";
import {
  FETCH_BANNER_SECTION_LIST,
  FETCH_BANNER_SECTION_SELECTED,
  FETCH_BANNER_SLICE_SECTION_LIST,
  FETCH_BANNER_SLICE_SECTION_SELECTED,
} from "./internal-banners.type";
import {
  handleChangeAvatar,
  handleChangePassword,
  handleDetailUser,
  handleUser,
} from "./internal-user.action";
import {
  FETCH_CHANGE_PASSWORD,
  FETCH_GET_DETAIL_INTERNAL_USER,
  FETCH_GET_INTERNAL_USER,
  FETCH_UPLOAD_AVATAR,
} from "./internal-user.type";
import {
  watcherDetailRole,
  watcherListAllRoleActive,
  watcherListRole,
  watcherListRoleActive,
} from "./role.action";
import {
  FETCH_GET_All_ROLE_ACTIVE,
  FETCH_GET_DETAIL_ROLE,
  FETCH_GET_ROLE,
  FETCH_GET_ROLE_ACTIVE,
} from "./role.type";
import { FETCH_BANNER_SLICE_LOOP_SELECTED } from "./internal-selected-banner-slice-loop.type";
import { FETCH_PRODUCT_SECTION_LIST } from "./internal-product-section.type";
import {
  FETCH_PRODUCT_SECTION_ACTIVE,
  FETCH_PRODUCT_SECTION_LOOP_LIST,
  FETCH_PRODUCT_SECTION_LOOP_SELECTED,
} from "./internal-product-section-loop.type";
import { FETCH_HOME_TEMPLATE_LIST, FETCH_HOME_TEMPLATE_SELECTED } from "./template-home.type";
import { FETCH_PLATFORM_DASHBOARD, FETCH_REPORT_ISSUES } from "./platform-dashboard.type";
import { FETCH_USER_HISTORY_LIST } from "./user-history.type";
import { FETCH_INTERNAL_USER_HISTORY_LIST } from "./internal-access-history.type";
import { FETCH_DATA_EXPORT_HISTORY } from "./data-export-history.type";
import { FETCH_GET_PRODUCT, FETCH_GET_PRODUCT_DETAIL } from "./inventory-management.type";
import { watcherProductDetail, watcherProductList } from "./inventory-management.action";
import { FETCH_GET_CATEGORY_FAQ, FETCH_GET_DETAIL_FAQ, FETCH_GET_FAQ } from "./faq.type";
import { watcherCategoryFaq, watcherDetailFaq, watcherListFaq } from "./faq.action";
import { FETCH_GENERATE, watcherGenerateAuthentication } from "./googleAuthen.action";
import {
  FETCH_GET_DELETE_FAQ,
  FETCH_GET_DETAIL_CATEGORY,
  FETCH_GET_FAQ_CATEGORY,
} from "./faq-category.type";
import {
  watcherDeleteCategory,
  watcherDetailCategoryAction,
  watcherListCategoryAction,
} from "./faq-category.action";

import {
  FETCH_GET_ODDER_BY_ID,
  FETCH_GET_ORDER_LIST,
  FETCH_GET_ORDER_TRACKING_DETAIL,
} from "./order.type";
import {
  FETCH_COUNT_ALL_UNREAD_NOTIFICATION,
  FETCH_INTERNAL_NOTIFICATION_LIST,
  FETCH_NOTIFICATION_LIST,
  FETCH_SELECTED_NOTIFICATION,
  FETCH_TOPIC_NOTIFICATION,
} from "./notification.type";
import {
  FETCH_ADD_NEWS,
  FETCH_DELETE_NEWS,
  FETCH_GET_ALL_CATEGORY_NEWS,
  FETCH_GET_CATEGORY_NEWS,
  FETCH_UPDATE_NEWS,
} from "./news-article-categories.type";
import {
  watcherAddNews,
  watcherDeleteNews,
  watcherGetAllCategoryNews,
  watcherGetListCategoryArt,
  watcherUpdateNews,
} from "./news-article-categories.action";
import { FETCH_GET_REVIEW, watcherGetListReview } from "./review.action";
import { FETCH_CATEGORY, watcherCategory } from "./category.ation";
import {
  FETCH_ADD_COUPON_ACTION,
  FETCH_DELETE_COUPON_ACTION,
  FETCH_GET_COUPON_ACTION,
  FETCH_GET__DETAIL_COUPON_ACTION,
  FETCH_HISTORY_COUPON_ACTION,
  FETCH_UPDATE_COUPON_ACTION,
} from "./coupons.type";
import {
  watcherAddCoupon,
  watcherDeleteCoupon,
  watcherDetailCoupon,
  watcherGetCoupon,
  watcherHistoryCoupon,
  watcherUpdateCoupon,
} from "./coupons.action";
import {
  FETCH_ADD_NEWS_ARTICLE,
  FETCH_DELETE_NEWS_ARTICLE,
  FETCH_GET_DETAIL_NEWS,
  FETCH_GET_NEWS,
  FETCH_UPDATE_NEWS_ARTICLE,
} from "./news-articles.type";
import {
  watcherAddNewsArticle,
  watcherDeleteNewsArticle,
  watcherDetailNews,
  watcherListNews,
  watcherUpdateNewsArticle,
} from "./news-articles.action";
import { FETCH_GET_DETAIL_USER, FETCH_GET_USER } from "./user.type";
import { watcherGetUserId, watcherListUser } from "./user.action";
import { FETCH_MAC_PRICE, watcherMaxPriceAction } from "./max-price.action";
import {
  watcherFetchPostOTP,
  watcherFetchPostVerifyOtp,
} from "./reset-password/password-recovery.action";
import {
  FETCH_POST_SEND_OTP,
  FETCH_POST_VERIFY_OTP,
} from "./reset-password/password-recovery.type";
import { FETCH_GET_PERMISSION_LIST } from "./permission.type";
import { watcherGetPermissionList } from "./permission.action";

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_LOGIN, handleLogin),
    takeLatest(FETCH_DASHBOARD_ACTION, watcherFetchHomeDashboard),
    takeLatest(FETCH_BANNER_LOOP_LIST_ACTION, watcherFetchBannerLoopList),
    takeLatest(FETCH_BANNER_LOOP_ACTION, watcherFetchSelectedBannerLoop),
    takeLatest(FETCH_BANNER_SLICE_LIST_ACTION, watcherFetchBannerSliceList),
    takeLatest(FETCH_BANNER_SLICE_ACTIVE_LIST_ACTION, watcherFetchBannerActiveSliceList),
    takeLatest(FETCH_BANNER_SECTION_LIST, watcherBannerSectionList),
    takeLatest(FETCH_BANNER_SLICE_SECTION_LIST, watcherBannerSectionList),
    takeLatest(FETCH_BANNER_SECTION_SELECTED, watcherBannerSectionSelected),
    takeLatest(FETCH_BANNER_SLICE_SECTION_SELECTED, watcherBannerSectionSelected),
    takeLatest(FETCH_BANNER_SLICE_LOOP_SELECTED, watcherFetchBannerSectionLoopSelected),
    takeLatest(FETCH_PRODUCT_SECTION_LIST, watchFetchProductSectionList),
    takeLatest(FETCH_PRODUCT_SECTION_LOOP_LIST, watcherFetchProductSectionLoopList),
    takeLatest(FETCH_PRODUCT_SECTION_LOOP_SELECTED, watcherFetchProductSectionLoopSelected),
    takeLatest(FETCH_PRODUCT_SECTION_ACTIVE, watcherFetchSectionActiveList),
    takeLatest(FETCH_HOME_TEMPLATE_LIST, watcherFetchHomeTemplateList),
    takeLatest(FETCH_HOME_TEMPLATE_SELECTED, watcherFetchHomeTemplateSelected),
    takeLatest(FETCH_GET_INTERNAL_USER, handleUser),
    takeLatest(FETCH_GET_DETAIL_INTERNAL_USER, handleDetailUser),
    takeLatest(FETCH_CHANGE_PASSWORD, handleChangePassword),
    takeLatest(FETCH_UPLOAD_AVATAR, handleChangeAvatar),
    takeLatest(FETCH_GET_ROLE, watcherListRole),
    takeLatest(FETCH_GET_ROLE_ACTIVE, watcherListRoleActive),
    takeLatest(FETCH_GET_All_ROLE_ACTIVE, watcherListAllRoleActive),
    takeLatest(FETCH_GET_DETAIL_ROLE, watcherDetailRole),
    takeLatest(FETCH_PLATFORM_DASHBOARD, watcherFetchPlatformDashboard),
    takeLatest(FETCH_REPORT_ISSUES, watcherFetchReportIssue),
    takeLatest(FETCH_USER_HISTORY_LIST, watcherFetchUserHistoryList),
    takeLatest(FETCH_INTERNAL_USER_HISTORY_LIST, watcherFetchInternalUserHistoryList),
    takeLatest(FETCH_DATA_EXPORT_HISTORY, watcherFetchDataExportHistoryList),
    takeLatest(FETCH_GET_PRODUCT, watcherProductList),
    takeLatest(FETCH_GET_PRODUCT_DETAIL, watcherProductDetail),
    takeLatest(FETCH_GET_FAQ, watcherListFaq),
    takeLatest(FETCH_GET_DETAIL_FAQ, watcherDetailFaq),
    takeLatest(FETCH_GET_CATEGORY_FAQ, watcherCategoryFaq),
    takeLatest(FETCH_GENERATE, watcherGenerateAuthentication),
    takeLatest(FETCH_GET_FAQ_CATEGORY, watcherListCategoryAction),
    takeLatest(FETCH_GET_DETAIL_CATEGORY, watcherDetailCategoryAction),
    takeLatest(FETCH_GET_DELETE_FAQ, watcherDeleteCategory),
    takeLatest(FETCH_GET_ORDER_LIST, watcherFetchGetOrderListType),
    takeLatest(FETCH_GET_ODDER_BY_ID, watcherFetchOrderById),
    takeLatest(FETCH_GET_ORDER_TRACKING_DETAIL, watcherFetchOrderDetailTrackingDetail),
    takeLatest(FETCH_NOTIFICATION_LIST, watcherNotificationList),
    takeLatest(FETCH_SELECTED_NOTIFICATION, watcherFetchSelectedNotification),
    takeLatest(FETCH_INTERNAL_NOTIFICATION_LIST, watcherInternalNotificationList),
    takeLatest(FETCH_COUNT_ALL_UNREAD_NOTIFICATION, watcherCountAllUnreadNotification),
    takeLatest(FETCH_TOPIC_NOTIFICATION, watcherGetTopicNotification),
    takeLatest(FETCH_GET_CATEGORY_NEWS, watcherGetListCategoryArt),
    takeLatest(FETCH_GET_ALL_CATEGORY_NEWS, watcherGetAllCategoryNews),
    takeLatest(FETCH_ADD_NEWS, watcherAddNews),
    takeLatest(FETCH_UPDATE_NEWS, watcherUpdateNews),
    takeLatest(FETCH_DELETE_NEWS, watcherDeleteNews),
    takeLatest(FETCH_GET_REVIEW, watcherGetListReview),
    takeLatest(FETCH_CATEGORY, watcherCategory),
    takeLatest(FETCH_GET_COUPON_ACTION, watcherGetCoupon),
    takeLatest(FETCH_GET__DETAIL_COUPON_ACTION, watcherDetailCoupon),
    takeLatest(FETCH_ADD_COUPON_ACTION, watcherAddCoupon),
    takeLatest(FETCH_UPDATE_COUPON_ACTION, watcherUpdateCoupon),
    takeLatest(FETCH_DELETE_COUPON_ACTION, watcherDeleteCoupon),
    takeLatest(FETCH_HISTORY_COUPON_ACTION, watcherHistoryCoupon),
    takeLatest(FETCH_GET_NEWS, watcherListNews),
    takeLatest(FETCH_GET_DETAIL_NEWS, watcherDetailNews),
    takeLatest(FETCH_GET_USER, watcherListUser),
    takeLatest(FETCH_GET_DETAIL_USER, watcherGetUserId),
    takeLatest(FETCH_MAC_PRICE, watcherMaxPriceAction),
    takeLatest(FETCH_ADD_NEWS_ARTICLE, watcherAddNewsArticle),
    takeLatest(FETCH_UPDATE_NEWS_ARTICLE, watcherUpdateNewsArticle),
    takeLatest(FETCH_DELETE_NEWS_ARTICLE, watcherDeleteNewsArticle),
    takeLatest(FETCH_POST_SEND_OTP, watcherFetchPostOTP),
    takeLatest(FETCH_POST_VERIFY_OTP, watcherFetchPostVerifyOtp),
    takeLatest(FETCH_GET_PERMISSION_LIST, watcherGetPermissionList),
  ]);
}
