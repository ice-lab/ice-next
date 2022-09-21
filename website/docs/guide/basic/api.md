---
title: API
order: 15
---


## Hooks


## 组件

### `<BrowserOnly />`

`<BrowserOnly />` 组件只允许在 React Hydrate 后在 Client 端中渲染组件。

Props

- `children`: 一个函数，且返回仅在浏览器中渲染的组件，不会在 Server 端中执行
- `fallback`: 在 React Hydrate 完成之前渲染的组件

一个简单的示例：
```tsx
import { BrowserOnly } from 'ice';

export function Home () {
  return (
    <BrowserOnly fallback={<div>loading...</div>}>
      {() => <span>page url = {window.location.href}</span>}
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
