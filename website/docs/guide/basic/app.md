---
title: 应用入口
order: 3
---

框架通过调用 `runApp` 创建渲染整个应用，在创建应用时可以传入应用的全局配置。

## 配置规范

通过 `src/app.ts` 对应用进行全局配置，设置路由、运行环境、请求、日志等：

```ts
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {},
  router: {},
  store: {},
  request: {},
};

runApp(appConfig);
```

## 启动项配置

`app` 这一项所支持的配置：

```js
import { runApp } from 'ice';

const appConfig = {
  app: {
    // 可选，默认 ice-container，根节点 id
    rootId: 'ice-container',

    // 可选，根节点 DOM 元素，更灵活的 rootId
    mountNode: document.getElementById('ice-container'),

    // 可选，默认 true，是否解析路由组件的查询参数
    parseSearchParams: true,

    // 可选，默认 false，是否开启 React.StrictMode，icejs 2.0 开始支持
    strict: false,

    // 可选，自定义添加 Provider
    addProvider: ({ children }) => {
      return <ConfigProvider>{children}</ConfigProvider>;
    },

    // 可选，常用于 SSR 场景或者初始化异步获取数据的场景
    // 如果返回字段中包含 initialStates 字段将会作为状态管理 store 的初始值
    // 如果返回字段中包含 auth 字段将会作为权限管理 auth 的初始值
    getInitialData: async() => {
      const result = await request();
      return result;
    },

    // 可选，自定义错误边界的 fallback UI
    ErrorBoundaryFallback: <div>渲染错误</div>,

    // 可选，自定义错误的处理事件
    onErrorBoundaryHandler: (error, componentStack) => {
      // Do something with the error
    },

    // 可选，SPA 场景下渲染一个简单组件，不再引入 react-router 的路由系统
    // 需要配合设置 build.json 的 router 项为 false
    renderComponent: SimpleComponent,
  },
};

runApp(appConfig);
```

## 配置项说明

### `app.getInitialData`

> 注意：该能力并不耦合 SSR，在 CSR 场景下依然可以使用

通过该配置项可以在应用渲染前做一些异步的事情，比如获取一些全局数据、读取/设置 Cookie/LocalStorage 等。

#### 全局异步获取数据并消费

在 `src/app` 中定义 `getInitialData()`：

```diff
import { runApp, request } from 'ice';

const appConfig = {
  app: {
+    getInitialData: async (ctx) => {
+      const { username, age } = await request.get('/api/user');
+      const theme = localStorage.getItem('theme');
+      // 任意的操作：比如读写 cookie 等
+      return { theme, username, age };
+    }
  },
};
```

接着在 View 等地方即可通过 `getInitialData` API 消费这些数据：

```diff
// src/pages/Home/index.jsx
import { getInitialData } from 'ice';

export default function Home(props) {
+  const initialData = getInitialData();

  return (
    <>
+      用户名称：{initialData.username}
+      当前主题：{initialData.theme}
    </>
  );
}
```

#### 异步设置 Store 的初始状态

参考 [设置初始状态](/docs/guide/basic/store#设置初始状态)

#### 异步设置初始权限数据

参考 [初始化权限数据](/docs/guide/advanced/auth#初始化权限数据)

### `app.renderComponent`

该选项用于自定义应用的渲染入口，大部分情况下不推荐使用该项能力。但是当有以下诉求时可以考虑使用该配置项：

1. 整个应用不依赖路由，只渲染一个简单的 React 组件
2. 想脱离框架的路由规范，使用 react-router 原始的 API 编写路由

注意：使用该能力之后，路由页面（如果有）的 SSR 相关能力也会失效。以下是两个场景的使用方式：

#### 1. 渲染一个简单的 React 组件

如果是 SPA 场景则首先需要在 `build.json` 中禁用路由插件：

```diff
{
+  "router": false
}
```

接着配置 `app.renderComponent` 即可：

```js
runApp({
  app: {
    renderComponent() {
      return <div>整个应用就一个简单组件</div>
    }
  }
})
```

#### 使用 react-router 原始的 API 编写路由

icejs 默认将路由能力做了封装，开发者只需要编写对应的路由配置即可，如果希望非常灵活的编写路由，则需要通过该选项。

同上，如果是 SPA 场景则首先需要在 `build.json` 中禁用路由插件：

```diff
{
+  "router": false
}
```

接着配置 `app.renderComponent` 即可：

```jsx
import { runApp } from 'ice';
import { Router, Switch, Route } from 'react-router-dom';
import Home from '@/pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
      </Switch>
    <Router/>
  )
}

runApp({
  app: {
    renderComponent() {
      return <App />;
    }
  }
});
```