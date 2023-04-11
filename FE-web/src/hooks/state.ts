import { useEffect, useMemo, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
const currencySymbol: { [key: string]: string } = {
  Thailand: "฿",
  Vietnam: "₫",
  Myanmar: "K",
  Laos: "₭",
  Cambodia: "$",
  Malaysia: "RM",
  Singapore: "$",
};

export const currencyUnit: { [key: string]: string } = {
  Thailand: "THB",
  Vietnam: "VND",
  Myanmar: "MMK",
  Laos: "LAK",
  Cambodia: "USD",
  Malaysia: "MYR",
  Singapore: "SGD",
};

export const TaxCountry: { [key: string]: number } = {
  Thailand: 0.07,
  Vietnam: 0.1,
  Myanmar: 0.05,
  Laos: 0.1,
  Cambodia: 0.1,
  Malaysia: 0,
  Singapore: 0.07,
};

export function useDelayState<T>(currentState: T, delay: number): T {
  const [delayedState, setState] = useState(currentState);

  useEffect(() => {
    setTimeout(() => {
      setState(currentState);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState]);

  return delayedState;
}

export const useLocationBase = () => {
  const [cookiesObject] = useCookies();
  const locationBase = useMemo(() => {
    return cookiesObject.member?.locationBase || cookiesObject.LocationBase;
  }, [cookiesObject]);

  return {
    locationBase,
    symbol: currencySymbol[locationBase] || "$",
    currencyUnit: currencyUnit[locationBase] || "VND",
    tax: TaxCountry[locationBase] ?? 0.1,
  };
};

export const getTax: () => number = () => {
  const cookies = new Cookies();
  const memberCookies = cookies.get("member");
  const locationBase = memberCookies.locationBase || "Thailand";
  return TaxCountry[locationBase];
};
