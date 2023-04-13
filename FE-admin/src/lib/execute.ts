import axios from "axios";
import { get } from "lodash";
import querystring from "querystring";
import { notifyToast } from "src/constants/toast";
import i18next from "i18next";
import { setTimeout } from "timers";

let blockToastMessage = false;
const currentUser = localStorage.getItem("token") || localStorage.getItem("tokenGoogleVerify");

const execute = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (param) => querystring.stringify(param),
});

execute.interceptors.request.use(async (config) => {
  // Handle anything before request (as add token)
  if (["get", "delete"].includes(config.method || "")) {
    config.data = get(config, "data", {});
  }
  let token = "";
  if (currentUser) token = JSON.parse(currentUser).jwtAccessToken;
  return {
    ...config,
    headers: {
      ...get(config, "headers", {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
});
execute.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const statusCode = err.response.status;
    if (statusCode === 403) {
      // handle toast message just one time when call multi api at the same time
      setTimeout(() => {
        blockToastMessage = false;
      }, 1000);
      !blockToastMessage &&
        notifyToast("error", "", () => i18next.t("common:you-dont-have-permission"));
      blockToastMessage = true;
    }
    // Handle error (as push on notfound page)
    return err.response;
  },
);

export { execute };
