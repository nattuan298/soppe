import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { signInSlice } from "src/feature/signin/sign-in-slice";
import signupReducer from "src/feature/signup/slice";
import { signInFacebookSlice } from "src/feature/signin/sign-in-facebook-slice";
import signInPhoneNumberSlice from "src/feature/signin/sign-in-phone-number-slice";
import checkoutReducer from "src/feature/checkout/slice";
import cartReducer from "src/feature/shopping-cart/slice";
import updateaccountInforReducer from "src/feature/update-account-infor/slice";
import { FAQCategoriesSlice } from "src/feature/help-center/help-center-1/faq-categories.slice";
import faqsSlice from "src/feature/help-center/help-center-2/faqs.slice";
import faqDetailSlice from "src/feature/help-center/help-center-3/faq-detail.slice";
import { CategoriesSlice } from "src/feature/categories/category.slice";
import { AddressBookSlice } from "src/feature/address-book/address-book.slice";
import { sponsorHistorySlice } from "src/feature/sponsor-user-history/sponsor-user-history.slice";
import { SearchValueSlice } from "src/feature/searching/searching.slice";
import userSlice from "src/feature/user/slice";
import { TopupPointSlice } from "src/feature/scm-point-topup/slice";
import { favoriteProductSlice } from "src/feature/favorite-product/favorite-product.slice";
import { SecuritySlice } from "src/feature/security/security.slice";
import sponsorAnalysisSlice from "src/feature/direct-sponsor-analysis/direct-sponsor-analysis.slice";
import g1AnalysisSlice from "src/feature/g1-analysis-analysis/g1-analysis-analysis.slice";
import tripProcessSlice from "src/feature/trip-process-pv/trip-process-pv.slice";

import transferBMCSlice from "src/feature/transfer-bmc/slice";
import { NoteSlice } from "src/feature/notes/notes.slice";
import { productReviewSlice } from "src/feature/review-product/review-product.slice";
import { SettingSlice } from "src/feature/settings/setting.slice";
import { NotificationsSlice } from "src/feature/notifications/notification.slice";
import { expiredMemberListSlice } from "src/feature/expired-member-list/expired-member-list.slice";
import { nearExpireMemberListSlice } from "src/feature/near-expire-member-list/near-expire-member-list.slice";
import favoriteMemberSlice from "src/feature/favorite-member/favorite-member.slice";
import organizationChartSlice from "src/feature/organization/organization.slice";
import { travelPVHistorySlice } from "src/feature/travel-pv-history";
import sponsorChartSlice from "src/feature/sponsor-chart/sponsor-chart.slice";
import checkStatusQRSlice from "src/feature/checkQRFeature/qr-feature.slice";
import saga from "./sagas";
import { forgotSlice } from "../feature/forgot-password/forgot-password.slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    signin: signInSlice.reducer,
    signup: signupReducer,
    signinFacebook: signInFacebookSlice.reducer,
    signinPhoneNumber: signInPhoneNumberSlice,
    checkout: checkoutReducer,
    cart: cartReducer,
    faqCategories: FAQCategoriesSlice.reducer,
    faqs: faqsSlice,
    faqDetail: faqDetailSlice,
    updateAccountInfor: updateaccountInforReducer,
    categoriesState: CategoriesSlice.reducer,
    addressBook: AddressBookSlice.reducer,
    sponsorHistory: sponsorHistorySlice.reducer,
    searchValue: SearchValueSlice.reducer,
    user: userSlice,
    scmPoint: TopupPointSlice.reducer,
    favoriteProduct: favoriteProductSlice.reducer,
    security: SecuritySlice.reducer,
    transferBMC: transferBMCSlice,
    note: NoteSlice.reducer,
    productReviews: productReviewSlice.reducer,
    sponsorAnalysis: sponsorAnalysisSlice,
    g1Analysis: g1AnalysisSlice,
    setting: SettingSlice.reducer,
    tripProcess: tripProcessSlice,
    notification: NotificationsSlice.reducer,
    expiredMemberLists: expiredMemberListSlice.reducer,
    nearExpireMemberLists: nearExpireMemberListSlice.reducer,
    favoriteMember: favoriteMemberSlice,
    organization: organizationChartSlice,
    travelPVHistory: travelPVHistorySlice.reducer,
    sponsorChart: sponsorChartSlice,
    checkStatusQR: checkStatusQRSlice,
    forgotPassword: forgotSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(saga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
