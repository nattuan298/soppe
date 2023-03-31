import axios from "axios";
import Router from "next/router";
import { Cookies } from "react-cookie";
import { handle503Error, refreshToken } from "../auth.lib";
import { getHeaderConfig, updateToken } from "../common.lib";
import { removeToken } from "src/lib/common.lib";
import getT from "next-translate/getT";
import { notifyToast } from "src/constants/toast";
import { routeSigninBase } from "src/constants/routes";

/**
 * Axios instance for browser,
 * with `access-token` header injected
 */
const apiClientBrowser = axios.create({
  ...getHeaderConfig(),
});

let isCallingRefreshToken = false;
const cookies = new Cookies();
const token = cookies.get("token");

if (token) {
  apiClientBrowser.defaults.headers.common.Authorization = `Bearer ${token}`;
}

apiClientBrowser.interceptors.request.use((config) => {
  // First make the config.url URI code, and then replace the special characters in the overall situation, then decode the URI decoding
  config.url = decodeURI(encodeURI(config.url || "").replace(/%E2%80%8B/g, ""));
  return config;
});

apiClientBrowser.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // handle refresh token

    const originalConfig = error.config;
    const statusCode = error.response?.status;
    if (originalConfig.url !== "/auth/members/refresh-token" && error.response) {
      // Access Token was expired
      if (statusCode === 401 && !originalConfig._retry && !isCallingRefreshToken) {
        originalConfig._retry = true;
        try {
          isCallingRefreshToken = true;
          const res = await refreshToken();
          isCallingRefreshToken = false;
          if (res) {
            await updateToken(res.accessToken, res.refreshToken);
            originalConfig.headers.Authorization = `Bearer ${res.accessToken}`;
            return apiClientBrowser(originalConfig);
          }
        } catch (_error) {
          isCallingRefreshToken = false;
          return Promise.reject(_error);
        }
      }
    } else if (originalConfig.url === "/auth/members/refresh-token") {
      await removeToken(true);
      const t = await getT(Router.locale, "common");
      notifyToast("error", "session_expired", t);
      window.location.href = routeSigninBase;
    }

    handle503Error(error, statusCode);

    return Promise.reject(error);
  },
);

export default apiClientBrowser;
