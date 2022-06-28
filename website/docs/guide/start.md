---
title: 快速开始
order: 2
---

## 创建应用

在终端执行以下命令：

```bash
# npm
$ npx create-ice ice-app --template ice-scaffold-simple
# pnpm
$ pnpx create-ice ice-app --template ice-scaffold-simple   
```

看到如下信息说明项目创建成功：

```bash
✔ download npm tarball successfully.
info clean package.json...
Initialize project successfully.
Starts the development server.

    cd ice-app
    npm install
    npm start
```

## 本地调试

首先需要安装项目依赖：

```bash
# 进入项目目录
$ cd ice-app
# 安装依赖
$ pnpm install
```

安装依赖完成以后，执行以下命令以启动调试：

```bash
# 启动调试
$ pnpm start
```

此时会自动打开浏览器窗口并访问 <http://localhost:3333>，这时会看到默认页面。

## 部署发布

执行以下命令以构建生产环境产物：

```bash
# 打包构建
$ pnpm build
```

产物默认生成到 `build` 目录下：

```markdown
./build
├── css
|  └── index.css
├── index.html
├── js
|  ├── home.js
|  ├── framework.js
|  ├── index.js
|  ├── main.js
|  └── runtime~main.js
└── server
   ├── chunk-TV7GBSEJ.mjs
   ├── index.mjs
   └── pages-PEJFEQVO.mjs
```

这时你可以把 `build` 目录部署到服务器上。
