---
title: dev-inspector
order: 12
---

import Support from '../../../src/components/Support'

<Support list={['webpack']} />

在本地调试时，快速定位页面上的组件所在的源码的位置。

## Install

```bash
$ npm i --save-dev build-plugin-dev-inspector
```

## Usage

在 build.json 中引入插件：

```json
{
  "plugins": ["build-plugin-dev-inspector"]
}
```

完成上述配置后，则在本地调试的环境下，把鼠标 hover 到想要调试的元素，就会显示出遮罩框；再点击一下，会自动在编辑器中跳转到对应的文件中，并且跳转到对应的行和列。

详见：[https://www.npmjs.com/package/build-plugin-dev-inspector](https://www.npmjs.com/package/build-plugin-dev-inspector)
