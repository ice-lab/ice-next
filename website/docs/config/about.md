---
title: 工程配置
order: 7
---

import Support from '../../src/components/Support'
import Badge from '../../src/components/Badge'

icejs 支持的工程配置项列表，所有配置项都在 [build.json 文件](/guide/basic/build.md) 中编写。

## plugins <Support list="{['webpack', 'vite']}" />

- 类型： `array`

配置 icejs 插件，参考[插件列表](/plugin/list/moment-locales.md)以及[插件能力](/plugin/develop/start.md)

```json
{
  "plugins": [
    "build-plugin-jsx-plus",
    [
      "build-plugin-moment-locales",
      {
        "locales": ["zh-cn", "en-au"]
      }
    ]
  ]
}
```

## alias <Support list="{['webpack', 'vite']}" />

- 类型： `object`
- 默认值： `null`

在 icejs 默认配置了 `{ "@": "./src/" }` 的规则，因此项目大多数时候不需要配置，配置完成后则可以更加简单的导入模块了：

```javascript
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@/components/CustomTips';
```

## publicPath <Support list="{['webpack', 'vite']}" />

- 类型： `string`
- 默认值： `/`

配置 Webpack 的  [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath)  属性。 仅在运行  `build`  命令时生效。

```json
{
  "publicPath": "https://cdn.example.com/assets/"
}
```

## devPublicPath <Support list="{['webpack', 'vite']}" />

- 类型： `string`
- 默认值： `/`

同 `publicPath`  仅在执行 `start`  时生效

```json
{
  "devPublicPath": "http://127.0.0.1/"
}
```

## sourceMap <Support list="{['webpack', 'vite']}" />

- 类型： `boolean` | `string`

- start 模式：默认 `'cheap-module-source-map'`，支持通过 `false` 关闭，不支持设置为其他枚举值。
- build 模式：默认 `false`，vite 模式下支持 `true` | `false` | `'inline'` | `'hidden'` 写法

## externals <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：`{}`

将某些 `import` 的包排除在 bundle 之外，比如从 CDN 引入 React 资源而不是将它打包到 bundle 中：

```json
{
  "externals": {
    "react": "React"
  }
}
```

说明：key 表示依赖包名，如：`react`，value 表示 js 暴露的全局变量名，如: `React`

将 CDN 文件添加到 `public/index.html` 中：

```diff
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
+    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/cjs/react.production.min.js"></script>
  </body>
</html>
```

## hash <Support list="{['webpack', 'vite']}" />

- 类型：`boolean` | `string`
- 默认值：`false`

如果希望构建后的资源带 hash 版本，可以将  `hash`  设置为  `true`

```json
{
  "hash": true
}
```

也可以设置为 contenthash 的方式（Vite 模式不支持）：

```json
{
  "hash": "contenthash"
}
```

## polyfill <Support list="{['webpack', 'vite']}" />

- 类型：`string`
- 默认值：`"entry"`
- 可选值：`"usage"` | `"entry"` | `false`

配置 `@babel/preset-env` 处理 `polyfill` 的逻辑，不同值的含义：

- `entry`: 根据配置的 `browserslist` 字段在每个文件开头都引入对应的 `polyfill`。
- `false`: 不引入任何 `polyfill`。
- `usage`: 根据源码中使用到的代码按需引入 `polyfill`。

**注意：** 在 `usage` 模式下，默认不会去分析 `node_modules` 里的代码，如果需要的话，请看 `compileDependencies` 字段相关的说明，添加相关需要编译的依赖。Vite 构建模式下，开启 polyfill 后默认启用 `@vitejs/plugin-legacy` 插件，为传统浏览器提供兼容性支持

## dropLogLevel <Support list="{['webpack', 'vite']}" /><Badge text="2.0.0" />

- 类型：`trace|debug|log|warn|error`
- 默认值：`null`，不移除任何代码

压缩代码时移除 `console.*` 相关代码，配置了 `log` 则会移除 `console.trace|console.debug|console.log` 代码。

## minify <Support list="{['webpack', 'vite']}" />

- 类型：`boolean｜string|object`
- 默认值：`true`，使用 terser 压缩

如果不希望资源被压缩:

```json
{
  "minify": false
}
```

### terser

如果想指定 terser 配置项<Badge text="2.0.0" />：

```json
{
  "minify": {
    "type": "terser",
    // https://github.com/terser/terser#minify-options
    "options": {
      "compress": {
        "unused": true,
        "drop_console": true
      }
    }
  }
}
```

### esbuild <Badge text="2.0.0" />

如果想使用 esbuild 压缩：

```json
{
  "minify": "esbuild"
}
// 指定 esbuild 压缩选项：https://github.com/privatenumber/esbuild-loader#minifyplugin
{
  "minify": {
    "type": "esbuild",
    "options": {
      "target": "es2016"
    }
  }
}
```

### swc <Support list="{['webpack']}" /> <Badge text="2.0.0" />

如果想使用 swc 压缩：

```json
{
  "minify": "swc"
}
// 指定 swc 压缩选项，与 terser 选项保持一致：https://swc.rs/docs/config-js-minify/
{
  "minify": {
    "type": "swc",
    "options": {
      "compress": {
        "drop_console": true
      }
    }
  }
}
```

## outputAssetsPath <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：`{ js: 'js', css: 'css' }`

修改构建后的 css/js 文件目录，默认情况下 css 在  `build/css/`  下，js 在  `build/js/`  下，可以通过  `outputAssetsPath`  配置修改：

```json
{
  "outputAssetsPath": {
    "js": "js-dist",
    "css": "css-dist"
  }
}
```

## outputDir <Support list="{['webpack', 'vite']}" />

- 类型：`string`
- 默认值：`build`

修改构建后的文件目录

```json
{
  "outputDir": "dist"
}
```

## proxy <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：`{}`

配置 Webpack 的  [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)  属性。

> 建议使用  `proxy`  来设置代理而不要修改 Webpack 的  `devServer.proxy`

```json
{
  "proxy": {
    "/**": {
      "enable": true,
      "target": "http://127.0.0.1:6001"
    }
  }
}
```

> 代理的每一项配置都可以通过 enable 字段来快速开关代理配置

## devServer <Support list="{['webpack']}" />

- 类型： `object`
- 默认值： `{}`

注意：不建议在 `devServer` 中配置以下属性：

- port: 推荐通过命令行参数 `--port`
- https: 推荐通过命令行参数 `--https`
- proxy: 推荐通过顶层 proxy 配置

## define <Support list="{['webpack', 'vite']}" />

- 类型： `object`
- 默认值： `{}`

配置全局变量。

```json
{
  "define": {
    "ASSETS_VERSION": "0.1.0"
  }
}
```

## browserslist <Support list="{['webpack', 'vite']}" />

- 类型： `string` | `object`
- 默认值：`last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4`

配置 @babel/preset-env 的浏览器最低版本( https://babeljs.io/docs/en/babel-preset-env#targets )，新配置的 `browserslist`  会覆盖默认值。

```json
{
  "browserslist": {
    "chrome": 49,
    "ie": 11
  }
}
```

> 注: 因 targets 字段被使用，这里使用 browserslist 字段替代 @babel/preset-env 的 targets 字段。

## vendor <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`true`

MPA 场景下配置是否生成 vendor，如果希望禁用：

```json
{
  "vendor": false
}
```

## libraryTarget <Support list="{['webpack']}" />

- 类型：`string`
- 默认值：`''`

配置 Webpack 的  [output.libraryTarget](https://webpack.js.org/configuration/output/#outputlibrarytarget)  属性。

## library <Support list="{['webpack']}" />

- 类型：`string`
- 默认值：`''`

配置 Webpack 的 [output.library](https://webpack.js.org/configuration/output/#outputlibrary)  属性。

## libraryExport <Support list="{['webpack']}" />

- 类型：`string`
- 默认值：`''`

配置 Webpack 的  [output.libraryExport](https://webpack.js.org/configuration/output/#outputlibraryexport)  属性。

## compileDependencies <Support list="{['webpack']}" />

- 类型：`array`
- 默认值：`[]`

默认情况下 babel-loader 会编译相关模块以兼容 IE11。如果需要 babel 去编译 node_modules 下的指定文件，可以在这个配置快捷添加。

比如想编译 node_modules 下的 @alifd/next 依赖，可以进行如下设置：

```json
{
  "compileDependencies": ["@alifd/next"]
}
```

注意：配置为 `"compileDependencies": [""]` 等同于不忽略 `node_modules`。

## cssLoaderOptions <Support list="{['webpack']}" />

- 类型：`object`
- 默认值：`{}`

为 css-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 [css-loader options](https://webpack.js.org/loaders/css-loader/#options)。

## lessLoaderOptions <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：`{}`

为 less-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 [less-loader options](https://webpack.js.org/loaders/less-loader/#options)。

ice.js 目前默认内置 less 4.x 版本，计算函数对于使用 '/' 的方式默认不进行计算，即类似使用 `round(1 / 2)` 的方式将报错，修复方案如下：

```json
{
  "lessLoaderOptions": {
    // 始终计算 / 操作符结果
    "math": 0
  }
}
```

也可以通过包裹括号的方式，让编译器对 `/` 操作符进行计算，比如 `round((1 / 2))`。

## sassLoaderOptions <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：`{}`

为 sass-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 [sass-loader options](https://webpack.js.org/loaders/sass-loader/#options)。

> ice.js 内置使用 sass 进行编译，如果期望使用 node-sass，请在项目中进行依赖

## postcssOptions <Support list="{['webpack', 'vite']}" />

- 类型：`object`
- 默认值：无

配置方式：

```json
{
  "postcssOptions": {
    "plugins": {
      "postcss-preset-env": {
        "browsers": ["last 2 versions"]
      },
      "postcss-import": false,
      "postcss-short": { "prefix": "x" }
    },
    "syntax": "sugarss",
    "parser": "sugarss",
    "stringifier": "sugarss"
  }
}
```

配置规则：

- 工程已内置 `postcss-preset-env`，配置后将自动合并其参数
- 如果工程未内置 postcss 插件，对应配置将会添加到所以样式处理规则的 `postcss-loader` 配置上
- 设置为 `false` 的 postcss 插件，将从配置中移除

## postcssrc <Support list="{['webpack']}" />

- 类型：`boolean`
- 默认值：`false`

适用于需要完全重写 postcss 配置。开启配置项后，工程上将清空内置 postcss 配置，读取 postcss 配置文件 `postcssrc.js` 或 `postcss.config.js` 中的配置。

## ignoreHtmlTemplate <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`false`

开启后，在 `build` 构建时，将移除所有内置 html-webpack-plugin 设置，不再生成 html 文件。

## eslint <Support list="{['webpack', 'vite']}" />

- 类型：`boolean` | `object`
- 默认值：`undefined`

说明：

- `undefined`：即没有设置 eslint 选项，将 eslint 错误输出到终端里
- `false`：不检测 eslint 错误
- `true`：将 eslint 错误展示在预览页面上
- `object`: 仅 Webpack 模式支持，表现等同于 true，支持配置 [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) 的更多参数

## fastRefresh <Support list="{['webpack', 'vite']}" /><Badge text="2.0.0" />

- 类型：`boolean`
- 默认值：`true`

React Fast Refresh 能力，源码修改后无需手动刷新浏览器。

## entry <Support list="{['webpack', 'vite']}" />

- 类型： `string`  | `object`  | `array`
- 默认值：`src/app.[t|j]sx`

一般不建议配置该选项。

## vite <Support list="{['vite']}" /><Badge text="2.0.0" />

- 类型：`boolean`
- 默认值：`false`

开启/关闭 Vite 构建模式

## vitePlugins <Support list="{['vite']}" /><Badge text="2.0.0" />

- 类型：`array`
- 默认值：`[]`

定义 Vite 插件，需要将 `build.json` 切换为 `build.config.[j|t]s`。

```js
// build.config.ts
import vitePlugin from 'vite-plugin-foo';

export default {
   vite: true,
  vitePlugins: [vitePlugin()],
}
```

## remoteRuntime <Support list="{['webpack']}" /><Badge text="2.0.0" />

- 类型：`boolean|object`
- 默认值：`false`

开启 `remoteRuntime` 配置，可以借助 Webpack 5 的 Module Federation 特性提升编译速度：

```json
{
  "remoteRuntime": true
}
```

更多配置和使用场景，请参考[预编译开发模式](/guide/advanced/pre-compile.md)

## swc <Support list="{['webpack']}" /><Badge text="2.0.0" />

- 类型：`object`
- 默认值：无

使用 swc 替代 babel 对源码进行编译，可选配置参数详见 [swc 配置文档](https://swc.rs/docs/configuring-swc)

:::info

开启 swc 后，框架工程会处理内置的 babel 配置，但基于 babel 的自定义配置将会失效，比如设置的 babelPlugins、babelPresets 以及通过自定义插件添加的 babel 配置。

:::

## store <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`true`

开关 store 能力，不再注入 store 相关依赖。

## auth <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`true`

开关权限能力。

## request <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`true`

开关 request 相关能力，关闭后则无法从 `ice` 中导入 request/useRequest API。

## pwa <Support list="{['webpack']}" />

- 类型：`boolean`
- 默认值：`false`

开关 PWA 能力。

## ssr <Support list="{['webpack']}" />

- 类型：`boolean` | `string`
- 默认值：`false`
- 枚举值：`true` | `false` | `"static"`

开关 SSR&SSG 能力。值为 `"static"` 则表示开启 SSG。

## router <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`true`

仅在 SPA 模式下生效，不再引入 react-router 相关依赖，需要配合 `app.renderComponent` 指定要渲染的内容。

## disableRuntime <Support list="{['webpack', 'vite']}" />

:::caution

不推荐使用该选项

:::

- 类型：`boolean`
- 默认值：`false`

禁用所有运行时能力，包含 runApp/路由/状态管理/请求库/权限等，关闭后则需要自行在 entry 中调用 `ReactDOM.render()`。

## tsChecker <Support list="{['webpack', 'vite']}" />

- 类型：`boolean`
- 默认值：`false`

默认关闭 TypeScript 类型检测，如需开启配置为 `true` 即可。

```json
{
  "tsChecker": true
}
```

## babelPlugins <Support list="{['webpack']}" />

- 类型：`array`
- 默认值：`[]`

为 babel-loader 的配置追加额外的 babel plugin。

## babelPresets <Support list="{['webpack']}" />

- 类型：`array`
- 默认值：`[]`

为 babel-loader 的配置追加额外的 babel preset。如果配置 preset 与内置相同，则优先使用 babelPresets 中的配置内容。

## webpackPlugins <Support list="{['webpack']}" />

- 类型：`object`
- 默认值：无

通过 `webpackPlugins` 可以方便地新增或者修改工程上的 Webpack 插件配置。

配置方式：

```json
{
  "webpackPlugins": {
    "webpack.ProvidePlugin": {
      "options": {
        "identifier": "module1"
      }
    },
    "HtmlWebpackPlugin": {
      "before": "webpack.ProvidePlugin"
    }
  }
}
```

配置规则如下：

- 对于 Webpack 内置的 plugins，可以通过 webpack.PluginName 的形式作为 key 值进行配置
- 对于其他 Webpack 插件，需要将插件的 npm 包名作为 key 值进行配置，package.json 中需要添加并安装该插件依赖
- 每一项插件配置支持 before/after 用来调整 Webpack 插件执行顺序
- 如果配置设置的插件已被添加，则修改插件配置

## webpackLoaders <Support list="{['webpack']}" />

- 类型：`object`
- 默认值：无

通过 `webpackLoaders` 可以方便地新增或者修改工程上的 Webpack loader 配置。

配置方式：

```json
{
  "webpackLoaders": {
    "css": {
      "test": ".css$",
      "loaders": {
        "style-loader": {
          "options": {
            "loaderoption": true
          },
          "before": "less-loader"
        }
      }
    }
  }
}
```

配置规则如下：

- webpackLoaders 配置下每一项为具体的 Webpack loader 规则，支持参数
  - test：配置类型 `string|string[]`，同 [Rule.test](https://webpack.js.org/configuration/module/#ruletest)
  - oneOf：配置类型 `[oneOfName: string]: { resourceQuery: string; loaders: Loaders }`，同[Rule.oneOf](https://webpack.js.org/configuration/module/#ruleoneof)
  - includeClear：清除默认 include 配置
  - include：配置类型 `string|string[]`，同 [Rule.include](https://webpack.js.org/configuration/module/#ruleinclude)
  - excludeClear：清除默认 exclude 配置
  - exclude：配置类型 `string|string[]`，同 [Rule.exclude](https://webpack.js.org/configuration/module/#ruleexclude)
  - pre：配置类型 `boolean`，配置 rule 的 enforce 值为 pre
  - post：配置类型 `boolean`，配置 rule 的 enforce 值为 post
  - before：配置类型 `string`，用于配置定义顺序，前置指定
  - after：配置类型 `string`，用于配置定义顺序，后置指定
  - loaders：配置具体的 Webpack loader
- loaders 参数用来指定具体 Webpack loader 的参数；每一项 loader 参数支持 before/after 用来调整 Webpack loader 的执行顺序；如果 loader 名已被添加，则修改插件配置

## terserOptions <Badge text="@deprecated" />

:::caution

**已废弃**，icejs 2.0 版本中请通过 `minify` 字段进行配置

:::

- 类型：`object`
- 默认值：`{}`

以生产环境移除 `console` 为例，可以进行如下配置：

```json
{
  "terserOptions": {
    "compress": {
      "unused": true,
      "drop_console": true
    }
  }
}
```

为 terserPlugin 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 [terser options](https://github.com/terser/terser#minify-options)

## esbuild <Badge text="@deprecated" />

:::caution

**已废弃**，icejs 2.0 版本中请通过 `minify` 字段进行配置

:::

- 类型：`object`
- 默认值：无

使用 esbuild 对构建产物进行压缩，可选配置参考 [esbuild 配置文档](https://github.com/privatenumber/esbuild-loader#minifyplugin)

## modularImportRuntime <Badge text="@deprecated" />

:::caution

**已废弃**，icejs 2.0 版本中 **已默认开启**

:::

- 类型：`boolean`
- 默认值：`true`

开启后将按需加载运行时能力，以减小构建包体积

## injectBabel <Badge text="@deprecated" />

:::caution

**已废弃**，请通过 **polyfill** 配置。

:::

- 类型：`string`
- 默认值：`polyfill`
- 可选值：`"polyfill"` | `"runtime"` | `false`

默认情况下会注入 core-js/stable 和 regenerator-runtime/runtime，根据  `targets`  配置的兼容浏览器进行 polyfill，实现按需添加。 开发类库项目，可以将配置设置为  `runtime`。 如果想手动 polyfill，可以将配置设置为  `false`，工程将不会进行自动的 polyfill。

## dll <Badge text="@deprecated" />

:::caution

**已废弃**，icejs 2.0 版本中请通过 `remoteRuntime` 配置
:::

- 类型：`boolean`
- 默认值：`false`

是否启用 [`DllPlugin`](https://webpack.js.org/plugins/dll-plugin/) 构建 `DLL`。

配置为 `true` 时，默认为 `package.json` `dependencies` 构建 `DLL`。可通过 `dllEntry` 字段配置指定依赖。

启用该选项后，进行 `Webpack` 构建时，会在目录中生成 `dll` 文件夹，包含 `dll` 相关代码。

`dll` 构建产物无需 `git` 提交，建议加到 `.gitignore` 中。

## dllEntry <Badge text="@deprecated" />

:::caution

**已废弃**，icejs 2.0 版本中请通过 `remoteRuntime` 配置

:::

- 类型：`object`
- 默认值：`{}`

开启 `dll` 后，可通过该选项配置指定依赖。
配置格式为：

```javascript
{
  [string]: string[]
}
```

以 `react`、`react-dom` 为例:

```json
{
  "react": ["react", "react-dom"]
}
```

产物如下：

```md
dll // dll 构建产物文件夹
├── 7265616374.dll.js // dllEntry 中配置内容的构建产物。文件名根据 dllEntry 中键生成，此处为 react。
├── 7265616374.manifest.json // DllReferencePlugin 使用
└── dll-pkg.json // build.json 中所配置的 dllEntry 信息
```
