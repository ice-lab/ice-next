import type { RuntimePlugin } from '@ice/types';
import { createAxiosInstance, setAxiosInstance } from './request.js';

const hasOwn = Object.prototype.hasOwnProperty;
const runtime: RuntimePlugin = async ({ appContext }) => {
  const { appConfig } = appContext;
  if (appConfig && hasOwn.call(appConfig, 'request')) {
    // @ts-ignore
    const { request } = appConfig;
    // Support multi configs.
    if (Array.isArray(request)) {
      request.forEach(requestItem => {
        const instanceName = requestItem.instanceName ? requestItem.instanceName : 'default';
        if (instanceName) {
          const axiosInstance = createAxiosInstance(instanceName)[instanceName];
          setAxiosInstance(requestItem, axiosInstance);
        }
      });
    } else {
      const axiosInstance = createAxiosInstance().default;
      setAxiosInstance(request, axiosInstance);
    }
  }
};

export default runtime;
