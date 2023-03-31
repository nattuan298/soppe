export interface CountryPhoneCodeType {
  name: string;
  code: string;
  flag: string;
  value: string | undefined;
  citizenship: string;
}

export const CountryPhoneCodeDefault: CountryPhoneCodeType = {
  name: "Thailand",
  code: "66",
  flag: "/assets/images/country/thailand.svg",
  value: "Thailand",
  citizenship: "Thai",
};

export const ListCountryPhoneCode: Array<CountryPhoneCodeType> = [
  {
    name: "Cambodia",
    code: "855",
    flag: "/assets/images/country/cambodia.svg",
    value: "Cambodia",
    citizenship: "Cambodian",
  },
  {
    name: "Laos",
    code: "856",
    flag: "/assets/images/country/laos.svg",
    value: "Laos",
    citizenship: "Laotian",
  },
  {
    name: "Malaysia",
    code: "60",
    flag: "/assets/images/country/malaysia.svg",
    value: "Malaysia",
    citizenship: "Malaysian",
  },
  {
    name: "Myanmar",
    code: "95",
    flag: "/assets/images/country/myanmar.svg",
    value: "Myanmar",
    citizenship: "Burmese",
  },
  {
    name: "Singapore",
    code: "65",
    flag: "/assets/images/country/singapore.svg",
    value: "Singapore",
    citizenship: "Singaporean",
  },
  {
    name: "Thailand",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "Thailand",
    citizenship: "Thai",
  },
  {
    name: "Vietnam",
    code: "84",
    flag: "/assets/images/country/vietnam.svg",
    value: "Vietnam",
    citizenship: "Vietnamese",
  },
];
