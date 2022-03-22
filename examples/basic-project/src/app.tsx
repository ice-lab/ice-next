import type { AppConfig } from 'ice';

const appConfig: AppConfig = {
  app: {
    getInitialData: async (ctx) => {
      console.log(ctx);
      return {
        auth: {
          admin: true,
        },
      };
    },
  },
};

if (process.env.ICE_RUNTIME_ERROR_BOUNDARY) {
  console.log('__REMOVED__');
}

export default appConfig;
