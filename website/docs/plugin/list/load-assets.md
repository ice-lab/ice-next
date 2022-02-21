---
title: load-assets（不推荐）
order: 12
---

import Support from '../../../src/components/Support'

<Support list={['webpack']} />

:::caution

因侵入源码不推荐使用，建议直接修改 public/index.html

:::

插件提供自动加载 assets 资源能力：

- 页面渲染前将自动加载配置的 assets 资源，资源类型包括 js 和 css
- 根据不同的执行命令，加载不同的 assets 资源

## Install

```bash
$ npm i --save-dev build-plugin-load-assets
```

## Usage

start 命令和 build 命令 加载相同 assets 资源

```json
{
  "plugins": [
    [
      "build-plugin-load-assets",
      {
        "assets": ["https://unpkg.com/lodash@4.17.11/index.js", "https://url/global.css"]
      }
    ]
  ]
}
```

### 配合 externals

配合 external 自动加载 react, react-dom 的资源

```json
{
  "externals": {
    "react": "window.React",
    "react-dom": "window.ReactDOM"
  },
  "plugins": [
    [
      "build-plugin-load-assets",
      {
        "assets": {
          "start": [
            "https://unpkg.com/react@16.7.0/umd/react.development.js",
            "https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js"
          ],
          "build": [
            "https://unpkg.com/react@16.7.0/umd/react.production.min.js",
            "https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js"
          ]
        }
      }
    ]
  ]
}
```
