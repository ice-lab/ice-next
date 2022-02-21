---
title: Webpack 5（已废弃）
order: 14
---

:::caution

icejs 2.0 已废弃，已内置 Webpack 5

:::

用于 icejs 1.x 在使用 Webpack 5 能力上的兼容处理

## Install

```bash
$ npm i --save-dev build-plugin-webpack5 webpack
```

## Usage

`build.json` 修改如下：

```diff
{
+  "customWebpack": true,
  "plugins": [
+    "build-plugin-webpack5"
  ]
}
```

### 配置 Module Federation

在上述开启 Webpack 5 能力的基础上，通过配置 moduleFederation 可以配置 Module Federation 相关参数：

```json
{
  "customWebpack": true,
  "moduleFederation": {
    "remotes": ["remote"],
    "shared": ["react", "react-dom"]
  },
  "plugins": ["build-plugin-webpack5"]
}
```
