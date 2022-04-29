if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

export function getAppData() {
  return new Promise((resolve) => {
    resolve({
      title: 'gogogo',
      auth: {
        admin: true,
      },
    });
  });
}

export function getAppConfig(appData) {
  return {
    auth: {
      initialAuth: appData.auth,
    },
  };
}
