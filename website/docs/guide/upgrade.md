---
title: 从 Rax 升级
order: 20
---

## 为什么要升级？

* 技术先进性与可发展性：从投入度到社区规模来看，React 的持续发展性优于 Rax，React 能带来更多先进性的能力，比如通过 Concurrent Mode 提升页面性能，通过升级到 React 可以带来更多的技术可能性以及保持技术的先进性。

* 生态的繁荣度：社区生态 React 显著优于 Rax，切换到 React 之后开发者可以享受到更多的 React 生态，部分复杂场景（富文本、脑图等）可以大幅度降低业务的自建成本。

* 技术可行性：容器/引擎从前端适配到遵循 Web 标准的思路转变，不再需要 Driver 驱动多端的模式，Rax 诞生所解决的原始问题不存在了，前端框架无论是 React 还是 Rax 都可以无缝使用。

## 如何升级

Ice 3 提供了 [rax-compat](https://github.com/ice-lab/ice-next/tree/master/packages/rax-compat) 以支持 [Rax](https://github.com/alibaba/rax) 到 React 运行时的切换。

rax-compat 通过对 React 的能力的封装，在内部抹平了 Rax 与 React 使用上的一些差异，同时导出了与 Rax 一致的 API 等能力，通过 alias 来将源码中的 rax 用 rax-compat 来替换，即可桥接上 React 的运行时能力。

## 使用与安装

用户可以直接通过插件 [@ice/plugin-rax-compat](https://www.npmjs.com/package/@ice/plugin-rax-compat) 来完成在 ICE 3 中运行 Rax DSL。

```bash
npm i @ice/plugin-rax-compat
```

```js
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  plugins: [ compatRax() ],
});
```
