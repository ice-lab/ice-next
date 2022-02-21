---
title: 工程配置
order: 4
---

icejs 基于 build-scripts，因此工程使用方式与 build-scripts 完全一致。

## 开发调试

默认情况下，项目的 package.json 会配置以下命令：

```json
{
  "scripts": {
    "start": "icejs start",
    "build": "icejs build"
  }
}
```

执行 `npm start` 即可进行项目开发，正常情况下执行命令后自动打开浏览器 `http://localhost:3333` 进行页面预览，修改源码后浏览器会自动刷新页面。执行 `npm run build` 进行项目构建，构建产物默认输出到 `./build` 目录下。

## 命令行介绍

icejs 提供了 start/build 两个核心命令供开发者使用。

> 在使用 `npm run start` 命令时，如需传入参数请按照这个格式 `npm run start -- --https`

### start

```bash
$ icejs start --help

Usage: icejs start [options]

Options:
  --port <port>          服务端口号
  --host <host>          服务主机名
  --config <config>      指定配置文件
  --https                支持开启 https
  --analyzer             支持开启构建分析
  --analyzer-port <port> 支持定制构建分析端口
  --disable-reload       禁用热更新模块
  --disable-mock         禁用 mock 服务
  --disable-open         禁止浏览器默认打开行为
  --disable-assets       禁止 Webpack assets 的输出
  --force                移除构建缓存
```

### build

```bash
$ icejs build --help

Usage: icejs build [options]

Options:
  --analyzer             同 start
  --analyzer-port <port> 同 start
  --config <config>      同 start
  --force                同 start
```

## 工程构建配置

工程构建相关的配置默认都收敛在项目根目录的 `build.json`  文件中，配置方式：

```json
{
  "alias": {},
  "publicPath": ""
}
```

当下支持的基础配置项请参考文档：[配置](/config/about.md)。

如果希望使用 JS 类型的配置文件，则需要在 npm scripts 中指定配置文件：

```json
{
  "scripts": {
    "start": "icejs start --config build.config.js",
    "build": "icejs build --config build.config.js"
  }
}
```

`build.config.js` 中通过 JS 模块的方式指定配置：

```js
module.exports = {
  define: {
    env: process.env.NODE_ENV,
  },
  plugins: [
    'build-plugin-moment-locales',
    (api) => {
      api.onGetWebpackConfig((config) => {
        config.entry('src/index.js');
      });
    },
  ],
};
```

> 同时也支持 `build.config.ts`

## 进阶配置

### 根据环境区分工程配置

参考 [区分不同环境](/guide/basic/config.md)。

### 如何开启新的 JSX 转换

ice.js 1.16.0+ 支持 [New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)，开启该能力之后，编写 React 组件时不再需要在头部引入 `React`。

只需要修改 `tsconfig.json` 中的 `compilerOptions.jsx` 即可：

```diff
{
  "compilerOptions": {
-    "jsx": "react",
+    "jsx": "react-jsx",
  }
}
```

接下来书写组件就不再需要引入 React 了：

```diff
- import React from 'react';

function Example() {
  return <>Hello</>;
}
```

## 自定义工程配置

如果基础配置和已有插件都无法支持业务需求，可以通过自定义配置来实现，自定义配置同时也是一个 Webpack 插件。

首先新建 `build.plugin.js` 并在 `build.json` 中引入：

```json
{
  "plugins": ["build-plugin-ice-app", "./build.plugin.js"]
}
```

`build.plugin.js` 内容如下：

```js
module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {});
};
```

插件内部代码写法可以参考文档 [插件开发-定制工程能力](/plugin/develop/build.md)。

## 调试

在某些情况下可能遇到配置没有生效，或者配置不符合预期，这时候我们可以通过下面的命令进行调试，查看最终的 Webpack 配置是否符合预期。

```bash
# 调试开发环境
$ DEBUG=icejs npm start

# 调试构建环境
$ DEBUG=icejs npm run build

# 调试构建环境
$ DEBUG=icejs npm run test
```
