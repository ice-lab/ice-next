---
title: antd
order: 3
---

import Support from '../../../src/components/Support'

<Support list={['webpack', 'vite']} />

本文主要介绍在 icejs 项目中如何正确的引入 antd 组件。

## 使用 antd 组件

关于 antd 组件按需引入的说明：

- 脚本代码按需引入：不推荐使用 babel-plugin-import，社区主流工具 Webpack/Vite 等都已支持 tree-shaking，构建时默认都会做按需的引入。
- 样式代码按需引入：结合社区讨论 [issue](https://github.com/ant-design/ant-design/issues/16600#issuecomment-492572520)，大多数场景下样式按需引入并无太大意义，反而会引入其他工程问题，因此推荐组件样式在项目级全量引入。

综合上述观点，我们不再推荐项目中使用 babel-plugin-import 做脚本按需引入以及样式自动&按需引入，而推荐全量引入组件样式 + 通过内置的 tree-shaking 进行脚本按需打包。

### 不需要定制组件主题

在 `src/global.css` 中引入 antd 的全量 CSS 文件：

``` diff
+ @import 'antd/dist/antd.css';

body {}
```

> 如果有用到 `@ant-design/pro-layout` 之类的 NPM 包，内部可能有一些不合理的语法导致样式重复引入影响构建速度，请结合 [build-plugin-ignore-style](/plugin/list/ignore-style.md) 解决该问题

### 需要定制组件主题

在 `build.json` 中添加插件并通过 `themeConfig` 配置主题变量：

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "disableModularImport": true,
      "themeConfig": {
        "primary-color": "#f40"
      }
    }]
  ]
}
```

在 `src/global.less` 中全量引入 antd Less 文件：

``` diff
+ @import 'antd/dist/antd.less';

body {}
```

### 按需引入组件样式（不推荐）

在 `build.json` 中添加插件并通过 `themeConfig` 配置主题变量：

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "primary-color": "#f40"
      }
    }]
  ]
}
```

## 插件介绍

### Install

```bash
$ npm install build-plugin-antd --save-dev
```

### Options

- themeConfig: 设置 Less 变量
- disableModularImport: 禁用 antd 默认的 babel-plugin-import 能力
- importOptions: 同 `babel-plugin-import` 按需加载配置，默认参数 `{  'libraryName': 'antd',libraryDirectory: 'es', style: true}`，根据用户设置进行合并

### Usage

```json
{
  "plugins": [
    [
      "build-plugin-antd",
      {
        "disableModularImport": true,
        "themeConfig": {
          "primary-color": "#1DA57A"
        }
      }
    ]
  ]
}
```
