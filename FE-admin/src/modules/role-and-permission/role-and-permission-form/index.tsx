import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { notifyToast } from "src/constants/toast";
import { getParams } from "src/store/router-params.slice";
import { resetCurrentPermissions } from "src/store/role.slice";
import { resetPermissions } from "src/store/permission.slice";
import { fetchGetPermissionList } from "src/store/permission.action";
import { createRole, deleteRole, updateRole } from "src/services/roles.services";
import { RootState } from "src/store";
import {
  Button,
  CollapsibleBlock,
  CollapsibleHeadRow,
  Input,
  Label,
  Modal,
  Select,
} from "src/components";
import {
  AppearanceManagementFeatureRow,
  CategoriesManagementFeatureRow,
  CouponManagementFeatureRow,
  HelpCenterManagementFeatureRow,
  HomeManagementFeatureRow,
  InternalUserManagementFeatureRow,
  InventoryManagementFeatureRow,
  NewsArticleManagementFeatureRow,
  OrderManagementFeatureRow,
  PlatformStatisticFeatureRow,
  PushNotificationManagementFeatureRow,
  ReviewApprovaFeaturelRow,
  RolePermissionManagementFeatureRow,
  UserManagementFeatureRow,
} from "./components";
import { DeleteIcon } from "src/components/icons";
import { useStyles } from "./styles";
import { routesRoleAndPermissionManagement } from "src/constants/routes";
import { roleSchema } from "./schema";
import "./styles.css";
import { getDetailRoleAction } from "src/store/role.action";

interface RoleAndPermissionFormProps {
  mode?: "create" | "edit";
}
type ParamsType = {
  id: string;
};

export default function RoleAndPermissionForm({ mode }: RoleAndPermissionFormProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Inactive");
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
  const [listOfPermissions, setListOfPermissions] = useState<any>([]);
  const { t } = useTranslation("common");
  const { root } = useStyles();
  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { roleDetail, currentPermissions } = useSelector((state: RootState) => state.roles);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const {
    allPermissions,
    homeFeaturePermission,
    orderFeaturePermission,
    inventoryFeaturePermission,
    reviewApprovalFeaturePermission,
    userManagementFeaturePermission,
    internalUserManagementFeaturePermission,
    rolePermissionManagementFeaturePermission,
    newsArticleManagementFeaturePermission,
    bannerManagementFeaturePermission,
    sectionBannerSlideManagementFeaturePermission,
    sectionProductSlideManagementFeaturePersmission,
    homePageTemplateManagementFeaturePermission,
    helpCenterManagementFeaturePermission,
    platformInformationPermission,
    pushNotificationManagementFeaturePermission,
    platformStatisticPermission,
    userAccessHistoryPermission,
    dataExportHistoryPermission,
    categoriesManagementFeaturePermission,
    couponManagementFeaturePermission,
    internalUserAccessHistory,
  } = useSelector((state: RootState) => state.permissions);

  const roleNameRef = useRef<HTMLInputElement>(null);

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      setStatus(roleDetail.status);
      return {
        roleName: roleDetail.name,
      };
    }
    return {
      roleName: "",
    };
  }, [mode, roleDetail.status, roleDetail.name]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: roleSchema,
  });

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(getDetailRoleAction(id));
    }
    dispatch(fetchGetPermissionList());
    if (mode === "create") dispatch(resetCurrentPermissions());
  }, [id, dispatch, mode]);

  useEffect(() => {
    const permissions: any[] = [];
    permissions.push(...Object.values(homeFeaturePermission));
    permissions.push(...Object.values(orderFeaturePermission));
    permissions.push(...Object.values(inventoryFeaturePermission));
    permissions.push(...Object.values(reviewApprovalFeaturePermission));
    permissions.push(...Object.values(userManagementFeaturePermission));
    permissions.push(...Object.values(internalUserManagementFeaturePermission));
    permissions.push(...Object.values(rolePermissionManagementFeaturePermission));
    permissions.push(...Object.values(newsArticleManagementFeaturePermission));
    permissions.push(...Object.values(bannerManagementFeaturePermission));
    permissions.push(...Object.values(sectionBannerSlideManagementFeaturePermission));
    permissions.push(...Object.values(sectionProductSlideManagementFeaturePersmission));
    permissions.push(...Object.values(homePageTemplateManagementFeaturePermission));
    permissions.push(...Object.values(helpCenterManagementFeaturePermission));
    permissions.push(...Object.values(platformInformationPermission));
    permissions.push(...Object.values(pushNotificationManagementFeaturePermission));
    permissions.push(...Object.values(platformStatisticPermission));
    permissions.push(...Object.values(userAccessHistoryPermission));
    permissions.push(...Object.values(dataExportHistoryPermission));
    permissions.push(...Object.values(categoriesManagementFeaturePermission));
    permissions.push(...Object.values(couponManagementFeaturePermission));
    permissions.push(...Object.values(internalUserAccessHistory));

    const filteredPermissions = permissions.filter((permission) => permission);
    const finalPermissions = [...new Set(filteredPermissions)];
    setListOfPermissions(finalPermissions);
  }, [
    bannerManagementFeaturePermission,
    categoriesManagementFeaturePermission,
    dataExportHistoryPermission,
    helpCenterManagementFeaturePermission,
    homeFeaturePermission,
    homePageTemplateManagementFeaturePermission,
    internalUserManagementFeaturePermission,
    inventoryFeaturePermission,
    newsArticleManagementFeaturePermission,
    orderFeaturePermission,
    platformInformationPermission,
    platformStatisticPermission,
    pushNotificationManagementFeaturePermission,
    reviewApprovalFeaturePermission,
    rolePermissionManagementFeaturePermission,
    userAccessHistoryPermission,
    userManagementFeaturePermission,
    sectionBannerSlideManagementFeaturePermission,
    sectionProductSlideManagementFeaturePersmission,
    couponManagementFeaturePermission,
    internalUserAccessHistory,
  ]);

  function handleChangeStatus(value: string | null) {
    value && setStatus(value);
  }
  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  function handleClickDelete() {
    setConfirmType("delete");
    setIsOpenModal(true);
  }
  function handleClickCancelEdit() {
    setConfirmType("action");
    setIsOpenModal(true);
  }
  async function handleConfirm() {
    if (confirmType === "action") {
      history.push(routesRoleAndPermissionManagement);
    }
    if (confirmType === "delete") {
      try {
        await deleteRole(id);
        setIsOpenModal(false);
        setTimeout(() => {
          history.push(routesRoleAndPermissionManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
  }
  async function handleSubmit(values: any) {
    const sendData = {
      name: values.roleName,
      status,
      permissions: listOfPermissions,
      fullAccess: listOfPermissions.length === 64,
    };
    setDisabledSubmit(true);
    if (listOfPermissions.length === 0) {
      notifyToast("error", "the_permission_is_required", t);
      setDisabledSubmit(false);
      return;
    }

    if (mode === "create") {
      try {
        const response = await createRole({ ...sendData });
        if (response.statusCode) {
          throw response.statusCode;
        }
        dispatch(resetPermissions());
        setTimeout(() => history.push(routesRoleAndPermissionManagement), 1000);
      } catch (e) {
        setDisabledSubmit(false);
        throw e;
      }
    }
    if (mode === "edit") {
      try {
        const response = await updateRole({ id, body: sendData });
        if (response.statusCode) {
          throw response.statusCode;
        }
        dispatch(resetPermissions());
        setTimeout(() => history.push(routesRoleAndPermissionManagement), 1000);
      } catch (e) {
        setDisabledSubmit(false);
        throw e;
      }
    }
  }

  return (
    <div className="role-permission-form">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <CollapsibleBlock className="mb-5" heading={t("role_information")}>
          <div className="flex">
            <div className="w-343px flex flex-col mr-7.5">
              <Label required>{t("role-name")}</Label>
              <Input
                name="roleName"
                value={formik.values.roleName}
                placeholder={t("role-name")}
                inputRef={roleNameRef}
                errorMessage={
                  formik.touched.roleName && formik.errors.roleName
                    ? t(formik.errors.roleName as "to_ship")
                    : ""
                }
                onChange={formik.handleChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </div>
            <div className="w-343px flex flex-col">
              <Label required>{t("status")}</Label>
              <Select
                options={[
                  { title: t("active"), value: "Active" },
                  { title: t("inactive"), value: "Inactive" },
                ]}
                defaultValue={status}
                onChange={handleChangeStatus}
              />
            </div>
          </div>
        </CollapsibleBlock>
        <CollapsibleBlock heading={t("feature_permission")}>
          <Table>
            <TableHead>
              <CollapsibleHeadRow className={root}>
                <TableCell width={780}>{t("feature")}</TableCell>
                <TableCell width={185}>{t("access")}</TableCell>
                <TableCell width={185}>{t("export")}</TableCell>
                <TableCell width={185}>{t("create")}</TableCell>
                <TableCell width={185}>{t("update")}</TableCell>
                <TableCell width={185}>{t("delete")}</TableCell>
                <TableCell width={60} />
              </CollapsibleHeadRow>
            </TableHead>
            <TableBody className={root}>
              <HomeManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["HomeFeature_Access"]?._id,
                  exportFeature: allPermissions["HomeFeature_Export"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["HomeFeature_Access"],
                  exportFeature: currentPermissions["HomeFeature_Export"],
                }}
              />
              <OrderManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["OrderManagementFeature_Access"]?._id,
                  updateFeature: allPermissions["OrderManagementFeature_Update"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["OrderManagementFeature_Access"],
                  updateFeature: currentPermissions["OrderManagementFeature_Update"],
                }}
              />
              <InventoryManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["InventoryManagementFeature_Access"]?._id,
                  updateFeature: allPermissions["InventoryManagementFeature_Update"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["InventoryManagementFeature_Access"],
                  updateFeature: currentPermissions["InventoryManagementFeature_Update"],
                }}
              />
              <ReviewApprovaFeaturelRow
                defaultValue={{
                  accessFeature: allPermissions["ReviewApprovalFeature_Access"]?._id,
                  createFeature: allPermissions["ReviewApprovalFeature_Create"]?._id,
                  updateFeature: allPermissions["ReviewApprovalFeature_Update"]?._id,
                  deleteFeature: allPermissions["ReviewApprovalFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["ReviewApprovalFeature_Access"],
                  createFeature: currentPermissions["ReviewApprovalFeature_Create"],
                  updateFeature: currentPermissions["ReviewApprovalFeature_Update"],
                  deleteFeature: currentPermissions["ReviewApprovalFeature_Delete"],
                }}
              />
              <UserManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["UserManagementFeature_Access"]?._id,
                  updateFeature: allPermissions["UserManagementFeature_Update"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["UserManagementFeature_Access"],
                  updateFeature: currentPermissions["UserManagementFeature_Update"],
                }}
              />
              <InternalUserManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["InternalUserManagementFeature_Access"]?._id,
                  createFeature: allPermissions["InternalUserManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["InternalUserManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["InternalUserManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["InternalUserManagementFeature_Access"],
                  createFeature: currentPermissions["InternalUserManagementFeature_Create"],
                  updateFeature: currentPermissions["InternalUserManagementFeature_Update"],
                  deleteFeature: currentPermissions["InternalUserManagementFeature_Delete"],
                }}
              />
              <RolePermissionManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["RolePermissionManagementFeature_Access"]?._id,
                  createFeature: allPermissions["RolePermissionManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["RolePermissionManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["RolePermissionManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["RolePermissionManagementFeature_Access"],
                  createFeature: currentPermissions["RolePermissionManagementFeature_Create"],
                  updateFeature: currentPermissions["RolePermissionManagementFeature_Update"],
                  deleteFeature: currentPermissions["RolePermissionManagementFeature_Delete"],
                }}
              />
              <NewsArticleManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["NewsArticleManagementFeature_Access"]?._id,
                  createFeature: allPermissions["NewsArticleManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["NewsArticleManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["NewsArticleManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["NewsArticleManagementFeature_Access"],
                  createFeature: currentPermissions["NewsArticleManagementFeature_Create"],
                  updateFeature: currentPermissions["NewsArticleManagementFeature_Update"],
                  deleteFeature: currentPermissions["NewsArticleManagementFeature_Delete"],
                }}
              />
              <AppearanceManagementFeatureRow
                defaultValue={{
                  bannerFeatureAccess: allPermissions["BannerManagementFeature_Access"]?._id,
                  bannerFeatureCreate: allPermissions["BannerManagementFeature_Create"]?._id,
                  bannerFeatureUpdate: allPermissions["BannerManagementFeature_Update"]?._id,
                  bannerFeatureDelete: allPermissions["BannerManagementFeature_Delete"]?._id,
                  sectionBannerSlideManagementFeatureAccess:
                    allPermissions["SectionBannerSlideManagementFeature_Access"]?._id,
                  sectionBannerSlideManagementFeatureCreate:
                    allPermissions["SectionBannerSlideManagementFeature_Create"]?._id,
                  sectionBannerSlideManagementFeatureUpdate:
                    allPermissions["SectionBannerSlideManagementFeature_Update"]?._id,
                  sectionBannerSlideManagementFeatureDelete:
                    allPermissions["SectionBannerSlideManagementFeature_Delete"]?._id,
                  sectionProductSlideManagementFeatureAccess:
                    allPermissions["SectionProductSlideManagementFeature_Access"]?._id,
                  sectionProductSlideManagementFeatureCreate:
                    allPermissions["SectionProductSlideManagementFeature_Create"]?._id,
                  sectionProductSlideManagementFeatureUpdate:
                    allPermissions["SectionProductSlideManagementFeature_Update"]?._id,
                  sectionProductSlideManagementFeatureDelete:
                    allPermissions["SectionProductSlideManagementFeature_Delete"]?._id,
                  homePageTemplateFeatureAccess:
                    allPermissions["HomePageTemplateManagementFeature_Access"]?._id,
                  homePageTemplateFeatureCreate:
                    allPermissions["HomePageTemplateManagementFeature_Create"]?._id,
                  homePageTemplateFeatureUpdate:
                    allPermissions["HomePageTemplateManagementFeature_Update"]?._id,
                  homePageTemplateFeatureDelete:
                    allPermissions["HomePageTemplateManagementFeature_Delete"]?._id,
                  // platformInformationFeatureAccess:
                  //   allPermissions["PlatformInformation_Access"]?._id,
                  // platformInformationFeatureCreate:
                  //   allPermissions["PlatformInformation_Create"]?._id,
                  // platformInformationFeatureUpdate:
                  //   allPermissions["PlatformInformation_Update"]?._id,
                  // platformInformationFeatureDelete:
                  //   allPermissions["PlatformInformation_Delete"]?._id,
                }}
                value={{
                  bannerFeatureAccess: currentPermissions["BannerManagementFeature_Access"],
                  bannerFeatureCreate: currentPermissions["BannerManagementFeature_Create"],
                  bannerFeatureUpdate: currentPermissions["BannerManagementFeature_Update"],
                  bannerFeatureDelete: currentPermissions["BannerManagementFeature_Delete"],
                  sectionBannerSlideManagementFeatureAccess:
                    currentPermissions["SectionBannerSlideManagementFeature_Access"],
                  sectionBannerSlideManagementFeatureCreate:
                    currentPermissions["SectionBannerSlideManagementFeature_Create"],
                  sectionBannerSlideManagementFeatureUpdate:
                    currentPermissions["SectionBannerSlideManagementFeature_Update"],
                  sectionBannerSlideManagementFeatureDelete:
                    currentPermissions["SectionBannerSlideManagementFeature_Delete"],
                  sectionProductSlideManagementFeatureAccess:
                    currentPermissions["SectionProductSlideManagementFeature_Access"],
                  sectionProductSlideManagementFeatureCreate:
                    currentPermissions["SectionProductSlideManagementFeature_Create"],
                  sectionProductSlideManagementFeatureUpdate:
                    currentPermissions["SectionProductSlideManagementFeature_Update"],
                  sectionProductSlideManagementFeatureDelete:
                    currentPermissions["SectionProductSlideManagementFeature_Delete"],
                  homePageTemplateFeatureAccess:
                    currentPermissions["HomePageTemplateManagementFeature_Access"],
                  homePageTemplateFeatureCreate:
                    currentPermissions["HomePageTemplateManagementFeature_Create"],
                  homePageTemplateFeatureUpdate:
                    currentPermissions["HomePageTemplateManagementFeature_Update"],
                  homePageTemplateFeatureDelete:
                    currentPermissions["HomePageTemplateManagementFeature_Delete"],
                  // platformInformationFeatureAccess:
                  //   currentPermissions["PlatformInformation_Access"],
                  // platformInformationFeatureCreate:
                  //   currentPermissions["PlatformInformation_Create"],
                  // platformInformationFeatureUpdate:
                  //   currentPermissions["PlatformInformation_Update"],
                  // platformInformationFeatureDelete:
                  //   currentPermissions["PlatformInformation_Delete"],
                }}
              />
              <PushNotificationManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["PushNotificationManagementFeature_Access"]?._id,
                  createFeature: allPermissions["PushNotificationManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["PushNotificationManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["PushNotificationManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["PushNotificationManagementFeature_Access"],
                  createFeature: currentPermissions["PushNotificationManagementFeature_Create"],
                  updateFeature: currentPermissions["PushNotificationManagementFeature_Update"],
                  deleteFeature: currentPermissions["PushNotificationManagementFeature_Delete"],
                }}
              />
              <PlatformStatisticFeatureRow
                defaultValue={{
                  platformStatisticAccess: allPermissions["PlatformStatistic_Access"]?._id,
                  platformStatisticExport: allPermissions["PlatformStatistic_Export"]?._id,
                  userAccessHistoryAccess: allPermissions["UserAccessHistory_Access"]?._id,
                  userAccessHistoryExport: allPermissions["UserAccessHistory_Export"]?._id,
                  dataExportHistoryAccess: allPermissions["DataExportHistory_Access"]?._id,
                  dataExportHistoryExport: allPermissions["DataExportHistory_Export"]?._id,
                  internalUserAccessHistoryAccess:
                    allPermissions["InternalUserAccessHistory_Access"]?._id,
                  internalUserAccessHistoryExport:
                    allPermissions["InternalUserAccessHistory_Export"]?._id,
                }}
                value={{
                  platformStatisticAccess: currentPermissions["PlatformStatistic_Access"],
                  platformStatisticExport: currentPermissions["PlatformStatistic_Export"],
                  userAccessHistoryAccess: currentPermissions["UserAccessHistory_Access"],
                  userAccessHistoryExport: currentPermissions["UserAccessHistory_Export"],
                  dataExportHistoryAccess: currentPermissions["DataExportHistory_Access"],
                  dataExportHistoryExport: currentPermissions["DataExportHistory_Export"],
                  internalUserAccessHistoryAccess:
                    currentPermissions["InternalUserAccessHistory_Access"],
                  internalUserAccessHistoryExport:
                    currentPermissions["InternalUserAccessHistory_Export"],
                }}
              />
              <CategoriesManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["CategoriesManagementFeature_Access"]?._id,
                  createFeature: allPermissions["CategoriesManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["CategoriesManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["CategoriesManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["CategoriesManagementFeature_Access"],
                  createFeature: currentPermissions["CategoriesManagementFeature_Create"],
                  updateFeature: currentPermissions["CategoriesManagementFeature_Update"],
                  deleteFeature: currentPermissions["CategoriesManagementFeature_Delete"],
                }}
              />
              <CouponManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["CouponManagementFeatureAccess_Access"]?._id,
                  createFeature: allPermissions["CouponManagementFeatureAccess_Create"]?._id,
                  updateFeature: allPermissions["CouponManagementFeatureAccess_Update"]?._id,
                  deleteFeature: allPermissions["CouponManagementFeatureAccess_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["CouponManagementFeatureAccess_Access"],
                  createFeature: currentPermissions["CouponManagementFeatureAccess_Create"],
                  updateFeature: currentPermissions["CouponManagementFeatureAccess_Update"],
                  deleteFeature: currentPermissions["CouponManagementFeatureAccess_Delete"],
                }}
              />
              <HelpCenterManagementFeatureRow
                defaultValue={{
                  accessFeature: allPermissions["HelpCenterManagementFeature_Access"]?._id,
                  createFeature: allPermissions["HelpCenterManagementFeature_Create"]?._id,
                  updateFeature: allPermissions["HelpCenterManagementFeature_Update"]?._id,
                  deleteFeature: allPermissions["HelpCenterManagementFeature_Delete"]?._id,
                }}
                value={{
                  accessFeature: currentPermissions["HelpCenterManagementFeature_Access"],
                  createFeature: currentPermissions["HelpCenterManagementFeature_Create"],
                  updateFeature: currentPermissions["HelpCenterManagementFeature_Update"],
                  deleteFeature: currentPermissions["HelpCenterManagementFeature_Delete"],
                }}
              />
            </TableBody>
          </Table>
        </CollapsibleBlock>
        <div className="flex btn-group">
          <Button
            className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
            variant="text"
            type="submit"
            disabled={disabledSubmit}
          >
            {t("submit")}
          </Button>
          <Button
            variant="text"
            className="mr-7.5 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover"
            onClick={handleClickCancelEdit}
          >
            {t("cancel")}
          </Button>
          {mode && mode === "edit" && (
            <Button
              variant="text"
              className="w-343px flex items-center justify-center h-50px border border-solid border-red-light text-red-light"
              onClick={handleClickDelete}
            >
              <div className="flex items-center justify-center">
                <DeleteIcon className="mr-1 inline fill-current text-red-light" />
                {t("delete-role")}
              </div>
            </Button>
          )}
        </div>
      </form>
      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
