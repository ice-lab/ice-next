---
title: API
order: 15
---


## Hooks

### `useIsBrowser`

该方法会在 React Hydrate 完成后后返回 `true`，一般在开启 SSR/SSG 的应用中使用。

:::caution

使用此 Hook 而不是 `typeof windows !== 'undefined'` 来判断当前是否在 Client 端中渲染。

因为第一次 Client 端渲染必须与 Server 端渲染的接口一致，如果不使用此 Hook 判断的话，在 Hydrate 时可能出现节点不匹配的情况。 
:::

使用示例：

```tsx
import { useIsBrowser } from 'ice';

const Home = () => {
  const isBrowser = useIsBrowser();
  return <div>{isBrowser ? 'Client' : 'Server'}</div>;
};
```

## 组件

### `<BrowserOnly />`

`<BrowserOnly />` 组件只允许在 React Hydrate 完成后在 Client 端中渲染组件。

**Props**

- `children`: 一个函数，且返回仅在浏览器中渲染的组件。该函数不会在 Server 端中执行
- `fallback`（可选）: 在 React Hydrate 完成之前渲染的组件

使用示例：

```tsx
import { BrowserOnly } from 'ice';

export function Home () {
  return (
    <BrowserOnly fallback={<div>loading...</div>}>
      {() => <span>page url is {window.location.href}</span>}
    </BrowserOnly>
  );
};
```

引入一个组件：
```tsx
import { BrowserOnly } from 'ice';
import MyComponent from './MyComponent';

export function Home () {
  return (
    <BrowserOnly fallback={<div>loading...</div>}>
      {() => <MyComponent />}
    </BrowserOnly>
  );
};
```
