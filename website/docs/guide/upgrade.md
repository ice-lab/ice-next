---
title: 版本升级
order: 2
---

## 版本说明

飞冰的脚手架从 `ice-scripts@1.x` 到 `ice-scripts@2.x` 到 icejs 经过了三个大的版本变化，这些版本变化都是结合我们的业务实践以及用户诉求不断演进的，在能力和规范性上都在不断提高，核心的一些差别：

| 维度\版本    | icejs 2.x               | icejs 1.x               | ice-scripts 2.x                                                               | ice-scripts 1.x                                                                     |
| ------------ | ----------------------- | ----------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 定位         | 研发框架                | 研发框架                | 构建工具                                                                      | 构建工具                                                                            |
| 升级原因     | Webpack 5&Vite           | 从构建工具到研发框架                | 工程配置插件化 | 统一管理工程配置 |
| 配置文件     | build.json              | build.json              | ice.config.js                                                                 | package.json(buildConfig)                                                           |
| 文档地址     | [访问](/guide/about.md) | [访问](/guide/about.md) | [访问](https://github.com/alibaba/ice/tree/stable/docs-backup/docs/guide-0.x) | [访问](https://github.com/alibaba/ice/tree/stable/docs-backup/docs/ice-scripts-1.x) |
| 发布时间     | 2021.09                 | 2020.02                 | 2019.06                                                                       | 2018.02                                                                             |
| 可渐进升级性 | 好                      | 好                      | 不好                                                                          | 不好                                                                                |
| 插件能力     | 工程+运行时             | 工程+运行时             | 工程                                                                          | 无                                                                                  |
| 工程配置     | 强                      | 强                      | 强                                                                            | 弱                                                                                  |
| 运行时配置   | 默认支持                | 默认支持                | 默认不支持                                                                    | 默认不支持                                                                          |
| SSR          | 支持                    | 支持                    | 不支持                                                                        | 不支持                                                                              |
| SSG          | 支持                    | 不支持                    | 不支持                                                                        | 不支持                                                                              |

可渐进升级性「好」意味着整体设计较为稳定，未来的版本变化用户可以低成本的渐进升级。

## 从 icejs 1.x 升级

:::caution

不推荐旧版本直接升级到 2.0 的 Vite 模式，建议先升级到 Webpack 模式，再按需迁移到 Vite 模式

:::

### 1. 依赖版本升级

package.json:

```diff
{
  "devDependencies": {
-   "ice.js": "^1.0.0",
+   "ice.js": "^2.0.0",
  }
}
```

### 2. 工程配置升级

icejs 2.x 移除了已废弃的工程配置和插件，并将一些优化逻辑默认内置：

```diff
{
-  "terserOptions": {}, // 请使用 minify 配置
-  "dll": true, // 废弃，请使用 remoteEntry
-  "dllEntry": { "react": ["react", "react-dom"] }, // 废弃
-  "modularImportRuntime": true, // 已默认开启，不再需要
-  "customWebpack": true, // 已升级 Webpack 5，不再需要
-  "injectBabel": {}, // 请使用 polyfill
  "plugins": [
-    "build-plugin-fast-refresh", // 已默认开启，不再需要
-    "build-plugin-esbuild", // 通过 "minify": "esbuild" 开启
-    "build-plugin-webpack5" // 已默认开启，不再需要
  ]
}
```

详细说明请查阅 [工程配置](/docs/config/about)。

### 3. 运行时 API 升级

#### 核心 API

在 icejs 1.x 中已提示废弃的 API，在 2.0 版本中完全移除：

```diff
- import { useSearchParams } from 'ice';
+ import { getSearchParams } from 'ice';


- import { withSearchParams } from 'ice';
+ import { getSearchParams } from 'ice';


- import { createApp } from 'ice';
+ import { runApp } from 'ice';
```

#### 状态管理方案

在 1.x 中已提示废弃的用法，在 2.0 版本中完全移除：

- 不再支持自动初始化 store，推荐开发者按需求创建自己的 `store.[ts|js]`，[请按照文档进行升级](/guide/basic/store.md#不再自动初始化-store) 。
- Model 中使用 `reducers&effects` 替代 `actions: {}` 写法，[请按照文档进行升级](/guide/basic/store.md#model-中不再支持-actions--写法) 。
- 内置的 immer 从 6.x 升级到最新版本 9.x

#### 权限管理方案

2.0 中权限方案不再耦合状态管理，直接基于 React Context 实现，更加轻量，开发者端的 API 无任何变化。

#### 请求数据方案

将内置的 axios 版本从 `0.19.x` 升级到 `0.21.x`。

### 4. 工程依赖版本变化

框架内置的一些工程依赖也同时做了升级，理论上对于项目没有影响，可视具体情况来看：

```bash
webpack^4 -> 5
postcss^7.0.32 -> 8.0.0

css-loader ^3.2.0 -> 5.2.4
sass-loader ^10.0.0 -> 11.0.1
less-loader ^7.0.0 -> 8.1.1
postcss-loader^3.0.0 -> 5.2.0

mini-css-extract-plugin^1.0.0 -> 2.1.0
terser-webpack-plugin^2.3.1 -> 5.1.4
copy-webpack-plugin^5.0.4 -> 9.0.1
html-webpack-plugin^4.0.0 -> 5.3.1
```

### 5. 自定义插件迁移

如果对框架进行了深度定制，并且开发了自定义的插件，需要关注插件相关 API 的变化。

#### 内置规则名变更

```diff
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config
        // 规则名从 OptimizeCSSAssetsPlugin 变更为 CssMinimizerPlugin
        // 插件依赖从 optimize-css-assets-webpack-plugin 变更为 css-minimizer-webpack-plugin
-      .plugin('OptimizeCSSAssetsPlugin')
+      .plugin('CssMinimizerPlugin)
      .tap((opts) => opts);
  });
}
```

#### 工程 API 变化

```diff
module.exports = ({ applyMethod }) => {
  const templateDir = path.join(__dirname, '../src/types');
-  applyMethod('addTemplateDir', templateDir);
+  applyMethod('addPluginTemplate', templateDir);
}
```

#### 运行时 API 变化

框架运行时插件 API 变化如下：

```diff
export default ({
  // wrapperPageComponent 和 wrapperPageComponent 用法一致，明确了针对 pages 目录下组件的处理场景
-  wrapperRouteComponent
+  wrapperPageComponent,
-  createHistory,
-  getSearchParams,
+  applyRuntimeAPI,
}) => {
- const history = createHistory({...});
+ const history = applyRuntimeAPI('createHistory', {...})
- const params = getSearchParams();
+ const params = applyRuntimeAPI('getSearchParams');
};
```

## 从 ice-scripts 2.x 迁移

### 1. 修改 package.json 依赖

icejs 基于 build-scripts 内置了工程开发构建能力，不在需要单独依赖 ice-scripts，同时相关插件也进行了一次重构优化。

```diff
{
-  "ice-scripts": "^2.0.0",
-  "ice-plugin-fusion": "^0.1.4",
-  "ice-plugin-moment-locales": "^0.1.0",
+  "ice.js": "^1.0.0"
+  "build-plugin-fusion": "^0.1.0",
+  "build-plugin-moment-locales": "^0.1.0",
}
```

- [ice-scripts@2.x 插件列表](https://github.com/alibaba/ice/blob/stable/docs-backup/docs/guide-0.x/builder/plugin-list.md)
- [icejs 插件列表](/plugin/list/moment-locales.md)

### 2. 修改配置文件

icejs 提供 `build.json` 文件用于工程配置，因此需要将 `ice.config.js` 配置迁移到 `build.json` 中，具体如下:

假设你的 `ice.config.js` 配置如下：

```ts
const path = require('path');

module.exports = {
  entry: 'src/index.js',
  plugins: [
    [
      'ice-plugin-fusion',
      {
        themePackage: '@icedesign/theme',
      },
    ],
  ],
  chainWebpack: (config, { command }) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(require('jsx-control-statements'));
          return options;
        });
    });
  },
};
```

新建 `build.json` 文件：（icejs 默认入口文件为 `app.(js|ts)`，因此不需要单独配置 entry）

```json
{
  "plugins": [
    [
      "build-plugin-fusion",
      {
        "themePackage": "@icedesign/theme"
      }
    ],
    "./build.plugin.js"
  ]
}
```

然后新建 `build.plugin.js` 文件，将自定义的 chainWebpack 配置移到新建的 `build.plugin.js` 中:

```js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(require('jsx-control-statements'));
          return options;
        });
    });
  });
};
```

最后删除 `ice.config.js` 配置文件。

### 3. 修改应用入口文件

将原有应用入口为 `src/index.js` 需要修改为 `src/app.js`，具体修改如下：

假设你的 `src/index.js` 文件内容如下：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import './global.scss';
import router from './router';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(router(), ICE_CONTAINER);
```

新建 `src/app.js` 文件：

```ts
import { runApp } from 'ice';

const appConfig = {
  router: {
    type: 'browser', // 配置 browser 路由
  },
};

runApp(appConfig);
```

最后，删除 `src/index.js` 文件

### 4. 其他文件修改

icejs 规范和强约束了项目的目录结构，因此只需要按照规范就行编辑即可，不在需要额外的引用

- 删除 `src/router.jsx` 文件
- 移动 `src/config/routes.js` 路由配置至 `src/routes.js` 中
- 在 `.gitignore` 中新增 `.ice/` 目录
- 在根目录下新建 `tsconfig.json` 文件，[配置详见](https://github.com/ice-lab/icejs/blob/master/examples/basic-spa/tsconfig.json)
- 如果项目存在 `src/models/*`、`src/pages/*/model.js` 或者 `src/pages/*/models/*` 的目录文件，需要在 `build.json` 中配置 `store: false`
- 如果你的项目已经使用 icestore 且版本小于 1.0.0 版本，可以选择按需升级或者在 `build.json` 中配置 `store: false` 关闭内置的方案

## 从 ice-scripts 1.x 迁移

### 1. 修改 package.json 依赖

icejs 支持了 ice-scripts 工程开发构建能力，不在需要单独依赖 ice-scripts，修改为 ice.js 即可。

```diff
{
-  "ice-scripts": "^1.0.0",
+  "ice.js": "^1.0.0"
}
```

### 2. 修改配置文件

icejs 提供 `build.json` 文件用于工程配置，因此需要将 `.webpackrc.js` 配置迁移到 `build.json` 中，假设你的 `.webpackrc.js` 配置如下：

```js
module.exports = {
  entry: 'src/index.js',
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ],
};
```

新建 `build.json` 文件

```diff
{
+  "entry": "src/index.js"
}
```

然后新建 `build.plugin.js` 文件，将自定义的插件配置移到新建的 `build.plugin.js` 中：

```js
module.exports = ({  onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    ['scss'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            sourceMap: true
          }));
      }
  });
}
```

同时将自定义的插件引入到 `build.json` 中，最后删除 `.webpackrc.js` 配置文件。

```diff
{
  "entry": "src/index.js",
+ "plugins": [
+   "./build.plugin.js"
+ ]
}
```

### 3. 禁用运行时能力

由于 icejs 相比 ice-scripts 除了提供工程能力外，还提供了运行时扩展的能力，因此对于 ice-scripts 的项目提供了禁用运行时能力的功能，确保最小化的升级和只使用工程能力。

在 `build.json` 中配置 disableRuntime 选项即可：

```diff
{
  "entry": "src/index.js",
  "plugins": [
    "./build.plugin.js"
  ],
+ "disableRuntime": true
}
```

### 更新主题配置

如果你的 `package.json` 中存在 `buildConfig` 和 `themeConfig` 配置，则需要将该配置移置 `build.json` 文件中。

```json
"buildConfig": {
  "theme": "@icedesign/skin",
  "localization": false
},
"themeConfig": {
  "primaryColor": "#908ce1"
},
```

更新后的 `build.json` 如下：

```diff
{
  "entry": "src/index.js",
  "plugins": [
+   [
+     "build-plugin-fusion", {
+       "themePackage": "@icedesign/skin",
+       "themeConfig": {
+         "primaryColor": "#908ce1"
+       }
+     }
+   ],
    "./build.plugin.js"
  ],
  "disableRuntime": true
}
```

### 更新 proxyConfig

如果你的 `package.json` 中存在 `proxyConfig` 配置，则需要将该配置移置 `build.json` 文件中，并将 `proxyConfig` 更新为 `proxy` 。

```json
"proxyConfig": {
  "/api/**": {
    "enable": true,
    "target": "pre-faraday.alibaba-inc.com"
  }
}
```

更新后的 build.json 项如下。

```diff
{
  "entry": "src/index.js",
  "plugins": [
    [
      "build-plugin-fusion", {
        "themePackage": "@icedesign/skin",
        "themeConfig": {
          "primaryColor": "#908ce1"
        }
      }
    ],
    "./build.plugin.js"
  ],
  "disableRuntime": true,
+ "proxy": {
+   "/api/**": {
+     "enable": true,
+     "target": "pre-faraday.alibaba-inc.com"
+   }
  }
}
```

### 更新 scripts 脚本

最后将 `package.json` 中启动项目的脚本替换如下：

```diff
"scripts": {
-   "start": "ice dev",
+   "start": "icejs start",
-   "build": "ice build",
+   "build": "icejs build"
}
```

通过以上步骤即可基于 `ice-scripts@1.x` 升级到 `ice.js`，如果还存在其他配置或者升级失败，可以通过飞冰社区群与我们联系。
