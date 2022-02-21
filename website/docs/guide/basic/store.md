---
title: 状态管理
order: 9
---

icejs 内置了状态管理方案，并在此基础上进一步遵循 **“约定优于配置”** 原则，进行抽象和封装，使得状态管理变得非常容易。

## 全局应用状态

### 定义 Model

约定全局状态位于 `src/models` 目录，目录结构如下：

```md
src
├── models // 全局状态
| ├── counter.ts
│ └── user.ts
└── store.ts
```

假设我们需要全局管理用户状态，定义模型如下：

```ts
// src/models/user.ts
export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  // 定义 model 的初始 state
  state: {
    name: '',
    id: '',
  },

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
      dispatch.user.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};
```

### 初始化 Store

```ts
// src/store.ts
import { createStore } from 'ice';
import user from './models/user';
import project from './models/project';

const store = createStore(
  {
    user,
    project,
  },
  {
    // options
  },
);

export default store;
```

详细文档请参考 [API-createStore](api/about.md#createStore) 。

### 在 View 中使用模型状态

```diff
+ import store from '@/store';

const HomePage = () => {
+  const [userState, userDispatchers] = store.useModel('user');

  return (
    <>
      <span>{userState.id}</span>
      <span>{userState.name}</span>
    </>
  );
}
```

## 页面级状态

页面状态只能在该页面下的组件中使用，无法跨页面使用。

### 非嵌套页面

大部分场景中一个 `pages/Foo` 目录对应一个路由，即非嵌套页面，此时约定页面状态在 `src/pages/*/models` 中定义。

目录组织如下：

```diff
src
├── models                  // 全局状态
│   └── user.ts
└── pages
|   ├── Home                // Home 页面
+|   │   ├── models          // 页面状态
+|   │   |   ├── foo.ts
+|   │   |   └── bar.ts
+|   │   ├── store.ts
|   │   └── index.tsx
└── app.ts
```

定义模型如下：

```ts
// src/pages/Home/models/foo.ts
export default {
  state: {
    title: 'Hello',
  },
};
```

初始化 Store 实例：

```ts
// src/pages/Home/store.ts
import { createStore } from 'ice';
import foo from './models/foo';

const store = createStore({ foo });

export default store;
```

在页面组件中使用模型状态：

```tsx
// 引用页面状态
import pageStore from '@/pages/Home/store';

const HomePage = () => {
  const [pageState, pageDispatchers] = pageStore.useModel('foo');
  return (
    <>{pageState.title}</> // Hello
  );
};
```

### 嵌套页面

某些复杂场景会出现嵌套页面的情况，即 `src/pages/Home` 下**包含多个路由页面**，目录组织如下：

```md
src
└── pages
│ ├── Home     // Home 页面包含了 A、B 等多个路由页面
│ │ ├── HomeA
│ │ │ └── index.tsx
│ │ ├── HomeB
│ │ │ └── index.tsx
│ │ ├── Layout // 页面布局
│ │ │ └── index.tsx
│ │ ├── models // 页面状态
│ │ │ ├── Foo.ts
│ │ │ └── Bar.ts
│ │ └── store.ts
└── app.ts
```

对于嵌套页面，框架会将 store 的 Provider 包裹在 `Layout/index.tsx` 上，此时所有嵌套的页面以及组件都可以访问到这里的 store。`Layout/index.tsx` 内容如下：

```jsx
// Layout 中可以定义这些嵌套页面共用的布局，如果没有共用布局则直接渲染 children 即可
export default ({ children }) => {
  return <>{children}</>;
};
```

同时配置在 `src/routes.ts` 中：

```diff
// src/routes.ts
+import HomeLayout from '@/pages/Home/Layout';
+import HomeA from '@/pages/Home/HomeA';
+import HomeB from '@/pages/Home/HomeB';
import About from '@/pages/About';

export default [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/home',
+        component: HomeLayout,
+        children: [
+          {
+            path: '/a',
+            component: HomeA
+          }
+        ]
      },
      {
        path: '/about',
        component: About,
      }
    ]
  }
]
```

## 高阶用法

### 设置初始状态

假设我们有 `models/user.ts` 和 `models/counter.ts` 两个模型，可以通过 `app.getInitialData()` 设置初始状态：

```ts
runApp({
  app: {
    getInitialData: async (ctx) => {
      const { username, count } = await request.get('/api/data');
      return {
        // initialStates 是约定好的字段，会透传给 store 的初始状态
        initialStates: {
          user: { name: username },  // 对应 models/user
          counter: { count }         // 对应 models/counter
        }
      }
    }
  },
});
```

> 注意：页面级状态目前不支持设置 initialStates

### TypeScript 类型提示

编写类型有助于更好的代码提示，类型定义步骤如下：

- 创建 Store 实例

```diff
// src/store.ts
import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import user from './models/user';
import porject from './models/porject';

+interface IAppStoreModels extends IStoreModels {
+  user: typeof user;
+  project: typeof project;
+};

+const appModels: IAppStoreModels = {
+  user,
+  project,
+};

export default createStore(appModels);

+export type IRootDispatch = IStoreDispatch<typeof appModels>;
+export type IRootState = IStoreRootState<typeof appModels>;
```

- 定义状态模型

```diff
// src/models/user.ts
+import { IRootState, IRootDispatch } from '@/store';

const user = {
  state: [],
  reducers: {},
+  effects: ((dispatch: IRootDispatch) => ({
+    like(payload, rootState: IRootState) {
+      dispatch.project.foo(payload); // 调用其他 model 的 effects/reducers
+      rootState.project.title;       // 获取其他 model 的 state
+    }
+  })
};
```

### Model 定义详细说明

如上示例所述，icejs 约定在 `src/models`、`src/pages/*/models` 目录下的文件为项目定义的模型文件，每个文件需要默认导出一个对象。

通常模型定义包括 state、reducers、effects 三部分：

```ts
export default {
  state: {},

  reducers: {},

  effects: {},
};
```

**state**

model 的初始 state

```diff
export default {
+ state: { count: 0 }
}
```

**reducers**

```ts
reducers: { [string]: (prevState, payload) => any }
```

一个改变该模型状态的函数集合。这些方法以模型的上一次 prevState 和一个 payload 作为入参，在方法中使用可变的方式来更新状态。这些方法应该是仅依赖于 prevState 和 payload 参数来计算下一个 nextState 的纯函数。对于有副作用的函数，请使用 effects。

```diff
export default {
  state: { count: 0, list: [] },

+ reducers: {
+   increment (prevState, payload) {
+     const newList = prevState.list.slice();
+     newList.push(payload);
+     const newCount = prevState.count + 1;
+     return { ...prevState, count: newCount, list: newList }
+   },
+   decrement (prevState) {
+     return { ...prevState, count: prevState.count - 1 }
+   }
+ }
}
```

**effects**

```ts
effects: (dispatch) => ({ [string]: (payload, rootState) => void })
```

一个可以处理该模型副作用的函数集合。这些方法以 payload 和 rootState 作为入参，适用于进行异步调用、模型联动等场景。

```diff
export default {
  state: { count: 0 },

  reducers: {
    increment (prevState) {
      return {
        ...prevState,
        count: prevState.count + 1
      }
    },
    decrement (prevState) {
      return {
        ...prevState,
        count: prevState.count - 1
      }
    }
  },

+ effects: (dispatch) => ({
+   async asyncDecrement() {
+     await delay(1000);             // 进行一些异步操作
+     this.increment();              // 调用模型 reducers 内的方法来更新状态
+   },
+ }),
};
```

### Model 之间通信

> 注意：如果两个 model 不属于同一个 store 实例，是无法通信的

```diff
// src/models/user
export default {
  state: {
    name: '',
    tasks: 0,
  },
  effects: () => ({
    async refresh() {
      const data = await fetch('/user');
+      // 通过 this.foo 调用自身的 reducer
+      this.setState(data);
    },
  }),
};

// src/models/tasks
export default {
  state: [],
  effects: (dispatch) => ({
    async refresh() {
      const data = await fetch('/tasks');
      this.setState(data);
    },
    async add(task) {
      await fetch('/tasks/add', task);
+      // 调用另一个 model user 的 effects
+      await dispatch.user.refresh();
+      // 通过 this.foo 调用自身的 effects
+      await this.refresh();
    },
  }),
};
```

在 effects 里的 action 方法中可以通过 `dispatch[model][action]` 拿到其他模型所定义的方法。

> 如果遇到 `this.foo` 的 ts 类型错误，请参考文档 [icestore QA](https://github.com/ice-lab/icestore/blob/master/docs/qna.zh-CN.md) 进行修复

> setState 是 icestore 内置的一个 reducer，可以直接使用

### Model 中使用 immer 更改 state

Redux 默认的函数式写法在处理一些复杂对象的 state 时会非常繁琐，因此 icejs 同时支持了使用 [immer](https://immerjs.github.io/immer/) 来操作 state：

```diff
export default {
  state: {
    tasks: ['A Task', 'B Task'],
    detail: {
      name: 'Bob',
      age: 3,
    },
  },
  reducers: {
    addTasks(prevState, payload) {
-     return {
-       ..prevState,
-       tasks: [ ...prevState.tasks, payload ],
-     },
+     prevState.tasks.push(payload);
    },
    updateAge(prevState, payload) {
-     return {
-       ..prevState,
-       detail: {
-         ...prevState.detail,
-         age: payload,
-       },
-     },
+     prevState.detail.age = payload
    }
  }
}
```

注意：因为 immer 无法支持字符串或数字这样的简单类型，因此如果 state 符合这种情况（极少数）则不支持通过 immer 操作，必须使用 Redux 默认的函数式写法（返回一个新值）：

```diff
const count = {
  state: 0,
  reducers: {
    add(prevState) {
-     state += 1;
+     return state += 1;
    },
  },
}
```

### 获取 effects 的状态 loading/error

通过 `useModelEffectsState` API 即可获取到 effects 的 loading 和 error 状态。

```diff
import store from '@/store';

function FunctionComponent() {
  const [state, dispatchers] = store.useModel('counter');
+  const effectsState = store.useModelEffectsState('counter');

  useEffect(() => {
    dispatchers.asyncDecrement();
  }, []);

+  console.log(effectsState.asyncDecrement.isLoading); // loading
+  console.log(effectsState.asyncDecrement.error);  // error
}
```

### 在 Class Component 中使用

useModel 相关的 API 基于 React 的 Hooks 能力，仅能在 Function Component 中使用，通过 `withModel` API 可以实现在 Class Component 中使用。

```ts
import store from '@/store';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const [state, dispatchers] = todos;
    // ...
  }
}

export default store.withModel('todos')(TodoList);
// 绑定多个 model
// export default withModel('user')(withModel('todos')(TodoList));
```

同时，也可以使用 `withModelDispatchers` 以及 `withModelEffectsState` API。

[完整 API 文档](https://github.com/ice-lab/icestore/blob/master/docs/api.md)

### Redux Devtools

icejs 中默认集成了 [Redux Devtools](https://github.com/zalmoxisus/redux-devtools-extension)，不需要额外的配置就可以通过 Redux Devtools 调试：

![](https://img.alicdn.com/tfs/TB1wK4nqypE_u4jSZKbXXbCUVXa-1918-430.png)

如果想要定义 Devtools 的参数，可以查看上面 `createStore` 的 options 说明。

### 在其他地方使用 store

满足以下几种情况，框架都会自动帮助开发者包裹 `store.Provider`：

- SPA 全局 store：`src/` 下有 `store.ts` 和 `app.ts`
- SPA 页面级 store：`src/pages/Home` 下有 `store.ts` 和 `index.tsx`
- SPA 嵌套页面级 store：`src/pages/Home` 下有 `store.ts` 和 `Layout/index.tsx`（优先级低于上面）
- MPA 组件类型的 entry：`src/pages/Home` 下有 `store.ts` 和 `index.tsx`
- MPA 单页类型的 entry：`src/pages/Home` 下有 `store.ts`, `app.ts`, `Layout/index.tsx`

如果不满足上述情况，则需要开发者自行包裹 `store.Provider`。比如希望在 `src/pages/Home/Foo/` 下创建一个 store：

1. 在 `src/pages/Home/Foo/models/` 下定义 model
2. 在 `src/pages/Home/Foo/store.ts` 中初始化 store
3. **新增步骤：** 在 ` src/pages/Home/Foo/index.tsx` 中包裹 `store.Provider`

```jsx
// src/pages/Home/Foo/index.tsx
import store from './store';
const { Provider } = store;

export default () => {
  return (
    <Provider>
      <Child />
    </Provider>
  );
};

function Child() {
  const [state, actions] = store.useModel('foo');
  return <></>;
}
```

### 使用其他状态管理方案

icejs 默认使用 [@ice/store](https://github.com/ice-lab/icestore) 作为状态管理方案，如需使用其他方案，需要在 build.json 中通过选项关闭默认方案：

```json
{
  "store": false
}
```

此时项目不会再引入 `@ice/store` 相关的各种能力，包含上述的自动包裹 `Provider` 等，此时就可以灵活的引入其他状态管理方案了。

## 版本变更说明

### 内置的 immer 从 6.x 升级到最新版本 9.x

icejs 2.0.0 版本升级

### 不再自动初始化 store

> 1.9.7 版本标记废弃，2.0.0 版本完全移除

推荐开发者自行创建 `store.ts` 并在其中初始化 store，这样可以更灵活的定制一些参数，相对之前方案带来的改变：

- 开发者需要在 `models/` 同层目录自行创建 `store.ts` 并初始化 store 实例：

```diff
src
└── models
|   ├── foo.ts
|   └── bar.ts
+|── store.ts
└── app.ts
```

```ts
// src/store.ts
import { createStore } from 'ice';
import user from './models/user';
import project from './models/project';

const store = createStore({
  user,
  project,
});

export default store;
```

- 引入 store 的路径发生了变化：

```diff
// 全局状态
- import { store } from 'ice';
+ import store from '@/store';

// 页面级状态
- import { store } from 'ice/Home';
+ import store from '@/pages/Home/store';
```

### Model 中不再支持 `actions: {}` 写法

> 1.7.0 版本标记废弃，2.0.0 版本完全移除

将原先的 `actions: {}` 拆分为 `effects: () => {}` 和 `reducers: {}` 两个字段：

```diff
const counter = {
  state: { value: 0 },
-  actions: {
-    increment:(state) => ({ value: state.value + 1 }),
-    async asyncIncrement(state, payload, actions, globalActions) {},
-  }
+  reducers: {
+    increment:(prevState) => ({ value: prevState.value + 1 }),
+  },
+  effects: (dispatch) => ({
+    async asyncIncrement(payload, rootState) {},
+  }),
}
```

### 不再支持 `store.getInitialStates()`

> 1.7.0 版本标记废弃，2.0.0 版本完全移除

推荐使用 `store.initialStates`。

### 路由切换后重新初始化页面状态

icejs 1.0 中有一个「错误」的设计，切换页面再次进入原页面后页面状态不会重新初始化，如需重新初始化需要主动配置：

```json
{
  "store": {
    "resetPageState": true
  }
}
```

icejs 2.0 版本将此默认行为进行了修正，切换页面再次进入原页面后会重新初始化页面状态，如果希望跟 1.0 表现一致，则需要主动配置：

```json
{
  "store": {
    "disableResetPageState": true
  }
}
```