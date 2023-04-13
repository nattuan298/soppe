import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface CountryPhoneCodeType {
  name: string;
  code: string;
  flag: string;
  value: string;
}

export type CitizenCodeType = CountryPhoneCodeType;

export const ListCountryPhoneCode = [
  {
    name: "Cambodia",
    code: "855",
    flag: "/assets/images/country/cambodia.svg",
    value: "Cambodia",
  },
  {
    name: "Laos",
    code: "856",
    flag: "/assets/images/country/laos.svg",
    value: "Laos",
  },
  {
    name: "Malaysia",
    code: "60",
    flag: "/assets/images/country/malaysia.svg",
    value: "Malaysia",
  },
  {
    name: "Myanmar",
    code: "95",
    flag: "/assets/images/country/myanmar.svg",
    value: "Myanmar",
  },
  {
    name: "Singapore",
    code: "65",
    flag: "/assets/images/country/singapore.svg",
    value: "Singapore",
  },
  {
    name: "Thailand",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "Thailand",
  },
  {
    name: "Vietnam",
    code: "84",
    flag: "/assets/images/country/vietnam.svg",
    value: "Vietnam",
  },
];

export const ListCitizenship = [
  {
    name: "Cambodian",
    code: "855",
    flag: "/assets/images/country/cambodia.svg",
    value: "Cambodian",
  },
  {
    name: "Laotian",
    code: "856",
    flag: "/assets/images/country/laos.svg",
    value: "Laotian",
  },
  {
    name: "Malaysian",
    code: "60",
    flag: "/assets/images/country/malaysia.svg",
    value: "Malaysian",
  },
  {
    name: "Burmese",
    code: "95",
    flag: "/assets/images/country/myanmar.svg",
    value: "Burmese",
  },
  {
    name: "Singaporean",
    code: "65",
    flag: "/assets/images/country/singapore.svg",
    value: "Singaporean",
  },
  {
    name: "Thai",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "Thai",
  },
  {
    name: "Vietnamese",
    code: "84",
    flag: "/assets/images/country/vietnam.svg",
    value: "Vietnamese",
  },
];

export const ListCountryLanguage = [
  {
    name: "Thai Content",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "Thai",
  },
  {
    name: "English Content",
    code: "84",
    flag: "/assets/images/country/united-states.svg",
    value: "English",
  },
];

export const useListCountryLanguage = () => {
  const { t } = useTranslation("common");
  const [listCountryLanguage, setListCountrylanguage] = useState<CountryPhoneCodeType[]>([]);
  useEffect(() => {
    setListCountrylanguage([
      {
        name: t("thai_content"),
        code: "66",
        flag: "/assets/images/country/thailand.svg",
        value: "Thai",
      },
      {
        name: t("english_content"),
        code: "84",
        flag: "/assets/images/country/united-states.svg",
        value: "English",
      },
    ]);
  }, [t]);

  return [listCountryLanguage];
};

export const useListCountryPhoneCode = () => {
  const { t } = useTranslation("common");
  const [listCountryPhoneCode, setListCountryPhoneCode] = useState<CountryPhoneCodeType[]>([]);

  useEffect(() => {
    setListCountryPhoneCode([
      {
        name: t("cambodia"),
        code: "855",
        flag: "/assets/images/country/cambodia.svg",
        value: "Cambodia",
      },
      {
        name: t("laos"),
        code: "856",
        flag: "/assets/images/country/laos.svg",
        value: "Laos",
      },
      {
        name: t("malaysia"),
        code: "60",
        flag: "/assets/images/country/malaysia.svg",
        value: "Malaysia",
      },
      {
        name: t("myanmar"),
        code: "95",
        flag: "/assets/images/country/myanmar.svg",
        value: "Myanmar",
      },
      {
        name: t("singapore"),
        code: "65",
        flag: "/assets/images/country/singapore.svg",
        value: "Singapore",
      },
      {
        name: t("thailand"),
        code: "66",
        flag: "/assets/images/country/thailand.svg",
        value: "Thailand",
      },
      {
        name: t("vietnam"),
        code: "84",
        flag: "/assets/images/country/vietnam.svg",
        value: "Vietnam",
      },
    ]);
  }, [t]);

  return listCountryPhoneCode;
};

export const useListCitizenship = () => {
  const { t } = useTranslation("common");
  const [listCitizenship, setListCitizenship] = useState<CountryPhoneCodeType[]>([]);

  useEffect(() => {
    setListCitizenship([
      {
        name: t("cambodian"),
        code: "855",
        flag: "/assets/images/country/cambodia.svg",
        value: "Cambodian",
      },
      {
        name: t("laotian"),
        code: "856",
        flag: "/assets/images/country/laos.svg",
        value: "Laotian",
      },
      {
        name: t("malaysian"),
        code: "60",
        flag: "/assets/images/country/malaysia.svg",
        value: "Malaysian",
      },
      {
        name: t("burmese"),
        code: "95",
        flag: "/assets/images/country/myanmar.svg",
        value: "Burmese",
      },
      {
        name: t("singaporean"),
        code: "65",
        flag: "/assets/images/country/singapore.svg",
        value: "Singaporean",
      },
      {
        name: t("thai"),
        code: "66",
        flag: "/assets/images/country/thailand.svg",
        value: "Thai",
      },
      {
        name: t("vietnamese"),
        code: "84",
        flag: "/assets/images/country/vietnam.svg",
        value: "Vietnamese",
      },
    ]);
  }, [t]);

  return listCitizenship;
};
