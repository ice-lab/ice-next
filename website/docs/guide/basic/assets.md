---
title: 静态资源
order: 7
---

ice.js 内置了大量规则处理静态资源，一般情况下开发者无需设置资源的处理方式，而对于一些特殊的处理规则框架同样给出了便捷方式和指引。

## 基础规则

框架内置了针对以下资源的处理：

- 图片资源：`.png`、`.jpg`、`.webp`、`.jpeg`、`.gif`
- 字体文件：`.woff`、`.woff2`、`.ttf`、`.eot`
- svg 文件：`.svg`

上述资源默认会被编译并通过资源地址加载（比如 `./assets/background.png` 会被编译构建成 `/assets/background.ef5b6544.png`）。推荐将这些资源放在 `src/assets/` 目录下：

```markdown
src
├── assets/
│ ├── logo.png
│ └── background.png
```

然后就可以在源码中引入资源了。

### 在 JSX 文件中引入

```jsx
import background from '@/assets/background.png';

export default function () {
  return (
    <img src={background} />
  )
}
```

### 在 CSS 文件中引入

```css
.container {
  background-image: url('@/assets/background.png');
}
```

:::tip

如果资源尺寸小于 8kb，则进行 base64 转码并内联到脚本或样式文件中。

:::

## 指定处理规则

对于内置规则不满足特定场景的情况下，框架提供了便捷的方式对资源进行处理

### URL 引入

除基础规则中指定资源外，如果还希望通过资源地址的方式进行资源处理的，可以通过如下方式进行指定：

```jsx
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL);
```

`?url` 等同于为指定资源指定 url-loader

### 文件内容引入

通过 `?raw` 后缀声明将资源作为字符串引入：

```jsx
import txtContent from './text.txt?raw';
```

`?raw` 等同于为指定资源指定 raw-loader

## public 目录

`public/` 目录作为框架默认的静态资源目录，不被构建工具进行编译的资源都可以放在该目录下。

比如 `favicon.ico` 文件，我们并不希望该文件名编译（默认静态资源文件名在编译后会生成独立 hash，`favicon.ico` 希望保持原有文件名），在使用时直接在 Document 组件中进行引用：

```jsx
export default function Document() {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        ...
      </body>
    </html>
  );
}
```

另外像不被源码引入的资源也存放在 `public` 目录下，比如 `robots.txt`。

:::caution

- `public` 目录中的资源在开发时应该要通过 `/` 根路径进行访问（`public/icon.svg` 应该在源码中被引用为 `/icon.svg`），并且打包时会被完整复制到目标目录的根目录下
- `public` 中的资源不应该被 JavaScript 文件（除 `src/document.jsx`）或者 CSS 文件引用
:::
