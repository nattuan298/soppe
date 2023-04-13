import {
  CouponIcon,
  FAQIcon,
  HomeIcon,
  InternalUserIcon,
  InventoryManagementIcon,
  OrderManageIcon,
  PushNotificationIcon,
  ReviewIcon,
  RoleManagementIcon,
  UserManagementIcon,
  ViewIcon,
} from "../icons";
import {
  routeArticleList,
  routeCouponList,
  routeFAQManagement,
  routeInventoryManagementProductListBase,
  routePushNotificationManagement,
  routesHomeDashboard,
  routesInternalUserManagement,
  routesOrderManagement,
  routesReviewListManagement,
  routesRoleAndPermissionManagement,
  routesUserManagement,
} from "src/constants/routes";
import { Translation } from "react-i18next";

export const sidebarItems = [
  {
    name: "Home",
    title: <Translation>{(t) => <div>{t("common:home-radio")}</div>}</Translation>,
    url: routesHomeDashboard,
    icon: <HomeIcon />,
  },
  {
    name: "Order Mng.",
    title: <Translation>{(t) => <div>{t("common:order_nav")}</div>}</Translation>,
    url: routesOrderManagement,
    icon: <OrderManageIcon />,
  },
  {
    name: "Inventory",
    title: <Translation>{(t) => <div>{t("common:inventory")}</div>}</Translation>,
    url: routeInventoryManagementProductListBase,
    icon: <InventoryManagementIcon />,
  },
  {
    name: "Review Aprv.",
    title: <Translation>{(t) => <div>{t("common:review_nav")}</div>}</Translation>,
    url: routesReviewListManagement,
    icon: <ReviewIcon />,
  },
  {
    name: "User Mng.",
    title: <Translation>{(t) => <div>{t("common:User_nav")}</div>}</Translation>,
    url: routesUserManagement,
    icon: <UserManagementIcon />,
  },
  {
    name: "Internal Users",
    title: <Translation>{(t) => <div>{t("common:internal_users")}</div>}</Translation>,
    url: routesInternalUserManagement,
    icon: <InternalUserIcon />,
  },
  {
    name: "Role Mng.",
    title: <Translation>{(t) => <div>{t("common:role_nav")}</div>}</Translation>,
    url: routesRoleAndPermissionManagement,
    icon: <RoleManagementIcon />,
  },
  {
    name: "News & Article",
    title: <Translation>{(t) => <div>{t("common:news_article")}</div>}</Translation>,
    url: routeArticleList,
    icon: <ViewIcon />,
  },
  {
    name: "Appearance",
    title: <Translation>{(t) => <div>{t("common:appearance")}</div>}</Translation>,
  },
  {
    name: "Push Notification",
    title: <Translation>{(t) => <div>{t("common:push-notification")}</div>}</Translation>,
    url: routePushNotificationManagement,
    icon: <PushNotificationIcon />,
  },
  {
    name: "platforms_stat",
    title: <Translation>{(t) => <div>{t("common:platforms_stat")}</div>}</Translation>,
  },
  {
    name: "Categories",
    title: <Translation>{(t) => <div>{t("common:categories")}</div>}</Translation>,
  },
  {
    name: "FAQ",
    title: <Translation>{(t) => <div>{t("common:faq")}</div>}</Translation>,
    url: routeFAQManagement,
    icon: <FAQIcon />,
  },
  {
    name: "Coupon",
    title: <Translation>{(t) => <div>{t("common:coupon")}</div>}</Translation>,
    url: routeCouponList,
    icon: <CouponIcon />,
  },
];
