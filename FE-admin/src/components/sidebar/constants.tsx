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
  routesOrderManagement,
  routesReviewListManagement,
  routesRoleAndPermissionManagement,
  routesUserManagement,
} from "src/constants/routes";
import { Translation } from "react-i18next";

export const sidebarItems = [

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
    name: "Appearance",
    title: <Translation>{(t) => <div>{t("common:appearance")}</div>}</Translation>,
  },
  {
    name: "Categories",
    title: <Translation>{(t) => <div>{t("common:categories")}</div>}</Translation>,
  },

];
