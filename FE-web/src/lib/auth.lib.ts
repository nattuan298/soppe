import publicIp from "public-ip";
import { getOSType, getRefreshToken, removeToken } from "src/lib/common.lib";
import apiClientBrowser from "./client/request";
import getT from "next-translate/getT";
import { notifyToast } from "src/constants/toast";
import Router from "next/router";
import { routeSigninUrl } from "src/constants/routes";

export async function refreshToken() {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    try {
      const res = await apiClientBrowser.post(
        "/auth/members/refresh-token",
        {
          channel: "WebApp",
          OS: getOSType(),
          /* @ts-ignore */
          IP: await publicIp.v4(),
        },
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      );
      return res.data;
    } catch (error) {
      removeToken(true);
      const t = await getT(Router.locale, "common");
      notifyToast("error", "session_expired", t);
      Router.push(routeSigninUrl);
    }
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handle503Error(error: any, statusCode?: number) {
  const t = await getT(Router.locale, "common");
  if (statusCode === 503 || error.message === "Network Error") {
    if (statusCode === 503) {
      const { data } = error.response;
      if (data) {
        notifyToast("error", data?.message);
      }
    }
    if (error.message === "Network Error") {
      notifyToast("error", "network-error", t);
    }
  }
}
