---
title: 代码分割 Code Splitting
order: 6
---

随着应用的增长，代码 bundle 的大小也将随之增长。为了避免因体积过大而导致加载时间过长，我们可以按照路由对代码进行分割成不同的代码块，然后当路由被访问的时候才加载对应的代码，能够显著地提高应用性能。

## 路由组件代码分割

推荐以路由维度分割代码，每个路由对应的代码会生成一个独立的 js 和 css。

### 配置式路由

在配置式路由中如果需要开启按需加载，只需要在路由文件中通过 `lazy` 方法引入组件即可：

```diff
// src/routes.ts
+ import { lazy } from 'ice';
- import UserLogin from '@/pages/UserLogin';
+ const UserLogin = lazy(() => import('@/pages/UserLogin'));

const routerConfig = [
  {
    path: '/login',
    component: UserLogin,
  },
]
```

默认生成的 chunk 是按照 `[index]` 作为 chunk 名称，但我们可以通过 webpackChunkName 指定每个 chunk 来自哪个文件，以便于查看和调试：

```diff
const UserLogin = lazy(() => import('@/pages/UserLogin'));
+ const UserLogin = lazy(() => import(/* webpackChunkName: 'user-login' */'@/pages/UserLogin'));
```

### 约定式路由

在约定式路由中如果需要开启按需加载，只需要在 `build.json` 中的 router 选项配置 lazy 属性即可：

```diff
// build.json
{
  "router": {
+    "lazy": true
  }
}
```

### fallback

当组件动态加载过程中或者组件渲染失败时，可以通过 fallback 属性设置提示：

```diff
import { runApp } from 'ice';

const appConfig = {
  router: {
+    fallback: <div>loading...</div>
  }
}

runApp(appConfig);
```

## 非路由组件代码分割

除了路由维度，我们也可以做一些更小粒度比如组件级别的代码分割：

```ts
import { lazy } from 'ice';
import React, { Suspense } from 'react';

const OtherComponent = lazy(() => import('@/components/RichEditor'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

对应用进行代码分割可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量，在大多数时候我们推荐使用代码分割来提升应用的加载速度和性能。

## 常见问题

### 动态修改异步资源加载地址

对于上述切割后的代码或者代码里使用的静态资源，最终页面运行时会通过 HTTP 方式异步加载，而异步加载的**资源地址**是通过构建时配置 `publicPath` 来控制的。在一些特殊的场景下，比如只有一套构建环境，但是需要部署到多个域名下，此时只能写死一个 `publicPath`，那么在另一个域名下运行时加载异步资源的地址就会有问题，此时即可以通过动态修改 `publicPath` 的方式来解决。

首先新建文件 `src/public-path.ts`：

```js
if (typeof window === 'object' && window.resourceBaseUrl && typeof __webpack_public_path__ !== 'undefined')
  // 在 html 中根据环境注入不同的 window.resourceBaseUrl 全局变量，也可以根据当前域名等信息动态判断&设置
  __webpack_public_path__ = window.resourceBaseUrl;
}
```

然后在 `src/app.ts` 「最顶部」引入该文件：

```diff
+import './public-path';
import { runApp } from 'ice';

runApp({});
```

注意：Vite 模式下暂不支持动态修改 publicPath，具体请参考 issue https://github.com/vitejs/vite/issues/3522