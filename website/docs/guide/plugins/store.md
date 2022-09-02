---
title: 状态管理
order: 2
---

## 开启状态管理

安装插件：

```bash
$ npm i @ice/plugin-store -D
```

在 `ice.config.mts` 中添加插件：

```diff title="ice.config.mts"
import { defineConfig } from '@ice/app';
+ import store from '@ice/plugin-store';

export default defineConfig({
  plugins: [
+   store(),
  ],
});
```

## 全局状态

推荐在不同页面组件中使用的状态存放在全局状态中，比如主题、国际化语言、用户信息等。

### 定义 Model

约定在 `src/models` 目录定义全局状态。以定义全局用户状态为例：

```ts title="src/models/user.ts"
import { createModel } from 'ice';

interface User {
  name: string,
  id: string,
}

export default createModel({
  // 定义 model 的初始 state
  state: {
    name: '',
    id: '',
  } as User,
  // 定义改变该模型状态的纯函数
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  // 定义处理该模型副作用的函数
  effects: (dispatch) => ({
    async getUserInfo() {
      await delay(1000);
      this.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
})
```

### 初始化 Store

约定在 `src/store.ts` 中初始化 Store。

```ts title="src/store.ts"
import { createStore } from 'ice';
import user from './models/user';

export default createStore({ user });
```

### 在组件中使用



## 页面状态

### 定义 Model

### 初始化 Store

### 在组件中使用
