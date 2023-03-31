import { Cookies } from "react-cookie";

export const getLocationBase = () => {
  const cookies = new Cookies();
  const memberCookies = cookies.get("member");
  const locationBase = memberCookies.locationBase || "Thailand";
  return locationBase;
};
