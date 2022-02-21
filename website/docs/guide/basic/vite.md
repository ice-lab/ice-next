---
title: Vite 模式
order: 4
---

import Support from '../../../src/components/Support'
import Badge from '../../../src/components/Badge'

<Badge text="2.0.0" />

[Vite](https://vitejs.dev/) 是一种新型的前端构建工具，与 Webpack 相比，Vite 基于浏览器原生的 ES Module 规范能够让调试服务以及热更新更快，提升开发者体验。icejs 2.0 版本开始同时支持 Webpack@5 以及 Vite@2 两种模式，开发者按需选择，对于增量业务我们更推荐采用 Vite 的构建模式。

## 快速体验

除 Fusion Design Pro 以外，其他官方脚手架均已经默认切换到 Vite 模式，按照 [快速开始](/guide/start.md) 直接使用即可：

```bash
$ npm init ice <projectName>
# or
$ yarn create ice <projectName>
```

## 开启 Vite 模式

在 build.json 中进行以下配置启用 Vite 模式：

```json
{
  "vite": true
}
```

## 功能完备度

icejs 提供了非常完备的功能，目前部分能力尚未支持 Vite 模式，具体请参阅以下表格：

|  功能点         |   支持度   |
|----------------|---------------------|
| Severless 一体化| <Support list={['webpack', 'vite']} />
| 微前端          | <Support list={['webpack', 'vite']} />
| SSR&SSG        | <Support list={['webpack']} />
| SPA        | <Support list={['webpack', 'vite']} />
| MPA        | <Support list={['webpack', 'vite']} />

## 常见问题

### 本地开发正常，线上环境报错 `require is not defined`

![](https://img.alicdn.com/imgextra/i1/O1CN01sG8QCA1z4KWtajo8e_!!6000000006660-2-tps-426-48.png)

这种情况一般是因为使用了不规范的 npm 包：一个文件里混用了 ESM(import) 和 CJS(equire)，这种情况需要对应的 npm 包进行规范化修改。通过以下方式可以快速排查出是哪个 npm 包导致的：

1. 在 `build.json` 中添加 `minify: false` 选项禁止构建时压缩
2. 执行 `npm run build` 进行构建
3. 通过任意 http-server 预览产物：

```bash
$ cd ice-demo/
$ npm i -g http-server # 一个简易的 http-server
$ http-server ./build
```

启动后通过浏览器访问页面，根据报错位置的代码定位是哪个 npm 包引起的，然后推进对应的包做修改。

### 在线上页面环境中如何代理调试本地 dev 资源？

在一些特殊场景下，比如因为本地服务端环境不稳定或者只有线上页面才能复现的问题，我们通常希望在线上页面环境可以调试本地 start 的资源，在原先的 Webpack 模式我们只需要借助 Chrome 插件（山海关/XSwitch）将页面里的线上资源（js/css）代理到本地 `//127.0.0.1:3333/js/index.js` 即可，但是 Vite 模式下 build 产物和 start 产物差异非常大，因此无法通过该方式实现。在 Vite 模式下，我们推荐在服务端同时维护一份 dev 的 html 结构，当 url 里包含特殊的 query 时则渲染该 html 内容方便前端调试，html 内容如下：

```html
<!DOCTYPE html><html>
<head>
  <script type="module" src="http://localhost:3333/@vite/client"></script>
  <script type="module">
    import RefreshRuntime from "http://localhost:3333/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
  <meta name="viewport" content="width=device-width">
</head>
<body>
  <div id="ice-container"></div>
  <script type="module" src="http://localhost:3333/src/app"></script>
</body></html>
```

当服务端返回这份 HTML 内容时，就会加载本地的 dev 资源，同时使用线上的接口数据。

### 如何兼容 Webpack 构建模式下 inline loader 的导入

代码中存在 inline loader 的语法，在 Vite 构建模式下将会失效：

```js
import Styles from '!style-loader!css-loader?modules!./styles.css';
```

移除 inline loader 写法，大部分需求可以被内置的工程能力处理，定制 loader 能力推荐结合 Vite 插件的 [transform](https://vitejs.dev/guide/api-plugin.html#transforming-custom-file-types) 进行处理。

