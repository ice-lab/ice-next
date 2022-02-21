---
title: 定制工程能力
order: 2
---

工程定制入口代码如下：

```javascript
// 本地插件则对应 build.plugin.js 文件，独立的插件 NPM 包则对应 `src/index.ts` 文件
module.exports = ({ context, onGetWebpackConfig, log, onHook, ...rest }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数
};
```

该方法会接收两个参数，第一个参数是插件提供的 API 接口，推荐按照解构方式使用，第二个参数 `options` 是插件自定义的参数，由插件开发者决定提供哪些选项给用户配置。

## 插件 API

通过插件提供的 API，可以方便拓展和自定义能力。

### context

包含各种环境信息：

- `command` 当前运行命令，start/build/test
- `commandArgs` 命令行参数
- `rootDir` 项目根目录
- `userConfig` 用户在 build.json 中配置的内容
- `pkg` 项目 package.json 中的内容

### onGetWebpackConfig

通过 `onGetWebpackConfig` 获取 webpack-chain 形式的配置，并对配置进行自定义修改：

```javascript
module.exports = ({onGetWebpackConfig, registerTask}) => {
  registerTask('default', webpackConfig);

  onGetWebpackConfig((config) => {
    config.entry('xxx');
  });
}
```

### onGetJestConfig

通过 `onGetJestConfig` 获取 jest 配置，可对配置进行自定义修改：

```javascript
module.exports = ({onGetJestConfig}) => {
  onGetJestConfig((jestConfig) => {
    const modifiedJestConfig = modify(jestConfig);
      return modifiedJestConfig;
  });
};
```

### onHook

通过 onHook 监听命令运行时事件，onHook 注册的函数执行完成后才会执行后续操作，可以用于在命令运行中途插入插件想做的操作：

```javascript
module.exports = ({ onHook }) => {
 onHook('before.build.load', () => {
   // do something before dev
 });
 onHook('after.build.compile', (stats) => {
   // do something after build
 });
}
```

目前支持的命令执行生命周期如下：

#### start 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.start.load | {<br />  args: CommandArgs, // 启动参数<br /> webpackConfig: ConfigInfo[]<br />} | 配置转化之前 |
| before.start.run | {<br />  args: CommandArgs, // 启动参数<br /> config: WebpackConfig[]<br />} | 构建执行之前 |
| after.start.compile | {<br />  url: string // serverUrl, <br />isFirstCompile: boolean,<br />  stats: WebpackAssets // Vite 模式下不存在 stats<br />} | 编译结束，每次重新编译都会执行 |
| before.start.devServer | {<br />  url: string // serverUrl,<br /> devServer:  WebpackDevServer | viteServer<br />} | 中间件加载后，dev server 启动前，仅支持 Webpack 构建模式 |
| after.start.devServer | {<br />  url: string // serverUrl,<br />  devServer: WebpackDevServer ｜ viteServer,<br />  err: Error<br />} | dev server 启动后，仅支持 Webpack 构建模式 |

#### build 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.build.load | {<br />  args: CommandArgs, // 启动参数<br /> webpackConfig: ConfigInfo[]<br />} | 配置转化之前 |
| before.build.run | {<br />  args: CommandArgs, // 启动参数<br /> config: WebpackConfig[]<br />} | 构建执行之前 |
| after.build.compile | {<br />  err: Error,<br />  stats: WebpackAssets // Vite 模式下不存在 stats<br />} | 构建结束 |

#### test 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.test.load | {<br />  args: array // 启动参数<br />} | 获取 jest 配置之前 |
| before.test.run | - | jest 执行之前 |
| after.test | {<br />  result // jest执行结果<br />} | 测试命令执行结束 |

### log

统一的 log 工具，底层使用 `npmlog` ，便于生成统一格式的 log。

```js
log.info('start');
log.verbose('debug');
log.error('exit');
```

### registerUserConfig

为用户配置文件 `build.json` 中添加自定义字段。

```javascript
module.exports = ({registerUserConfig}) => {
  registerUserConfig({
    name: 'custom-key',
    validation: 'boolean' // 可选，支持类型有 string, number, array, object, boolean
  });
};
```

### registerClioption

为命令行启动添加自定义参数。

```javascript
module.exports = ({registerClioption}) => {
  registerCliOption({
    name: 'custom-option', // 参数名
    commands: ['start'], // 命令
    configWebpack: (arg) => {} // 可选，arg 为命令行参数对应值
  });
};
```

### registerMethod

注册自定义方法。通过 `applyMethod` 调用。

```javascript
module.exports = ({registerMethod}) => {
  registerMethod(name, func); // name, func 分别为方法名和方法
};
```

### modifyUserConfig

修改用户配置文件。

```javascript
module.exports = ({modifyUserConfig}) => {
  modifyUserConfig(key, value); // key, value 分别为用户配置文件键值对
};
```

### registerTask

添加 Webpack 配置，配置为 webpack-chain 形式。

```javascript
module.exports = ({registerTask}) => {
  registerTask(name, config); // name: Task名, config: webpack-chain 形式的配置
};
```

### getAllTask

获取所有 Webpack 配置名称。

```javascript
module.exports = ({getAllTask}) => {
  const alltasks = getAlltask();
};
```

### getAllPlugin

获取所有插件。

```javascript
module.exports = ({getAllPlugin}) => {
  // 获取所有插件数组
  // 类型：() => [{pluginPath, options, name}]
  const plugins = getAllPlugin(); ，[]
}
```

## 扩展 API

除了以上由 build-scripts 内置支持的 API，我们还通过 icejs 对插件 API 做了扩展，扩展的 API 需要通过以下方式调用：

```js
module.exports = ({ applyMethod }) => {
  // 第一个参数对应 API 名称，第二个参数对应 API 参数
  applyMethod('addIceExport', { source: `./config`, exportName });
}
```

### addPluginTemplate

为运行时目录中的模版生成提供统一的渲染服务（目录）：

```js
// 默认渲染目录由插件名称决定
applyMethod('addPluginTemplate', path.join(__dirname, '../template'));

// 指定模版渲染目录
const renderData = {}; // 可选，ejs 额外渲染参数
applyMethod('addPluginTemplate', {
  template: path.join(__dirname, '../src/types'),
  targetDir: 'router/types',
}, renderData);
```

### addRenderFile

向运行时目录添加提供文件的渲染服务（文件）：

```js
const sourceFile = '../template/index.tsx.ejs');
const targetFile = path.join(runtimeDir, 'source/index.tsx');
const renderData = {}; // 可选，ejs 额外渲染参数
applyMethod('addRenderFile', path.join(__dirname, sourceFile, targetFile, renderData);
```

### addExport

向 `ice` 里注册模块，实现 `import { foo } from 'ice';` 的能力：

```js

// API 参数
// source: 指定导出模块引入的文件目录
// exportName: 从 ice 中导出的模块名称。
// specifier: 从 source 中默认导出方式，可选，默认值为 default export，如果为 named export 需要额外设置
//
// 实现 import { request } from 'ice'; request 由插件的 `./request/request` 文件实现
applyMethod('addExport', { source: './request/request', exportName: 'request' })
```

### addAppConfigTypes

向 appConfig 添加类型

```javascript
// 第一项参数对应 API 名称，第二项参数对应 API 参数。
//
// API 参数：
// source: 类型声明文件。./foo/types，对应 ICE_TEMP_DIR/foo/types。 ICE_TEMP_DIR，可通过 getValue('TEMP_PATH') 获得。注意：需先将对应类型文件移至 ICE_TEMP_DIR。
// specifier: 导出类型标识符，可选，默认值为 '*'。
// exportName: 添加至 appConfig 类型 IAppConfig 上的导出名。
//
// 结果为：
// // ICE_TEMP_DIR/types.ts
// import { Foo } from './foo/types';
// export interface IAppConfig {
//   foo?: Foo
// }
applyMethod('addAppConfigTypes', { source: `./foo/types`, specifier: '{ Foo }', exportName: `foo?: Foo` });
```

### getPages

获取 `src/pages` 下的一级页面列表：

```js
// ['Home', 'About']
const pages = this.applyMethod('getPages', this.rootDir);
```

### addDisableRuntimePlugin

禁用插件的运行时能力

```js
// 禁用内置的 request 的运行时能力
applyMethod('addDisableRuntimePlugin', 'build-plugin-ice-request');
```

### watchFileChange

监听 `src` 下的文件变化：

```js
applyMethod('watchFileChange', 'src/config.*', async (event: string) => {
  if (event === 'unlink' || event === 'add') {
    // do something
  }
});
```

## 插件参数

用户可以在 `build.json` 中指定插件参数：

```json
{
  "plugins": [
    ["build-plugin-foo", {
      "type": "bar"
    }]
  ]
}
```

那么在 build-plugin-foo 里就可以获取到这个参数：

```js
module.exports = ({ context, log }, options) => {
  const { type } = options;
  log.info(type); // => bar
}
```

## 插件通信

插件间需要进行通信的场景诉求：

1. 不同插件之间需要知道彼此的存在来确定是否执行相应的逻辑
2. 多个插件共有的配置信息可以抽出来，在某个插件中进行配置

使用 `setValue` 和 `getValue` 两个API来实现，分别用于数据的存取。

### setValue

类型：`(key: string | number, value: any) => void`，示例：

```javascript
// build-plugin-test
module.exports = ({ setValue }) => {
  setValue('key', 123);
}
```

### getValue

类型：`(key: string | number) => any`，示例：

```javascript
module.exports = ({getValue}) => {
  const value = getValue('key'); // 123
}
```

同时在 icejs 中也内置了几个变量：

```js
const projectType = getValue('PROJECT_TYPE'); // ts|js
const iceDirPath = getValue('TEMP_PATH');  // 对应 .ice 的路径
```

## 类型

接口类型通过以下方法引入：
```javascript
import { IPlugin } from 'build-scripts';
```
