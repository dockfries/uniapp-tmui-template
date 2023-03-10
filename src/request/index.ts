import { useUserStore } from "@/store/useUserStore";
import { ICommonResponse, IReqConfig, mixinErrorResult } from "@/types";
import { merge } from "lodash-es";

const requestInterceptors = (config: IReqConfig) => {
  if (!config) return true;
  const { token } = useUserStore();
  if (token) {
    if (!config.header) config.header = {};
    (config.header as Record<string, unknown>).token = token;
  }
  return true;
};

const responseInterceptors = (result: fetchConfigSuccessType, config: IReqConfig) => {
  const data = result.data as ICommonResponse;
  if (data.code === 0) return data.data;
  if (data.code === -1) {
    // token失效
    return;
  }
  if (!config.errModal) return;
  uni.showModal({
    title: "请求异常",
    content: `${data.msg}\n${config.url}`,
    showCancel: false,
  });
};

const errorInterceptors = (result: mixinErrorResult, config: IReqConfig) => {
  if (config.errModal) {
    uni.showModal({
      title: "请求异常",
      content: `${result.statusCode} ${result.errMsg}\n${config.url}`,
      showCancel: false,
    });
  }
};

export const request = <T = unknown>(
  url: string,
  method: fetchConfigMethod = "GET",
  data: object = {},
  overrideConfig?: IReqConfig
) => {
  const defaultConfig: IReqConfig = {
    url: import.meta.env.VITE_GLOB_API_URL + "/" + url,
    method,
    data,
    timeout: 15 * 1000,
    errModal: true,
  };
  if (overrideConfig) merge(defaultConfig, overrideConfig);
  return new Promise<T>((resolve, reject) => {
    uni.$tm.fetch
      .request(
        defaultConfig,
        requestInterceptors,
        (result: fetchConfigSuccessType) => responseInterceptors(result, defaultConfig),
        (result: mixinErrorResult) => {
          if (result.statusCode !== 200) {
            return errorInterceptors(result, defaultConfig);
          }
        }
      )
      .then((res) => {
        if (Object.hasOwn(res, "errMsg")) reject(res);
        else resolve(res as unknown as T);
      })
      .catch((err) => reject(err));
  });
};

export const get = <T = unknown>(url: string, data: object = {}, overrideConfig?: fetchConfig) => {
  return request<T>(url, "GET", data, overrideConfig);
};

export const post = <T = unknown>(url: string, data: object = {}, overrideConfig?: fetchConfig) => {
  return request<T>(url, "POST", data, overrideConfig);
};

export const put = <T = unknown>(url: string, data: object = {}, overrideConfig?: fetchConfig) => {
  return request<T>(url, "PUT", data, overrideConfig);
};

export const del = <T = unknown>(url: string, data: object = {}, overrideConfig?: fetchConfig) => {
  return request<T>(url, "DELETE", data, overrideConfig);
};
