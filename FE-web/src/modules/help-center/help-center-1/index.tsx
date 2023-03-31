/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectCountry from "src/components/select/country";
// import { getFAQCategories } from "src/feature/help-center/help-center-1/faq-categories.slice";
import { FAQCategoriesModel, listBranchSelect } from "src/feature/help-center/types";
import { RootState } from "src/state/store";
import { ItemCategory } from "../components/item-category";
import MapContainer from "../components/map-google";
import styles from "./help-center-1.module.css";
import axios from "src/lib/client/request";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";
import { apiRoute } from "src/constants/apiRoutes";
import { ClockBlack, LeftNavination, PhoneBlackIcon } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import { CustomSelect } from "src/components/select/custom-select";
import { phoneNumberFormatter } from "src/lib/format";
import { CircularProgress } from "@material-ui/core";
import { getHelpCenterDispatch } from "src/feature/help-center/help-center-1/faq-categories.action";
import Image from "next/image";

type OptionType = {
  title: string;
  value: string;
};
type ProvinceType = {
  name: string;
  nameEng: string;
  _id: string;
};

export function HelpCenter1() {
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();

  const [country, setCountry] = useState<CountryPhoneCodeType | null>({
    name: "Thailand",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "Thailand",
    citizenship: "Thai",
  });
  const [provinceValue, setProvinceValue] = useState<string>("");
  const [listProvince, setListProvince] = useState<ProvinceType[]>([]);
  const [provinceOptionType, setProvinceOptionType] = useState<OptionType[]>([]);
  const [listBranch, setListBranch] = useState<listBranchSelect[]>([]);
  const [branchOptionType, setBranchOptionType] = useState<OptionType[]>([]);
  const [information, setInformation] = useState<listBranchSelect | null>(null);
  const [branchAddress, setBranchAddress] = useState<{
    province: string | number;
    country: string;
    branch: string;
  }>({
    country: "",
    province: "",
    branch: "",
  });
  const { faqCategoriesData, loading } = useSelector((state: RootState) => state.faqCategories);

  const getDataCategories = useCallback(() => {
    // dispatch(getFAQCategories());
    dispatch(getHelpCenterDispatch());
  }, [dispatch]);

  useEffect(() => {
    getDataCategories();
  }, [getDataCategories]);
  const getProvince = useCallback(async (country: string | undefined) => {
    try {
      if (country) {
        const response = await axios.get(`${apiRoute.helpCenter.provinces}?country=${country}`);

        const idProvince = response.data.find(
          (list: ProvinceType) => list._id === branchAddress.province,
        );
        idProvince && setProvinceValue(idProvince.value);
        setListProvince(response.data);
      }
    } catch (error) {}
  }, []);

  const getBranch = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (id: string | number, country: string | undefined) => {
      try {
        if (id) {
          const response = await axios.get(`${apiRoute.helpCenter.branches}?provinceId=${id}`);
          setListBranch(response.data);
        }
      } catch (error) {}
    },
    [],
  );

  useEffect(() => {
    const callAddressList = async () => {
      await getProvince(country?.value);
      await getBranch(provinceValue, country?.value);
    };

    callAddressList();
  }, [getProvince, getBranch, country?.value, provinceValue]);

  useEffect(() => {
    listBranch.map((item: listBranchSelect) => {
      if (
        item.nameEng === branchAddress.branch ||
        (item.name && item.name === branchAddress.branch)
      ) {
        setInformation(item);
      }
    });
  }, [listBranch, branchAddress.branch]);

  useEffect(() => {
    const optionsBranch = listBranch.map((item: listBranchSelect) => ({
      title: (lang === "en" || !item.name ? item.nameEng : item.name) || item._id,
      value: item._id,
    }));
    setBranchOptionType(optionsBranch);
  }, [listBranch, lang]);

  useEffect(() => {
    const optionsProvince = listProvince.map((item: ProvinceType) => ({
      title: lang === "en" || !item.name ? item.nameEng : item.name,
      value: item._id,
    }));
    setProvinceOptionType(optionsProvince);
  }, [listProvince, lang]);

  const handleChangeCountry = (item: CountryPhoneCodeType) => {
    setBranchOptionType([]);
    setCountry(item);
    getProvince(item.value);
  };

  const handleChangeSelect =
    (name: "province" | "branch") =>
    ({ value, title }: { value: string | undefined | number; title: string }) => {
      if (value) {
        if (name === "province") {
          const newProvince = { ...branchAddress, province: value };
          setBranchAddress(newProvince);
          getBranch(value, country?.value);
          setBranchOptionType([]);
        }
        if (name === "branch") {
          const newBranch = { ...branchAddress, branch: title };
          setBranchAddress(newBranch);
        }
      }
    };

  const handleBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };

  const businessHoursLable = useMemo(() => {
    if (!information) {
      return null;
    }
    const { businessHoursEng, businessHours } = information;
    if (lang === "en" || !businessHours) {
      return businessHoursEng;
    }
    return businessHours;
  }, [lang, information]);

  return (
    <div className="md:mx-auto md:w-1216 mb-8 px-4 md:px-0">
      <div className="float-left w-1/4 mb-8 hidden md:block">
        <LeftNavination />
      </div>
      <div className="md:float-left md:w-3/4 mt-4 md:mt-0">
        <div>
          <label>
            <p className="text-base font-medium">{t`FAQ-categories`}</p>
          </label>
          <div className={`${styles.crossbar} w-full`}></div>
          {faqCategoriesData
            ? faqCategoriesData.map((item: FAQCategoriesModel) => (
                <Link
                  key={item._id}
                  href={{ pathname: "/help-center-2/[id]", query: { id: item._id } }}
                >
                  <ItemCategory nameSubCategory={item.name} />
                </Link>
              ))
            : null}
          {!loading && faqCategoriesData.length === 0 ? (
            <div className="w-full">
              <div className="w-48 m-auto text-center mt-4">
                <NoDataIcon />
                <p>{t`no_data`}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <label className="flex sm:block justify-between">
            <p className="text-base font-medium mt-8">{t`contact-us`}</p>
            <div className="mt-8 block sm:hidden">
              <Image
                src="/assets/images/SCM_Company_Logo.png"
                alt="image delivery"
                width={89}
                height={20}
              />
            </div>
          </label>
          <div className={`${styles.input}`}>
            <p className="pt-4 pb-1.5 text-sm">{t`country`}</p>
            <SelectCountry country={country?.value} onSelect={handleChangeCountry} />
          </div>
          <div className={`${styles.input}`}>
            <p className="pt-4 pb-1.5 text-sm">{t`province`}</p>
            {country?.value === "Thailand" ? (
              <CustomSelect
                options={provinceOptionType}
                onChange={handleChangeSelect("province")}
                defaultValue={provinceOptionType[0]?.value}
              />
            ) : (
              <CustomSelect
                options={provinceOptionType}
                onChange={handleChangeSelect("province")}
                defaultValue={provinceOptionType[0]?.value}
              />
            )}
          </div>
          <div className={`${styles.input}`}>
            <p className="pt-4 pb-1.5 text-sm">{t`branch`}</p>
            <CustomSelect
              options={branchOptionType}
              defaultValue={branchOptionType[0]?.value}
              onChange={handleChangeSelect("branch")}
            />
          </div>
        </div>
        {!information?.latitude ? (
          <div className="w-full mt-72">
            <div className="m-auto w-24">
              <CircularProgress />
            </div>
          </div>
        ) : null}
        {information?.provinceId ? (
          <div className="w-full float-left pt-8 pb-8">
            <label>
              {information?.addressEng ? (
                <p className="text-sm">
                  {lang === "en" || !information.address
                    ? information?.addressEng
                    : information.address}
                </p>
              ) : null}
            </label>
            <div className="flex flex-wrap mt-4 text-sm">
              <div style={{ marginTop: "1.8px" }}>
                <PhoneBlackIcon className="mr-2.5" />
              </div>
              <img
                className="mr-1.5 w-4 h-4 mt-1.5"
                alt={`${country?.value?.toLocaleLowerCase()} flag`}
                src={`/assets/images/country/${country?.value?.toLocaleLowerCase()}.svg`}
              />{" "}
              <div className="mt-1">
                {phoneNumberFormatter(information.phoneCode, information.phoneNumbers).map(
                  (phone) => (
                    <div>{phone}</div>
                  ),
                )}
              </div>
            </div>
            <div
              className={`text-left ${businessHoursLable ? "mt-4 h-8" : ""} mb-5 w-full text-sm`}
            >
              <div className="items-center float-left">
                {businessHoursLable ? <ClockBlack className="mr-2.5" /> : null}
              </div>
              <div className={`float-left ${businessHoursLable ? "mb-5" : ""}`}>
                {businessHoursLable &&
                  handleBusinessHour(businessHoursLable).map((item: string) => (
                    <p className="w-full">{item}</p>
                  ))}
              </div>
            </div>

            <div className="md:w-[880px] -mx-4 md:mx-0">
              {information.latitude && information.longitude && (
                <MapContainer
                  latitude={+information.latitude}
                  longitude={+information.longitude}
                  title={information.nameEng}
                  googleMapUrl={information.googleMapUrl}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
