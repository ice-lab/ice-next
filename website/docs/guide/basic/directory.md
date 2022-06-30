---
title: 目录结构
order: 1
---

ICE 的默认应用目录提供了良好的代码分层结构。约定的目录结构如下：

```bash
├── .ice             // 运行时生成的临时目录
├── build            // 构建产物目录
├── mock             // 本地模拟数据
│ ├── index.ts
├── public           // 静态资源目录
│ └── favicon.ico    // Favicon 图标
├── src              // 源码
│ ├── components     // 自定义业务组件
│ ├── pages          // 路由页面组件
|  |  ├── about.tsx
|  |  ├── index.tsx
|  |  └── layout.tsx // 全局 layout
│ ├── global.scss    // 全局样式
│ ├── document.tsx   // 使用 JSX 描述 HTML 模板
│ └── app.tsx        // 应用入口
├── .env
├── ice.config.ts    // 工程配置
├── package.json
└── tsconfig.json
```

## package.json

声明应用所需要的各种依赖或者插件，以及配置信息（比如名称、版本、许可证等元数据）。

## ice.config.ts

应用的工程配置文件。详见 [工程配置文档](/docs/guide/basic/config)。

## .env

存放环境变量。详见 [环境变量文档](/docs/guide/advanced/env)。

## tsconfig.json

TypeScript 编译所需的配置文件。

## .ice 目录

运行 ICE 项目时默认生成的临时目录，该目录不需要进行 `git` 提交。

## mock 目录

存放 mock 文件，用于本地模拟请求数据服务。详见 [Mock 文档](/docs/guide/advanced/mock)。

## build 目录

运行 `npm build` 后的构建产物目录，可修改工程配置修改输出路径。

## public 目录

用于存放静态资源（如 `favicon.ico`）的目录，此目录下所有的文件会被复制到构建产物目录。

## src 目录

### app.tsx

项目的入口文件，用于对应用进行全局运行时配置，包括路由、获取全局数据、添加 Provider 等。详见[应用入口文档](/docs/guide/basic/app)。

### document.tsx

Document 对应页面的 HTML 模板，使用 jsx 语法来描述，与 `index.html` 类似。详见 [Document 文档](/docs/guide/basic/document)。

### global.scss

全局的样式配置，框架默认会引入该文件。详见[样式方案文档](/docs/guide/basic/style)

### pages 目录

路由组件存放的目录。默认开启约定式路由，约定 `pages/layout.tsx` 作为全局 Layout，`pages/x/layout.tsx` 作为页面级别的 `Layout`，其他 `tsx` 文件会根据目录结构自动生成对应的路由。比如有以下的目录结构：

```bash
|  ├── pages
|  |  ├── about
|  |  |  ├── index.tsx
|  |  |  └── layout.tsx
|  |  ├── index.tsx
|  |  └── layout.tsx
```

会自动生成以下的路由匹配规则：

| URL      | 匹配路由组件                  | Layout                       |
| -------- | --------------------------- | ---------------------------- |
| `/`      | `src/pages/index.tsx`       | `src/layout.tsx`             |
| `/about` | `src/pages/about/index.tsx` | `src/pages/about/layout.tsx` |

更多内容可详见[路由文档](/docs/guide/basic/router)。

### components 目录

项目通用的组件目录，推荐的目录形式如下：

```bash
├── ./components
|  └── Guide
|     ├── index.module.css
|     └── index.tsx
```
