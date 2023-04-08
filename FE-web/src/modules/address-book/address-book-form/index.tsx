/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
import {
  ButtonMui,
  ButtonMuiDelete,
  ButtonMuiLight,
  LeftNavination,
  ModalConfirm,
  Title,
} from "src/components";
import InputBasic from "src/components/input/input-basic";
import { Select } from "src/components/select/select-address-book";
import TextArea from "src/components/input/text-area";
import SelectPhoneCode from "src/components/select/phone_code";
import styles from "./style.module.css";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AddressModel, ItemArrayConvert } from "src/feature/address-book/type";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "src/services/address-book.services";
import { useRouter } from "next/router";
import { routeAddressBookBase } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { changeRedirectUrl } from "src/feature/user/slice";
import DeleteIcon from "src/components/svgs/deleteIcon";
import { CircularProgress } from "@material-ui/core";
import { handleChangeField } from "src/feature/checkout/thunkAction";
import { getDetailAddressBook } from "src/feature/address-book/address-book.action";
import { district } from "../../../services/District";
import { provinces } from "../../../services/Province";
import { subDistrict } from "../../../services/SubDistrict";
// import { DeleteIcon } from "src/components/svgs";
const initialErrors = {
  firstName: "",
  lastName: "",
  postalCode: "",
  province: "",
  district: "",
  subDistrict: "",
  address: "",
  phoneNumber: "",
  shipAddress: "",
};

interface AddressFormProps {
  mode?: "create" | "edit";
}

export function AddressBookForm({ mode }: AddressFormProps) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const { id, country } = router.query;
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const { urlRedirect } = useSelector((state: RootState) => state.user);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [confirmTypeCancel] = useState<"cancel">("cancel");
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const [error, setError] = useState(initialErrors);
  const [listDistrict, setListDistrict] = useState<Array<ItemArrayConvert> | undefined>(undefined);
  const [listSubDistrict, setSubDistrict] = useState<Array<ItemArrayConvert> | undefined>(
    undefined,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [provinceValue, setProvinceValue] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [districtValue, setDistrictValue] = useState<string | undefined>();

  // const getAddressByContry = useCallback(
  //   (address: AddressModel) => {
  //     const { subDistrict, subDistrictEng, district, districtEng, province, provinceEng } = address;
  //     if (lang === "en" || province === "") {
  //       return { subDistrict: subDistrictEng, district: districtEng, province: provinceEng };
  //     }
  //     return { subDistrict, district, province };
  //   },
  //   [lang],
  // );
  const districtValueJson = Object.values(district);
  const provinceValueJson = Object.values(provinces);
  const subDistrictValueJson = Object.values(subDistrict);


  const [address, setAddress] = useState<AddressModel>({
    firstName: "",
    lastName: "",
    province: "",
    district: "",
    subDistrict: "",
    address: "",
    phoneNumber: "",
    phoneCode: "84",
  });
  const addressDetail = useSelector((state: RootState) => state.addressBook.addressDetail);

  useEffect(() => {
    if (mode === "edit") {
      const newValue = {
        _id: addressDetail._id,
        firstName: addressDetail.firstName,
        lastName: addressDetail.lastName,
        province: addressDetail.province,
        district: addressDetail.district,
        subDistrict: addressDetail.subDistrict,
        address: addressDetail.address,
        phoneNumber: addressDetail.phoneNumber,
      };
      setAddress(newValue);
    }
  }, [addressDetail, mode]);

  useEffect(() => {
    if (id && mode === "edit") {
      dispatch(getDetailAddressBook(id));
    }
  }, [dispatch, id, mode]);

  useEffect(() => {
    if (mode === "edit") {
      setProvinceValue("");
      setDistrictValue("");
      setListDistrict([]);
      setSubDistrict([]);
      setAddress({
        _id: "",
        category: "Other",
        shipAddress: false,
        billAddress: false,
        firstName: "",
        lastName: "",
        country: "",
        postalCode: "",
        province: "",
        district: "",
        subDistrict: "",
        address: "",
        phoneCode: "84",
        phoneNumber: "",
        provinceId: "",
      });
    }
  }, [id, mode]);



  const handleConfirm = () => {
    setIsOpenModal(false);
  };
  const getDistrict = useCallback(
    async (id: string | undefined) => {
      try {
        if (id) {
          setLoadingAddress(true);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // const response = (await getDistrictAPI(id)) as any;

          const value = districtValueJson.filter((item) => item.parent_code === id);
          const idDistrict = value.find(
            (list: { name: string | undefined }) =>
              list.name === address.district,
          );
          setDistrictValue(idDistrict?.code);
          setListDistrict(value);
          setLoadingAddress(false);
          if (!idDistrict?.code) {
            getSubDistrict("abc");
          }
        }
      } catch (e) {
        setLoadingAddress(false);
      }
    },
    [address.district, districtValueJson],
  );

  const getSubDistrict = useCallback(async (id: string | undefined) => {
    try {
      if (id) {
        setLoadingAddress(true);
        const value = subDistrictValueJson.filter((item) => item.parent_code === id);
        setLoadingAddress(false);
        setSubDistrict(value);
      }
    } catch (e) {
      setLoadingAddress(false);
    }
  }, [subDistrictValueJson]);


  useEffect(() => {
    const callAddressList = async () => {
      if (provinceValue) {
         getDistrict(provinceValue);
      }
    };
    callAddressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceValue]);

  useEffect(() => {
    const callAddressList = () => {
      if (districtValue) {
         getSubDistrict(districtValue);
      }
    };
    callAddressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtValue]);
  console.log(districtValue);

  const handleChange =
    (name: "firstName" | "lastName" | "address" | "postalCode") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (name) {
        if (name === "firstName") {
          const newValue = { ...address, firstName: e.target.value };
          setAddress(newValue);
          setError({ ...error, firstName: "" });
        }
        if (name === "lastName") {
          const newValue = { ...address, lastName: e.target.value };
          setAddress(newValue);
          setError({ ...error, lastName: "" });
        }
        if (name === "address") {
          const newValue = { ...address, address: e.target.value };
          setAddress(newValue);
          setError({ ...error, address: "" });
        }
      }
    };
  const handleChangeSelect =
    (name: "province" | "district" | "subDistrict") => (title: string, value: string) => {
      if (value) {
        if (name === "province") {
          const { name } = provinceValueJson.find(({ code }) => code === value) || {
            name: "",
          };

          setAddress({
            ...address,
            province: name,
            provinceId: value,
            district: "",
            subDistrict: "",
          });
          getDistrict(value);
          setError({ ...error, province: "" });
        } else if (name === "district") {
          const { name } = districtValueJson.find(({ code }) => code === value) || {
            name: "",
          };
          const newDistrict = {
            ...address,
            district: name,
            subDistrict: "",
          } as AddressModel;

          setAddress(newDistrict);
          getSubDistrict(value);
          setError({
            ...error,
            district: "",
            subDistrict: "",
          });
        } else if (name === "subDistrict") {
          const { name } = subDistrictValueJson.find(({ code }) => code === value) || {
            name: "",
          };
          const newSubDistrict = {
            ...address,
            subDistrict: name,
          } as AddressModel;
          setAddress(newSubDistrict);
          setError({ ...error, subDistrict: "" });
        }
      }
    };
  const handleChangePhoneCode = (value: string) => {
    const newValue = { ...address, phoneCode: value };
    setAddress(newValue);
  };
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...address, phoneNumber: e.target.value };
    setAddress(newValue);
    setError({ ...error, phoneNumber: "" });
  };

  const handleValidate = () => {
    let isValid = true;
    const newError = { ...error };
    if (address.firstName?.trim() === "") {
      newError.firstName = "required_fields";
      isValid = false;
    }
    if (address.lastName?.trim() === "") {
      newError.lastName = "required_fields";
      isValid = false;
    }
    if (address.phoneNumber === "") {
      newError.phoneNumber = "required_fields";
      isValid = false;
    }
    if (address.province === "") {
      newError.province = "required_fields";
      isValid = false;
    }
    if (address.district === "") {
      newError.district = "required_fields";
      isValid = false;
    }
    if (
      address.subDistrict === "" &&
      (!address.districtEng || listSubDistrict?.length)
    ) {
      newError.subDistrict = "required_fields";
      isValid = false;
    }
    if (address.address?.trim() === "") {
      newError.address = "required_fields";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };
  async function handleDelete() {
    setIsOpenModalDelete(false);
    setLoadingAddress(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await deleteAddress(id);
      if (response.status === 200) {
        setLoadingAddress(false);
        router.push(routeAddressBookBase);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response.status === 400) {
        setLoadingAddress(false);
        setIsOpenModal(true);
      }
    }
  }
  const handleCancelConfirm = async () => {
    setIsOpenModal(false);
    setIsOpenModalDelete(false);
    setIsOpenModalCancel(false);
  };
  async function handleSubmit() {
    setLoadingAddress(true);
    const isValid = handleValidate();
    !isValid && setLoadingAddress(false);
    if (isValid && mode === "create") {
      const { subDistrict, phoneCode, provinceId, phoneNumber, ...addressNew } = address;

      const bodyRequest = {
        ...addressNew,
        sub_district: address.subDistrict,
        phoneNumber: `+${phoneCode}${phoneNumber}`,
      };
      delete bodyRequest._id;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await createAddress(bodyRequest);
        if (response.status === 201) {
          setLoadingAddress(false);
          if (urlRedirect) {
            dispatch(changeRedirectUrl(""));
            dispatch(handleChangeField({ addressNewCreate: true }));
            router.push(urlRedirect);
          } else {
            router.push(routeAddressBookBase);
          }
        }
      } catch (e) {
        setLoadingAddress(false);
      }
    } else if (isValid && mode === "edit") {
      const { subDistrict, phoneCode, provinceId, phoneNumber, ...addressNew } = address;

      const bodyRequest = {
        ...addressNew,
        sub_district: address.subDistrict,
        phoneNumber: `+${phoneCode}${phoneNumber}`,
      };
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await updateAddress(id, bodyRequest);
        if (response.status === 200) {
          setLoadingAddress(false);
          router.push(routeAddressBookBase);
        }
      } catch (e) {
        setLoadingAddress(false);
      }
    }
  }
  const handleCancel = () => {
    if (urlRedirect) {
      dispatch(changeRedirectUrl(""));
      router.push(urlRedirect);
    } else {
      router.push(routeAddressBookBase);
    }
    setAddress({
      category: "Other",
      shipAddress: false,
      billAddress: false,
      firstName: "",
      lastName: "",
      country: "Thailand",
      postalCode: "",
      province: "",
      district: "",
      subDistrict: "",
      address: "",
      phoneCode: "66",
      phoneNumber: "",
      provinceId: "",
      provinceEng: "",
      districtEng: "",
      subDistrictEng: "",
    });
  };

  const getListOptions = useCallback(
    (list: Array<ItemArrayConvert> | undefined) =>
      list?.map((item: ItemArrayConvert) => {
        const { name, code } = item;
        if (lang === "en" || name === "") {
          return { _id: code, nameEng: name, name };
        }
        return { _id: code, nameEng: name, name };
      }),
    [lang],
  );

  const provinceOtions = useMemo(
    () => getListOptions(provinceValueJson),
    [provinceValueJson, getListOptions],
  );

  const districtOptions = useMemo(
    () => getListOptions(listDistrict),
    [listDistrict, getListOptions],
  );

  const subDistrictOptions = useMemo(
    () => getListOptions(listSubDistrict),
    [listSubDistrict, getListOptions],
  );

  return (
    <>
      <div className="md:mx-auto md:w-1216 mb-8 mt-6 md:flex relative px-4 md:px-0">
        <div className="w-1/4 mr-6 hidden md:block">
          <LeftNavination />
        </div>
        <div className="md:w-3/4">
          <div className="md:w-3/4 w-full">
            <div className="md:grid-cols-2 grid gap-3.5 md:gap-8 ">
              <div className="col-span-1">
                <Title title={t`first-name`} isRequired />
                <InputBasic
                  placeholder={t`first-name`}
                  value={address.firstName}
                  onChange={handleChange("firstName")}
                  error={!!error.firstName}
                  helperText={error.firstName}
                  t={t}
                />
              </div>
              <div className="col-span-1">
                <Title title={t`last-name`} isRequired />
                <InputBasic
                  placeholder={t`last-name`}
                  value={address.lastName}
                  error={!!error.lastName}
                  helperText={error.lastName}
                  onChange={handleChange("lastName")}
                  t={t}
                />
              </div>
            </div>
            <div className="md:grid-cols-2 grid gap-3.5 md:gap-8 mt-4">
              <div className="col-span-1">
                <Title title={t`phone-number`} isRequired />
                <SelectPhoneCode
                  phoneCode={address.phoneCode}
                  phoneNumber={address.phoneNumber}
                  handleChangePhoneCode={handleChangePhoneCode}
                  handleChangePhoneNumber={handleChangePhoneNumber}
                  placeholderInput={t`phone-number`}
                  phoneNumberError={error.phoneNumber}
                  disabledPhoneCode={country === "Thailand"}
                  trans={true}
                />
              </div>
            </div>
            <div className="md:grid-cols-2 grid gap-3.5 md:gap-8 mt-4">

              {/* <div className="col-span-1">
                <Title title={t`postal-code`} isRequired />
                <InputOnlyNumber
                  placeholder={t`postal-code`}
                  value={address.postalCode}
                  onChange={handleChange("postalCode")}
                  error={!!error.postalCode}
                  helperText={error.postalCode}
                  t={t}
                />
              </div> */}
              <div className="col-span-1">
                <Title title={t`province` + " / " + t`city`} isRequired />
                <Select
                  options={provinceOtions}
                  placeholder={t`province` + " / " + t`city`}
                  defaultValue={address.province || address.provinceEng}
                  onChange={handleChangeSelect("province")}
                  country={address.country}
                  error={error.province}
                  trans={t}
                />
              </div>
              <div className="col-span-1">
                <Title title={t`district`} isRequired={!(listDistrict?.length === 0)} />
                <Select
                  options={districtOptions}
                  placeholder={t`district`}
                  defaultValue={address.district}
                  onChange={handleChangeSelect("district")}
                  disableClick={listDistrict?.length === 0}
                  country={address.country}
                  error={error.district}
                  trans={t}
                />
              </div>
            </div>
            <div className="md:grid-cols-2 grid gap-3.5 md:gap-8 mt-4">

              <div className="col-span-1">
                <Title title={t`sub-district`} isRequired={!(listSubDistrict?.length === 0)} />
                <Select
                  options={subDistrictOptions}
                  defaultValue={address.subDistrict}
                  placeholder={t`sub-district`}
                  onChange={handleChangeSelect("subDistrict")}
                  disableClick={listSubDistrict?.length === 0}
                  error={error.subDistrict}
                  country={address.country}
                  trans={t}
                />
              </div>
            </div>
            <div className="md:mt-7 mt-4">
              <Title title={t`address`} isRequired />
              <TextArea
                placeholder={t`address`}
                value={address.address}
                onChange={handleChange("address")}
                error={!!error.address}
                helperText={error.address}
                t={t}
              />
              {loadingAddress && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-400 bg-opacity-30">
                  <CircularProgress />
                </div>
              )}
            </div>
            <div>
              {mode === "create" ? (
                <div className="md:flex md:w-full mt-6">
                  <div className="md:w-1/2">
                    <ButtonMui onClick={handleSubmit}>{t`submit`}</ButtonMui>
                  </div>
                  <div className={`md:w-1/2 mt-4 md:mt-0 ${styles.button_cancel}`}>
                    <ButtonMuiLight
                      variant="outlined"
                      textClassName="font-normal"
                      onClick={() => setIsOpenModalCancel(true)}
                    >
                      {t`cancel`}
                    </ButtonMuiLight>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 md:flex-row md:gap-0 w-full mt-6 ">
                  <div className="md:w-1/3">
                    <ButtonMui onClick={handleSubmit}>{t`submit`}</ButtonMui>
                  </div>
                  <div className={`md:w-1/3 ${styles.button_cancel}`}>
                    <ButtonMuiLight
                      variant="outlined"
                      textClassName="font-normal"
                      onClick={() => setIsOpenModalCancel(true)}
                    >
                      {t`cancel`}
                    </ButtonMuiLight>
                  </div>
                  <div className={`md:w-1/3 ${styles.button_cancel}`}>
                    <ButtonMuiDelete
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      textClassName="font-normal"
                      onClick={() => setIsOpenModalDelete(true)}
                    >
                      {t`delete-address`}
                    </ButtonMuiDelete>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm open={isOpenModal} confirmType={"unable-delete"} onConfirm={handleConfirm} />
      <ModalConfirm
        open={isOpenModalCancel}
        confirmType={confirmTypeCancel}
        onClose={handleCancelConfirm}
        onConfirm={handleCancel}
      />
      <ModalConfirm
        open={isOpenModalDelete}
        confirmType="delete-confirm"
        onClose={handleCancelConfirm}
        onConfirm={handleDelete}
      />
    </>
  );
}
