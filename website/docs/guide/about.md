---
title: 关于飞冰
order: 1
---

<img style={{
  height: 200,
  width: "100%",
  objectFit: "cover"
}} src="https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg" />

<br />
<br />

飞冰是一个基于 React 的研发解决方案，围绕应用研发框架 icejs 提供基础的构建、路由、调试等基础能力以及微前端、一体化等领域能力，同时结合可视化操作、物料复用等方案降低研发门槛。

## 特性 🎉

- 🦧 同时支持 Vite & Webpack 模式，业务可以按需选择
- 🐒 开箱即用的工程能力：TypeScript/Webpack5/Vite/样式方案/Mock/...
- 🦊 贴合业务的最佳实践：目录规范、代码规范、路由方案、状态管理、数据请求等
- 🐯 多种应用模式：支持 SPA、MPA，同时支持服务端渲染 SSR 以及静态构建 SSG
- 🐦 强大的插件能力：官方所有能力都通过插件实现，业务可以通过插件扩展各种能力
- 🐘 丰富的领域方案：微前端解决方案 icestark、一体化方案、React Hooks 解决方案 ahooks、表单方案 Formily 等

在框架基础上，也可以搭配 VS Code 插件 [AppWorks](https://vsmarketplacebadge.apphb.com/version-short/iceworks-team.iceworks.svg?logo=visual-studio-code) 享受到更多功能：

- 通过大量的官方模板（fusion/antd）可视化创建项目，[查看官方物料](https://appworks.site/materialCenter/fusion.html)
- 基于 VS Code 插件可视化的调试、管理依赖、拼装区块等，[查看文档](https://appworks.site)
- 业务可以根据规范定制自己的物料体系（含项目模板），[查看物料开发文档](https://appworks.site/materials/about.html)
- ……

## 常见问题 📝

### 与直接使用 Vite/Webpack 相比，使用 icejs 有什么优势？

Vite/Webpack 只提供了基础的工程能力，icejs 在此基础上扩展了很多能力：

- 默认集成好的工程能力，无需再手动配置一遍
- 不止是工程配置，更有面向业务领域的最佳实践，比如路由配置、目录组织、状态管理等
- 让很多业务接入成本高的能力可以开箱即用，比如 SSR/SSG、微前端、一体化，基于原始的 Webpack 建设这些能力需要付出很高成本
- 通过插件化让以上这些能力可以被扩展以及跨项目复用，尽可能保证不同项目的一致性

### icejs 与 Next.js、UmiJS 之类的框架有什么区别？

icejs、Next.js、UmiJS 都是同一个层面的解决方案，不同方案都有各自的优劣以及设计哲学。除了常规的路由、状态管理、SSR、国际化这些有些许差异的能力以外，icejs 目前是第一个支持 Vite 模式的 React 应用研发框架，对于想要使用 Vite 的 React 开发者来说值得尝试。

### 使用飞冰是否需要具备一定的前端基础？

毫无疑问是需要的，我们在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础语法、前后端如何通信等。为了便于快速入门前端知识，我们整理了一份 [前端基础知识](/resource/front-basic.md)，希望能帮助到开发者。

### 资深前端同学是否适合使用飞冰？

适合，面向前端场景飞冰团队有大量的最佳实践，无论是工程、规范、状态管理还是微前端都可以开箱即用。

### 飞冰的浏览器兼容策略是怎样的？

飞冰官方 React 物料默认使用 React 16+，其需要的最低 IE 版本为 11，如果您需要在以下的版本使用，您可能需要引入一些 polyfill 来支持 `Map`, `Set` 等特性。参考[React 官网说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html#javascript-environment-requirements)。

### 飞冰可以使用哪些 UI 组件？

飞冰的框架和工具都不耦合 UI 组件，因此开发者可以选择任意的 React UI 组件使用，比如：

- [使用 fusion 组件](/plugin/list/fusion.md)
- [使用 antd 组件](/plugin/list/antd.md)

### 飞冰跟低代码方案有什么关系？

低代码方案一般指以可视化拖拽搭建为主，少量地方使用代码辅助，此类方案往往是面向具体领域而非通用场景的，飞冰是面向通用领域的，以源码研发为主，通过框架、物料、GUI 操作等能力降低研发门槛，因此飞冰并不是通俗意义的低代码方案。

## 联系我们 🧼

- 反馈/建议：<https://github.com/alibaba/ice/issues/new>
- 答疑钉钉群：

**阿里内部同学请搜索「飞冰（ICE）万能群」，社区同学请扫以下二维码**<br />
**阿里内部同学请搜索「飞冰（ICE）万能群」，社区同学请扫以下二维码**<br />
**阿里内部同学请搜索「飞冰（ICE）万能群」，社区同学请扫以下二维码**<br />

  <img src="http://ice.alicdn.com/assets/images/qrcode.png" width="300" />
