---
title: 页面
order: 4.1
---

每一张页面，都可以由 `路由组件` 和 `零或多个 Layout` 组装而成。路由组件和 Layout 的开发规范基本一致，可以包含以下内容：

- Component 约定组件的具体实现，需要通过 `export default` 导出，必须。
- getData 方法，约定页面的数据请求，可选，但推荐配置。
- getConfig 方法，约定页面的 Title、Meta 等信息，可选。

## Component

对应路由组件或 Layout 在页面中需要渲染的内容。

```tsx
// src/pages/index.tsx
import { useData } from "ice";

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
```

## getData

详见[数据请求](./request.md)

## getConfig

页面主体内容之外的，其他需要通用 HTML 模板上差异化显示的内容，可以通过导出 `getConfig` 方法来声明。 示例：

```tsx
export function getConfig() {
  return {
    title: 'Home'
  };
}
```

支持配置的页面级信息包含:

#### 页面标题

```tsx
export function getConfig() {
  return {
    title: 'Home'
  };
}
```

#### Meta 信息

```tsx
export function getConfig() {
  return {
    metas: [
      { charset: 'utf-8' },
      {
        title: 'Something cool',
        description: 'This becomes the nice preview on search results.',
      },
    ]
  };
}
```

#### Link 标签

页面级需要额外插入的 Link 标签，会被插入 `head` 标签内，先于页面自身的 Bundle 加载，是阻塞型的。

>> 框架提供了这个能力，但不推荐使用，除非确有需要前置加载。

```tsx
export function getConfig() {
  return {
    links: [
      {
        rel: 'icon',
        href: '/favicon.png',
        type: 'image/png',
      },
      {
        rel: 'stylesheet',
        href: 'https://example.com/some/styles.css',
      },
    ]
  };
}
```

推荐，在页面组件内延迟加载，以达到更好的性能体验。

```tsx
// src/pages/index.tsx
export default function Home() {
  return (
    <>
      <div>Hello ICE</div>
      <link rel="stylesheet" href="https://example.com/some/styles.css" />
    <>
  );
};
```

### Script 标签

页面级需要前置加载的 Script 资源，会被插入在主 Bundle 前，是阻塞型的。

>> 框架提供了这个能力，但不推荐使用，除非确有需要前置加载。

```tsx
export function getConfig() {
  return {
    scripts: [
      {
        src: 'https://example.com/some/index.js',
      },
    ],
  };
}
```

推荐，在页面组件内，按需异步加载，以达到更好的性能体验。
