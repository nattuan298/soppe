// import { get } from "lodash";
import { useMemo } from "react";
import { Cookies } from "react-cookie";

export default function useLoggedIn() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const accessToken = useMemo(() => {
    return token;
  }, [token]);
  const priceFieldName: "memberPrice" | "personalPrice" = useMemo(() => {
    return accessToken ? "memberPrice" : "personalPrice";
  }, [accessToken]);

  return {
    priceFieldName,
    isLoggedIn: !!accessToken,
  };
}
