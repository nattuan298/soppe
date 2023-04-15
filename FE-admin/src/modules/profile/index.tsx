/* eslint-disable indent */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CollapsibleBlock,
  DatePicker,
  Input,
  Label,
  PasswordInput,
  RoleChip,
  Select,
  SelectCountry,
  SelectPhoneCode,
  UploadProfileImage,
} from "src/components";
import "./styles.css";
import { RootState } from "src/store";
import { GoogleAuthentication } from "./google-authen/index";
// import { getInternalUserById } from "src/store/internal-user.slice";
import { useFormik } from "formik";
import { changePasswordSchema } from "../auth/components/schema";
import { notifyToast } from "src/constants/toast";
import { callChangePassword, getDetailInternalUserAction } from "src/store/internal-user.action";

type RoleChipType = {
  _id: string;
  name: string;
  status?: string;
};

type passwordType = {
  password: string;
  confirmPassword: string;
};

export function Profile() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [status, setStatus] = useState<string>("");
  const [citizenship, setCitizenship] = useState<string>("Thai");
  const [roles, setRoles] = useState<string>("");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false);
  const { internalUserDetail, checkChangePassword } = useSelector(
    (state: RootState) => state.internalUsers,
  );

  const initialValues = useMemo(() => {
    setGender(internalUserDetail.gender);
    setStatus(internalUserDetail.status);
    setDateOfBirth(internalUserDetail.dateOfBirth);

    setRoles(internalUserDetail.roles);
    return {
      firstName: internalUserDetail.firstName,
      lastName: internalUserDetail.lastName,
      email: internalUserDetail.email,
      phoneNumber: internalUserDetail.phoneNumber,
    };
  }, [internalUserDetail]);

  const valueChangePassword = useMemo(() => {
    return {
      password: "",
      confirmPassword: "",
    };
  }, []);

  const handleSubmit = (values: passwordType) => {
    setIsSubmiting(true);
    dispatch(
      callChangePassword({
        id: JSON.parse(localStorage.getItem("token") || "{}")._id,
        password: values.password,
      }),
    );
    setChangePassword(false);
    formik.resetForm();
    notifyToast("default", "new-password-has-been-updated", t);
  };

  const formik = useFormik({
    initialValues: valueChangePassword,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: changePasswordSchema,
  });

  useEffect(() => {
    console.log(checkChangePassword);
    if (checkChangePassword === "success" || checkChangePassword === "failed") {
      setIsSubmiting(false);
    }
  }, [checkChangePassword, formik]);

  const getData = useCallback(() => {
    if (JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken) {
      dispatch(getDetailInternalUserAction(JSON.parse(localStorage.getItem("token") || "{}")._id));
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChangePassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setChangePassword(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    formik.resetForm();
    setChangePassword(false);
  };

  return (
    <>
      <div className="internal-user-form flex items-start">
        <div className="w-full mr-5 flex-1 items-start">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <CollapsibleBlock className="mb-5" heading={t("account-information")}>
              <Grid container xl={6} lg={8} md={8}>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col mr-4">
                        <Label>{t("first-name")}</Label>
                        <Input
                          placeholder={t("first-name")}
                          name="firstName"
                          value={initialValues.firstName}
                          disabled
                          inputProps={{
                            maxLength: 2500,
                          }}
                        />
                      </div>
                    </label>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col ml-4">
                        <Label>{t("last-name")}</Label>
                        <Input
                          placeholder={t("last-name")}
                          name="lastName"
                          value={initialValues.lastName}
                          disabled
                          inputProps={{
                            maxLength: 2500,
                          }}
                        />
                      </div>
                    </label>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col  mr-4">
                        <Label>{t("status")}</Label>
                        <Select
                          disable
                          defaultValue={status}
                          options={[
                            { title: t`active`, value: "Active" },
                            { title: t`inactive`, value: "Inactive" },
                          ]}
                        />
                      </div>
                    </label>
                  </Grid>

                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col  mr-4">
                        <Label>{t("email")}</Label>
                        <Input
                          placeholder={t("email")}
                          name="email"
                          disabled
                          value={initialValues.email}
                        />
                      </div>
                    </label>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col ml-4">
                        <Label>{t("phone-number")}</Label>
                        <SelectPhoneCode
                          name="phoneNumber"
                          disabled
                          phoneCode={internalUserDetail.phoneCode}
                          phoneNumber={initialValues.phoneNumber}
                          placeholder={t("phone-number")}
                        />
                      </div>
                    </label>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col  mr-4">
                        <Label>{t("citizenship")}</Label>
                        <SelectCountry country={citizenship} disabled />
                      </div>
                    </label>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col ml-4">
                        <Label>{t("gender")}</Label>
                        <Select
                          defaultValue={gender}
                          disable
                          options={[
                            { title: t`male`, value: "Male" },
                            { title: t`female`, value: "Female" },
                          ]}
                        />
                      </div>
                    </label>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <label>
                      <div className="flex flex-col  mr-4">
                        <Label>{t("date-of-birth")}</Label>
                        <DatePicker value={new Date(dateOfBirth)} disable />
                      </div>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("role-permission")}>
              <Grid container direction="column" lg={6}>
                <div className="roles-container flex">
               {roles}
                </div>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("password")}>
              {changePassword ? (
                <>
                  <div className="flex">
                    <label className="mr-7.5 w-343px">
                      <div className="flex flex-col">
                        <Label required>{t`password`}</Label>
                        <PasswordInput
                          changePassword
                          placeholder={t("password")}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.password && formik.errors.password
                              ? t(`${formik.errors.password as "required_fields"}`)
                              : ""
                          }
                          inputProps={{
                            maxLength: 255,
                          }}
                        />
                      </div>
                    </label>
                    <label className="mr-7.5 w-343px">
                      <div className="flex flex-col">
                        <Label required>{t`confirm-password`}</Label>
                        <PasswordInput
                          changePassword
                          placeholder={t("confirm-password")}
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.confirmPassword && formik.errors.confirmPassword
                              ? t(`${formik.errors.confirmPassword as "required_fields"}`)
                              : ""
                          }
                          inputProps={{
                            maxLength: 255,
                          }}
                        />
                      </div>
                    </label>
                  </div>
                  <label>
                    <p className="txt-requirement">{t`password-requirement`}</p>
                  </label>
                  <div className="flex">
                    <Button
                      className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                      variant="text"
                      type="submit"
                      loading={isSubmitting}
                    >
                      {t("submit")}
                    </Button>
                    <Button
                      variant="text"
                      className="mr-7.5 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
                      onClick={handleCancel}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  className="btn-change-password h-50px bg-orange-light text-white"
                  variant="text"
                  onClick={handleChangePassword}
                >
                  {t("change-password")}
                </Button>
              )}
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("security")}>
              <GoogleAuthentication securityState={internalUserDetail.googleAuth} />
            </CollapsibleBlock>
          </form>
        </div>
        <UploadProfileImage profile avatarUrl={internalUserDetail.avatarUrl} />
      </div>
    </>
  );
}
