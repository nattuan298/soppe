import axiosCustomer from "src/lib/client/request";
import { Cookies } from "react-cookie";
import { browserConfig } from "src/constants/browser-config";
import { csrfToken } from "./csrf";

const cookies = new Cookies();

export function updateToken(token?: string | number, refreshToken?: string | number) {
  token && cookies.set("token", token);
  refreshToken && cookies.set("refreshToken", refreshToken);
  if (token) axiosCustomer.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeToken(isNotDeleteAuthorize?: boolean) {
  cookies.remove("token");
  cookies.remove("fblo_218020316996432");
  cookies.remove("member");
  cookies.remove("tokenFirebase");
  cookies.remove("refreshToken");
  if (!isNotDeleteAuthorize) {
    delete axiosCustomer.defaults.headers.common.Authorization;
  }
}

export function getToken() {
  return cookies.get("token") || "";
}

export function getRefreshToken() {
  return cookies.get("refreshToken") || "";
}

export function getOSType() {
  let OSType = "Unknown OS";
  if (navigator.userAgent.indexOf("Win") !== -1) OSType = "Windows";
  if (navigator.userAgent.indexOf("Mac") !== -1) OSType = "MacOS";
  if (navigator.userAgent.indexOf("X11") !== -1) OSType = "UNIX";
  if (navigator.userAgent.indexOf("Linux") !== -1) OSType = "Linux";
  return OSType;
}

export function getHeaderConfig() {
  return {
    baseURL: browserConfig.apiBaseUrl,
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-type": "application/json",
      "XSRF-TOKEN": "csrfToken",
      "X-XSRF-TOKEN": csrfToken,
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  };
}
