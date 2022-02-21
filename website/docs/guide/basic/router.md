---
title: 路由配置
order: 5
---

icejs 推荐使用 **配置式路由** 进行应用的路由管理，如果希望使用文件约定路由可参考 [文档](/guide/advanced/convention-routing.md)。

## 路由全局配置

在 `src/app.ts` 中，我们可以配置路由的类型和基础路径等信息，具体配置如下：

```jsx
import { runApp } from 'ice';

const appConfig = {
  router: {
    type: 'browser',
    basename: '/seller',
    fallback: <div>loading...</div>
    modifyRoutes: (routes) => {
      return routes;
    }
  }
};

runApp(appConfig);
```

配置项说明：

- type: 路由类型，默认值 `hash`，可选值 `browser|hash|static`
- basename: 路由基准地址
- fallback: 开启按需加载时配置 fallback UI
- modifyRoutes: 动态修改路由
- history: 自定义创建 history 对象，[详见](https://github.com/ReactTraining/history/blob/master/docs/getting-started.md)

## 路由列表配置

应用的路由信息统一在 `src/routes.ts` 中配置，配置协议支持多级嵌套，具体如下：

```ts
import UserLayout from '@/Layouts/UserLayout';
import UserLogin from '@/pages/UserLogin';
import NotFound from '@/components/NotFound';
import wrapperPage from '@/components/WrapperPage';

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 component 作为布局组件
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        // 路由路径
        path: '/login',
        // 精确匹配
        exact: true,
        // 路由组件
        component: UserLogin,
        // 注意：仅 2.x 支持在 routes 中配置，icejs 1.x 只支持将 pageConfig 配置在对应的页面组件上，请参考「页面组件」章节
        pageConfig: {
          title: '登录页面',
          scrollToTop: true,
          // 自定义配置
          foo: 'bar',
        },
      },
      {
        path: '/',
        // 重定向
        redirect: '/user/login',
      },
      {
        // 404 没有匹配到的路由
        component: NotFound,
      },
    ],
  },
  // 非分组路由
  {
    path: '/about',
    component: About,
  },
];

export default routerConfig;
```

> 注意：路由有一个按顺序匹配的规则，从上到下一旦命中路由匹配规则就会停止遍历，因此如果你在最前面配置了 `/` 这样一个路由，则所有的路由都会命中该规则，导致其他路由没有效果，所以在开发时要注意路由的顺序以及 `exact: true` 属性的使用。

## 路由跳转

通常使用 `Link` 组件或者 `history` API 进行路由的跳转：

```tsx
import { Link, useHistory } from 'ice';

function Home() {
  const history = useHistory();
  return (
    <>
      <Link to="/about">去 about 页面</Link>
      <span
        onClick={() => {
          history.push('/about');
        }}
      >
        去 about 页面
      </span>
    </>
  );
}
```

路由跳转传递参数，除了通过 url params 如 `/projects/:id` 以及 url query 如 `/project?id=1` 以外，也可通过 `state` 参数：

> 注意：state 传递参数仅支持 BrowserHistory 不支持 HashHistory，通过 `src/app.ts` 里的 `router.type` 字段可配置。

```jsx
import { Link, useHistory } from 'ice';

function Home() {
  const history = useHistory();
  return (
    <>
      <Link
        to={{
          pathname: '/about',
          state: { from: 'click link' },
        }}
      >
        去 about 页面
      </Link>
    </>
  );
}
```

在 about 页面即可通过 `location` 访问到对应的 state：

```jsx
import { useLocation } from 'ice';

function About() {
  const location = useLocation();
  console.log('history state', location.state);
  return <></>;
}
```


## 高阶指南

### 按需加载

参考 [代码分割](/guide/advanced/code-splitting.md) 。

### HashHistory 与 BrowserHistory

前端路由通常有两种实现方式：HashHistory 和 BrowserHistory，路由都带着 `#` 说明使用的是 HashHistory。这两种方式优缺点：

| 特点\\方案         | HashHistory   | BrowserHistory         |
| ------------------ | ------------- | ---------------------- |
| 美观度             | 不好，有 # 号 | 好                     |
| 易用性             | 简单          | 中等，需要 server 配合 |
| 依赖 server 端配置 | 不依赖        | 依赖                   |
| 跟锚点功能冲突     | 冲突          | 不冲突                 |
| 兼容性             | IE8           | IE10                   |
| state 传递参数     | 不支持        | 支持                   |

开发者可以根据自己的实际情况选择对应方案。

### 如何使用 BrowserRouter

本地开发时，只需要在 `src/app.ts` 中增加以下配置即可：

```diff
import { runApp } from 'ice';

const appConfig = {
  router: {
+    type: 'browser',
  }
};

runApp(appConfig);
```

线上运行时需要服务端支持，否则会出现刷新 404 问题，具体方案请参考社区文档：

- [关于 react-router 的 browserHistory 模式](https://github.com/LoeiFy/Recordum/issues/15)
- [react-router 之 HashRouter & BrowserRouter](https://zzugbb.github.io/passages/react-router%E9%97%AE%E9%A2%98/)

### 使用路由高阶组件

通过路由高阶组件可以对路由组件实现统一的业务逻辑（比如鉴权、埋点等）。

首先，实现一个高阶组件：

```tsx
// src/components/LoginWrapper
import { useAuth, Redirect } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const LoginWrappedPage = (props) => {
    const isLogin = true; // 替换成业务逻辑
    return <>{isLogin ? <WrappedComponent {...props} /> : <Redirect to="/login" />}</>;
  };

  return LoginWrappedPage;
};

export default LoginWrapper;
```

然后在 `src/routes` 中配置 wrappers 字段即可：

```diff
+import WrapperPage from '@/components/WrapperPage';

const routerConfig = [
  {
    path: '/user',
    component: User,
+    wrappers: [WrapperPage]
  },
]
```

> 注意：Wrapper 组件不支持通过 lazy 导入

### 动态路由参数

在某些场景下可能需要动态指定路由即 `/user/:id`，使用方式如下：

路由配置：

```ts
import UserInfo from '@/pages/UserInfo';

// src/routes.ts
const routerConfig = [
  {
    path: '/user/:id',
    exact: true,
    component: UserInfo,
  },
];
```

动态路由参数：

```tsx
import { useParams } from 'ice';

export default = () => {
  const { id } = useParams();
  // console.log(id) // 123
}
```

### 如何配置带 `.` 的路由比如 `/a.html`

首先在 `build.json` 中开启配置项：

```diff
{
  "devServer": {
+    "historyApiFallback": {
+      "disableDotRule": true
+    }
  }
}
```

接着按照路由规则配置即可：

```diff
// src/routes.ts
import Home from '@/pages/Home';
import About from '@/pages/About';

export default [{
  path: '/home',
  component: Home,
}, {
+  path: '/about.html',
+  exact: true,
+  component: About,
}];
```