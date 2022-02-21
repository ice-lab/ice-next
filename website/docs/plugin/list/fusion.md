---
title: fusion
order: 2
---

import Support from '../../../src/components/Support'

<Support list={['webpack', 'vite']} />

本文主要介绍在 icejs 项目中如何正确的引入 fusion 组件即 `@alifd/next`。

## 使用 fusion 组件

关于 fusion 组件按需引入的说明：

- 脚本代码按需引入：不推荐使用 babel-plugin-import，社区主流工具 Webpack/Vite 等都已支持 tree-shaking，构建时默认都会做按需的引入。
- 样式代码按需引入：结合社区讨论 [issue](https://github.com/ant-design/ant-design/issues/16600#issuecomment-492572520)，大多数场景下样式按需引入并无太大意义，反而会引入其他工程问题，因此推荐组件样式在项目级全量引入。

综合上述观点，我们不再推荐项目中使用 babel-plugin-import 做脚本按需引入以及样式自动&按需引入，而推荐全量引入组件样式 + 通过内置的 tree-shaking 进行脚本按需打包。

### 不需要定制组件主题

在 `src/global.css` 中引入对应主题包的全量 CSS：

```css
@import '@alifd/next/dist/next.var.css';

body {
  -webkit-font-smoothing: antialiased;
}
```

> 如果有用到 `@icedesign/container` 之类的 NPM 包，内部可能有一些不合理的语法导致样式重复引入影响构建速度，请结合 [build-plugin-ignore-style](/plugin/list/ignore-style.md) 解决该问题。

### 使用 CSS Vars 定制主题

fusion 组件通过 [fusion.design](https://fusion.design/) 在线配置主题包，配置完成后会产生一个 npm 包，这里以 `@alifd/theme-design-pro` 这个主题包为例，首先通过 npm 安装主题包依赖：

```bash
$ npm i --save @alifd/theme-design-pro
```

接下来在 `src/global.css` 中引入对应主题包的全量 CSS：

```css
@import '@alifd/theme-design-pro/variables.css';
@import '@alifd/theme-design-pro/dist/next.var.css';

body {
  -webkit-font-smoothing: antialiased;
}
```

### 使用 Sass 变量定制主题（不推荐）

比如需要自定义 css-prefix 的场景，通过 CSS Vars 目前无法实现，此时推荐使用 Sass 方式定制。

在 build.json 中引入插件：

```json
{
  "plugins": [
    [
      "build-plugin-fusion", {
        "disableModularImport": true,
        "themePackage": "@alifd/theme-design-pro",
        "themeConfig": {
          "css-prefix": "next-icestark-"
        }
      },
    ]
  ]
}
```

在 `src/global.css` 中引入组件全量的 sass:

```css
@import '@alifd/next/index.scss';

body {}
```

### 按需引入组件样式（不推荐）

在 `build.json` 中添加插件：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": "@alifd/theme-design-pro"
    }]
  ]
}
```

## 插件介绍

### Install

```bash
$ npm install build-plugin-fusion --save-dev
```

在 build.json 中引入插件：

```json
{
  "plugins": [
    [
      "build-plugin-fusion",
      {
        // ...options
      }
    ]
  ]
}
```

### Options

- `themePackage` Fusion 组件主题包配置，如果设置为数组则启动多主题能力
- `themeConfig` 主题配置，通过设置 sass 变量对现有主题进行覆盖
- `uniteBaseComponent` 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码
- `importOptions` 同 `babel-plugin-import` 参数，默认为 `{ style: true, libraryDirectory: 'es'}` 根据用户设置项将进行合并
- `externalNext` 配合 `externals` 配置，将 Next 组件作为外部依赖引入
- `usePx2Vw` 配合 postcss 插件，将 css 样式单位 px 转化为 vw ，默认为 false 不开启， true 为开启
- `px2vwOptions` 传递参数给 postcss 插件，默认为`{ viewportWidth: 750 }` 根据用户设置项将进行合并
- `componentOptions` 值为对象，修改业务组件的引入路径，推荐用在 PC 跨 H5 的项目中，给业务组件指定 H5 的渲染组件
- `enableColorNames` 默认为 `false`，如果开启默认将提取 `transparent`、`red`、`blue` 等色值名称
- `themeConfig.nextPrefix` 仅修改 `@alifd/next` 里的 css-prefix，一般用于 0.x&1.x 共存的场景
- `cssVariable` 默认为 `false`，如果开启后将默认使用 css variables 的样式方案替换 sass 方案
- `disableModularImport` 禁用 `babel-plugin-import` 按需加载能力，推荐引入全量样式，JS 将在压缩阶段通过 `tree-shaking` 移除未使用组件

### 常见场景

#### 通过主题包定制组件样式

ICE 脚手架中默认使用了 `@alifd/theme-design-pro` 这个主题包，如果不能满足需求则可以让设计师配置业务需要的主题包：[配置组件主题样式](https://fusion.design/help.html#/design-config-component) ，每个主题包对应一个 npm 包。

在 `build.json` 中配置主题包：

```diff
{
  "plugins": [
    ["build-plugin-fusion", {
+      "themePackage": "@alifd/theme-design-pro"
    }]
  ]
}
```

在配置主题包时，可以通过 iconfont 导入一些自定义的 icon，这些 icon 在项目代码里通过基础组件 Icon 即可使用：

```jsx
import { Icon } from '@alifd/next';

<Icon type="xxxx" />;
```

#### 业务代码支持主题切换

在项目中也可以使用主题包的变量，这样未来如果需要更换主题，业务代码就不需要做任何改动了，可以使用的变量列表请参考 [Fusion Design Tokens](https://fusion.design/component/tokens)，使用方式如下：

```scss
// 引入主题变量
@import '~@alifd/next/lib/core/index.scss';

// 使用主题变量
.title {
  color: $color-brand1-6;
}
```

#### 配置 externals

项目开发中希望将 `@alifd/next` 作为外部扩展不打包到 bundle 中，除了需要配置 `externals` 外，还需要将通过插件能力分析业务组件依赖中按需加载的 Next 组件：

```json
{
  "externals": {
    "@alifd/next": "Next"
  },
  "plugins": [
    [
      "build-plugin-fusion",
      {
        "externalNext": true
      }
    ]
  ]
}
```

#### 修改 prefix

fusion 组件的默认 class 前缀是 `next-`，在微前端等场景下可能需要修改 prefix：

```json
{
  "plugins": [
    [
      "build-plugin-fusion",
      {
        "themePackage": "@alifd/theme-design-pro",
        "themeConfig": {
          "css-prefix": "next-icestark-"
        }
      }
    ]
  ]
}
```

上面只是修改了 CSS 产物里的 prefix，同时还需要修改 js 里的 prefix 才能保证最终的一致性：

```diff
import { runApp } from 'ice'
+import { ConfigProvider } from '@alifd/next';

const appConfig = {
  app: {
+    addProvider: ({ children }) => (
+      <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>
+    ),
  },
  },
};

runApp(appConfig);
```

#### 动态切换主题

> Vite 模式下不支持

build-plugin-fusion 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：

1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 window 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```json
{
  "plugins": [
    [
      "build-plugin-fusion",
      {
        "themePackage": [
          {
            "name": "@alifd/theme-design-pro",
            "default": true,
            "themeConfig": {
              "custom-color": "#000"
            }
          },
          {
            "name": "@alifd/theme-ice-purple",
            "themeConfig": {
              "custom-color": "#fff"
            }
          }
        ]
      }
    ]
  ]
}
```

通过数组的方式配置多个主题，实现多主题内容的注入。
build.json 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```

#### 使用 css variables 样式

在 `build.json` 中开启 `cssVariable` 配置：

```diff
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": "@alifd/theme-2",
+     "cssVariable": true
    }]
  ]
}
```

开启后 css 样式中用可以使用如下 css variables 变量：

```css
.color {
  color: var(--color-brand1-6);
}
```

使用须知：
如果开启 `cssVariable` 主题包需要为新版主题包，即需要包含 variable.css 文件（文件内定义 css variables 变量）。不符合要求的主题包，在 fusion 官网生成最新版本主题包即可。

> 该属性在 build-plugin-fusion 0.1.14 版本以上开始支持

#### 跨端用法

##### API

- 增加 `componentOptions` API，该接口值为对象，可接受 `bizComponent` `customPath` `componentMap` 等参数
- 增加 `usePx2Vw` API，跨端模式下请开启

```js
module.exports = {
  plugins: [
    [
      'build-plugin-fusion',
      {
        usePx2Vw: true, // 开启r?px => vw 的单位转换
        importOptions: {
          libraryDirectory: 'lib',
          customName: (name) => {
            // 自定义「基础组件」的 H5 的引入路径，注意对 @alifd/next 的版本要求
            if (['config-provider'].indexOf(name) !== -1) {
              return `@alifd/next/lib/${name}`;
            }
            return `@alifd/next/lib/${name}/mobile`; // mobile 是在 1.21.7-alpha 版本开始支持的
          },
          customStyleName: (name) => {
            // 引入没有Mobile版本的PC组件的样式
            return `@alifd/next/lib/${name}/style.js`;
          },
        },
        componentOptions: {
          // 自定义「业务组件」的H5的引入路径
          bizComponent: ['@alifd/anchor', '@alifd/pro-components'], // 业务组件列表
          customPath: '/es/mobile', // 默认值为''
          componentMap: {
            '@alifd/pro-components2': '@alifd/pro-components2-mobile',
          },
        },
      },
    ],
  ],
};
```

##### componentOptions 详解

用来自定义业务组件的引用路径及入口

##### bizComponent 需要自定义路径的组件

类型为数组，与 `customPath` 共同作用生效
bizComponent: ['@alifd/anchor', '@alifd/pro-components']
customPath: '/es/mobile'

```js
import Anchor from '@alifd/anchor';
ReactDOM.render(<Anchor>xxxx</Anchor>);
      ↓ ↓ ↓ ↓ ↓ ↓
var _anchor = require('@alifd/anchor/es/mobile');   // 差别在这里 多了一层 es 和 mobile
ReactDOM.render(<_anchor>xxxx</_anchor>);
```

##### customPath 自定义的路径

结合 `bizComponent` 一起生效，用法参考 `bizComponent` 文档。

##### componentMap 组件路径映射

类型为对象，表示路径映射的 mapping ，若与 `bizComponent` 冲突，则以 `componentMap` 为优先

```js
componentMap: {
  '@alifd/pro-components': '@alifd/pro-components/lib/mobile',
  '@alifd/pro-components2': '@alifd/pro-components2/es/mobile',
  '@alifd/pro-components': '@alifd/pro-components-mobile'
}
```
