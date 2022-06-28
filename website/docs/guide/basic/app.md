---
title: 应用入口
order: 2
---

ICE 框架通过应用配置的方式渲染整个应用，开发者可以根据提供的配置定制应用

## 应用入口

框架默认以 `src/app.ts` 作为应用配置文件：

```js
import { GetAppData, GetAppConfig } from 'ice';

export const getAppData: GetAppData = () => {
  return {
    initialData: '',
  };
}

export const getAppConfig: GetAppConfig = (appData) => {
  return {
    app: {
      strict: true,
    }
  }
};
```

## 配置项

应用入口的配置项，默认导出




