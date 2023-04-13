import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";

import { getParams } from "src/store/router-params.slice";
import { RootState } from "src/store";
import { resetCurrentInteralUser } from "src/store/internal-user.slice";
import {
  createInternalUser,
  deleteInternalUser,
  updateInternalUser,
} from "src/services/internal-users.services";
import {
  Autocomplete,
  Button,
  CollapsibleBlock,
  DatePicker,
  Input,
  Label,
  Modal,
  RoleChip,
  Select,
  SelectCountry,
  SelectPhoneCode,
  UploadProfileImage,
} from "src/components";
import { useIsErrorMessage } from "src/hooks";
import { DeleteIcon } from "src/components/icons";
import PasswordGenerator from "./password-generator";
import "./styles.css";
import { routesInternalUserManagement } from "src/constants/routes";
import { internalUserSchema, passwordSchemaCreate, passwordSchemaEdit } from "./schema";
import { getDetailInternalUserAction } from "src/store/internal-user.action";
import { getRoleActiveAction } from "src/store/role.action";

interface InternalUserFormProps {
  mode?: "create" | "edit";
}

type ParamsType = {
  id: string;
};
type RoleChipType = {
  _id: string;
  name: string;
  status?: string;
};

export default function InternalUserForm({ mode }: InternalUserFormProps) {
  const [password, setPassword] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [status, setStatus] = useState<string>("Active");
  const [citizenship, setCitizenship] = useState<string>("Thai");
  const [phoneCode, setPhoneCode] = useState<string>("66");
  const [roles, setRoles] = useState<RoleChipType[]>([]);
  const [avatarKey, setAvatarKey] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<any>({
    password: "",
    roles: "",
  });
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { internalUserDetail } = useSelector((state: RootState) => state.internalUsers);
  const { activeRoleList } = useSelector((state: RootState) => state.roles);

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      setGender(internalUserDetail.gender);
      setStatus(internalUserDetail.status);
      setDateOfBirth(internalUserDetail.dateOfBirth);
      setAvatarKey(internalUserDetail.avatar || "");
      setCitizenship(internalUserDetail.citizenship);
      setRoles(
        internalUserDetail.roles.map((role) => ({
          _id: role._id,
          name: role.name,
          status: role.status,
        })),
      );
      return {
        firstName: internalUserDetail.firstName,
        lastName: internalUserDetail.lastName,
        email: internalUserDetail.email,
        jobTitle: internalUserDetail.jobType,
        phoneNumber: internalUserDetail.phoneNumber,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      phoneNumber: "",
    };
  }, [internalUserDetail, mode]);

  const isErrorMessage = useIsErrorMessage(errorMessages);

  useEffect(() => {
    if (id && mode === "edit") {
      dispatch(getDetailInternalUserAction(id));
      dispatch(getParams(id));
    }
    if (mode === "create") {
      dispatch(resetCurrentInteralUser());
    }
  }, [dispatch, id, mode]);
  useEffect(() => {
    dispatch(getRoleActiveAction());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalUserSchema,
  });

  function handleChangePassword(value: string) {
    if (mode === "create") {
      passwordSchemaCreate
        .validate(value)
        .then(() => setErrorMessages({ ...errorMessages, password: "" }))
        .catch((error) => setErrorMessages({ ...errorMessages, password: error.errors[0] }));
      setPassword(value);
    }
    if (mode === "edit") {
      passwordSchemaEdit
        .validate(value)
        .then(() => setErrorMessages({ ...errorMessages, password: "" }))
        .catch((error) => setErrorMessages({ ...errorMessages, password: error.errors[0] }));
      setPassword(value);
    }
  }
  function handleChangeDateOfBirth(value: string) {
    setDateOfBirth(dayjs(value).toISOString());
  }
  function handleChangeGender(value: string | null) {
    if (value) setGender(value);
  }
  function handleChangeStatus(value: string | null) {
    if (value) setStatus(value);
  }
  function handleChangeCitizenship(value: string) {
    setCitizenship(value);
  }
  function handleChangePhoneCode(value: string) {
    setPhoneCode(value);
  }
  function handleSelectRoles(value: { _id: string; name: string }) {
    setErrorMessages({ ...errorMessages, roles: "" });
    setRoles((prevState) => [...prevState, value]);
  }
  function handleCloseRoleChip(id: string) {
    setRoles((prevState) => prevState.filter((item) => item._id !== id));
  }
  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    if (formik.errors.email === "This email is already in use") {
      delete formik.errors.email;
    }
    formik.handleChange(e);
  }
  function handleClickDelete() {
    setConfirmType("delete");
    setIsOpenModal(true);
  }
  function handleClickCancelEdit() {
    setConfirmType("action");
    setIsOpenModal(true);
  }
  function handleUploadProfileImage(key: string) {
    setAvatarKey(key);
  }
  async function handleConfirm() {
    if (confirmType === "action") {
      history.push(routesInternalUserManagement);
    }
    if (confirmType === "delete") {
      try {
        await deleteInternalUser(id);
        setIsOpenModal(false);
        setTimeout(() => {
          history.push(routesInternalUserManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
  }

  async function handleSubmit(values: any) {
    setLoading(true);
    const sendData = {
      ...values,
      avatar: avatarKey,
      jobType: values.jobTitle,
      password,
      dateOfBirth,
      gender,
      status,
      citizenship,
      phoneCode,
      phoneNumber: String(values.phoneNumber),
      roles: roles.map((role) => role._id),
    };

    if (password === "" && mode === "create") {
      setErrorMessages({ ...errorMessages, password: t("required_fields") });
      setLoading(false);
      return;
    }
    if (roles.length === 0) {
      setErrorMessages({ ...errorMessages, roles: "required_fields" });
      setLoading(false);
      return;
    }

    if (!isErrorMessage && mode === "create") {
      try {
        let response = null;
        if (dateOfBirth) {
          response = await createInternalUser({
            ...sendData,
          });
        } else {
          response = await createInternalUser({
            ...values,
            avatar: avatarKey,
            jobType: values.jobTitle,
            password,
            gender,
            status,
            citizenship,
            phoneCode,
            phoneNumber: String(values.phoneNumber),
            roles: roles.map((role) => role._id),
          });
        }

        if (response.statusCode) {
          if (response.message === "Email already exists") {
            formik.errors.email = "this_email_is_already_in_use";
          }
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setLoading(false);
          history.push(routesInternalUserManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
    if (password === "" && mode === "edit" && resetPassword) {
      setErrorMessages({ ...errorMessages, password: t("required_fields") });
      setLoading(false);
      return;
    }
    if (!isErrorMessage && mode === "edit") {
      try {
        if (sendData.password === "") delete sendData.password;
        let response = null;
        if (dateOfBirth) {
          response = await updateInternalUser({
            id,
            body: sendData,
          });
        } else {
          response = await updateInternalUser({
            id,
            body: {
              ...values,
              avatar: avatarKey,
              jobType: values.jobTitle,
              gender,
              status,
              password,
              citizenship,
              phoneCode,
              phoneNumber: String(values.phoneNumber),
              roles: roles.map((role) => role._id),
            },
          });
        }

        if (response.statusCode) {
          if (response.message === "Email already exists") {
            formik.errors.email = "this_email_is_already_in_use";
          }
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setLoading(false);
          history.push(routesInternalUserManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <>
      <div className="internal-user-form flex items-start">
        <div className="w-full mr-5 flex-1 items-start">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <CollapsibleBlock className="mb-5" heading={t("account-information")}>
              <Grid container xl={6} lg={8} md={8}>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("first-name")}</Label>
                      <Input
                        placeholder={t("first-name")}
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.firstName && formik.errors.firstName
                            ? t(formik.errors.firstName as "to_ship")
                            : ""
                        }
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("last-name")}</Label>
                      <Input
                        placeholder={t("last-name")}
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.lastName && formik.errors.lastName
                            ? t(formik.errors.lastName as "to_ship")
                            : ""
                        }
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label required>{t("status")}</Label>
                      <Select
                        options={[
                          { title: t`active`, value: "Active" },
                          { title: t`inactive`, value: "Inactive" },
                        ]}
                        defaultValue={status}
                        onChange={handleChangeStatus}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("job-title")}</Label>
                      <Input
                        placeholder={t("marketing")}
                        name="jobTitle"
                        value={formik.values.jobTitle}
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.jobTitle && formik.errors.jobTitle
                            ? t(formik.errors.jobTitle as "to_ship")
                            : ""
                        }
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label required>{t("email")}</Label>
                      <Input
                        placeholder={t("email")}
                        name="email"
                        value={formik.values.email}
                        onChange={handleChangeEmail}
                        errorMessage={
                          formik.touched.email && formik.errors.email
                            ? t(formik.errors.email as "to_ship")
                            : ""
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("phone-number")}</Label>
                      <SelectPhoneCode
                        onChangePhoneCode={handleChangePhoneCode}
                        name="phoneNumber"
                        phoneCode={internalUserDetail.phoneCode}
                        phoneNumber={formik.values.phoneNumber}
                        placeholder={t("phone-number")}
                        errorMessage={
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? t(formik.errors.phoneNumber as "to_ship")
                            : ""
                        }
                        onChangePhoneNumber={formik.handleChange}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label>{t("citizenship")}</Label>
                      <SelectCountry country={citizenship} onSelect={handleChangeCitizenship} />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label>{t("gender")}</Label>
                      <Select
                        options={[
                          { title: t("male"), value: "Male" },
                          { title: t("female"), value: "Female" },
                        ]}
                        defaultValue={gender}
                        onChange={handleChangeGender}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label>{t("date-of-birth")}</Label>
                      <DatePicker value={dateOfBirth} onChange={handleChangeDateOfBirth} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("password")}>
              <PasswordGenerator
                mode={mode}
                setPassword={setPassword}
                setResetPassword={setResetPassword}
                onChange={handleChangePassword}
                errorMessage={t(errorMessages.password as "to_ship")}
              />
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("role-permission")}>
              <Grid container direction="column" lg={6}>
                <div className="flex flex-col mb-8">
                  <Label required>{t("search-to-add-role")}</Label>
                  <Autocomplete
                    options={activeRoleList}
                    selectedOptions={roles}
                    onSelect={handleSelectRoles}
                    errorMessage={t(errorMessages.roles as "to_ship")}
                  />
                </div>
                <div className="roles-container">
                  {roles.length > 0 &&
                    roles.map((role) => (
                      <RoleChip
                        closeable
                        disabled={role.status === "Inactive"}
                        className="mr-5"
                        id={role._id}
                        name={role.name}
                        onClose={() => handleCloseRoleChip(role._id)}
                      />
                    ))}
                </div>
              </Grid>
            </CollapsibleBlock>
            <div className="footer-button">
              <Button
                loading={loading}
                loadingSize={20}
                className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                variant="text"
                type="submit"
              >
                {t("submit")}
              </Button>
              <Button
                variant="text"
                className="mr-7.5 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
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
                    {t("delete-account")}
                  </div>
                </Button>
              )}
            </div>
          </form>
        </div>
        <UploadProfileImage
          avatarUrl={internalUserDetail.avatarUrl}
          onChangeUpload={handleUploadProfileImage}
        />
      </div>
      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
}
