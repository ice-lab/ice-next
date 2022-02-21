---
title: keep-alive
order: 7
---

import Support from '../../../src/components/Support'

<Support list={['webpack']} />

让开发者快捷开启 SPA 下基于路由级别的 Keep Alive 能力。

> ice.js@1.15.0 以上版本开始支持

## Install

```bash
$ npm i -save-dev build-plugin-keep-alive
```

## Usage

```json
{
  "plugins": ["build-plugin-keep-alive"]
}
```

完成上述配置后，项目会按页面路由维度开启 Keep Alive 能力，如果希望关闭指定路由的 Keep Alive，可以通过设置 `pageConfig` 进行关闭：

```js
// src/routes.ts
import Home from '@/pages/Home';

export default [
  {
    path: '/home',
    component: Home,
+    // icejs 1.x 仅支持将 pageConfig 配置在对应的页面组件上，请参考「页面组件」章节
+    pageConfig: {
+      keepAlive: false,
+    },
  },
];

export default routerConfig;
```

> 注意事项：由于开启了 Keep Alive 能力，路由发生切换时，组件对应的 mount 和 unmount 生命周期将不会重复执行
