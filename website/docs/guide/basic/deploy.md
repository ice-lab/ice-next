---
title: 发布部署
order: 10
---

前端代码开发完成后，我们会执行 `npm build` 命令进行项目构建。构建完成后，我们需要把 js/css/html 等静态资源部署到服务器或者发布到 CDN 上。

## 资源发布

如果是博客、官网等静态应用，推荐使用以下的方式进行部署：

### CDN 发布

推荐通过 [阿里云 OSS](https://www.aliyun.com/product/oss) 服务进行非覆盖式发布，每个版本建一个 `x.y.z` 的文件夹，然后将整个 `build` 目录复制进去，接着就可以通过 url 访问这些 CDN 资源了。

### 后端服务托管

把构建好的 `build` 资源复制到对应目录下，然后可使用 Nginx 或者 web 应用框架（比如 [Express.js](https://expressjs.com/)、[Koa.js](https://koajs.com/) 等）启动静态文件服务器。下面以 Nginx 为例：

```
location / {
    root   /www/build;
    # 访问 localhost:3000/a 依次查找 /www/build/a、/www/build/a/index.html、/www/build/404.html
    try_files $uri $uri/ 404.html;
}
```

### HTML 托管服务

本章节讲解如何在 HTML 托管服务中集成前端资源，我们以 [surge](https://surge.sh/) 为例。

#### 全局安装 surge

```bash
$ npm install --global surge
```

#### 运行 surge

以 `ice-demo` 项目名，ice 项目默认构建目录 `build` 为例：

```bash
$ cd ice-demo/build
# 启动 surge 服务
$ surge
```

依次确认账户， projectPath， domain 等信息，等待上传生效即可，详见 [surge](https://surge.sh/) 官方说明

其他同类产品

- [github pages](https://pages.github.com/)
- [netlify](https://www.netlify.com/)

## 后端应用集成

### Java 应用
新建 `/velocity/layout/index.vm`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <title>ICE Design Lite</title>
    <link rel="shortcut icon" href="$!publicPath/favicon.png" />
    <link href="$!publicPath/css/index.css" rel="stylesheet" />
  </head>

  <body>
    <div id="ice-container"></div>
    <script type="text/javascript" src="$!publicPath/js/index.js"></script>
  </body>
</html>
```

## FAQ
