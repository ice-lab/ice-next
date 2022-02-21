---
title: 前端环境配置
order: 1
---

首先需要安装 [node](https://nodejs.org)，并确保 node 版本是 10.x 版本或以上。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 来管理 node 版本，windows 用户可以参考 [nvm-windows](https://github.com/coreybutler/nvm-windows) 进行安装。下面以在 mac 下安装举例：

```bash
$ curl https://raw.githubusercontent.com/cnpm/nvm/master/install.sh | bash

# 增加以下内容到 ~/.bashrc 或者 ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 使用 nvm 安装 node 的10.22.0版本
$ nvm install 10.22.0

# 使用 10.22.0 版本
$ nvm use 10.22.0

# 验证 node 是否安装成功
$ node -v
v10.22.0
$ npm -v
6.14.6
```

在国内使用 npm 安装依赖可能会比较慢。建议使用国内镜像源进行加速：

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
# 验证 cnpm 安装是否成功
$ cnpm -v
```

除了 npm，我们还可以使用 yarn 作为依赖管理工具：

```bash
$ npm i yarn -g
$ yarn -v
1.22.5
```

如果经常需要切换 npm 镜像源，推荐使用 [nrm](https://github.com/Pana/nrm) 进行管理：

```bash
$ npm install -g nrm
$ nrm ls
$ nrm use taobao
```
