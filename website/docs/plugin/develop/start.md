---
title: 开发指南
order: 1
---

icejs 的插件能力在 vite/webpack 插件机制之上，因此能力上更强大一些：

- 定制修改 webpack/vite 的构建配置，包含引入 webpack/vite 的插件
- 支持在整个构建生命周期中定制一些行为，比如项目启动前先拉取某些资源到本地
- 支持扩展运行时的能力，比如包裹页面路由组件增加一些高阶能力

## 快速开始

使用 CLI 初始化插件：

```shell
$ npm init ice <your-plugin-name> # 选择插件类型
```

## 插件目录

通常情况下，插件通过 npm 包的形式分发，插件初始化目录如下：

```md
.
├── src
│   ├── index.[t,j]s # 插件工程入口
│   └── runtime.[t,j]s # 插件编译时入口
├── tests # 测试文件目录
├── package.json # npm 包配置
├── tsconfig.json # typescript 配置文件
└── README.md # 说明文档
```

这里以 ts 为例，实际上也可以通过 js 编写插件。 ts 最终应编译为 js 以发布 npm 包。插件核心有两个文件：

1. `index.ts`：通常用于做一些工程相关的事情，比如更改 Webpack 配置、构建结束后执行一些其他任务等，需保证该文件作为 npm 包入口。
2. `runtime.ts`：实现一些运行时能力，比如 config/request 插件。注意: 旧版本的 `module.ts` 暂时兼容，但在未来不受支持。需保证该文件与 `index.ts` 位于同一目录下。

下面也会按照这两个维度来分别介绍。

## 工程能力定制

工程能力以 `src/index.ts` 为入口，在执行 start/build 时 icejs 会加载并执行每个插件包的入口文件。

关于工程能力如何定制请参考下一个章节的文档 [插件开发-定制工程能力](/plugin/develop/build.md)。

## 运行时能力定制

运行时能力以 `runtime.ts` 为入口，通过浏览器打开页面时会执行 `src/app.ts` 中的 `runApp()` 方法，这个方法会加载并执行所有插件的 `runtime.ts`。

关于 `runtime.ts` 应该如何书写请参考下一个章节的文档 [插件开发-定制运行时能力](/plugin/develop/runtime.md)。

## 单元测试

使用 [Jest](https://github.com/facebook/jest) 进行单元测试。

## 插件开发示例

以 [`plugin-logger`](https://github.com/alibaba/ice/tree/master/packages/plugin-logger) 为例。该插件采用 typescript 编写，对工程能力及运行时能力均进行了修改。为框架提供了日志功能。

目录结构：

```json
.
├── README.md
├── template
│   └── index.ts     // logger 功能实现
├── package.json
├── src
│   ├── index.ts      // 工程能力实现
│   ├── runtime.ts    // 运行时能力实现
│   └── types
│       └── index.ts  // 类型声明文件
└── tsconfig.json
```

### 类型和扩展

- 类型声明：

  ```typescript
  // src/types/index
  export interface ILogger {
    level: string;
  }
  ```

- 扩展 appConfig 类型

  ```typescript
  // src/index.ts
  import * as path from 'path';
  import * as fse from 'fs-extra';
  import { IPlugin } from 'build-scripts';

  const plugin: IPlugin = async ({ getValue, applyMethod }): Promise<void> => {
    const exportName = 'logger';
    const distPath = path.join(getValue('TEMP_PATH'), exportName);
    await fse.copy(path.join(__dirname, './types'), path.join(distPath, 'types')); // 复制类型声明文件

    // 挂载至 appConfig。 appConfig 对应类型为 IAppConfig
    // source 为复制后的目录, specifier 为类型标识符，exportName 为 appConfig 类型名
    // 得到以下结果
    // import { ILogger } from './logger/types'
    // export interface IAppConfig {
    //   logger?: ILogger;
    // }
    applyMethod('addIceAppConfigTypes', {
      source: `./${exportName}/types`,
      specifier: '{ ILogger }',
      exportName: `${exportName}?: ILogger`,
    });
  };
  ```

### 工程化能力实现

- logger 功能实现

  ```typescript
  // src/logger/index.ts
  import * as logger from 'loglevel';

  export default logger;
  ```

- 导出至 ice

  ```typescript
  // src/index.ts
  import * as path from 'path';
  import * as fse from 'fs-extra';
  import { IPlugin } from 'build-scripts';

  const plugin: IPlugin = async ({ getValue, applyMethod, onGetWebpackConfig }): Promise<void> => {
    const exportName = 'logger';
    const distPath = path.join(getValue('TEMP_PATH'), exportName);
    await fse.copy(path.join(__dirname, `../${exportName}`), distPath);
    // 导出 logger 功能
    // 用户可通过 import { logger } from 'ice'; 使用
    applyMethod('addIceExport', { source: `./${exportName}`, exportName });

    onGetWebpackConfig((config) => {
      // 为 logger 添加 Webpack alias，供运行时能力调用
      config.resolve.alias.set('$ice/logger', distPath);
    });
  };
  ```

### 运行时能力实现

```typescript
import logger from '$ice/logger'; // $ice/logger 通过工程化能力设置 alias

const module = ({ appConfig }) => {
  // 设置运行时 logger 等级
  if (appConfig.logger && appConfig.logger.level) {
    logger.setLevel(appConfig.logger.level);
  }
};

export default module;
```

## 示例插件

官方插件代码：https://github.com/alibaba/ice/tree/master/packages
