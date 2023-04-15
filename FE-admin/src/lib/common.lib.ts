import { NumberFormatValues } from "react-number-format";
import dayjs from "dayjs";
import { identity, pickBy } from "lodash";
import querystring, { ParsedUrlQueryInput } from "querystring";

const DEFAULT_SIZE = 5;
export function getTotalPage(count?: number, size?: number) {
  return Math.ceil((count || DEFAULT_SIZE) / (size || DEFAULT_SIZE));
}

export function toQueryString(url: string, params?: ParsedUrlQueryInput) {
  const trulyParams = pickBy(params, identity);
  return `${url}?${querystring.stringify(trulyParams || {})}`;
}

export function formatNumber(num: number = 0) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function renderRangeDateStr(startDate?: string, endDate?: string, format?: string) {
  const DEFAULT_FORMAT = format || "DD MMM YYYY";
  if (startDate && endDate) {
    return `${dayjs(startDate).format(DEFAULT_FORMAT)} to ${dayjs(endDate).format(DEFAULT_FORMAT)}`;
  }
  if (startDate && !endDate) {
    return `${dayjs(startDate).format(DEFAULT_FORMAT)} to Unexpired`;
  }
  return "";
}

export function scrollToElement(id?: string) {
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export const withValueCap =
  ({ min, max }: { min?: number; max?: number }) =>
    (inputObj: NumberFormatValues) => {
      const { floatValue } = inputObj;
      if (floatValue === undefined) return true;
      if (min !== undefined && max !== undefined) return floatValue >= min && floatValue <= max;
      if (min !== undefined) return floatValue >= min;
      if (max !== undefined) return floatValue <= max;
      return false;
    };
