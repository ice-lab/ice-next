---
title: moment-locales
order: 1
---

import Support from '../../../src/components/Support'

<Support list={['webpack', 'vite']} />

`build-plugin-moment-locales` 将对 moment 依赖的使用进行优化：

- 优化 moment 语言包加载
- 根据设置自动加载对应语言包

## Install

```bash
$ npm i --save-dev build-plugin-moment-locales
```

## Options

- `locales`：类型 `String | Array`，需要加载的多语言包

## Usage

```json
{
  "plugins": [
    [
      "build-plugin-moment-locales",
      {
        "locales": ["zh-cn", "en-au"]
      }
    ]
  ]
}
```
