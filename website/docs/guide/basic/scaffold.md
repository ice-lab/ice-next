---
title: 脚手架
order: 3
---

## 初始化应用

可以选择使用 npm 或 pnpm 等工具进行项目初始化。有两种初始方式：

```bash
# 1. 当前目录初始项目
$ mkdir ice-app && cd ice-app
# npm
$ npx create-ice --template ice-scaffold-simple
# pnpm
$ pnpx create-ice --template ice-scaffold-simple

# 2. 指定目录初始项目
# npm
$ npx create-ice <projectName> --template ice-scaffold-simple
# pnpm
$ pnpx create-ice <projectName> --template ice-scaffold-simple   
```

## 启动调试

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
![img](https://img.alicdn.com/imgextra/i1/O1CN01wu2tKv1vctzonOD8L_!!6000000006194-2-tps-1094-1132.png_790x10000.jpg)