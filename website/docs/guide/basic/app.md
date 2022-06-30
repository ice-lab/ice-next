---
title: 应用入口
order: 4
---

ICE 框架通过应用配置的方式渲染整个应用，开发者可以根据提供的配置定制应用

## 应用入口

框架默认以 `src/app.ts` 作为应用配置文件：

```js
import { defineAppConfig } from 'ice';

export default defineAppConfig({
  app: {
    strict: true,
  }
});
```

> 推荐通过 defineAppConfig 的方式导出应用配置，以获得良好的类型提示

## 配置项

应用入口的配置项，支持应用常用的相关配置

### app 配置

- `app.rootId` 默认 ice-container，根节点 id
- `app.strict` 默认 false，是否开启 React.StrictMode
- `app.errorBoundary` 默认为 false，启用内置的错误边界捕获能力

### router 配置

- `router.type` 路由类型，可选值为 'hash' | 'browser'
- `router.basename` 路由 basename

## 运行时拓展

应用入口除了支持定义应用配置之外，同时也承担运行时扩展的能力，比如权限配置：

```js
import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

// 导出 auth 相关的能力，该能力有 @ice/plugin-auth 提供
export const auth = defineAuthConfig(() => {
  return {
    initialAuth: {
      admin: true,
    },
  };
});

export default defineAppConfig({
  app: {
    strict: true,
  }
});
```

更多运行时插件能力，请参考[官方插件](/plugin/list/auth)