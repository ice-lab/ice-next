---
title: 渐进式 Web 应用 PWA
order: 6
---

icejs 持续为应用提供优秀的性能体验，借助 ice.js 提供的 PWA 能力，您可以：

+ **增强应用的可靠性**：在网络不稳定、即便断网情况下，也能快速访问页面
+ **提升应用性能体验**：根据我们的实际测量，PWA 能大幅提升页面加载速度
+ **简单**：无需关心 Service Worker 的底层 API，快速构建您的 PWA 应用

## 开启 PWA

在工程配置文件 `build.json` 中开启：

```json
{
  "pwa": true
}
```

执行构建命令 `npm run build`，构建产物中会新增 `sw.js` 文件。

```shell
├── css
│   └── index.css
├── js
|   └── index.js
├── favicon.png
├── index.html
└── sw.js
```

## 自定义 PWA 配置

使用方式如下：

```json
{
  "pwa": {
    "sw": "service-workder.js",
    ... // 其他配置项
  }
}
```

配置项如下：

+ `dev` - boolean

是否在 dev 环境下开启 pwa 能力。默认为 `true`。

+ `basename` - string

应用的 [basename](/docs/guide/basic/router/#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE)。若配置应用的 basename，也需要在此进行配置。默认为 `'/'`。

+ `scope` - string

Service Worker 的作用域， 默认为 `'/'`。Service Worker 默认在应用全域生效，若配置 `/app`，则 Service Worker 仅在 `/app` 下生效。

+ `sw` - string

生成的 Service Worker 文件名，默认为 `sw.js`。

+ `runTimeCaching` - Array;

额外的运行时缓存设置。比如修改内置的图片资源的运行时缓存处理：

```js
{
  pwa: {
    runTimeCaching: [{
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,   // 指定缓存的目标
      handler: 'CacheFirst',                                 // 执行缓存的策略
      options: {
        cacheName: 'ice-image-assets',                       // 缓存在 cache 的名字
        expiration: {                                        // 定义过期策略
          maxEntries: 64,
          maxAgeSeconds: 7 * 24 * 60 * 60
        }
      }
    }],
  ...
  }
}
```

该参数的更多配置，可以参考 [RuntimeCachingEntry](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry)。

+ `additionalManifestEntries` - Array;

添加需要额外预缓存的文件。比如：

```js
{
  pwa: {
    additionalManifestEntries: [{
      url: './js/polyfill.js',
    }],
    ...
  }
}
```

+ `skipWaiting` - boolean

当新的 Service Worker 注册成功后，是否立即执行 `skipWaiting`。默认 `true`。


## 添加 Manifest 文件

[Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件是在 JSON 文本文件中提供有关应用程序的信息。Manifest 可以将应用安装到设备的主屏幕。

在 ice 应用中，你可以通过在 `public` 文件下添加一个 `manifest.json` 文件，可参考如下配置：

```json
{
  "name": "ice.js Progressive Web App",
  "short_name": "ice.js pwa",
  "theme_color": "#ffffff",
  "background_color": "#004740",
  "display": "fullscreen",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "splash_pages": null
}
```

icejs 会默认将此文件打包至构建产物目录下，并将其添加至 `index.html` 文件中。


```html
<link rel="manifest" href="/manifest.json">
```

## 部署限制

当试图注册一个在部署在 CDN 上的 Service Worker，在浏览器中会出现这个错误：

```text
Uncaught (in promise) DOMException: Failed to register a ServiceWorker: The origin of the provided scriptURL ('https://cdn.example.com/sw.js') does not match the current origin ('https://www.example.com').
```

因此，生成的 `sw.js` 需要部署到应用的 host 下。

