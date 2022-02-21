---
title: esbuild（已废弃）
order: 16
---

:::caution

icejs 2.0 已废弃，推荐通过配置 **"minify": "esbuild"** 开启

:::

使用 [`esbuild`](https://github.com/evanw/esbuild) 进行代码压缩，显著提升代码压缩速度。

## Install

```bash
$ npm i --save-dev build-plugin-esbuild
```

## Usage

```diff
{
  "plugins": [
+    "build-plugin-esbuild"
  ]
}
```
