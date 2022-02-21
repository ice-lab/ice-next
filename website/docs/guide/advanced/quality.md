---
title: 代码质量保障
order: 18
---

为了保证代码质量，我们推荐使用 eslint 相关的工具对代码进行检测，同时为了降低常规 lint 工具的使用成本，我们封装了 [@iceworks/spec](https://github.com/ice-lab/spec) 这个 npm 包，基础的 eslint 规则与[阿里巴巴前端规范](https://f2e.alibaba-inc.com/specification/)保持一致。

## 安装依赖

```bash
$ npm i --save-dev @iceworks/spec eslint stylelint @commitlint/cli
```

## 引入配置文件

### eslint

JavaScript 工程：

```javascript
// .eslintrc.js
const { getESLintConfig } = require('@iceworks/spec');
module.exports = getESLintConfig('react');
```

TypeScript 工程：

```javascript
// .eslintrc.js
const { getESLintConfig } = require('@iceworks/spec');
module.exports = getESLintConfig('react-ts');
```

### stylelint

stylelint 用来检测样式代码的风格，新建配置文件 `.stylelintrc.js` 引入 lint 规则：

```javascript
// .stylelintrc.js
const { getStylelintConfig } = require('@iceworks/spec');
module.exports = getStylelintConfig('rax');
```

### commitlint

用于规范 commit message 的规范，防止全是 `fix` 这种无意义的 commit message 导致历史记录追溯比较麻烦，新建配置文件 `.commitlintrc.js` 引入规则：

```javascript
// .commitlintrc.js
const { getCommitlintConfig } = require('@iceworks/spec');
module.exports = getCommitlintConfig('rax');
```

## 配置命令行

通过 `npm scripts` 配置命令：

```json
// package.json
"scripts": {
  "lint": "npm run eslint && npm run stylelint",
  "eslint": "eslint --cache --ext .js,.jsx,.ts,.tsx ./",
  "stylelint": "stylelint **/*.{css,scss,less}"
}
```

这样通过 `npm run lint` 就可以运行 lint 任务了。
