/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";

import { config } from "src/constants/config";
import { mapData, mapError } from "./mapData";
import paramsSerializer from "./paramsSerializer";

const { CancelToken } = axios;

const currentUser = localStorage.getItem("token") || localStorage.getItem("tokenGoogleVerify");
// const currentVerify = localStorage.getItem("verifyToken");

interface PromiseWithCancel<R> extends Promise<R> {
  cancel?: () => void;
}

class Request {
  api: AxiosInstance;

  constructor() {
    const lang = localStorage.getItem("i18nextLng") || "en";
    this.api = axios.create({
      baseURL: config.apiBaseUrl,
      headers: {
        lang,
        "Content-Type": "application/json",
        "Cache-Control": "max-age=600",
      },
    });
  }

  setToken = (token: string) => {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  setLanguage = (lang: string) => {
    this.api.defaults.headers.lang = lang;
  };

  get = <T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {},
  ): PromiseWithCancel<R> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
      paramsSerializer: (params: any) => paramsSerializer(params),
    };
    const request: PromiseWithCancel<R> = this.api
      .get(url, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  post = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .post(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  put = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .put(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  patch = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .patch(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  delete = <T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {},
  ): PromiseWithCancel<R> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .delete(url, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };
}

let token = "";
if (currentUser) token = JSON.parse(currentUser).jwtAccessToken;
const authorizedRequest = new Request();
authorizedRequest.setToken(token);

export { authorizedRequest };
