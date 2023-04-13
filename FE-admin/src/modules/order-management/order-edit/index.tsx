import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

import { phoneNumberFormatter, textChangeLanguage } from "src/lib/format";
import { getParams } from "src/store/router-params.slice";
import {
  Button,
  CollapsibleBlock,
  Input,
  InputOnlyNumber,
  Label,
  Modal,
  RoundedCheckbox,
  Select,
  SelectCountry2,
  SelectPhoneCode,
  SponsorCard,
} from "src/components";
import { resetOrder } from "src/store/order.slice";
import { fetchOrderDetailByID } from "src/store/order.action";
import { FormatNumber } from "src/lib/format-number";
import ProductCard from "./product-card";
import { ItemArrayConvert } from "src/types/user.model";
import { getDistrictAPI, getProvinceAPI, getSubDistrictAPI } from "src/services/user.services";
import {
  getBranches,
  getProvincesContainBranches,
  updateOrder,
} from "src/services/orders.services";
import { useStatusOptions } from "./constants";
import { RootState } from "src/store";
import { ParamsType } from "src/types/params.model";
import { useStyles } from "./styles";
import { orderSchema } from "./schema";
import { routesOrderManagement } from "src/constants/routes";
import { PickupAddress, UpdateOrderRequest } from "src/types/order.model";
import { SelectAddress } from "src/components/select-address";

export default function OrderEdit() {
  const [listShippingProvince, setShippingProvinceList] = useState<Array<ItemArrayConvert>>([]);
  const [listShippingDistrict, setShippingDistrictList] = useState<Array<ItemArrayConvert>>([]);
  const [listShippingSubDistrict, setShippingSubDistrictList] = useState<Array<ItemArrayConvert>>(
    [],
  );

  const [listBillingProvince, setBillingProvinceList] = useState<Array<ItemArrayConvert>>([]);
  const [listBillingDistrict, setBillingDistrictList] = useState<Array<ItemArrayConvert>>([]);
  const [listBillingSubDistrict, setBillingSubDistrictList] = useState<Array<ItemArrayConvert>>([]);

  const [listPickupProvince, setPickupProvinceList] = useState<Array<ItemArrayConvert>>([]);
  const [listPickupBranch, setPickupBranchList] = useState<Array<ItemArrayConvert>>([]);
  const [branchList, setBranchList] = useState<PickupAddress[]>([]);

  const [shippingProvinceValue, setShippingProvinceValue] = useState<string | undefined>();
  const [shippingDistrictValue, setShippingDistrictValue] = useState<string | undefined>();

  const [billingProvinceValue, setBillingProvinceValue] = useState<string | undefined>();
  const [billingDistrictValue, setBillingDistrictValue] = useState<string | undefined>();

  const [pickupProvinceValue, setPickupProvinceValue] = useState<string | undefined>();

  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isModalDeleted, setIsModalDeleted] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState({
    phoneCode: "",
    country: "",
    province: "",
    district: "",
    subDistrict: "",
    subDistrictEng: "",
    provinceEng: "",
    districtEng: "",
  });
  const [touchedShippingAddress, setTouchedShippingAddress] = useState({
    province: false,
    district: false,
    subDistrict: false,
  });
  const [billingAddress, setBillingAddress] = useState({
    phoneCode: "",
    country: "",
    province: "",
    district: "",
    subDistrict: "",
    subDistrictEng: "",
    provinceEng: "",
    districtEng: "",
  });
  const [touchedBillingAddress, setTouchedBillingAddress] = useState({
    province: false,
    district: false,
    subDistrict: false,
  });
  const [pickupAddress, setPickupAddress] = useState({
    country: "",
    province: "",
    branch: "",
    code: "",
    address: "",
    phoneNumbers: [""],
    phoneCode: "",
    provinceEng: "",
    branchEng: "",
    addressEng: "",
    businessHours: "",
    businessHoursEng: "",
  });
  const [touchedPickupAddress, setTouchedPickupAddress] = useState({
    province: false,
    branch: false,
  });
  const [errorShippingProvince, setErrorShippingProvince] = useState<string>("");
  const [errorShippingDistrict, setErrorShippingDistrict] = useState<string>("");
  const [errorShippingSubDistrict, setErrorShippingSubDistrict] = useState<string>("");

  const [errorBillingProvince, setErrorBillingProvince] = useState<string>("");
  const [errorBillingDistrict, setErrorBillingDistrict] = useState<string>("");
  const [errorBillingSubDistrict, setErrorBillingSubDistrict] = useState<string>("");

  const [errorPickupProvince, setErrorPickupProvince] = useState<string>("");
  const [errorPickupBranch, setErrorPickupBranch] = useState<string>("");
  const statusOptions = useStatusOptions();

  const { tableHead, tableBody } = useStyles();
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;
  const dispatch = useDispatch();
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const { orderDetail, errorMessage } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (errorMessage === "404") {
      history.push("/error-404-not-found");
    }
  }, [errorMessage]);

  const initialValues = useMemo(() => {
    setShippingAddress({
      phoneCode: orderDetail.shippingAddress?.phoneCode || "66",
      country: orderDetail.shippingAddress?.country || "Thailand",
      province: orderDetail.shippingAddress?.province,
      district: orderDetail.shippingAddress?.district,
      subDistrict: orderDetail.shippingAddress?.subDistrict,
      subDistrictEng: orderDetail.shippingAddress?.subDistrictEng || "",
      provinceEng: orderDetail.shippingAddress?.provinceEng || "",
      districtEng: orderDetail.shippingAddress?.districtEng || "",
    });
    setBillingAddress({
      phoneCode: orderDetail.billingAddress?.phoneCode || "66",
      country: orderDetail.billingAddress?.country || "Thailand",
      province: orderDetail.billingAddress?.province,
      district: orderDetail.billingAddress?.district,
      subDistrict: orderDetail.billingAddress?.subDistrict,
      subDistrictEng: orderDetail.billingAddress?.subDistrictEng || "",
      provinceEng: orderDetail.billingAddress?.provinceEng || "",
      districtEng: orderDetail.billingAddress?.districtEng || "",
    });
    setPickupAddress({
      country: orderDetail.pickupAddress?.country || "Thailand",
      province: orderDetail.pickupAddress?.province,
      branch: orderDetail.pickupAddress?.branch,
      code: orderDetail.pickupAddress?.code || "66",
      address: orderDetail.pickupAddress?.address,
      phoneNumbers: orderDetail.pickupAddress?.phoneNumbers,
      phoneCode: orderDetail.pickupAddress?.phoneCode,
      provinceEng: orderDetail.pickupAddress?.provinceEng || "",
      branchEng: orderDetail.pickupAddress?.branchEng || "",
      addressEng: orderDetail.pickupAddress?.addressEng || "",
      businessHours: orderDetail.pickupAddress?.businessHours || "",
      businessHoursEng: orderDetail.pickupAddress?.businessHoursEng || "",
    });
    return {
      // shipping address
      shippingFirstName: orderDetail.shippingAddress?.firstName,
      shippingLastName: orderDetail.shippingAddress?.lastName,
      shippingPhoneNumber: orderDetail.shippingAddress?.phoneNumber,
      shippingPostalCode: orderDetail.shippingAddress?.postalCode,
      shippingAddress: orderDetail.shippingAddress?.address,

      // billing address
      billingFirstName: orderDetail.billingAddress?.firstName,
      billingLastName: orderDetail.billingAddress?.lastName,
      billingPhoneNumber: orderDetail.billingAddress?.phoneNumber,
      billingPostalCode: orderDetail.billingAddress?.postalCode,
      billingAddress: orderDetail.billingAddress?.address,
    };
  }, [
    orderDetail.billingAddress?.address,
    orderDetail.billingAddress?.country,
    orderDetail.billingAddress?.district,
    orderDetail.billingAddress?.firstName,
    orderDetail.billingAddress?.lastName,
    orderDetail.billingAddress?.phoneCode,
    orderDetail.billingAddress?.phoneNumber,
    orderDetail.billingAddress?.postalCode,
    orderDetail.billingAddress?.province,
    orderDetail.billingAddress?.subDistrict,
    orderDetail.billingAddress?.districtEng,
    orderDetail.billingAddress?.provinceEng,
    orderDetail.billingAddress?.subDistrictEng,
    orderDetail.pickupAddress?.address,
    orderDetail.pickupAddress?.branch,
    orderDetail.pickupAddress?.code,
    orderDetail.pickupAddress?.country,
    orderDetail.pickupAddress?.phoneCode,
    orderDetail.pickupAddress?.phoneNumbers,
    orderDetail.pickupAddress?.province,
    orderDetail.pickupAddress?.addressEng,
    orderDetail.pickupAddress?.branchEng,
    orderDetail.pickupAddress?.provinceEng,
    orderDetail.shippingAddress?.address,
    orderDetail.shippingAddress?.country,
    orderDetail.shippingAddress?.district,
    orderDetail.shippingAddress?.firstName,
    orderDetail.shippingAddress?.lastName,
    orderDetail.shippingAddress?.phoneCode,
    orderDetail.shippingAddress?.phoneNumber,
    orderDetail.shippingAddress?.postalCode,
    orderDetail.shippingAddress?.provinceEng,
    orderDetail.shippingAddress?.subDistrictEng,
    orderDetail.shippingAddress?.districtEng,
  ]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validate: (values) => {
      if (
        (isEmpty(shippingAddress.provinceEng) ||
          isEmpty(shippingAddress.districtEng) ||
          isEmpty(shippingAddress.subDistrictEng) ||
          isEmpty(billingAddress.provinceEng) ||
          isEmpty(billingAddress.districtEng) ||
          isEmpty(billingAddress.subDistrictEng) ||
          isEmpty(pickupAddress.province) ||
          isEmpty(pickupAddress.branch)) &&
        orderDetail.type === "Ship to address"
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
      if (
        (isEmpty(pickupAddress.provinceEng) || isEmpty(pickupAddress.branch)) &&
        orderDetail.type === "Pickup"
      ) {
        if (isEmpty(pickupAddress.provinceEng) && touchedPickupAddress.province)
          setErrorPickupProvince("required_fields");
        if (isEmpty(pickupAddress.branchEng) && touchedPickupAddress.branch)
          setErrorPickupBranch("required_fields");
      }
    },
    validationSchema: orderDetail.type === "Ship to address" && orderSchema,
  });

  const getShippingProvince = useCallback(
    async (country: string | undefined) => {
      try {
        if (country) {
          const response = (await getProvinceAPI(country)) as any;
          const idProvince = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.provinceEng,
          );
          setShippingProvinceValue(idProvince?._id);
          setShippingProvinceList(response);
        } else {
          const response = (await getProvinceAPI("Thailand")) as any;
          const idProvince = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.provinceEng,
          );

          setShippingProvinceValue(idProvince?._id);
          setShippingProvinceList(response);
        }
      } catch (e) {}
    },
    [shippingAddress.provinceEng],
  );

  const getShippingDistrict = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          const response = (await getDistrictAPI(id)) as any;
          const idDistrict = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === shippingAddress.districtEng,
          );
          setShippingDistrictValue(idDistrict?._id);
          setShippingDistrictList(response);
        }
      } catch (e) {}
    },
    [shippingAddress.districtEng],
  );
  const getShippingSubDistrict = useCallback(async (id: string | undefined) => {
    try {
      if (id) {
        const response = (await getSubDistrictAPI(id)) as any;
        setShippingSubDistrictList(response);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const callAddressList = async () => {
      await getShippingProvince(shippingAddress.country);
    };
    callAddressList();
  }, [
    shippingAddress.country,
    getShippingProvince,
    // localStorage.getItem("i18nextLng"),
  ]);

  useEffect(() => {
    const callAddressList = async () => {
      await getShippingDistrict(shippingProvinceValue);
    };
    callAddressList();
  }, [shippingProvinceValue, getShippingDistrict]);

  useEffect(() => {
    const callAddressList = async () => {
      await getShippingSubDistrict(shippingDistrictValue);
    };
    callAddressList();
  }, [getShippingSubDistrict, shippingDistrictValue]);

  const getBillingProvince = useCallback(
    async (country: string | undefined) => {
      try {
        if (country) {
          const response = (await getProvinceAPI(country)) as any;
          const idProvince = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.provinceEng,
          );
          setBillingProvinceValue(idProvince?._id);
          setBillingProvinceList(response);
        } else {
          const response = (await getProvinceAPI("Thailand")) as any;
          const idProvince = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.provinceEng,
          );
          setBillingProvinceValue(idProvince?._id);
          setBillingProvinceList(response);
        }
      } catch (e) {}
    },
    [billingAddress.provinceEng],
  );
  const getBillingDistrict = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          const response = (await getDistrictAPI(id)) as any;
          const idDistrict = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === billingAddress.districtEng,
          );
          setBillingDistrictValue(idDistrict?._id);
          setBillingDistrictList(response);
        }
      } catch (e) {}
    },
    [billingAddress.districtEng],
  );
  const getBillingSubDistrict = useCallback(async (id: string | undefined) => {
    try {
      if (id) {
        const response = (await getSubDistrictAPI(id)) as any;
        setBillingSubDistrictList(response);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const callAddressList = async () => {
      await getBillingProvince(billingAddress.country);
    };
    callAddressList();
  }, [billingAddress.country, getBillingProvince]);

  useEffect(() => {
    const callAddressList = async () => {
      await getBillingDistrict(billingProvinceValue);
    };
    callAddressList();
  }, [billingProvinceValue, getBillingDistrict]);

  useEffect(() => {
    const callAddressList = async () => {
      await getBillingSubDistrict(billingDistrictValue);
    };
    callAddressList();
  }, [billingDistrictValue, getBillingSubDistrict]);

  const getPickupProvince = useCallback(
    async (country: string | undefined) => {
      try {
        if (country) {
          const response = (await getProvincesContainBranches(country)) as any;
          const idProvince = response.find(
            (list: { nameEng: string | undefined }) => list.nameEng === pickupAddress.provinceEng,
          );
          setPickupProvinceValue(idProvince?._id);
          setPickupProvinceList(response);
        } else {
          const response = (await getProvincesContainBranches("Thailand")) as any;
          const idProvince = response?.find(
            (list: { nameEng: string | undefined }) => list.nameEng === pickupAddress.provinceEng,
          );
          setPickupProvinceValue(idProvince?._id);
          setPickupProvinceList(response);
        }
      } catch (e) {}
    },
    [pickupAddress.provinceEng],
  );
  const getPickupBranch = useCallback(async (id: string | undefined) => {
    try {
      if (id) {
        const response = (await getBranches(id)) as any;
        setBranchList(response);
        setPickupBranchList(response);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const callAddressList = async () => {
      await getPickupProvince(pickupAddress.country);
    };
    callAddressList();
  }, [pickupAddress.country, getPickupProvince]);

  useEffect(() => {
    const callAddressList = async () => {
      await getPickupBranch(pickupProvinceValue);
    };
    callAddressList();
  }, [getPickupBranch, pickupProvinceValue]);

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchOrderDetailByID(id));
  }, [dispatch, id]);

  const handleChangeShippingArea =
    (name: "province" | "district" | "subDistrict") => (value: string | null, title: string) => {
      if (value) {
        if (name === "province") {
          const selectProvince = listShippingProvince.find(({ _id }) => _id === value);
          if (selectProvince) {
            setShippingAddress({
              ...shippingAddress,
              province: selectProvince?.name,
              provinceEng: selectProvince?.nameEng,
              district: "",
              districtEng: "",
              subDistrict: "",
              subDistrictEng: "",
            });
            setTouchedShippingAddress({
              ...touchedShippingAddress,
              province: true,
              district: false,
              subDistrict: false,
            });
            setErrorShippingProvince("");
            getShippingDistrict(value);
          }
        }
        if (name === "district") {
          const selected = listShippingDistrict.find(({ _id }) => _id === value);
          if (selected) {
            setShippingAddress({
              ...shippingAddress,
              district: selected?.name,
              districtEng: selected?.nameEng,
              subDistrict: "",
              subDistrictEng: "",
            });
            setErrorShippingDistrict("");
            getShippingSubDistrict(value);
            setTouchedShippingAddress({
              ...touchedShippingAddress,
              district: true,
              subDistrict: false,
            });
          }
        }
        if (name === "subDistrict") {
          const selected = listShippingSubDistrict.find(({ _id }) => _id === value);
          if (selected) {
            setShippingAddress({
              ...shippingAddress,
              subDistrict: selected?.name,
              subDistrictEng: selected?.nameEng,
            });
            setErrorShippingSubDistrict("");
            setTouchedShippingAddress({
              ...touchedShippingAddress,
              subDistrict: true,
            });
          }
        }
      }
    };
  const handleChangeBillingArea =
    (name: "province" | "district" | "subDistrict") => (value: string | null, title: string) => {
      if (value) {
        if (name === "province") {
          const selected = listBillingProvince.find(({ _id }) => _id === value);
          if (selected) {
            setBillingAddress({
              ...billingAddress,
              province: selected?.name,
              provinceEng: selected?.nameEng,
              district: "",
              subDistrict: "",
              districtEng: "",
              subDistrictEng: "",
            });
            getBillingDistrict(value);
            setErrorBillingProvince("");
            setTouchedBillingAddress({
              ...touchedBillingAddress,
              province: true,
              district: false,
              subDistrict: false,
            });
          }
        }
        if (name === "district") {
          const selected = listBillingDistrict.find(({ _id }) => _id === value);
          if (selected) {
            setBillingAddress({
              ...billingAddress,
              district: selected?.name,
              districtEng: selected?.nameEng,
              subDistrict: "",
              subDistrictEng: "",
            });
            getBillingSubDistrict(value);
            setErrorBillingDistrict("");
            setTouchedBillingAddress({
              ...touchedBillingAddress,
              district: true,
              subDistrict: false,
            });
          }
        }
        if (name === "subDistrict") {
          const selected = listBillingSubDistrict.find(({ _id }) => _id === value);
          if (selected) {
            setBillingAddress({
              ...billingAddress,
              subDistrict: selected?.name,
              subDistrictEng: selected?.nameEng,
            });
            setErrorBillingSubDistrict("");
            setTouchedBillingAddress({
              ...touchedBillingAddress,
              subDistrict: true,
            });
          }
        }
      }
    };
  const handleChangePickupArea =
    (name: "province" | "branch") => (value: string | null, title: string) => {
      if (value) {
        if (name === "province") {
          const selected = listPickupProvince.find(({ _id }) => _id === value);
          if (selected) {
            setPickupAddress({
              ...pickupAddress,
              province: selected.name,
              provinceEng: selected.nameEng,
              branch: "",
              code: "",
              address: "",
              phoneNumbers: [""],
              phoneCode: "",
              branchEng: "",
              addressEng: "",
            });
          }
          setErrorPickupProvince("");
          setTouchedPickupAddress({
            province: true,
            branch: false,
          });
          getPickupBranch(value);
        }
        if (name === "branch") {
          const selectedBranch = branchList.find((branch) => branch._id === value);
          if (selectedBranch) {
            setPickupAddress({
              ...pickupAddress,
              branch: selectedBranch?.name || "",
              branchEng: selectedBranch?.nameEng || "",
              code: selectedBranch?.code,
              address: selectedBranch?.address || "",
              addressEng: selectedBranch?.addressEng || "",
              phoneNumbers: selectedBranch?.phoneNumbers,
              phoneCode: selectedBranch?.phoneCode,
            });
            setTouchedPickupAddress({
              ...touchedPickupAddress,
              branch: false,
            });
            setErrorPickupBranch("");
          }
        }
      }
    };

  function handleChangeSameAddress(event: ChangeEvent<HTMLInputElement>) {
    setIsSameAddress(event.target.checked);
    if (event.target.checked === true) {
      formik.values.billingFirstName = formik.values.shippingFirstName;
      formik.values.billingLastName = formik.values.shippingLastName;
      formik.values.billingPhoneNumber = formik.values.shippingPhoneNumber;
      formik.values.billingPostalCode = formik.values.shippingPostalCode;
      formik.values.billingAddress = formik.values.shippingAddress;

      setBillingAddress({ ...shippingAddress });

      setErrorBillingProvince("");
      setErrorBillingDistrict("");
      setErrorBillingSubDistrict("");
      delete formik.errors.billingFirstName;
      delete formik.errors.billingLastName;
      delete formik.errors.billingPhoneNumber;
      delete formik.errors.billingPostalCode;
      delete formik.errors.billingAddress;
    }
  }
  function handleChangePhoneCodeShipping(value: string) {
    setShippingAddress({ ...shippingAddress, phoneCode: value });
  }
  function handleChangeCountryShipping(value: string) {
    setShippingAddress({
      ...shippingAddress,
      country: value,
      province: "",
      district: "",
      subDistrict: "",
      provinceEng: "",
      districtEng: "",
      subDistrictEng: "",
    });
    setTouchedShippingAddress({
      province: false,
      district: false,
      subDistrict: false,
    });
    formik.values.shippingAddress = "";
  }
  function handleChangePhoneCodeBilling(value: string) {
    setShippingAddress({ ...billingAddress, phoneCode: value });
  }
  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  function handleConfirm() {
    history.push(routesOrderManagement);
  }
  function handleClickCancelEdit() {
    setIsOpenModal(true);
  }
  function handleValidateOnSubmit() {
    if (
      (isEmpty(shippingAddress.provinceEng) ||
        isEmpty(shippingAddress.districtEng) ||
        isEmpty(shippingAddress.subDistrictEng) ||
        isEmpty(billingAddress.provinceEng) ||
        isEmpty(billingAddress.districtEng) ||
        isEmpty(billingAddress.subDistrictEng) ||
        isEmpty(pickupAddress.province) ||
        isEmpty(pickupAddress.branch)) &&
      orderDetail.type === "Ship to address"
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
    if (
      (isEmpty(pickupAddress.provinceEng) || isEmpty(pickupAddress.branchEng)) &&
      orderDetail.type === "Pickup"
    ) {
      if (isEmpty(pickupAddress.provinceEng)) setErrorPickupProvince("required_fields");
      if (isEmpty(pickupAddress.branchEng)) setErrorPickupBranch("required_fields");
    }
  }
  function handleChangeCountryBilling(value: string) {
    setBillingAddress({
      ...billingAddress,
      country: value,
      province: "",
      district: "",
      subDistrict: "",
      provinceEng: "",
      districtEng: "",
      subDistrictEng: "",
    });
    setTouchedBillingAddress({
      province: false,
      district: false,
      subDistrict: false,
    });
    formik.values.billingAddress = "";
  }
  function handleChangeCountryPickup(value: string) {
    setPickupAddress({
      ...pickupAddress,
      country: value,
      province: "",
      branch: "",
      code: "",
      address: "",
      phoneNumbers: [""],
      phoneCode: "",
    });
    setTouchedPickupAddress({
      province: false,
      branch: false,
    });
  }
  async function handleSubmit(values: any) {
    if (
      !isEmpty(errorShippingProvince) ||
      !isEmpty(errorShippingDistrict) ||
      !isEmpty(errorShippingSubDistrict) ||
      !isEmpty(errorBillingProvince) ||
      !isEmpty(errorBillingDistrict) ||
      !isEmpty(errorBillingSubDistrict) ||
      !isEmpty(errorPickupProvince) ||
      !isEmpty(errorPickupProvince)
    )
      return;

    const sendData: UpdateOrderRequest = {
      shippingAddress: {
        firstName: values.shippingFirstName,
        lastName: values.shippingLastName,
        phoneCode: shippingAddress.phoneCode,
        phoneNumber: values.shippingPhoneNumber.toString(),
        country: shippingAddress.country,
        postalCode: `${values.shippingPostalCode}`,
        province: shippingAddress.province,
        district: shippingAddress.district,
        subDistrict: shippingAddress.subDistrict,
        address: values.shippingAddress,
        provinceEng: shippingAddress.provinceEng,
        districtEng: shippingAddress.districtEng,
        subDistrictEng: shippingAddress.subDistrictEng,
      },
      billingAddress: {
        firstName: values.billingFirstName,
        lastName: values.billingLastName,
        phoneCode: billingAddress.phoneCode,
        phoneNumber: values.billingPhoneNumber.toString(),
        country: billingAddress.country,
        postalCode: `${values.billingPostalCode}`,
        province: billingAddress.province,
        district: billingAddress.district,
        subDistrict: billingAddress.subDistrict,
        address: values.billingAddress,
        provinceEng: billingAddress.provinceEng,
        districtEng: billingAddress.districtEng,
        subDistrictEng: billingAddress.subDistrictEng,
      },
      pickupAddress,
      type: orderDetail.type,
    };

    if (orderDetail.type === "Pickup") {
      delete sendData.billingAddress;
      delete sendData.shippingAddress;
    }
    if (orderDetail.type === "Ship to address") {
      delete sendData.pickupAddress;
    }

    try {
      const response = await updateOrder({ id, body: sendData });
      if (response.statusCode === 404) {
        setIsModalDeleted(true);
      }
      if (response.statusCode) return;
      setTimeout(() => {
        history.push(routesOrderManagement);
      }, 1000);
    } catch (e) {
      //
    }
  }

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

    return result;
  };
  useEffect(() => {
    return () => {
      formik.resetForm();
      dispatch(resetOrder());
    };
  }, []);
  return (
    <>
      <form
        className="order-edit"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
          handleValidateOnSubmit();
        }}
      >
        <CollapsibleBlock className="mb-5" heading={t("order-information")}>
          <Grid lg={9} md={8} xl={6}>
            <Table>
              <TableHead className={tableHead}>
                <TableCell width={"40%"} className="mr-4">
                  {t("order")}
                </TableCell>
                <TableCell>{t("quantity")}</TableCell>
                <TableCell>{t("total-price")}</TableCell>
                <TableCell>{t("total-pv")}</TableCell>
                <TableCell width={100}>{t("date")}</TableCell>
              </TableHead>
              <TableBody className={tableBody}>
                <TableRow>
                  <TableCell>
                    <span className="text-orange-light">
                      {t("order-id")}: {orderDetail.orderNumber}
                    </span>
                  </TableCell>
                  <TableCell>{orderDetail.totalQuantity}</TableCell>
                  <TableCell>
                    <span className="text-orange-light">
                      <FormatNumber value={orderDetail.totalPrice} />
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-dark">
                      <FormatNumber value={orderDetail.totalPv} />
                    </span>
                  </TableCell>
                  <TableCell>
                    {dateSlice(dayjs(orderDetail.createdAt).format("DD MMM YYYY HH:mm:ss"))}
                  </TableCell>
                </TableRow>
                {orderDetail.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <ProductCard name={product.productName} image={product.productImage} />
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <span className="text-orange-light">{product.price}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-dark">{product.pv}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </CollapsibleBlock>
        <CollapsibleBlock className="mb-5" heading={t("buyer-information")}>
          <SponsorCard
            sponsorData={{
              name: orderDetail.buyer.name,
              avatar: orderDetail.buyer.avatarImage,
              sponsorId: orderDetail.buyer.memberId,
            }}
          />
        </CollapsibleBlock>
        <CollapsibleBlock className="mb-5" heading={t("order-status")}>
          <Grid container lg={5} md={5}>
            <Grid container direction="column" lg={6} md={6}>
              <Label required>{t("status")}</Label>
              <Select
                disable
                className="mr-4"
                options={statusOptions}
                defaultValue={orderDetail.status}
              />
            </Grid>
          </Grid>
        </CollapsibleBlock>
        <CollapsibleBlock className="mb-5" heading={t("payment-information")}>
          <Grid container lg={5} md={5}>
            <Grid container direction="column" lg={6} md={6}>
              <Label required>{t("payment-method")}</Label>
              <Input
                className="mr-4"
                disabled
                value={t(
                  textChangeLanguage(orderDetail.paymentMethod).toLocaleLowerCase() as "to_ship",
                )}
              />
            </Grid>
          </Grid>
        </CollapsibleBlock>
        {orderDetail.type === "Ship to address" && (
          <>
            <CollapsibleBlock className="mb-5" heading={t("default-shipping-address")}>
              <Grid container xl={5} lg={5} md={5}>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("first-name")}</Label>
                      <Input
                        name="shippingFirstName"
                        value={formik.values.shippingFirstName}
                        placeholder={t("first-name")}
                        errorMessage={
                          formik.touched.shippingFirstName && formik.errors.shippingFirstName
                            ? t("required_fields")
                            : ""
                        }
                        onChange={formik.handleChange}
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
                        name="shippingLastName"
                        value={formik.values.shippingLastName}
                        placeholder={t("last-name")}
                        errorMessage={
                          formik.touched.shippingLastName && formik.errors.shippingLastName
                            ? t("required_fields")
                            : ""
                        }
                        onChange={formik.handleChange}
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("phone-number")}</Label>
                      <SelectPhoneCode
                        placeholder={t("phone-number")}
                        name="shippingPhoneNumber"
                        phoneNumber={formik.values.shippingPhoneNumber}
                        phoneCode={shippingAddress.phoneCode}
                        errorMessage={
                          formik.touched.shippingPhoneNumber && formik.errors.shippingPhoneNumber
                            ? t("required_fields")
                            : ""
                        }
                        inputProps={{
                          maxLength: 15,
                        }}
                        type="number"
                        onChangePhoneCode={handleChangePhoneCodeShipping}
                        onChangePhoneNumber={formik.handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("country")}</Label>
                      <SelectCountry2
                        country={shippingAddress.country}
                        onSelect={handleChangeCountryShipping}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("postal-code")}</Label>
                      <InputOnlyNumber
                        name="shippingPostalCode"
                        placeholder={t("postal-code")}
                        value={formik.values.shippingPostalCode}
                        onChange={formik.handleChange}
                        type="number"
                        errorMessage={
                          formik.touched.shippingPostalCode && formik.errors.shippingPostalCode
                            ? t("required_fields")
                            : ""
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("province-city")}</Label>
                      <SelectAddress
                        options={listShippingProvince}
                        defaultValue={shippingAddress.provinceEng}
                        onChange={handleChangeShippingArea("province")}
                        error={t(errorShippingProvince as "all_countries")}
                        country={shippingAddress.country}
                        placeholder={t("province-city")}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("district")}</Label>
                      <SelectAddress
                        options={listShippingDistrict}
                        defaultValue={shippingAddress.districtEng}
                        onChange={handleChangeShippingArea("district")}
                        error={t(errorShippingDistrict as "all_countries")}
                        country={shippingAddress.country}
                        placeholder={t("district")}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required={shippingAddress.district !== "Con Dao"}>
                        {t("sub-district")}
                      </Label>
                      <SelectAddress
                        disable={shippingAddress.district === "Con Dao"}
                        options={listShippingSubDistrict}
                        defaultValue={shippingAddress.subDistrictEng}
                        onChange={handleChangeShippingArea("subDistrict")}
                        error={t(errorShippingSubDistrict as "all_countries")}
                        country={shippingAddress.country}
                        placeholder={t("sub-district")}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="column">
                  <Label required>{t("address")}</Label>
                  <Input
                    multiline
                    placeholder={t("address")}
                    minRows={3}
                    maxRows={3}
                    name="shippingAddress"
                    value={formik.values.shippingAddress}
                    onChange={formik.handleChange}
                    errorMessage={
                      formik.touched.shippingAddress && formik.errors.shippingAddress
                        ? t("required_fields")
                        : ""
                    }
                  />
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("default-billing-address")}>
              <Grid container xl={5} lg={7} md={7}>
                <Grid className="mb-4" container>
                  <FormControlLabel
                    control={
                      <RoundedCheckbox checked={isSameAddress} onChange={handleChangeSameAddress} />
                    }
                    label={t`the-same-address`}
                  />
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("first-name")}</Label>
                      <Input
                        disabled={isSameAddress}
                        name="billingFirstName"
                        value={formik.values.billingFirstName}
                        placeholder={t("first-name")}
                        errorMessage={
                          formik.touched.billingFirstName && formik.errors.billingFirstName
                            ? t("required_fields")
                            : ""
                        }
                        onChange={formik.handleChange}
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
                        disabled={isSameAddress}
                        name="billingLastName"
                        value={formik.values.billingLastName}
                        placeholder={t("last-name")}
                        errorMessage={
                          formik.touched.billingLastName && formik.errors.billingLastName
                            ? t("required_fields")
                            : ""
                        }
                        onChange={formik.handleChange}
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("phone-number")}</Label>
                      <SelectPhoneCode
                        placeholder={t("phone-number")}
                        disabled={isSameAddress}
                        name="billingPhoneNumber"
                        phoneNumber={formik.values.billingPhoneNumber}
                        phoneCode={billingAddress.phoneCode}
                        errorMessage={
                          formik.touched.billingPhoneNumber && formik.errors.billingPhoneNumber
                            ? t("required_fields")
                            : ""
                        }
                        inputProps={{
                          maxLength: 15,
                        }}
                        onChangePhoneCode={handleChangePhoneCodeBilling}
                        onChangePhoneNumber={formik.handleChange}
                        type="number"
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("country")}</Label>
                      <SelectCountry2
                        disabled={isSameAddress}
                        country={billingAddress.country}
                        onSelect={handleChangeCountryBilling}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("postal-code")}</Label>
                      <InputOnlyNumber
                        disabled={isSameAddress}
                        name="billingPostalCode"
                        placeholder={t("postal-code")}
                        value={formik.values.billingPostalCode}
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.billingPostalCode && formik.errors.billingPostalCode
                            ? t("required_fields")
                            : ""
                        }
                        type="number"
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required>{t("province-city")}</Label>
                      <SelectAddress
                        disable={isSameAddress}
                        options={listBillingProvince}
                        defaultValue={billingAddress.provinceEng}
                        onChange={handleChangeBillingArea("province")}
                        error={t(errorBillingProvince as "all_countries")}
                        country={billingAddress.country}
                        placeholder={t("province-city")}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("district")}</Label>
                      <SelectAddress
                        disable={isSameAddress}
                        options={listBillingDistrict}
                        defaultValue={billingAddress.districtEng}
                        onChange={handleChangeBillingArea("district")}
                        error={t(errorBillingDistrict as "all_countries")}
                        country={billingAddress.country}
                        placeholder={t("district")}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col ml-4">
                      <Label required={billingAddress.district !== "Con Dao"}>
                        {t("sub-district")}
                      </Label>
                      <SelectAddress
                        disable={isSameAddress || billingAddress.district === "Con Dao"}
                        options={listBillingSubDistrict}
                        defaultValue={billingAddress.subDistrictEng}
                        onChange={handleChangeBillingArea("subDistrict")}
                        error={t(errorBillingSubDistrict as "all_countries")}
                        country={billingAddress.country}
                        placeholder={t("sub-district")}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="column">
                  <Label required>{t("address")}</Label>
                  <Input
                    disabled={isSameAddress}
                    multiline
                    placeholder={t("address")}
                    minRows={3}
                    maxRows={3}
                    name="billingAddress"
                    value={formik.values.billingAddress}
                    onChange={formik.handleChange}
                    errorMessage={
                      formik.touched.billingAddress && formik.errors.billingAddress
                        ? t("required_fields")
                        : ""
                    }
                  />
                </Grid>
              </Grid>
            </CollapsibleBlock>
          </>
        )}
        {orderDetail.type === "Pickup" && (
          <CollapsibleBlock className="mb-5" heading={t("pickup-branch")}>
            <Grid container xl={5} lg={5} md={5}>
              <Grid container className="mb-4">
                <Grid item lg={6} md={6}>
                  <div className="flex flex-col mr-4">
                    <Label required>{t("country")}</Label>
                    <SelectCountry2
                      country={pickupAddress.country}
                      onSelect={handleChangeCountryPickup}
                    />
                  </div>
                </Grid>
                <Grid item lg={6} md={6}>
                  <div className="flex flex-col ml-4">
                    <Label required>{t("province")}</Label>
                    <SelectAddress
                      options={listPickupProvince}
                      defaultValue={pickupAddress.provinceEng}
                      onChange={handleChangePickupArea("province")}
                      error={t(errorPickupProvince as "all_countries")}
                      country={pickupAddress.country}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container className="mb-4">
                <Grid item lg={6} md={6}>
                  <div className="flex flex-col mr-4">
                    <Label required>{t("branch")}</Label>
                    <SelectAddress
                      options={listPickupBranch}
                      defaultValue={pickupAddress.branchEng}
                      onChange={handleChangePickupArea("branch")}
                      error={t(errorPickupBranch as "all_countries")}
                      country={pickupAddress.country}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container className="mb-4">
                <div className="flex flex-col mr-4">
                  <Label>{t("branch-address")}</Label>
                  <p className="text-base font-light">
                    {pickupAddress.country},{" "}
                    {language === "en" || !pickupAddress.province
                      ? pickupAddress.provinceEng
                      : pickupAddress.province}
                  </p>
                  <p className="text-base font-light">
                    {language === "en" || !pickupAddress.branch
                      ? pickupAddress.branchEng
                      : pickupAddress.branch}
                  </p>
                  {pickupAddress.phoneNumbers.map((phoneNumber) => (
                    <p className="text-base font-light">
                      {phoneNumber &&
                        `Tel: ${phoneNumberFormatter(pickupAddress.phoneCode, phoneNumber)}`}
                    </p>
                  ))}
                  <p className="text-base font-light text-purple-primary">
                    {language === "en" || !pickupAddress.address
                      ? pickupAddress.addressEng
                      : pickupAddress.address}
                  </p>
                </div>
              </Grid>
            </Grid>
          </CollapsibleBlock>
        )}
        <div className="flex">
          <Button
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
        </div>
      </form>
      <Modal
        open={isOpenModal}
        confirmType="action"
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
      <Modal
        open={isModalDeleted}
        confirmType="confirm"
        onClose={handleConfirm}
        onConfirm={handleConfirm}
        confirmText={t`ok`}
        content={t`this_order_id_no_longer_exists`}
      />
    </>
  );
}
