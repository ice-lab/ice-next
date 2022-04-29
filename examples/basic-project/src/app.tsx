if (process.env.ICE_RUNTIME_ERROR_BOUNDARY) {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

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
