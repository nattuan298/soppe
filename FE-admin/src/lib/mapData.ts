import { AxiosError, AxiosResponse } from "axios";
import { ToastPosition, toast } from "material-react-toastify";
import i18next from "i18next";

const toastOptions = {
  position: "top-center" as ToastPosition | undefined,
  autoClose: 3000,
  closeOnClick: true,
  hideProgressBar: true,
  pauseOnHover: false,
  toastId: "APITOAST",
};

export const mapData = (res: AxiosResponse<any>) => res.data;

let timerId: undefined | any;

export const throttleToastAPI = (func: Function, delay: number) => {
  if (!timerId) {
    if (toast.isActive("APITOAST")) {
      return;
    }
    func();
  }
  timerId = setTimeout(function () {
    timerId = undefined;
  }, delay);
};

const toastMessageError = (message: string, cbFunc?: Function) => {
  return throttleToastAPI(() => {
    toast.error(message, { ...toastOptions });
    cbFunc?.();
  }, 3000);
};

const logout = () => {
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }, 1000);
};

export const mapError = (err: AxiosError<any>) => {
  if (err && err.response) {
    if (err.response.data.statusCode === 500) {
      toastMessageError(i18next.t("common:500"));
      return err.response.data;
    }
    if (err.response.data.statusCode === 503) {
      toastMessageError(i18next.t("common:503"));
      return err.response.data;
    }
    if (err.response.data.error === "Network Error") {
      toastMessageError(i18next.t("common:network-error"));
      return err.response.data;
    }
    if (err.response.data.statusCode === 401) {
      logout();
      toastMessageError(i18next.t("common:401"));
      return err.response.data;
    }
    // if (err.response.data.statusCode === 404) {
    //   window.location.href = "/error-404-not-found";
    //   toastMessageError(i18next.t("common:404"));
    //   return err.response.data;
    // }
    if (
      err.response.data.statusCode !== 404 &&
      err.response.data.message &&
      err.response.data.message !== "Email already exists" &&
      err.response.data.message !== "Invalid credentials." &&
      !err.response.config.url?.includes("/verifyOtp")
    ) {
      console.log({ err });
      toastMessageError(err.response.data.message);
      return err.response.data;
    }
    return err.response.data;
  }
  if (err.message === "Network Error") {
    toastMessageError(i18next.t("common:network-error"));
  }
  throw err;
};
