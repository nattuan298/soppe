import { get, truncate } from "lodash";
import { ProductType } from "types/api-response-type";
import { OrderAddressType } from "types/orders";

export const truncateStr = (str: string, max: number) => {
  if (!str) {
    return "";
  }
  return truncate(str, {
    length: max,
    separator: /,? +/,
  });
};

export const pad = (num: number, size: number) => {
  let result = num.toString();
  while (result.length < size) result = "0" + result;
  return result;
};

export const getStr = (obj = {}, path: string, defaultValue = "", maxlength = 10000000000) => {
  if (get(obj, path) === 0) {
    return 0;
  }
  if (get(obj, path) === null) {
    return defaultValue || "";
  }
  if (typeof get(obj, path) === "object") {
    return "";
  }
  return truncateStr(get(obj, path) || defaultValue || "", maxlength);
};

export const getRandomProducts: (params: {
  products: ProductType[];
  number: number;
}) => ProductType[] = ({ products, number }) => {
  const productLength = products.length;
  const resultObject: { [key: number]: ProductType } = {};
  let count = 0;
  while (count < number) {
    const index: number = Math.floor(Math.random() * productLength);
    if (!resultObject[index]) {
      resultObject[index] = products[index];
      count++;
    }
  }
  //     relatedProducts;
  return Object.values(resultObject);
};

export const formatPhoneNumber = (phoneNumber?: string): string => {
  if (!phoneNumber) {
    return "";
  }
  const length = phoneNumber.length;
  if (length < 4) {
    return phoneNumber;
  }

  const first =
    phoneNumber[0] !== "0" ? phoneNumber.slice(0, length - 3) : phoneNumber.slice(1, length - 3);
  const last = phoneNumber.slice(length - 3);

  return "(0)" + first + "-" + last;
};

export const getCookieFromReq = (cookieString: string, cookieKey: string) => {
  const cookie = cookieString.split(";").find((c) => c.trim().startsWith(`${cookieKey}=`));
  if (!cookie) {
  }
  if (!cookie) return undefined;
  return cookie.split("=")[1];
};

const getAddressByLang = (orderAddress: OrderAddressType, lang?: string) => {
  const { address, province, district, sub_district } =
    orderAddress;

  return [address, sub_district, district, province].filter((item) => item).join(", ");
};

export const getAddressFromOrderAddress = (address: OrderAddressType | null, lang?: string) => {
  if (!address) {
    return {
      userInfor: "",
      address: "",
    };
  }

  const addressByLang = getAddressByLang(address, lang);
  return {
    userInfor: `${address.firstName} ${address.lastName} (
      ${address.phoneNumber}
    )`,
    address: `${addressByLang} `,
  };
};

export const getLocationBaseFromCookieSever = (cookie?: string): string => {
  let locationBase = "";
  if (cookie) {
    const member = getCookieFromReq(cookie, "member") || "";
    const locationBaseDefault = getCookieFromReq(cookie, "LocationBase") || "Thailand";
    const stringMemberDecode = decodeURIComponent(member) || "";
    if (stringMemberDecode) {
      const a = JSON.parse(stringMemberDecode);
      if (a?.locationBase) {
        locationBase = a.locationBase;
      }
    } else if (locationBaseDefault) {
      locationBase = locationBaseDefault;
    }
  }
  return locationBase;
};

export const getMemberIDFromCookieSever = (cookie?: string): string => {
  let memberId = "";
  if (cookie) {
    const member = getCookieFromReq(cookie, "member") || "";
    const stringMemberDecode = decodeURIComponent(member);
    if (stringMemberDecode) {
      const a = JSON.parse(stringMemberDecode);
      if (a?.memberId) {
        memberId = a.memberId;
      }
    }
  }

  return memberId;
};

export const generateArrayOfYears = (): number[] => {
  const max = new Date().getFullYear();
  const min = 2000;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const stringNumberToStringWithToFix = (input: string): string => {
  const a = parseFloat(input);
  return a.toFixed(2).toString();
};
