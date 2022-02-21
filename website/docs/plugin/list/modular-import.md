---
title: modular-import（不推荐）
order: 12
---

import Support from '../../../src/components/Support'

<Support list={['webpack']} />

> 不推荐使用，直接使用 Webpack/Vite 提供的 tree-shaking 能力即可

用于快捷增加 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置。

## Install

```bash
$ npm i --save-dev build-plugin-modular-import
```

## Usage

```json
{
  "plugins": [
    [
      "build-plugin-modular-import",
      [
        {
          "libraryName": "lodash",
          "libraryDirectory": "",
          "camel2DashComponentName": false
        }
      ]
    ]
  ]
}
```
