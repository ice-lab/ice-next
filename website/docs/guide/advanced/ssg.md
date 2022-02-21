---
title: 构建时预渲染 SSG
order: 3
---

import Support from '../../../src/components/Support'
import Badge from '../../../src/components/Badge'

<Support list={['webpack', 'vite']} /><Badge text="2.0.0" />

icejs 提供构建时预渲染方案，即在构建时渲染页面组件并生成静态的 HTML 文件，以更好解决以下的业务场景：

- 静态站点生成
- 没有后端服务的场景下需要更好的 SEO 和更少的首屏渲染时间

## 开启预渲染

在工程配置文件 `build.json` 中开启：

```json
{
  "ssr": "static"
}
```

假如现在有以下的目录结构：

```markdown
./src
├── pages
|  ├── Dashboard
|  ├── Home
├── app.ts
└── routes.ts
```

对应的路由配置如下：

```js
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard
  }
];
```

执行 `npm run build`，将会得到以下构建产物：

```markdown
├── build
|  ├── dashboard
|  |  └── index.html   # 预渲染 Dashboard 页面组件得到的 HTML
|  ├── index.html      # 预渲染 Home 页面组件得到的 HTML
|  └── js
|     └── index.js
└── server
|  ├── index.js
|  ├── loadable-stats.json
|  └── pages-data.json
```

通过静态服务启动，预渲染后的 HTML 截图如下：

![html](https://img.alicdn.com/imgextra/i1/O1CN01U6YANR1scx8IMIz6A_!!6000000005788-2-tps-2468-1750.png)

与 SSR 一致，SSG 在构建渲染时会调用 `app.getInitialData()` 和 `Page.getInitialData()` 方法，可以参考 SSR 文档在这两个方法里按需获取一些动态数据。

## 部署

### 使用静态资源服务器

如果是博客、官网等页面数据较为静态的应用，可以直接使用 Nginx、OSS、GitHub Pages 等进行部署，以 Nginx 部署为例：

```plain
location / {
    root   /www/build;
    # 访问 localhost:3000/a 依次查找 /www/build/a、/www/build/a/index.html、/www/build/404.html
    try_files $uri $uri/ 404.html;
}
```

## 进阶用法

### 预渲染动态路由

预渲染默认不渲染动态路由里的所有页面，比如下方的 `/project/:id` 路由：

```js
// src/routes.ts
import Project from '@/pages/Project';

export default [
  {
    path: '/project/:id',
    exact: true,
    component: Project,
  }
];
```

如果需要渲染动态路由中的页面，可以配置页面组件的 `getStaticPaths()` 属性：

```diff
// src/pages/Project/index.tsx
const Project = (props) => {
  return <></>;
}

+Project.getStaticPaths = async () => {
+  return Promise.resolve(['/project/1', '/project/100', '/project/1001']);
+}

export default Project;
```

执行 `npm run build` 后，将会得到以下的构建产物：

```markdown
build
├── project
|  ├── 1
|  |  └── index.html
|  ├── 100
|  |  └── index.html
|  └── 1001
|     └── index.html
├── js
|  └── index.js
└── server
|  ├── index.js
|  ├── loadable-stats.json
|  └── pages-data.json
```