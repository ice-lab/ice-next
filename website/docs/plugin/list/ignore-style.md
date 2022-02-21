---
title: ignore-style
order: 3
---

import Support from '../../../src/components/Support'

<Support list={['webpack', 'vite']} />

对于基础组件依赖如 `@alifd/next`、`antd` 等，在对组件样式引入的时候，推荐直接以全量样式的方式引入，不推荐使用 babel-plugin-import 之类的方案做按需引入。因为使用按需引入后会带来新的副作用，同时在中大型项目中按需带来的样式体积优化非常微弱，[详细讨论](https://github.com/alibaba/ice/issues/4703)。

无论是飞冰旧的业务组件脚手架还是社区的一些业务组件（如 @ant-design/pro-layout），都会出现将具体组件的 `style.js` 单独引入：

```js
// @ant-design/pro-layout/es/components/PageLoading/index.js
import "antd/es/spin/style";

// @icedesign/container/es/style.js
import '@alifd/next/es/loading/style.js';
import './main.scss';
```

在使用了上述 NPM 包之后，如果项目里是全量引入的基础组件样式，则会出现样式的重复引入重复大包等问题，影响构建速度，因此我们开发了 `build-plugin-ignore-style` 插件用来忽略类似的引入。使用该插件之后代码中类似 `import "antd/es/spin/style";` 的语句将会被构建工具忽略。

## Install

```bash
$ npm install build-plugin-ignore-style --save-dev
```

## Usage

在 build.json 中引入插件：

```json
{
  "plugins": [
    [
      "build-plugin-ignore-style",
      {
        "libraryName": "antd"
      }
    ]
  ]
}
```

如果希望同时忽略多个依赖包的样式引入，可以通过如下方式配置：

```json
{
  "plugins": ["build-plugin-ignore-style", [
    {
      "libraryName": "@alifd/next"
    },
    {
      "libraryName": "antd"
    }
  ]]
}
```
