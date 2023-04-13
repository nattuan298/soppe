import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

import {
  Button,
  ButtonLink,
  CollapsibleBlock,
  DatePicker,
  Input,
  Label,
  Radio,
  RoundedCheckbox,
  Select,
  SelectCountry,
  SelectCountry2,
  SelectPhoneCode,
  Spinner,
  SponsorCard,
  SwitchCustom,
  UploadProfileImage,
} from "src/components";
import { getParams } from "src/store/router-params.slice";
import { routesUserManagement } from "src/constants/routes";
import { UploadSigleImage } from "src/components/upload-image-video/upload-single-image";
import { uploadImageFull } from "src/services/upload-image.services";
import { resetUser } from "src/store/user.slice";
import { RootState } from "src/store";
import { ItemArrayConvert } from "src/types/user.model";
import {
  getDistrictAPI,
  getProvinceAPI,
  getSubDistrictAPI,
  updateUser,
} from "src/services/user.services";
import { userSchema } from "./schema";
import "./styles.css";
import { notifyToast } from "src/constants/toast";
import { SelectAddress } from "src/components/select-address";
import { getUserIdAction } from "src/store/user.action";

type ParamsType = {
  id: string;
};

export default function UserForm() {
  const [status, setStatus] = useState<string | undefined>("");
  const [documentStatus, setDocumentStatus] = useState<string | undefined>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>("");
  const [facebookConnect, setFacebookConnect] = useState<boolean>(false);
  const [twoFa, setTwoFa] = useState<boolean | undefined>(false);
  const [gender, setGender] = useState<string | undefined>("");
  const [citizenship, setCitizenship] = useState<string | undefined>("");
  const [phone, setPhone] = useState({
    code: "",
    number: "",
  });
  const [same, setSame] = useState(false);
  const [listProvince, setListProvince] = useState<Array<ItemArrayConvert>>([]);
  const [listDistrict, setListDistrict] = useState<Array<ItemArrayConvert>>([]);
  const [listSubDistrict, setListSubDistrict] = useState<Array<ItemArrayConvert>>([]);

  const [listProvince2, setListProvince2] = useState<Array<ItemArrayConvert>>([]);
  const [listDistrict2, setListDistrict2] = useState<Array<ItemArrayConvert>>([]);
  const [listSubDistrict2, setListSubDistrict2] = useState<Array<ItemArrayConvert>>([]);

  const [provinceValue, setProvinceValue] = useState<string | undefined>("");
  const [districtValue, setDistrictValue] = useState<string | undefined>("");
  const [provinceValue2, setProvinceValue2] = useState<string | undefined>("");
  const [districtValue2, setDistrictValue2] = useState<string | undefined>("");

  const [touchedShippingAddress, setTouchedShippingAddress] = useState({
    province: false,
    district: false,
    subDistrict: false,
  });
  const [touchedBillingAddress, setTouchedBillingAddress] = useState({
    province: false,
    district: false,
    subDistrict: false,
  });
  const [errorShippingProvince, setErrorShippingProvince] = useState<string>("");
  const [errorShippingDistrict, setErrorShippingDistrict] = useState<string>("");
  const [errorShippingSubDistrict, setErrorShippingSubDistrict] = useState<string>("");
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [errorBillingProvince, setErrorBillingProvince] = useState<string>("");
  const [errorBillingDistrict, setErrorBillingDistrict] = useState<string>("");
  const [errorBillingSubDistrict, setErrorBillingSubDistrict] = useState<string>("");
  const [avatarKey, setAvatarKey] = useState<string>("");
  const [imageKeys, setImageKeys] = useState({
    idPhoto: "",
    beneficiaryIdPhoto: "",
    bankAccountPhoto: "",
    certificatePhoto: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    phoneCode: "",
    country: "Thailand",
    category: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
    province: "",
    provinceEng: "",
    district: "",
    subDistrict: "",
    districtEng: "",
    subDistrictEng: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    category: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    country: "Thailand",
    postalCode: "",
    province: "",
    district: "",
    subDistrict: "",
    address: "",
    provinceEng: "",
    districtEng: "",
    subDistrictEng: "",
  });
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userDetail, loadingDetail } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(getUserIdAction(id));
      dispatch(getParams(id));
    }
  }, [dispatch, id]);
  const getProvince = useCallback(
    async (country: string | undefined) => {
      try {
        if (country) {
          const response = (await getProvinceAPI(country)) as any;
          const idProvince = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.provinceEng,
          );
          setProvinceValue(idProvince?._id);
          setListProvince(response);
        } else {
          const response = (await getProvinceAPI("Thailand")) as any;
          const idProvince = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.provinceEng,
          );
          setProvinceValue(idProvince?._id);
          setListProvince(response);
        }
      } catch (e) {}
    },
    [shippingAddress.provinceEng],
  );
  const getDistrict = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          const response = (await getDistrictAPI(id)) as any;
          const idDistrict = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.districtEng,
          );
          setDistrictValue(idDistrict?._id);
          setListDistrict(response);
        }
      } catch (e) {}
    },
    [shippingAddress.districtEng, shippingAddress.country],
  );
  const getSubDistrict = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          const response = (await getSubDistrictAPI(id)) as any;
          setListSubDistrict(response);
        }
      } catch (e) {}
    },
    [shippingAddress.country],
  );
  const getProvince2 = useCallback(
    async (country: string | undefined) => {
      try {
        if (country) {
          const response = (await getProvinceAPI(country)) as any;
          const idProvince = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.provinceEng,
          );
          setProvinceValue2(idProvince?._id);
          setListProvince2(response);
        } else {
          const response = (await getProvinceAPI("Thailand")) as any;
          const idProvince = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.provinceEng,
          );
          setProvinceValue2(idProvince?._id);
          setListProvince2(response);
        }
      } catch (e) {}
    },
    [billingAddress.provinceEng],
  );
  const getDistrict2 = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          const response = (await getDistrictAPI(id)) as any;
          const idDistrict = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.districtEng,
          );
          setDistrictValue2(idDistrict?._id);
          setListDistrict2(response);
        }
      } catch (e) {}
    },
    [billingAddress.districtEng],
  );
  const getSubDistrict2 = useCallback(async (id: string | undefined) => {
    try {
      if (id) {
        const response = (await getSubDistrictAPI(id)) as any;
        setListSubDistrict2(response);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const callAddressList = async () => {
      await getProvince(shippingAddress.country);
    };
    callAddressList();
  }, [shippingAddress.country, getProvince]);

  useEffect(() => {
    const callAddressList = async () => {
      await getDistrict(provinceValue);
    };
    callAddressList();
  }, [provinceValue, getDistrict]);

  useEffect(() => {
    const callAddressList = async () => {
      await getSubDistrict(districtValue);
    };
    callAddressList();
  }, [districtValue, getSubDistrict]);

  useEffect(() => {
    const callAddressList = async () => {
      await getProvince2(billingAddress.country);
    };
    callAddressList();
  }, [billingAddress.country, getProvince2]);

  useEffect(() => {
    const callAddressList = async () => {
      await getDistrict2(provinceValue2);
    };
    callAddressList();
  }, [provinceValue2, getDistrict2]);

  useEffect(() => {
    const callAddressList = async () => {
      await getSubDistrict2(districtValue2);
    };
    callAddressList();
  }, [districtValue2, getSubDistrict2]);

  const handleChangeSelectShipping =
    (name: "province" | "district" | "subDistrict") => (value: string | null, title: string) => {
      if (value) {
        if (name === "province") {
          const { name, nameEng } = listProvince.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };

          setShippingAddress({
            ...shippingAddress,
            province: name,
            provinceEng: nameEng,
            district: "",
            districtEng: "",
            subDistrict: "",
            subDistrictEng: "",
          });
          setProvinceValue(value);
          setTouchedShippingAddress({
            province: true,
            district: false,
            subDistrict: false,
          });
          setErrorShippingProvince("");
          getDistrict(value);
        }
        if (name === "district") {
          const { name, nameEng } = listDistrict.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          setShippingAddress({
            ...shippingAddress,
            district: name,
            districtEng: nameEng,
            subDistrict: "",
            subDistrictEng: "",
          });
          setDistrictValue(value);
          setTouchedShippingAddress({
            province: false,
            district: true,
            subDistrict: false,
          });
          setErrorShippingDistrict("");
          getSubDistrict(value);
        }
        //
        if (name === "subDistrict") {
          const { name, nameEng } = listSubDistrict.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          setShippingAddress({ ...shippingAddress, subDistrict: name, subDistrictEng: nameEng });
          setTouchedShippingAddress({
            province: false,
            district: false,
            subDistrict: true,
          });
          setErrorShippingSubDistrict("");
        }
      }
    };
  const handleChangeSelectBilling =
    (name: "province" | "district" | "subDistrict") => (value: string | null, title: string) => {
      if (value) {
        if (name === "province") {
          const { name, nameEng } = listProvince2.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          setBillingAddress({
            ...billingAddress,
            province: name,
            provinceEng: nameEng,
            district: "",
            districtEng: "",
            subDistrict: "",
            subDistrictEng: "",
          });
          setTouchedBillingAddress({
            province: true,
            district: false,
            subDistrict: false,
          });
          setErrorBillingProvince("");
          getDistrict2(value);
        }
        if (name === "district") {
          const { name, nameEng } = listDistrict2.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          setBillingAddress({
            ...billingAddress,
            district: name,
            districtEng: nameEng,
            subDistrict: "",
            subDistrictEng: "",
          });
          setTouchedBillingAddress({
            province: false,
            district: true,
            subDistrict: false,
          });
          setErrorBillingDistrict("");
          getSubDistrict2(value);
        }
        if (name === "subDistrict") {
          const { name, nameEng } = listSubDistrict2.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          const newSubDistrict = { ...billingAddress, subDistrict: name, subDistrictEng: nameEng };
          setTouchedBillingAddress({
            province: false,
            district: false,
            subDistrict: true,
          });
          setErrorBillingSubDistrict("");
          setBillingAddress(newSubDistrict);
        }
      }
    };
  const initialValues = useMemo(() => {
    setStatus(userDetail.status);
    setGender(userDetail.gender);
    setDocumentStatus(userDetail.documentStatus);
    setDateOfBirth(userDetail.dateOfBirth);
    setCitizenship(userDetail.citizenship);
    setAvatarKey(userDetail?.avatar?.key || "");
    setFacebookConnect(userDetail.facebookAuth);
    setTwoFa(userDetail.googleAuth);
    setImageKeys({
      idPhoto: userDetail.images?.length > 0 ? userDetail.images[0]?.key : "",
      beneficiaryIdPhoto: userDetail.images?.length > 1 ? userDetail.images[1]?.key : "",
      bankAccountPhoto: userDetail.images?.length > 2 ? userDetail.images[2]?.key : "",
      certificatePhoto: userDetail.images?.length > 3 ? userDetail.images[3]?.key : "",
    });
    setShippingAddress({
      phoneCode: userDetail.shippingAddress?.phoneCode || "66",
      country: userDetail.shippingAddress?.country || "",
      category: userDetail.shippingAddress?.category || "",
      firstName: userDetail.shippingAddress?.firstName || "",
      lastName: userDetail.shippingAddress?.lastName || "",
      postalCode: userDetail.shippingAddress?.postalCode || "",
      address: userDetail.shippingAddress?.address || "",
      phoneNumber: userDetail.shippingAddress?.phoneNumber || "",
      province: userDetail.shippingAddress?.province || "",
      provinceEng: userDetail.shippingAddress?.provinceEng || "",
      district: userDetail.shippingAddress?.district || "",
      districtEng: userDetail.shippingAddress?.districtEng || "",
      subDistrict: userDetail.shippingAddress?.subDistrict || "",
      subDistrictEng: userDetail.shippingAddress?.subDistrictEng || "",
    });
    setBillingAddress({
      phoneCode: userDetail.billingAddress?.phoneCode || "66",
      country: userDetail.billingAddress?.country || "",
      category: userDetail.billingAddress?.category || "",
      firstName: userDetail.billingAddress?.firstName || "",
      lastName: userDetail.billingAddress?.lastName || "",
      postalCode: userDetail.billingAddress?.postalCode || "",
      address: userDetail.billingAddress?.address || "",
      phoneNumber: userDetail.billingAddress?.phoneNumber || "",
      province: userDetail.billingAddress?.province || "",
      provinceEng: userDetail.billingAddress?.provinceEng || "",
      district: userDetail.billingAddress?.district || "",
      districtEng: userDetail.billingAddress?.districtEng || "",
      subDistrict: userDetail.billingAddress?.subDistrict || "",
      subDistrictEng: userDetail.billingAddress?.subDistrictEng || "",
    });
    return {
      // personal information
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      memberId: userDetail.memberId,
      status: userDetail.status,
      email: userDetail.email,
      phoneNumber: userDetail.phoneNumber,
      // default shipping address
      shippingFirstName: userDetail.shippingAddress?.firstName,
      shippingLastName: userDetail.shippingAddress?.lastName,
      shippingPhoneNumber: userDetail.shippingAddress?.phoneNumber,
      shippingPostalCode: userDetail.shippingAddress?.postalCode,
      shippingAddress: userDetail.shippingAddress?.address,
      shippingIsDefault: userDetail.shippingAddress?.default,
      shippingCategory: userDetail.shippingAddress?.category,
      // default billing address
      billingFirstName: userDetail.billingAddress?.firstName,
      billingLastName: userDetail.billingAddress?.lastName,
      billingPhoneNumber: userDetail.billingAddress?.phoneNumber,
      billingPostalCode: userDetail.billingAddress?.postalCode,
      billingAddress: userDetail.billingAddress?.address,
      billingIsDefault: userDetail.billingAddress?.default,
      billingCategory: userDetail.billingAddress?.category,
    };
  }, [userDetail]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validate: (values) => {
      if (
        isEmpty(shippingAddress.provinceEng) ||
        isEmpty(shippingAddress.districtEng) ||
        isEmpty(shippingAddress.subDistrictEng) ||
        isEmpty(billingAddress.provinceEng) ||
        isEmpty(billingAddress.districtEng) ||
        isEmpty(billingAddress.subDistrictEng)
      ) {
        if (isEmpty(shippingAddress.provinceEng) && touchedShippingAddress.province)
          setErrorShippingProvince("required_fields");
        if (isEmpty(shippingAddress.districtEng) && touchedShippingAddress.district)
          setErrorShippingDistrict("required_fields");
        if (
          isEmpty(shippingAddress.subDistrictEng) &&
          shippingAddress.district !== "Con Dao" &&
          touchedShippingAddress.subDistrict
        )
          setErrorShippingSubDistrict("required_fields");
        if (isEmpty(billingAddress.provinceEng) && touchedBillingAddress.province)
          setErrorBillingProvince("required_fields");
        if (isEmpty(billingAddress.districtEng) && touchedBillingAddress.district)
          setErrorBillingDistrict("required_fields");
        if (
          isEmpty(billingAddress.subDistrictEng) &&
          billingAddress.district !== "Con Dao" &&
          touchedBillingAddress.subDistrict
        )
          setErrorBillingSubDistrict("required_fields");
      }
    },
    validationSchema: userSchema,
  });

  function handleTheSame(event: ChangeEvent<HTMLInputElement>) {
    setSame(event.target.checked);
    if (event.target.checked === true) {
      delete formik.errors.billingFirstName;
      delete formik.errors.billingLastName;
      delete formik.errors.billingPhoneNumber;
      delete formik.errors.billingPostalCode;
      delete formik.errors.billingAddress;
      setErrorBillingProvince(errorShippingProvince);
      setErrorBillingDistrict(errorShippingDistrict);
      setErrorBillingSubDistrict(errorShippingSubDistrict);
      formik.values.billingFirstName = formik.values.shippingFirstName;
      formik.values.billingLastName = formik.values.shippingLastName;
      formik.values.billingPhoneNumber = formik.values.shippingPhoneNumber;
      formik.values.billingPostalCode = formik.values.shippingPostalCode;
      formik.values.billingAddress = formik.values.shippingAddress;
      formik.values.billingCategory = formik.values.shippingCategory;

      setBillingAddress({ ...shippingAddress });
    }
  }
  function handleChangeDateOfBirth(value: string) {
    setDateOfBirth(dayjs(value).format("YYYY-MM-DD"));
  }
  function handleChangeDocumentStatus(value: string | null) {
    value && setDocumentStatus(value);
  }
  function handleChangeGender(value: string | null) {
    value && setGender(value);
  }
  function handleChangeCitizenship(value: string) {
    setCitizenship(value);
  }
  function handleChangeCountry(value: string) {
    setShippingAddress({
      ...shippingAddress,
      country: value,
      province: "",
      provinceEng: "",
      district: "",
      districtEng: "",
      subDistrict: "",
      subDistrictEng: "",
    });
    formik.values.shippingAddress = "";

    setListDistrict([]);
    setListSubDistrict([]);
  }
  function handleChangeCountry2(value: string) {
    setBillingAddress({
      ...billingAddress,
      country: value,
      province: "",
      provinceEng: "",
      district: "",
      districtEng: "",
      subDistrict: "",
      subDistrictEng: "",
    });
    formik.values.billingAddress = "";
  }
  function handleChangePhoneCode(value: string) {
    setPhone({ ...phone, code: value });
  }
  async function handleChangeIdImage(file: File) {
    const key = await getKeyImage(file, "");
    setImageKeys({
      ...imageKeys,
      idPhoto: key,
    });
  }
  async function handleChangeBeneficiaryIdImage(file: File) {
    const key = await getKeyImage(file, "");
    setImageKeys({
      ...imageKeys,
      beneficiaryIdPhoto: key,
    });
  }
  async function handleChangeBankingImage(file: File) {
    const key = await getKeyImage(file, "");
    setImageKeys({
      ...imageKeys,
      bankAccountPhoto: key,
    });
  }
  async function handleChangeCertificateImage(file: File) {
    const key = await getKeyImage(file, "");
    setImageKeys({
      ...imageKeys,
      certificatePhoto: key,
    });
  }
  function handleChangePhoneCodeShipping(value: string) {
    setShippingAddress({ ...shippingAddress, phoneCode: value });
  }
  function handleUploadProfileImage(key: string) {
    setAvatarKey(key);
  }
  function handleChangePhoneCodeBilling(value: string) {
    setBillingAddress({ ...billingAddress, phoneCode: value });
  }
  const getKeyImage = async (newFile: File | null, defaultkey: string) => {
    if (newFile) {
      const key = await uploadImageFull({ file: newFile, moduleName: "user" });
      return key;
    }
    return defaultkey;
  };
  const handleChangeFacebookConnect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userDetail.facebookAuth === false) {
      return;
    }
    setFacebookConnect(false);
  };
  const handleChange2FAGoogle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userDetail.googleAuth === false) {
      return;
    }
    setTwoFa(false);
  };
  function handleValidateOnSubmit() {
    if (
      isEmpty(shippingAddress.provinceEng) ||
      isEmpty(shippingAddress.districtEng) ||
      isEmpty(shippingAddress.subDistrictEng) ||
      isEmpty(billingAddress.provinceEng) ||
      isEmpty(billingAddress.districtEng) ||
      isEmpty(billingAddress.subDistrictEng)
    ) {
      if (isEmpty(shippingAddress.provinceEng)) setErrorShippingProvince("required_fields");
      if (isEmpty(shippingAddress.districtEng)) setErrorShippingDistrict("required_fields");
      if (isEmpty(shippingAddress.subDistrictEng) && shippingAddress.districtEng !== "Con Dao")
        setErrorShippingSubDistrict("required_fields");
      if (isEmpty(billingAddress.provinceEng)) setErrorBillingProvince("required_fields");
      if (isEmpty(billingAddress.districtEng)) setErrorBillingDistrict("required_fields");
      if (isEmpty(billingAddress.subDistrictEng) && billingAddress.districtEng !== "Con Dao")
        setErrorBillingSubDistrict("required_fields");
    }
  }

  async function handleSubmit(values: any) {
    setLoadingSubmit(true);
    if (
      !isEmpty(errorShippingProvince) ||
      !isEmpty(errorShippingDistrict) ||
      !isEmpty(errorShippingSubDistrict) ||
      !isEmpty(errorBillingProvince) ||
      !isEmpty(errorBillingDistrict) ||
      !isEmpty(errorBillingSubDistrict)
    ) {
      setTimeout(() => {
        setLoadingSubmit(false);
      }, 1000);
      return;
    }

    try {
      const uploadedDocumentsThai = [
        {
          type: "ID_CARD_PHOTO",
          key: imageKeys.idPhoto,
        },
        {
          type: "BENEFICIARY_ID_CARD_PHOTO",
          key: imageKeys.beneficiaryIdPhoto,
        },
        {
          type: "BOOK_BANK_PHOTO",
          key: imageKeys.bankAccountPhoto,
        },
        {
          type: "CERTIFICATE_PHOTO",
          key: imageKeys.certificatePhoto,
        },
      ];
      const uploadedDocumentsForeigner = [
        {
          type: "PASSPORT_PHOTO",
          key: imageKeys.idPhoto,
        },
        {
          type: "BENEFICIARY_PASSPORT_PHOTO",
          key: imageKeys.beneficiaryIdPhoto,
        },
        {
          type: "CASH_CARD_PHOTO",
          key: imageKeys.bankAccountPhoto,
        },
      ];

      const sendData = {
        firstName: values.firstName,
        lastName: values.lastName,
        memberId: values.memberId,
        status: values.status,
        email: values.email,
        facebookAuth: facebookConnect,
        avatar: avatarKey,
        dateOfBirth,
        gender,
        smsAuth: true, // hardcode
        googleAuth: twoFa,
        documentStatus,
        shippingAddress: {
          ...shippingAddress,
          firstName: values.shippingFirstName,
          lastName: values.shippingLastName,
          phoneNumber: values.shippingPhoneNumber,
          postalCode: values.shippingPostalCode,
          address: values.shippingAddress,
          default: values.shippingIsDefault,
          category: values.shippingCategory,
        },
        billingAddress: {
          ...billingAddress,
          firstName: values.billingFirstName,
          lastName: values.billingLastName,
          phoneNumber: values.billingPhoneNumber,
          postalCode: values.billingPostalCode,
          address: values.billingAddress,
          default: values.billingIsDefault,
          category: values.billingCategory,
        },
        images: citizenship === "Thai" ? uploadedDocumentsThai : uploadedDocumentsForeigner,
      };
      const response = await updateUser(sendData);
      if (response.statusCode === 400) {
        setLoadingSubmit(false);
        notifyToast("error", "avatar_should_not_be_empty", t);
        return;
      }
      setTimeout(() => {
        setLoadingSubmit(false);
        dispatch(resetUser());
        history.push(routesUserManagement);
      }, 1000);
    } catch (e) {
      throw e;
    }
  }

  return (
    <>
      <div className="internal-user-form flex items-start mb-12">
        <div className="w-full mr-5 flex-1 items-start">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              handleValidateOnSubmit();
            }}
          >
            <CollapsibleBlock className="mb-5" heading={t("personal-information")}>
              {loadingDetail ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <Grid container lg={9} md={6} xl={6}>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("first-name")}</Label>
                        <Input
                          placeholder={t("first-name")}
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.firstName && formik.errors.firstName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("last-name")}</Label>
                        <Input
                          placeholder={t("last-name")}
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.lastName && formik.errors.lastName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label>{t("member-id")}</Label>
                        <Input
                          placeholder="MemberId"
                          name="memberId"
                          value={formik.values.memberId}
                          disabled={true}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("status")}</Label>
                        <Select
                          disable
                          options={[
                            { title: t("active"), value: "Active" },
                            { title: t("terminate"), value: "Terminate" },
                            { title: t("expire"), value: "Expire" },
                          ]}
                          defaultValue={status}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("phone-number")}</Label>
                        <SelectPhoneCode
                          placeholder={t("phone-number")}
                          disabled
                          onChangePhoneCode={handleChangePhoneCode}
                          onChangePhoneNumber={formik.handleChange}
                          name="phoneNumber"
                          phoneCode={userDetail.phoneCode}
                          phoneNumber={formik.values.phoneNumber}
                          errorMessage={
                            formik.touched.phoneNumber && formik.errors.phoneNumber
                              ? t("required_fields")
                              : ""
                          }
                          inputProps={{
                            maxLength: 15,
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label>{t("email")}</Label>
                        <Input
                          placeholder={t("email")}
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.email && formik.errors.email
                              ? t(formik.errors.email as "to_ship")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("citizenship")}</Label>
                        <SelectCountry
                          disabled
                          country={citizenship}
                          onSelect={handleChangeCitizenship}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
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
                    <Grid item lg={6}>
                      <div className="flex flex-col  mr-4">
                        <Label>{t("date-of-birth")}</Label>
                        <DatePicker value={dateOfBirth} onChange={handleChangeDateOfBirth} />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("document-status")}</Label>
                        <Select
                          options={[
                            { title: t("complete"), value: "Complete" },
                            { title: t("pending"), value: "Pending" },
                          ]}
                          defaultValue={documentStatus}
                          onChange={handleChangeDocumentStatus}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex items-center mr-4">
                        <Label className="mr-12 mb-0">{t("facebook-connection")}</Label>
                        <SwitchCustom
                          checked={facebookConnect}
                          onChange={handleChangeFacebookConnect}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex items-center ml-4">
                        <Label className="mr-12 mb-0">{t("2fa-google-authen")}</Label>
                        <SwitchCustom checked={twoFa} onChange={handleChange2FAGoogle} />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4">
                    <Label>{t("sponsor")}</Label>
                    <SponsorCard showVerified sponsorData={userDetail?.sponsor} />
                  </Grid>
                </Grid>
              )}
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("uploaded-documents")}>
              {loadingDetail ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <Grid container lg={10} className="uploaded-component">
                  <Grid className="mb-4" container>
                    <Grid item lg={6} className="px-2">
                      <Label>{t("id-passort-photo")}</Label>
                      <div className="mt-2">
                        <UploadSigleImage
                          name={t("upload-the-image")}
                          setImage={handleChangeIdImage}
                          urlDefaultPreview={
                            userDetail?.images?.[0] ? userDetail?.images?.[0].url : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6} className="px-2">
                      <Label>{t("beneficiary-id-passpord-photo")}</Label>
                      <div className="mt-2">
                        <UploadSigleImage
                          name={t("upload-the-image")}
                          setImage={handleChangeBeneficiaryIdImage}
                          urlDefaultPreview={
                            userDetail?.images?.[1] ? userDetail?.images?.[1].url : ""
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6} className="px-2">
                      {citizenship === "Thai" ? (
                        <Label>{t("banking-account-photo")}</Label>
                      ) : (
                        <Label>{t("cash_card_photo")}</Label>
                      )}
                      <div className="mt-2">
                        <UploadSigleImage
                          name={t("upload-the-image")}
                          setImage={handleChangeBankingImage}
                          urlDefaultPreview={
                            userDetail?.images?.[2] ? userDetail?.images?.[2].url : ""
                          }
                        />
                      </div>
                    </Grid>
                    {citizenship === "Thai" && (
                      <Grid item lg={6} className="px-2">
                        <Label>{t("marriage-relationship-certificate-photo")}</Label>
                        <div className="mt-2">
                          <UploadSigleImage
                            name={t("upload-the-image")}
                            setImage={handleChangeCertificateImage}
                            urlDefaultPreview={
                              userDetail?.images?.[3] ? userDetail?.images?.[3].url : ""
                            }
                          />
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("default-shipping-address")}>
              {loadingDetail ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <Grid container direction="column" lg={9} md={6} xl={6}>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("first-name")}</Label>
                        <Input
                          placeholder={t("first-name")}
                          name="shippingFirstName"
                          value={formik.values.shippingFirstName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            formik.handleChange(e);
                          }}
                          errorMessage={
                            formik.touched.shippingFirstName && formik.errors.shippingFirstName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("last-name")}</Label>
                        <Input
                          placeholder={t("last-name")}
                          name="shippingLastName"
                          value={formik.values.shippingLastName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            formik.handleChange(e);
                          }}
                          errorMessage={
                            formik.touched.shippingLastName && formik.errors.shippingLastName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("phone-number")}</Label>
                        <SelectPhoneCode
                          placeholder={t("phone-number")}
                          onChangePhoneCode={handleChangePhoneCodeShipping}
                          onChangePhoneNumber={(e: ChangeEvent<HTMLInputElement>) => {
                            formik.handleChange(e);
                          }}
                          name="shippingPhoneNumber"
                          phoneCode={shippingAddress.phoneCode}
                          phoneNumber={formik.values.shippingPhoneNumber}
                          inputProps={{
                            maxLength: 15,
                          }}
                          errorMessage={
                            formik.touched.shippingPhoneNumber && formik.errors.shippingPhoneNumber
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("country")}</Label>
                        <SelectCountry2
                          country={shippingAddress.country}
                          onSelect={handleChangeCountry}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("postal-code")}</Label>
                        <Input
                          placeholder={t("postal-code")}
                          name="shippingPostalCode"
                          value={formik.values.shippingPostalCode}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            formik.handleChange(e);
                          }}
                          errorMessage={
                            formik.touched.shippingPostalCode && formik.errors.shippingPostalCode
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("province")}</Label>
                        <SelectAddress
                          placeholder={t("province")}
                          options={listProvince}
                          defaultValue={shippingAddress.provinceEng}
                          onChange={handleChangeSelectShipping("province")}
                          error={t(errorShippingProvince as "all_countries")}
                          country={shippingAddress.country}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("district")}</Label>
                        <SelectAddress
                          placeholder={t("district")}
                          options={listDistrict}
                          defaultValue={shippingAddress.districtEng}
                          onChange={handleChangeSelectShipping("district")}
                          error={t(errorShippingDistrict as "all_countries")}
                          country={shippingAddress.country}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("sub-district")}</Label>
                        <SelectAddress
                          placeholder={t("sub-district")}
                          options={listSubDistrict}
                          defaultValue={shippingAddress.subDistrictEng}
                          onChange={handleChangeSelectShipping("subDistrict")}
                          error={t(errorShippingSubDistrict as "all_countries")}
                          country={shippingAddress.country}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <div className="flex flex-col w-full">
                      <Label required>{t("address")}</Label>
                      <Input
                        minRows={5}
                        placeholder={t("address")}
                        value={formik.values.shippingAddress}
                        name="shippingAddress"
                        multiline={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          formik.handleChange(e);
                        }}
                        errorMessage={
                          formik.touched.shippingAddress && formik.errors.shippingAddress
                            ? t("required_fields")
                            : ""
                        }
                      />
                    </div>
                  </Grid>
                  <Grid className="mb-4" container>
                    <div className="flex flex-col mr-64">
                      <Label>{t("default-shipping-address")}</Label>
                      <RadioGroup
                        value={String(formik.values.shippingIsDefault) === "true"}
                        name="shippingIsDefault"
                        style={{ display: "block" }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          formik.handleChange(e);
                        }}
                      >
                        <FormControlLabel
                          value={!userDetail.shippingAddress}
                          control={<Radio />}
                          label={<span className="text-sm">{t("on-radio")}</span>}
                        />
                        <FormControlLabel
                          value={!!userDetail.shippingAddress}
                          control={<Radio />}
                          label={<span className="text-sm">{t("off-radio")}</span>}
                        />
                      </RadioGroup>
                    </div>
                    <div className="flex flex-col">
                      <Label>{t("address-category")}</Label>
                      <RadioGroup
                        value={formik.values.shippingCategory}
                        name="shippingCategory"
                        style={{ display: "block" }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          formik.handleChange(e);
                        }}
                      >
                        <FormControlLabel
                          value="Home"
                          control={<Radio />}
                          label={<span className="text-sm">{t("home-radio")}</span>}
                        />
                        <FormControlLabel
                          value="Office"
                          control={<Radio />}
                          label={<span className="text-sm">{t("office-radio")}</span>}
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label={<span className="text-sm">{t("other-radio")}</span>}
                        />
                      </RadioGroup>
                    </div>
                  </Grid>
                </Grid>
              )}
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("default-billing-address")}>
              <Grid className="mb-4" container>
                <div className="flex flex-row">
                  <FormControlLabel
                    control={
                      <RoundedCheckbox checked={same} value={same} onChange={handleTheSame} />
                    }
                    label={t`the-same-address`}
                  />
                </div>
              </Grid>
              {loadingDetail ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <Grid container direction="column" lg={9} md={6} xl={6}>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("first-name")}</Label>
                        <Input
                          disabled={same}
                          placeholder={t("first-name")}
                          name="billingFirstName"
                          value={formik.values.billingFirstName}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.billingFirstName && formik.errors.billingFirstName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("last-name")}</Label>
                        <Input
                          disabled={same}
                          placeholder={t("last-name")}
                          name="billingLastName"
                          value={formik.values.billingLastName}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.billingLastName && formik.errors.billingLastName
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("phone-number")}</Label>
                        <SelectPhoneCode
                          placeholder={t("phone-number")}
                          onChangePhoneCode={handleChangePhoneCodeBilling}
                          onChangePhoneNumber={formik.handleChange}
                          name="billingPhoneNumber"
                          phoneCode={billingAddress.phoneCode}
                          phoneNumber={formik.values.billingPhoneNumber}
                          disabled={same}
                          inputProps={{
                            maxLength: 15,
                          }}
                          errorMessage={
                            formik.touched.billingPhoneNumber && formik.errors.billingPhoneNumber
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("country")}</Label>
                        <SelectCountry2
                          disabled={same}
                          country={billingAddress.country}
                          onSelect={handleChangeCountry2}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("postal-code")}</Label>
                        <Input
                          disabled={same}
                          placeholder={t("postal-code")}
                          name="billingPostalCode"
                          value={formik.values.billingPostalCode}
                          onChange={formik.handleChange}
                          errorMessage={
                            formik.touched.billingPostalCode && formik.errors.billingPostalCode
                              ? t("required_fields")
                              : ""
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("province")}</Label>
                        <SelectAddress
                          placeholder={t("province")}
                          disable={same}
                          options={listProvince2}
                          defaultValue={billingAddress.provinceEng}
                          onChange={handleChangeSelectBilling("province")}
                          error={t(errorBillingProvince as "all_countries")}
                          country={billingAddress.country}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item lg={6}>
                      <div className="flex flex-col mr-4">
                        <Label required>{t("district")}</Label>
                        <SelectAddress
                          placeholder={t("district")}
                          disable={same}
                          options={listDistrict2}
                          defaultValue={billingAddress.districtEng}
                          onChange={handleChangeSelectBilling("district")}
                          error={t(errorBillingDistrict as "all_countries")}
                          country={billingAddress.country}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <div className="flex flex-col ml-4">
                        <Label required>{t("sub-district")}</Label>
                        <SelectAddress
                          placeholder={t("sub-district")}
                          disable={same}
                          options={listSubDistrict2}
                          defaultValue={billingAddress.subDistrictEng}
                          onChange={handleChangeSelectBilling("subDistrict")}
                          error={t(errorBillingSubDistrict as "all_countries")}
                          country={billingAddress.country}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <div className="flex flex-col w-full">
                      <Label required>{t("address")}</Label>
                      <Input
                        minRows={5}
                        onChange={formik.handleChange}
                        placeholder={t("address")}
                        value={formik.values.billingAddress}
                        name="billingAddress"
                        multiline={true}
                        disabled={same}
                        errorMessage={
                          formik.touched.billingAddress && formik.errors.billingAddress
                            ? t("required_fields")
                            : ""
                        }
                      />
                    </div>
                  </Grid>
                  <Grid className="mb-4" container>
                    <div className="flex flex-col mr-64">
                      <Label>{t("default-billing-address")}</Label>
                      <RadioGroup
                        value={String(formik.values.billingIsDefault) === "true"}
                        name="billingIsDefault"
                        style={{ display: "block" }}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value={!userDetail.billingAddress}
                          control={<Radio />}
                          label={<span className="text-sm">{t("on-radio")}</span>}
                        />
                        <FormControlLabel
                          value={!!userDetail.billingAddress}
                          control={<Radio />}
                          label={<span className="text-sm">{t("off-radio")}</span>}
                        />
                      </RadioGroup>
                    </div>
                    <div className="flex flex-col">
                      <Label>{t("address-category")}</Label>
                      <RadioGroup
                        value={formik.values.billingCategory}
                        name="billingCategory"
                        style={{ display: "block" }}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          disabled={same}
                          value="Home"
                          control={<Radio />}
                          label={<span className="text-sm">{t("home-radio")}</span>}
                        />
                        <FormControlLabel
                          disabled={same}
                          value="Office"
                          control={<Radio />}
                          label={<span className="text-sm">{t("office-radio")}</span>}
                        />
                        <FormControlLabel
                          disabled={same}
                          value="Other"
                          control={<Radio />}
                          label={<span className="text-sm">{t("other-radio")}</span>}
                        />
                      </RadioGroup>
                    </div>
                  </Grid>
                </Grid>
              )}
            </CollapsibleBlock>
            <div className="flex">
              <Button
                className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                variant="text"
                type="submit"
                loading={loadingSubmit}
              >
                {t("submit")}
              </Button>
              <ButtonLink
                variant="text"
                to={routesUserManagement}
                className="mr-7.5 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
              >
                {t("cancel")}
              </ButtonLink>
            </div>
          </form>
        </div>
        <UploadProfileImage
          avatarUrl={userDetail?.avatar?.url}
          onChangeUpload={handleUploadProfileImage}
        />
      </div>
    </>
  );
}
