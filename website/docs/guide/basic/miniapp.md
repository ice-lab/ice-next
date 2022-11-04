---
title: 小程序开发
order: 16
---

ice.js 支持小程序开发。由于小程序端大部分能力及配置均与 Web 应用对齐，本文仅介绍小程序快速开始、与 Web 应用的差异点以及小程序独有能力的使用。

:::tip

当你准备开发小程序时，请务必提前阅读本篇文档。

:::

## 快速开始

参考[快速开始-创建应用](/docs/guide/start)并安装依赖后，在 `package.json` 中配置以下 scripts 命令：

```json
  "scripts": {
    "start": "ice start",
    "start:wechat": "ice start --platform wechat-miniprogram",
    "start:ali": "ice start --platform ali-miniapp",
    "build": "ice build",
    "build:wechat": "ice build --platform wechat-miniprogram",
    "build:ali": "ice start --platform ali-miniapp"
  }
```

当需要开发小程序时，执行对应的命令即可。例如，需要开发调试微信小程序时，执行

```shell
npm run start:wechat
```

需要构建微信小程序生产环境的产物时，执行

```shell
npm run build:wechat
```

可以看到，相比开发 Web 应用，开发小程序的命令需要传递 `platform` 参数，目前 ice.js 支持开发的小程序平台及其 `platform` 名称如下：



## 小程序不支持的能力

- [定制 HTML](/docs/guide/basic/document)

## 小程序差异化能力

## 应用入口

小程序不支持应用入口配置中的 router、basename 配置项，其他能力使用可参考[应用入口](/guide/basic/app)。

### 路由

小程序不支持[布局组件](/docs/guide/basic/router#布局组件)、[动态路由](/docs/guide/basic/router#动态路由)，其他能力使用可参考[路由](/docs/guide/basic/router)章节。
