import type { GetAppData, GetAppConfig } from 'ice';
import constate from 'constate';
import React from 'react';
console.log('constate ', constate);

function useCounter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  return { count, increment };
}

const [CounterProvider, useCounterContext] = constate(useCounter);
console.log(useCounterContext, CounterProvider);

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
  };
};
