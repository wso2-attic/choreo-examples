import { AsgardeoSPAClient, HttpRequestConfig } from "@asgardeo/auth-react";
import axios, { AxiosRequestConfig } from "axios";
import { createBaseURL } from "../api/create-base-url";

const config = {
  host: "6de500af-4608-46ca-944b-9f9810807bda-dev.e1-us-east-azure.choreoapis",
  env: "dev",
  service: "reading-list-service",
  version: "1.0.0",
};

export default (config: AxiosRequestConfig = {}) => axios(config);

// asgardeo
const auth = AsgardeoSPAClient.getInstance();

const getConfig = (config: any): HttpRequestConfig => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  ...config,
});

export const request = (config: HttpRequestConfig = {}) =>
  auth?.httpRequest(getConfig(config));

export const get = (
  path: string,
  params?: any,
  overrideBaseUrl = false,
  headers?: any,
  responseType?: string
) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(
    getConfig({ method: "GET", config, responseType, url, params })
  );
};

export const post = (
  path: string,
  params?: any,
  data?: any,
  overrideBaseUrl = false,
  shouldEncodeToFormData?: boolean,
  headers?: any,
  responseType?: string
) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(
    getConfig({
      method: "POST",
      url,
      params,
      headers,
      data,
      shouldEncodeToFormData,
      responseType,
    })
  );
};

export const put = (
  path: string,
  params: any,
  data: any,
  overrideBaseUrl = false,
  shouldEncodeToFormData = false
) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(
    getConfig({
      method: "PUT",
      url,
      params,
      data,
      shouldEncodeToFormData,
    })
  );
};

export const remove = (path: string, params?: {}, overrideBaseUrl = false) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(getConfig({ method: "DELETE", url, params }));
};

export const patch = (path: string, data: any, overrideBaseUrl = false) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(getConfig({ method: "PATCH", url, data }));
};

//  named as deleteHttpRequest as `delete` keyword is not allowed in strict mode
export const deleteHttpRequest = (
  path: string,
  params: any,
  data?: any,
  overrideBaseUrl = false
) => {
  const url: string = overrideBaseUrl
    ? path
    : `${createBaseURL(config)}/${path}`;
  return auth?.httpRequest(getConfig({ method: "DELETE", url, params, data }));
};
