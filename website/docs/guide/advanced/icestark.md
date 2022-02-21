---
title: 微前端 icestark
order: 4
---

[icestark](https://github.com/ice-lab/icestark) 是飞冰团队针对大型系统提供的微前端解决方案，我们提供了独立插件 build-plugin-icestark 帮助 icejs 应用快速接入微前端解决方案。

## 框架应用

通过模板快速创建一个微前端的框架应用（主应用）：

```bash
$ npm init ice icestark-framework @icedesign/stark-layout-scaffold
$ cd icestark-framework
$ npm install
$ npm start
```

如果不是通过模板创建，则需要按照下面的步骤进行改造：

### 添加插件 build-plugin-icestark

安装插件依赖：

```bash
$ npm i --save-dev build-plugin-icestark
```

在 `build.json` 里引入插件：

```json
{
  "plugins": {
    ["build-plugin-icestark", {
      "type": "framework",
      // 防止与微应用的 webpackJSONP 冲突
      "uniqueName": "frameworkJsonp",
    }],
    ["build-plugin-fusion", {
      "themeConfig": {
        // 防止与微应用里的基础组件 css prefix 冲突
        "css-prefix": "next-icestark-"
      }
    }],
  }
}
```

### 应用入口改造

应用入口 `src/app.tsx` 中配置框架应用的一些运行时信息：

```diff
import { runApp } from 'ice'
+import { ConfigProvider } from '@alifd/next';
+import NotFound from '@/components/NotFound';
+import BasicLayout from '@/layouts/BasicLayout';

const appConfig = {
  app: {
    rootId: 'ice-container',
+    addProvider: ({ children }) => (
+      <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>
+    ),
  },
  router: {
+    type: 'browser',
  },
  icestark: {
+    Layout: BasicLayout,
+    getApps: async () => {
+      const apps = [{
+        path: '/seller',
+        title: '商家平台',
+        url: [
+          '//ice.alicdn.com/icestark/child-seller-react/index.js',
+          '//ice.alicdn.com/icestark/child-seller-react/index.css',
+        ],
+      }];
+      return apps;
+    },
+    appRouter: {
+      NotFoundComponent: NotFound,
+    },
  },
};

runApp(appConfig);
```

完整配置说明见[运行时参数](#运行时参数)

## 微应用/子应用

通过模板快速创建一个微应用：

``` bash
# 创建微应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
$ npm install
$ npm start
```

如果不是通过模板创建，则需要按照下面的步骤进行改造：

### 添加插件 build-plugin-icestark

安装插件依赖：

```bash
$ npm i --save-dev build-plugin-icestark
```

在 `build.json` 里引入插件：

```json
{
  "plugins": {
    ["build-plugin-icestark", {
      "type": "child",
      "umd": true
    }]
  }
}
```

### 应用入口改造

在应用入口 `src/app.ts` 中配置微应用相关的信息：

```diff
import { runApp } from 'ice'

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
+    type: 'browser',
  },
};

runApp(appConfig)
```

只需要这么简单，你的 SPA 应用就可以变成微应用了。

### 使用 Vite 模式

> icejs@2.0.0 + build-plugin-icestark@2.4.0 开始支持微应用使用 Vite 模式，构建出 ES Module 的产物格式

> @ice/stark@2.6.0 开始支持加载 ES Module 格式的微应用

在微应用的 `build.json` 中添加配置：

```diff
{
+  "vite": true,
  "plugins": [
    ["build-plugin-icestark", {
+      "type": "child",
-      "umd": true,
    }]
  ]
}
```

同时框架应用中需要针对对应微应用配置 [import](https://micro-frontends.ice.work/docs/api/ice-stark/#loadscriptmode) 选项以支持 ES Module 格式的加载：

```diff
import { runApp } from 'ice';

runApp({
  app: {
    rootId: 'ice-container',
  },
  icestark: {
    Layout: BasicLayout,
    getApps: async () => {
      const apps = [{
        path: '/seller',
        title: '商家平台',
+        loadScriptMode: 'import',
        url: [],
      }];
      return apps;
    },
  },
});
```

## 插件参数

### 运行时参数

运行时参数配置在入口文件 `appConfig.icestark` 字段中，使用方式如下：

```js
import { runApp } from 'ice';

const appConfig = {
  app: {
    getApps: async () => {
      return [];
    },
    appRouter: {
    },
  },
};

runApp(appConfig);
```

所有参数配置如下：

#### Layout

+ 类型：`Component`

框架应用独有字段，框架应用对应的布局组件。

#### getApps

+ 类型：`Function`
+ 默认值：`() => []`

框架应用独有字段，用于获取微应用列表，单个微应用的完整配置字段请参考 [AppConfig](https://micro-frontends.ice.work/docs/api/ice-stark/#appconfig) 。

#### appRouter

框架应用独有字段，可传入 icestark 运行时的钩子函数和可选配置。主要有：

+ `NotFoundComponent`，匹配不到任何微应用路由时的状态。
+ `LoadingComponent`，加载过程中的 Loading 状态。
+ `ErrorComponent`，加载出现错误时的状态。

更多配置[详见文档](https://micro-frontends.ice.work/docs/api/ice-stark/#approuter)。

#### AppRoute

框架应用独有字段，微应用渲染组件，可替换 icestark 内部实现的渲染组件，或将其封装 HoC 组件提供更多能力。非特殊场景不建议使用。

#### type

废弃字段，推荐通过构建时参数配置。

- 类型：`child` | `framework`

### 构建时参数

构建时参数配置在 `build.json` 中，如下使用方式：

```json
{
  "plugins": [
    ["build-plugin-icestark", {
      "type": "child",
    }]
  ]
}
```

所有参数配置如下：

#### type

+ 类型：`child` | `framework`
+ 默认值：`framework`

标识应用类型，框架应用或微应用。

#### umd

+ 类型：`boolean`
+ 默认值：`false`

仅对微应用生效，是否构建为 UMD 格式的微应用。若配置 `umd` 参数，则 `type` 默认为 `child`。

#### library

+ 类型：`string`

构建为 UMD 规范微应用相关字段，标识 UMD 微应用全局导出的变量名。

#### uniqueName

+ 类型：`string`
+ 默认：-

开启 [splitChunk](https://webpack.js.org/configuration/optimization/#optimizationsplitchunks) 或懒加载功能时，防止 webpack runtimes 冲突时使用。建议框架应用开启。

> 若使用 webpack5 构建应用，则无需[启用该字段](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-unique-naming)。

## 常见问题

### 如何监听微应用切换

`icestark` 通过 `onRouteChange`、`onAppEnter` 和 `onAppLeave` 来监听微应用间的切换，在 icejs 研发框架下可以通过在对应的 Layout 中实现相关钩子的监听。Layout 中接收 props 属性如下：

- pathname：微应用路由切换信息，对应 `onRouteChange`
- appEnter：渲染微应用的信息， `onAppEnter`
- appLeave：卸载微应用的信息，对应 `onAppLeave`

在 Layout 使用相关属性时，结合对应属性是否发生变更来执行相应操作：

```js

const BasicLayout = ({ pathname, appLeave, appEnter, children }) => {
  useEffect(() => {
    console.log(`微应用路由发生变化：${pathname}`);
  }, [pathname]);

  useEffect(() => {
    console.log(`卸载微应用：${appLeave.path}`);
  }, [appLeave]);

  useEffect(() => {
    console.log(`渲染微应用：${appEnter.path}`);
  }, [appEnter]);

  return (
    <div>
      {children}
    </div>
  );
};
```

### 动态修改微应用列表

初始化微应用列表可以如上文介绍在应用入口 `src/app.ts` 中配置 `getApps` 属性即可，如果需要动态修改微应用列表，可以通过 Layout 接收的 `updateApps` 属性进行修改：

```js
const BasicLayout = ({ updateApps, children }) => {
  useEffect(() => {
    updateApps([{
      path: '/seller',
      title: '商家平台',
      url: [
        '//ice.alicdn.com/icestark/child-seller-react/index.js',
        '//ice.alicdn.com/icestark/child-seller-react/index.css',
      ],
    }]);
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}
```

### UMD 规范微应用

icestark 从 `1.6.0` 开始支持并推荐使用 UMD 规范的微应用，在微应用层面可以更少的降低跟主应用的耦合：

- 微应用依赖的 `build-plugin-icestark` 版本需要高于 `2.0.0` 才能支持构建出 UMD 规范的微应用
- 主应用依赖的 `@ice/stark` 版本需要高于 `1.6.0` 才能支持渲染 UMD 规范的微应用

#### 微应用导出 UMD 规范的产物

在 `build.json` 中配置 umd 属性即可导出标准 UMD 规范的微应用：

```json
{
  "plugins": [
    ["build-plugin-icestark", {
      "umd": true
    }]
  ]
}
```

### 向微应用透传 props

icestark 2.x 支持框架应用通过 [props](https://micro-frontends.ice.work/api/core#props) 自定义传递给微应用的参数。

```diff
// 框架应用
const appConfig = {
  ...
  icestark: {
    type: 'framework',
    Layout: BasicLayout,
    getApps: async () => {
      const apps = [{
        path: '/seller',
        title: '商家平台',
        url: [
          '//ice.alicdn.com/icestark/child-seller-react/index.js',
          '//ice.alicdn.com/icestark/child-seller-react/index.css',
        ],
+       props: {
+         name: 'micro-child'
+       }
      }];
      return apps;
    },
   ...
  },
};

runApp(appConfig);
```

在微应用中，可以通过[页面级组件](/guide/basic/router.md#路由组件参数) 的 props 获取框架应用传递的参数。

```js
function About(props) {
  const { frameworkProps: { name } } = props;
  return <div>{name}</div>;
}
```

### 微应用自定义生命周期函数

插件 build-plugin-icestark 会默认为 ice.js 微应用提供[生命周期函数](https://micro-frontends.ice.work/docs/guide/concept/child/#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)。在一些业务场景下，需要自定义生命周期函数，则可以下面的示例进行配置：

```js
import { runApp } from 'ice';
import { isInIcestark } from '@ice/stark-app';
import ReactDOM from 'react-dom';

// 微应用 app.tsx
const appConfig = {
  router: {
    type: 'browser',
  },
  icestark: {
    type: 'child',
  },
};

if (!isInIcestark()) {
  runApp(appConfig);
}

// 自定义 mount 生命周期函数
export function mount () {
  runApp(appConfig)
}

// 自定义 unmount 生命周期函数
export function unmount ({ container }) {
  ReactDOM.unmountComponentAtNode(container)
}
```

### 微应用 bundle 加载失败

前端应用如果做了按需加载，按需加载的 bundle 默认是根据当前域名拼接地址，如果前端资源部署在非当前域名（比如 CDN）下，则需要通过手动配置 publicPath 来实现，可参考[文档](/docs/guide/basic/build#publicPath)。

### 微应用开发时请求本地 Mock 接口

通常情况下，代码中的接口请求地址都是写成类似 `/api/xxx` 的相对地址，请求时会根据当前域名进行拼接，如果微应用嵌入主应用进行开发，在域名变化后依旧想使用微应用的 Mock 接口或者代理配置，可以设置 `baseURL` 来请求非当前域名的接口地址。

```js
import { runApp } from 'ice';

const appConfig = {
  ...
  request: {
    baseURL: '//127.0.0.1:4444',
  }
};

runApp(appConfig);
```

### 微应用本地开发如何调试

单独微应用开发时只能看到自身的内容，无法关注到在主应用下的表现，这时候本地如果需要再启动一个主应用，开发起来就很繁琐。针对这种情况，我们推荐通过主应用的日常/线上环境调试本地微应用。

在主应用中注册微应用时，如果 url 里携带了类似 `?__env__=local` 的 query，则将微应用的 url 转换为对应的本地服务地址，这样就可以方便调试微应用了。大体代码如下（可根据具体需求调整）：

```js
// src/app.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import urlParse from 'url-parse';
import BasicLayout from '@/layouts/BasicLayout';

const urlQuery = urlParse(location.href, true).query || {};

function getBundleUrl(name, version) {
  let jsUrl = `//g.alicdn.com/${name}/${version}/index.min.js`;
  let cssUrl = `//g.alicdn.com/${name}/${version}/index.min.css`;

  if (urlQuery.env === 'local') {
    jsUrl = `//127.0.0.1:${urlQuery.port}/build/js/index.js`;
    cssUrl = `//127.0.0.1:${urlQuery.port}/build/css/index.css`;
  }
  return [cssUrl, jsUrl];
}

const apps = [{
  title: '通用页面',
  url: getBundleUrl('seller', '0.1.0'),
  // ...
}]
```

### 应用启用 lazy 后，chunk 加载失败

多个微应用均开启 lazy 加载页面，建议通过开启 sandbox 隔离微应用 windows 全局变量。如果无法开启 sandbox，则需要在主应用 `onAppLeave` 的阶段清空 webpackJsonp 配置：

```js
const onAppLeave = (appConfig) => {
  window.webpackJsonp = [];
};
```

或建议通过[构建时参数 `uniqueName`](#构建时参数) 隔离多个微应用的 webpack runtimes。

> 注意，若使用 webpack5 构建应用，则 webpack5 会默认使用 `package.json` 的 `name` 作为 uniqueName，因此也无需在 `onAppLeave` 阶段移除 `window.webpackJsonp`。

### `Error: Invariant failed: You should not use <withRouter(Navigation) /> outside a <Router>`

因为 jsx 嵌套层级的关系，在主应用的 Layout 里没法使用 react-router 提供的 API，比如 `withRouter`, `Link`, `useParams` 等，具体参考文档 [主应用中路由跳转](https://micro-frontends.ice.work/docs/guide/use-layout/react#%E4%B8%BB%E5%BA%94%E7%94%A8%E4%B8%AD%E8%B7%AF%E7%94%B1%E8%B7%B3%E8%BD%AC)。

### 启用 HashRouter

官方推荐 BrowserRouter 作为微前端的路由模式。在某些情况下，你可以通过以下方式适配 HashRouter 路由模式。

1. 修改主应用的路由模式

在 `src/app.ts` 中增加以下配置，将 `router` 修改为 `hash`。

```diff
import { runApp } from 'ice';

const appConfig = {
  router: {
-   type: 'browser',
+   type: 'hash',
  }
};

runApp(appConfig);
```

2. 为微应用设置 hashType 为 true

```diff
import { runApp } from 'ice';

const appConfig: IAppConfig = {
  icestark: {
    type: 'framework',
    Layout: FrameworkLayout,
    getApps: async () => {
      const apps = [{
        path: '/seller',
        title: '商家平台',
        sandbox: true,
+       hashType: true,
        url: [
          '//dev.g.alicdn.com/nazha/ice-child-react/0.0.1/js/index.js',
          '//dev.g.alicdn.com/nazha/ice-child-react/0.0.1/css/index.css',
        ],
      }, {
        path: '/waiter',
        title: '小二平台',
        sandbox: true,
+       hashType: true,
        url: [
          '//ice.alicdn.com/icestark/child-waiter-vue/app.js',
          '//ice.alicdn.com/icestark/child-waiter-vue/app.css',
        ],
      }];
      return apps;
    },
  },
};

runApp(appConfig);
```

3. 修改 FrameworkLayout 中的逻辑

此外，你可能需要自行修改 `FrameworkLayout` 中的逻辑，路由信息会通过 `routeInfo` 字段返回。

```js
import * as React from 'react';
import BasicLayout from '../BasicLayout';
import UserLayout from '../UserLayout';

interface RouteInfo {
  hash: string;
  pathname: string;
  query: object;
  routeType: 'pushState' | 'replaceState',
}

const { useEffect } = React;
export default function FrameworkLayout(props: {
  children: React.ReactNode;
  appLeave: { path: string };
  appEnter: { path: string };
  routeInfo: RouteInfo;
}) {
  const { children, appLeave, appEnter, routeInfo } = props;
  // 如果是 HashRouter 模式
  const isHashRouter = true;
  const { hash = '', pathname } = routeInfo;
  const path = isHashRouter ? hash.replace('#', '') : pathname;
  const Layout = hash === '/login' ? UserLayout : BasicLayout;

  useEffect(() => {
    console.log('== app leave ==', appLeave);
    if (appLeave.path === '/angular' && window.webpackJsonp) {
      // remove webpackJsonp added by Angular app
      delete window.webpackJsonp;
    }
  }, [appLeave]);

  useEffect(() => {
    console.log('== app enter ==', appEnter);
  }, [appEnter]);

  return (
    <Layout pathname={path}>{children}</Layout>
  );
}
```

4. 微应用改造

微应用的同样需要改造成 `HashRouter` 路由模式。

5. 应用间跳转

应用间跳转可以通过 `AppLink` 和 `appHistory`，并设置 `hashType` 为 `true`。

```js
import { AppLink, appHistory } from '@ice/stark-app';

// 示例1
const navItem = <AppLink to="/seller" hashType>{item.name}</AppLink>);

// 示例2
appHistory.push('/seller', true);
```

### 如何解决 Script Error 错误

“ Script error. ” 是一个常见错误，但由于该错误不提供完整的报错信息（错误堆栈），问题排查往往无从下手。icestark 的 [scriptAttributes](https://micro-frontends.ice.work/docs/api/ice-stark#scriptattributes) 参数支持为加载的 `<script />` 资源添加 `crossorigin="anonymous"` 来解决这个问题。

> 更多有关 icestark 的内容请访问 👉 [官网](https://micro-frontends.ice.work/)
