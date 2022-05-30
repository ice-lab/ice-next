---
title: 快速开始
order: 2
---

## 环境准备

### Node.js

开发前端应用前需要安装 [Node.js](https://nodejs.org)，并确保 node 版本是 14.x 或以上。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 来管理 node 版本，windows 用户可以参考 [nvm-windows](https://github.com/coreybutler/nvm-windows) 进行安装。下面以在 mac 下安装 nvm 为例：

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 安装 node 14 版本
$ nvm install 14

# 使用 node 14
$ nvm use 14

# 验证 node 是否安装成功
$ node -v
v14.19.3
```

在国内使用 npm 安装依赖可能会比较慢。建议使用国内镜像源进行加速：

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
# 验证 cnpm 安装是否成功
$ cnpm -v
```

### 包管理工具

安装 Node.js 后，默认会包含 npm。除此以外，还有其他的包管理工具：

- [pnpm](https://pnpm.io/)（快速高效的包管理工具，推荐使用）
- [cnpm](https://www.npmjs.com/package/cnpm)
- [yarn](https://yarnpkg.com/)

安装 pnpm 示例如下：

```bash
$ npm i pnpm -g --register=https://registry.npmmirror.com/
# 验证 pnpm 安装是否成功
$ pnpm -v
7.1.7
```

如果经常需要切换 npm 镜像源，推荐使用 [nrm](https://github.com/Pana/nrm) 进行管理：

```bash
$ npm install -g nrm
# 验证 nrm 是否安装成功
$ nrm --version
# 查看所有镜像源
$ nrm ls
# 推荐使用淘宝镜像源
nrm use taobao
```

### IDE

推荐使用 IDE 进行前端应用开发和调试。目前比较流行的有：

- [Visual Studio Code](https://code.visualstudio.com/)（推荐）
- [WebStorm](https://www.jetbrains.com/webstorm/)

## 创建应用

在终端执行以下命令：

```bash
pnpx ice ice-app --template ice-scaffold-simple
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

首先需要安装依赖：

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
