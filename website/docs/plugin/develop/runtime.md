---
title: 定制运行时能力
order: 3
---

插件运行时能力通过 `src/runtime.ts` 定义，结构如下

```javascript
export default ({ appConfig, addDOMRender, setRenderRouter, modifyRoutes, ...rest }) => {
  const { loglevel } = appConfig;
};
```

## API

### appConfig

对应 `src/app.ts` 用户自定义的 appConfig。详细字段见 [应用入口](/guide/basic/app.md)。

### buildConfig

指定透传的构建配置：

```js
{
  router?: object | boolean;  // 是否启用路由
  store?: boolean;  // 是否启用状态管理
  icestarkUMD?: boolean;  // 是否为 icestark UMD 标准微应用
  web?: object;  // rax 构建下的 web 配置
}
```

### context

应用运行上下文。包含`initialData` 和`pageInitialProps`，分别对应[应用级数据](/guide/advanced/ssr.md#应用级数据)和[页面级数据](/guide/advanced/ssr.md#页面级数据) 。

### setRenderRouter

设置 renderRouter。

```javascript
export default ({ setRenderRouter }) => {
  // renderRouter 入参为路由数组
  const renderRouter = (routes) => () => {
    return <div>route</div>;
  };
  setRenderRouter(renderRouter);
};
```

### addProvider

为应用包裹 Provider：

```js
export default ({ addProvider }) => {
  const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  addProvider(StoreProvider);
};
```

### addDOMRender

自定义渲染。默认使用[react-dom](https://reactjs.org/docs/react-dom.html)。

```javascript
import ReactDOM from 'react-dom';

export default ({ addDOMRender }) => {
  // App: React 组件
  // appMountNode: App 挂载点
  const DOMRender = ({ App, appMountNode }) => {
    ReactDOM.render(<App />, appMountNode);
  };
  addDOMRender(DOMRender);
};
```

### wrapperPageComponent

为所有页面级组件做一层包裹：

```js
// 默认能力：在页面组件上挂载 pageConfig.title 的属性，即可自动设置页面 title
import { useEffect } from 'react';

export default ({ wrapperPageComponent }) => {
  wrapperPageComponent((PageComponent) => {
    const { title } = PageComponent.pageConfig || {};

    if (!title) {
      return PageComponent;
    }
    const TitleWrapperedComponent = () => {
      useEffect(() => {
        document.title = title;
      }, []);

      return <PageComponent />;
    };
    return TitleWrapperedComponent;
  });
};
```

### modifyRoutes

动态修改路由。

```javascript
function modify(routes) {
  return routes;
}

export default ({ modifyRoutes }) => {
  modifyRoutes((routes) => {
    const modifiedRoutes = modify(routes); // 修改路由
    return modifiedRoutes;
  });
};
```

### applyRuntimeAPI

动态注册的运行时 API，目前根据路由启用的情况下可以使用以下方法：

```js
// 创建 history
const history = applyRuntimeAPI('createHistory', { type: 'browser', basename: '/' });
// 解析路由 search 参数
const params = applyRuntimeAPI('getSearchParams');
```