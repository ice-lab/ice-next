import { defineAppConfig, type GetAppData } from 'ice';

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        id: 34293,
      });
    }, 1000);
  });
};

export const miniappManifest = {
  title: 'miniapp test',
  routes: [
    'index',
    'about',
    'second/profile',
    'third/index',
    'third/test',
  ],
};

export default defineAppConfig(() => {
  return {
    app: {
      strict: true,
      errorBoundary: true,
    },
  };
});
