---
title: 页面路由组件
order: 7
---

import Badge from '../../../src/components/Badge'

页面路由组件对应一个路由，进入对应路由时会渲染该组件，同时离开该路由的时候也会卸载该组件，相比于普通的 React 组件，页面路由组件会有一些增强的能力，比如可以定义一些配置项、默认会携带一些 props 等。

## 页面组件配置项

框架为页面级组件提供了一些特殊的配置项，让页面级组件可以快速拥有一些能力。支持两种配置方式：

- 中心化配置在 `src/routes.ts` 中
- 去中心化配置在每个页面组件入口 tsx 中

### 1. 中心化配置在 `src/routes.ts` 中（推荐）<Badge text="2.0.0" />

对于使用配置式路由的开发者，推荐中心化配置在 `src/routes.ts` 中，管理起来更加方便：

```diff
import UserLogin from '@/pages/UserLogin';

export default [
  {
    path: '/login',
    component: UserLogin,
+    pageConfig: {
+      title: '登录页面',
+    },
  },
];

export default routerConfig;
```

pageConfig 支持的配置项：

- title: `String`，配置页面标题
- scrollToTop: `Boolean`，默认 false，进入页面时是否要滚动到顶部
- auth: `String[]`，配置页面准入权限角色列表
- errorBoundary: `Boolean`，默认 false，是否为页面组件包裹 `ErrorBoundary`
- keepAlive: `Boolean`，由 `plugin-keep-alive` 插件扩展，默认 `true`
- spm: `String`，由 `plugin-spm` 插件扩展

### 2. 去中心化配置在每个页面组件上

对于使用文件约定路由的项目，只能去中心化配置在每个页面组件上。

```diff
// src/pages/Home/index.tsx
import React from 'react';

const Home = () => {
  return (
    <div>Home</div>
  );
};

+ Home.pageConfig = {
+   title: 'Home'
+ };

export default Home;
```

## 页面组件默认 props

对于路由组件（即页面级组件），可通过组件 `props` 获取到如下属性：

- `location`：当前路由的 location 对象，包含 `pathname`、`search`、`hash`、`state` 属性
- `history`：详见 [history api](/api/about.md#history)
- `searchParams`：当前 URL 的查询参数对象（需要开启 [parseSearchParams](/guide/basic/app.md#启动项配置)）
- `match`：当前路由和 URL match 后的对象，包含 `path`、`url`、`params`、`isExact` 属性
- `pageConfig`：在 `routes.ts` 中配置的页面 pageConfig 属性

```jsx
// src/pages/Home/index.tsx
export default function Home(props) {
  const { location, history, searchParams, match, pageConfig } = props;
  const { foo } = pageConfig;

  console.log(foo); // => bar
  return <>Home</>;
}
```

对于非路由组件，组件内如想获取上述属性需要借助 [useHistory](/api/about.md#useHistory), [useLocation](/api/about.md#useLocation), [useParams](/api/about.md#useParams), [withRouter](/api/about.md#withRouter) 等 API。

## 页面组件静态方法

通过 `Page.getInitialProps()` 在 SSR/SSG 的时候异步获取初始属性：

```diff
// src/pages/Home/index.tsx
import React from 'react';

const Home = ({ stars }) => {
  return (
    <div>Home stars: {stars}</div>
  );
};

+ Home.getInitialProps = async (ctx) => {
+   const res = await request.get('https://api.github.com/repos/alibaba/ice');
+   return { stars: res.data.stargazers_count };
+ }

export default Home;
```

通过 `Page.getStaticPaths()` 指定 SSG 时动态路由的页面需要渲染出哪些具体的路由页面：

```diff
// src/pages/Project/index.tsx
import React from 'react';
import { useParams } from 'ice';

const Project = () => {
  const params = useParams();

  return (
    <div>Project id: {params.id}</div>
  );
};

+ Project.getStaticPaths = async () => {
+   return ['/project/1', 'project/100'];
+ }

export default Project;
```
