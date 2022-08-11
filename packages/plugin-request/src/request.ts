import type { AxiosRequestConfig, CancelTokenStatic, CancelStatic } from 'axios';
import axios from 'axios';

// https://github.com/axios/axios#request-config
const DEFAULT_CONFIG = {};

const axiosInstances = {
  default: axios.create(DEFAULT_CONFIG),
};

/**
 * Create an axios instance.
 * @param instanceName
 */
function createAxiosInstance(instanceName?: string) {
  if (instanceName) {
    if (axiosInstances[instanceName]) {
      return axiosInstances;
    }
    axiosInstances[instanceName] = axios.create(DEFAULT_CONFIG);
  }
  return axiosInstances;
}

interface RequestConfig extends AxiosRequestConfig {
  instanceName?: string;
  withFullResponse?: boolean;
}

export interface RequestProps {
  get: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  delete: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  head: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  options: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
}

interface Request extends RequestProps {
  <T = any>(options: RequestConfig): Promise<T>;
  <T = any>(url: string, config?: RequestConfig): Promise<T>;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel: (value: any) => boolean;
}

/**
 * Request, return response.data | response
 * @param options Reference: https://github.com/axios/axios#request-config
 */
const request = async function <T = any>(options): Promise<T> {
  try {
    const instanceName = options.instanceName ? options.instanceName : 'default';
    const axiosInstance = createAxiosInstance()[instanceName];
    if (!(typeof axiosInstance === 'function')) {
      throw new Error(`unknown ${instanceName} in request method`);
    }
    const response = await axiosInstance(options);
    if (axiosInstance.defaults.withFullResponse || options.withFullResponse) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach((method) => {
  request[method] = function <T = any>(url, config) {
    return request<T>(Object.assign(config || {}, {
      method,
      url,
    }));
  };
});

['post', 'put', 'patch'].forEach((method) => {
  request[method] = function <T = any>(url, data, config) {
    return request<T>(Object.assign(config || {}, {
      method,
      url,
      data,
    }));
  };
});

request.CancelToken = axios.CancelToken;
request.isCancel = axios.isCancel;

export default request as Request;
