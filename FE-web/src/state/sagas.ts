import { all, takeLatest } from "redux-saga/effects";
import { getDirectSponsorAnalysisActions } from "src/feature/direct-sponsor-analysis/direct-sponsor-analysis.action";
import { DIRECT_SPONSOR_ANALYSIS } from "src/feature/direct-sponsor-analysis/type";
import { getExpiredMemberListActions } from "src/feature/expired-member-list/expired-member-list.actions";
import { GET_EXPRIRE_MEMBER_LIST } from "src/feature/expired-member-list/types";
import {
  deletetFavoriteProductAction,
  favoriteProductAction,
} from "src/feature/favorite-product/favorite-product.action";
import {
  DELETE_FAVORITE_PRODUCT,
  FAVORITE_PRODUCT_GET_DATA,
} from "src/feature/favorite-product/favorite-product.type";
import { getG1AnalysisAction } from "src/feature/g1-analysis-analysis/g1-analysis-analysis.action";
import { GET_G1_ANALYSIS } from "src/feature/g1-analysis-analysis/type";
import { helpCenterGetCategoriesAction } from "src/feature/help-center/help-center-1/faq-categories.action";
import { HELP_CENTER_GET_CATEGORIES } from "src/feature/help-center/help-center-1/faq-categories.type";
import { watcherFetchFAQList } from "src/feature/help-center/help-center-2/faqs.action";
import { FETCH_GET_FAQ_LIST } from "src/feature/help-center/help-center-2/faqs.type";
import { watcherFetchGetFAQDetail } from "src/feature/help-center/help-center-3/faq-detail.action";
import { FETCH_GET_FAQ_DETAIL } from "src/feature/help-center/help-center-3/faq-detail.type";
import { getNearExpireActions } from "src/feature/near-expire-member-list/near-expire-member-list.action";
import { GET_NEAR_EXPIRE_MEMBER_LIST } from "src/feature/near-expire-member-list/types";
import { getNoteListActions, getNoteListByIdActions } from "src/feature/notes/notes.actions";
import { GET_LIST_NOTE, GET_LIST_NOTE_BY_ID } from "src/feature/notes/types";
import { getNotificationAction, signOutAction } from "src/feature/settings/setting.action";
import { GET_NOTIFICATION, SIGN_OUT_API } from "src/feature/settings/setting.type";
import {
  watcherFetchPostPhoneNumber,
  watcherFetchSignin2FA,
  watcherFetchSigninFacebook,
  watcherFetchSigninPhoneInOTP,
  watcherSigninAction,
} from "src/feature/signin/sign-in.actions";
import { watcherFetchFavoriteMemberList } from "src/feature/favorite-member/favorite-member.action";
import {
  watcherFetchGenerateSecurity2FA,
  watcherFetchSecurityState,
} from "src/feature/security/security.action";
import { watcherFetchGetPoints, watcherFetchUserInfomation } from "src/feature/user/action";
import {
  watcherFetchOrganizationChart,
  watcherFetchOrganizationTree,
} from "src/feature/organization/organization.action";
import { watcherFetchSponsorChart } from "src/feature/sponsor-chart/sponsor-chart.action";
import {
  watcherFetchCommonNotifications,
  watcherFetchCountAllUnreadNotifications,
  watcherFetchGetTopic,
  watcherFetchPageNotifications,
} from "src/feature/notifications/notification.action";
import {
  watcherFetchGetDetailPointTopup,
  watcherFetchGetEcommission,
  watcherFetchGetTotalSCMP,
  watcherFetchPaymentCheckoutPoint,
  watcherFetchPutDecreaseEcommission,
} from "src/feature/scm-point-topup/action";

import {
  FETCH_POST_PHONE_NUMBER,
  FETCH_SIGNIN_2FA,
  FETCH_SIGNIN_FACEBOOK,
  FETCH_SIGNIN_PHONE_IN_OTP,
  SIGNIN_ACTION,
} from "src/feature/signin/sign-in.type";
import { getSponsoredUserHistoryAction } from "src/feature/sponsor-user-history/sponsor-user-history.action";
import { GET_SPONSORED_USER_HISTORY } from "src/feature/sponsor-user-history/sponsor-user-history.type";
import {
  getTripTravelActions,
  getTripTravelHistoryActions,
} from "src/feature/travel-pv-history/travel-pv-history.action";
import { GET_TRIP_TRAVEL, GET_TRIP_TRAVEL_HISTORY } from "src/feature/travel-pv-history/types";
import { getTripProcessPvActions } from "src/feature/trip-process-pv/trip-process-pv.action";
import { GET_TRIP_PROCESS_PV } from "src/feature/trip-process-pv/type";
import { FETCH_FAVORITE_MEMBER_LIST } from "src/feature/favorite-member/types";
import { FETCH_GENERATE_SECURITY_2FA, FETCH_SECURITY_STATE } from "src/feature/security/type";
import { FETCH_POINTS, FETCH_USER_INFORMATION } from "src/feature/user/type";
import { GET_CATEGORIES } from "src/feature/categories/types";
import { getCategoriesActions } from "src/feature/categories/category.action";
import { SEARCH_GET_POPULATE } from "src/feature/searching/searching.type";
import { getPopularKeyWordsActions } from "src/feature/searching/searching.actions";
import { FETCH_ORGANIZATION_CHART, FETCH_ORGANIZATION_TREE } from "src/feature/organization/types";
import { FETCH_SPONSOR_CHART } from "src/feature/sponsor-chart/types";
import {
  FETCH_COMMON_NOTIFICATIONS,
  FETCH_GET_TOPIC,
  FETCH_NOTIFICATION_COUNT_ALL_UNREAD,
  FETCH_PAGE_NOTIFiCATION,
} from "src/feature/notifications/type";
import {
  FETCH_GET_DETAIL_POINTTOPUP,
  FETCH_GET_ECOMMISSION,
  FETCH_GET_TOTAL_SCMP,
  FETCH_PAYMENT_CHECKOUT_POINT,
  FETCH_PUT_DECREASE_ECOMMISSION,
} from "src/feature/scm-point-topup/type";

import {
  watcherFetchGetBank,
  watcherFetchGetCity,
  watcherFetchGetDistrict,
  watcherFetchGetSponserInfo,
  watcherFetchGetSubDistrict,
  watcherFetchPostOtpSignup,
  watcherFetchPostPaymentSignUp,
  watcherFetchPostPhoneNumberSignup,
  watcherFetchPostSignup,
  watcherFetchPostVerifyIDCard,
} from "src/feature/signup/action";
import {
  FETCH_GET_BANK,
  FETCH_GET_CITY,
  FETCH_GET_DISTRICT,
  FETCH_GET_SPONSER_INFO,
  FETCH_GET_SUB_DISTRICT,
  FETCH_POST_OTP_SIGNUP,
  FETCH_POST_PAYMENT_SIGN_UP,
  FETCH_POST_PHONE_NUMBER_SIGNUP,
  FETCH_POST_SIGN_UP,
  FETCH_POST_VERIFY_ID_CARD,
} from "src/feature/signup/type";
import { GET_DETAIL_ADDRESS_BOOK, GET_LIST_ADDRESS_BOOK } from "src/feature/address-book/type";
import {
  watcherDetailAddress,
  watcherListAddress,
} from "src/feature/address-book/address-book.action";

import {
  watcherCheckoutCreateOrder,
  watcherCheckoutGetListAddress,
  watcherCheckoutgetShippingFees,
  watcherFetchGetListCity,
  watcherFetchPostCheckoutOrder,
  watcherFetchPostPaymentCheckout,
  watcherGetListBranchCheckout,
} from "src/feature/checkout/action";
import {
  FETCH_CHECKOUT_CREATE_DRAFT_ORDER,
  FETCH_CHECKOUT_CREATE_ORDER,
  FETCH_CHECKOUT_GET_LIST_ADDRESS,
  FETCH_CHECKOUT_GET_LIST_BRANCH,
  FETCH_CHECKOUT_GET_LIST_CITY,
  FETCH_CHECKOUT_GET_SHIPPING_FEES,
  FETCH_CHECKOUT_UPDATE_ORDER,
  FETCH_POST_PAYMENT_CHECKOUT,
} from "src/feature/checkout/type";
import { FETCH_POST_STATUS_QR_FEATURE } from "src/feature/checkQRFeature/qr-feature.type";
import { watcherFetchPostStatusQRFeature } from "src/feature/checkQRFeature/qr-feature.action";
import { FETCH_POST_PRODUCT_REVIEW } from "src/feature/review-product/types";
import { watcherFetchPostProductReview } from "src/feature/review-product/review-product.action";
import { FETCH_LIST_PRODUCT_IN_CART } from "src/feature/shopping-cart/type";
import { watcherFetchPostProductInCart } from "src/feature/shopping-cart/action";

export default function* rootSaga() {
  yield all([
    takeLatest(SIGNIN_ACTION, watcherSigninAction),
    takeLatest(FETCH_SIGNIN_2FA, watcherFetchSignin2FA),
    takeLatest(GET_SPONSORED_USER_HISTORY, getSponsoredUserHistoryAction),
    takeLatest(FAVORITE_PRODUCT_GET_DATA, favoriteProductAction),
    takeLatest(DELETE_FAVORITE_PRODUCT, deletetFavoriteProductAction),
    takeLatest(HELP_CENTER_GET_CATEGORIES, helpCenterGetCategoriesAction),
    takeLatest(GET_NOTIFICATION, getNotificationAction),
    takeLatest(SIGN_OUT_API, signOutAction),
    takeLatest(GET_G1_ANALYSIS, getG1AnalysisAction),
    takeLatest(DIRECT_SPONSOR_ANALYSIS, getDirectSponsorAnalysisActions),
    takeLatest(GET_TRIP_PROCESS_PV, getTripProcessPvActions),
    takeLatest(GET_TRIP_TRAVEL, getTripTravelActions),
    takeLatest(GET_TRIP_TRAVEL_HISTORY, getTripTravelHistoryActions),
    takeLatest(GET_NEAR_EXPIRE_MEMBER_LIST, getNearExpireActions),
    takeLatest(GET_EXPRIRE_MEMBER_LIST, getExpiredMemberListActions),
    takeLatest(GET_LIST_NOTE, getNoteListActions),
    takeLatest(GET_LIST_NOTE_BY_ID, getNoteListByIdActions),
    takeLatest(FETCH_FAVORITE_MEMBER_LIST, watcherFetchFavoriteMemberList),
    takeLatest(FETCH_SECURITY_STATE, watcherFetchSecurityState),
    takeLatest(FETCH_GENERATE_SECURITY_2FA, watcherFetchGenerateSecurity2FA),
    takeLatest(FETCH_USER_INFORMATION, watcherFetchUserInfomation),
    takeLatest(FETCH_POINTS, watcherFetchGetPoints),
    takeLatest(FETCH_POST_SIGN_UP, watcherFetchPostSignup),
    takeLatest(FETCH_ORGANIZATION_CHART, watcherFetchOrganizationChart),
    takeLatest(FETCH_ORGANIZATION_TREE, watcherFetchOrganizationTree),
    takeLatest(FETCH_SPONSOR_CHART, watcherFetchSponsorChart),
    takeLatest(FETCH_PAGE_NOTIFiCATION, watcherFetchPageNotifications),
    takeLatest(FETCH_NOTIFICATION_COUNT_ALL_UNREAD, watcherFetchCountAllUnreadNotifications),
    takeLatest(FETCH_GET_TOPIC, watcherFetchGetTopic),
    takeLatest(FETCH_COMMON_NOTIFICATIONS, watcherFetchCommonNotifications),
    takeLatest(GET_CATEGORIES, getCategoriesActions),
    takeLatest(SEARCH_GET_POPULATE, getPopularKeyWordsActions),
    takeLatest(FETCH_PAYMENT_CHECKOUT_POINT, watcherFetchPaymentCheckoutPoint),
    takeLatest(FETCH_GET_TOTAL_SCMP, watcherFetchGetTotalSCMP),
    takeLatest(FETCH_GET_ECOMMISSION, watcherFetchGetEcommission),
    takeLatest(FETCH_PUT_DECREASE_ECOMMISSION, watcherFetchPutDecreaseEcommission),
    takeLatest(FETCH_GET_DETAIL_POINTTOPUP, watcherFetchGetDetailPointTopup),
    takeLatest(FETCH_SIGNIN_FACEBOOK, watcherFetchSigninFacebook),
    takeLatest(FETCH_POST_PHONE_NUMBER, watcherFetchPostPhoneNumber),
    takeLatest(FETCH_SIGNIN_PHONE_IN_OTP, watcherFetchSigninPhoneInOTP),
    takeLatest(FETCH_GET_FAQ_LIST, watcherFetchFAQList),
    takeLatest(FETCH_GET_FAQ_DETAIL, watcherFetchGetFAQDetail),
    takeLatest(FETCH_GET_SPONSER_INFO, watcherFetchGetSponserInfo),
    takeLatest(FETCH_GET_CITY, watcherFetchGetCity),
    takeLatest(FETCH_GET_DISTRICT, watcherFetchGetDistrict),
    takeLatest(FETCH_GET_SUB_DISTRICT, watcherFetchGetSubDistrict),
    takeLatest(FETCH_GET_BANK, watcherFetchGetBank),
    takeLatest(FETCH_POST_PHONE_NUMBER_SIGNUP, watcherFetchPostPhoneNumberSignup),
    takeLatest(FETCH_POST_OTP_SIGNUP, watcherFetchPostOtpSignup),
    takeLatest(FETCH_POST_VERIFY_ID_CARD, watcherFetchPostVerifyIDCard),
    takeLatest(FETCH_POST_PAYMENT_SIGN_UP, watcherFetchPostPaymentSignUp),
    takeLatest(GET_LIST_ADDRESS_BOOK, watcherListAddress),
    takeLatest(GET_DETAIL_ADDRESS_BOOK, watcherDetailAddress),
    takeLatest(FETCH_CHECKOUT_GET_LIST_BRANCH, watcherGetListBranchCheckout),
    takeLatest(FETCH_CHECKOUT_GET_LIST_CITY, watcherFetchGetListCity),
    takeLatest(FETCH_CHECKOUT_GET_LIST_ADDRESS, watcherCheckoutGetListAddress),
    takeLatest(FETCH_CHECKOUT_GET_SHIPPING_FEES, watcherCheckoutgetShippingFees),
    takeLatest(FETCH_CHECKOUT_CREATE_DRAFT_ORDER, watcherFetchPostCheckoutOrder),
    takeLatest(FETCH_CHECKOUT_UPDATE_ORDER, watcherFetchPostCheckoutOrder),
    takeLatest(FETCH_POST_PAYMENT_CHECKOUT, watcherFetchPostPaymentCheckout),
    takeLatest(FETCH_CHECKOUT_CREATE_ORDER, watcherCheckoutCreateOrder),
    takeLatest(FETCH_POST_STATUS_QR_FEATURE, watcherFetchPostStatusQRFeature),
    takeLatest(FETCH_POST_PRODUCT_REVIEW, watcherFetchPostProductReview),
    takeLatest(FETCH_LIST_PRODUCT_IN_CART, watcherFetchPostProductInCart),
  ]);
}
