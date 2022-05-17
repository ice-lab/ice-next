import { GetAppData, GetAppConfig } from 'ice';
import Layout from './components/layout';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      title: 'gogogogo',
      auth: {
        admin: true,
      },
    });
  });
};

export const getAppConfig: GetAppConfig = (appData) => {
  return {
    auth: {
      initialAuth: appData?.auth,
    },
    icestark: {
      Layout,
      getApps: () => {
        return [
          {
            path: '/seller',
            title: '商家平台',
            url: [
              'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-react/build/js/index.js',
              'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-react/build/css/index.css',
            ],
          },
          {
            path: '/waiter',
            title: '小二平台',
            url: [
              'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-waiter-vue/dist/js/app.js',
              'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-waiter-vue/dist/css/app.css',
            ],
          },
        ];
      },
    },

  };
};
