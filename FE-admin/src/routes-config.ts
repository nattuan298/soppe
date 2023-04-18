import { lazy } from "react";

import { loadable } from "src/components";
import withAuthentication from "src/hocs/withAuthentication";
import { retry } from "src/lib/retryPromise";
import {
  routeAddBanne,
  routeArticleCategoryCreate,
  routeArticleCategoryEdit,
  routeArticleCategoryList,
  routeArticleCreate,
  routeArticleDetail,
  routeArticleEdit,
  routeArticleList,
  routeChangePasswordBase,
  routeCouponCreate,
  routeCouponEdit,
  routeCouponHistory,
  routeCouponList,
  routeCreateBannerLoop,
  routeCreateFAQ,
  routeCreateFAQCategory,
  routeCreateNewPushNotification,
  routeCreateNewTemplateHomePage,
  routeDataHistoryList,
  routeEditBanner,
  routeEditBannerLoop,
  routeEditFAQ,
  routeEditFAQCategory,
  routeEditNewPushNotification,
  routeEditTemplateHomePage,
  routeFAQCategoryList,
  routeFAQManagement,
  routeHomeBase,
  routeHomePageTemplateManagement,
  routeInternalUserHistoryList,
  routeInventoryManagementProductCreateBase,
  routeInventoryManagementProductEditBase,
  routeInventoryManagementProductListBase,
  routeInventoryManagementProductUpdateBase,
  routeManagementBannerList,
  routeManagementBannerLoopListBase,
  routePasswordRecovery1Base,
  routePasswordRecovery2Base,
  routePlatformHome,
  routePreviewFAQ,
  routeProfile,
  routePushNotificationManagement,
  routeSignin2FABase,
  routeSigninBase,
  routeSignupBase,
  routeUserHistoryList,
  routesCreateInternalUserAccount,
  routesCreateRoleAndPermission,
  routesEditInternalUserAccount,
  routesEditRoleAndPermission,
  routesEditUserManagement,
  routesHomeDashboard,
  routesOrderManagement,
  routesOrderManagementDetail,
  routesOrderManagementEdit,
  routesOrderManagementTracking,
  routesReviewListManagement,
  routesRoleAndPermissionManagement,
  routesUserManagement,
} from "./constants/routes";

export const routesConfig = [
  {
    path: routeHomeBase,
    exact: true,
    component: withAuthentication(loadable(lazy(() => retry(() => import("./pages/index"))))),
  },
  {
    path: routeSigninBase,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/signin")))),
  },
  {
    path: routeSignin2FABase,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/signin-2fa")))),
  },
  {
    path: routePasswordRecovery1Base,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/password-recovery-1")))),
  },
  {
    path: routePasswordRecovery2Base,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/password-recovery-2")))),
  },
  {
    path: routeChangePasswordBase,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/change-password")))),
  },
  {
    path: routeSignupBase,
    exact: true,
    component: loadable(lazy(() => retry(() => import("./pages/signup")))),
  },
  {
    path: routeInventoryManagementProductListBase,
    exact: true,
    component: loadable(
      lazy(() => retry(() => import("./pages/inventory-management-product-list"))),
    ),
  },
  {
    path: routeInventoryManagementProductCreateBase,
    exact: true,
    component: loadable(
      lazy(() => retry(() => import("./pages/inventory-management-create-product"))),
    ),
  },
  {
    path: routeInventoryManagementProductEditBase,
    exact: true,
    component: loadable(
      lazy(() => retry(() => import("./pages/inventory-management-create-product"))),
    ),
  },
  {
    path: routesHomeDashboard,
    exact: true,
    component: withAuthentication(loadable(lazy(() => retry(() => import("./pages/dashboard"))))),
  },
  {
    path: routesUserManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/user-management-list")))),
    ),
  },
  {
    path: routesEditUserManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/user-management-edit")))),
    ),
  },
  // {
  //   path: routesInternalUserManagement,
  //   exact: true,
  //   component: withAuthentication(
  //     loadable(lazy(() => retry(() => import("./pages/internal-user-management-list")))),
  //   ),
  // },
  {
    path: routesCreateInternalUserAccount,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/internal-user-management-create")))),
    ),
  },
  {
    path: routesEditInternalUserAccount,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/internal-user-management-edit")))),
    ),
  },
  {
    path: routesRoleAndPermissionManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/role-and-permission-management-list")))),
    ),
  },
  {
    path: routesCreateRoleAndPermission,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/role-and-permission-management-create")))),
    ),
  },
  {
    path: routesEditRoleAndPermission,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/role-and-permission-management-edit")))),
    ),
  },
  {
    path: routeManagementBannerLoopListBase,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/banner-management-loop-list")))),
    ),
  },
  {
    path: routeCreateBannerLoop,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/banner-management-loop-form")))),
    ),
  },
  {
    path: routeManagementBannerList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/banner-management-list")))),
    ),
  },
  {
    path: routeEditBannerLoop,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/banner-management-loop-form")))),
    ),
  },

  {
    path: routeFAQManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-management-list")))),
    ),
  },
  {
    path: routeCreateFAQ,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-management-create")))),
    ),
  },
  {
    path: routeEditFAQ,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-management-edit")))),
    ),
  },
  {
    path: routePreviewFAQ,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-management-preview")))),
    ),
  },
  {
    path: routesOrderManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/order-management-list")))),
    ),
  },
  {
    path: routesOrderManagementDetail,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/order-management-detail")))),
    ),
  },

  {
    path: routesReviewListManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/review-management-list")))),
    ),
  },

  {
    path: routePushNotificationManagement,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/push-notification-list")))),
    ),
  },
  {
    path: routeCreateNewPushNotification,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/push-notification-form")))),
    ),
  },
  {
    path: routeProfile,
    exact: true,
    component: withAuthentication(loadable(lazy(() => retry(() => import("./pages/profile"))))),
  },
  {
    path: routeEditNewPushNotification,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/push-notification-form")))),
    ),
  },
  {
    path: routeArticleCategoryList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-category-list")))),
    ),
  },
  {
    path: routeArticleCategoryCreate,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-category-create-new")))),
    ),
  },
  {
    path: routeArticleCategoryEdit,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-category-edit")))),
    ),
  },
  {
    path: routeArticleList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-list")))),
    ),
  },
  {
    path: routeArticleDetail,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-detail")))),
    ),
  },
  {
    path: routeArticleCreate,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-create")))),
    ),
  },
  {
    path: routeArticleEdit,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/news-article-edit")))),
    ),
  },
  {
    path: routeUserHistoryList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/user-access-history")))),
    ),
  },
  {
    path: routePlatformHome,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/platform-stat-home")))),
    ),
  },
  {
    path: routeInternalUserHistoryList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/internal-user-access-history")))),
    ),
  },
  {
    path: routeDataHistoryList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/data-export-history")))),
    ),
  },
  {
    path: routeFAQCategoryList,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-category-list")))),
    ),
  },
  {
    path: routeCreateFAQCategory,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-category-create")))),
    ),
  },
  {
    path: routeEditFAQCategory,
    exact: true,
    component: withAuthentication(
      loadable(lazy(() => retry(() => import("./pages/faq-category-edit")))),
    ),
  },
];
