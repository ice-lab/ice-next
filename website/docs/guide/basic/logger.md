---
title: 日志打印
order: 12
---

import Badge from '../../../src/components/Badge'

前端应用中常见的使用最多的毋庸置疑是 `console.log`，然而很多时候我们只希望在开发环境中打印日志，在生产环境中则不打印日志，或者设置日志的级别，避免开发环境的调试日志在生产环境中出现，这便是框架内置提供的日志功能的初衷。

## 日志分类

框架日志分为以下几个级别：

* `console.trace(msg)`：输出一个堆栈跟踪
* `console.debug(msg)`：输出一个调试日志
* `console.log(msg)`：输出一个信息日志
* `console.warn(msg)`：输出一个警告日志
* `console.error(msg)`：输出一个错误日志

## 使用场景

### 构建后移除 `console.log` 相关代码 <Badge text="2.0.0" />

在 `build.json` 中配置 `dropLogLevel` 选项：

```json
{
  "dropLogLevel": "log"
}
```

如上配置后，最终产物中将会移除所有 `log` 级别以及以下的代码：`console.trace|console.debug|console.log`。

## 版本升级

### 将 logger 从 NPM 包 `loglevel` 重定向到 `console.*`

icejs 2.0 不再依赖 loglevel，减少包体积，原先的 logger 使用方式保持兼容：

```diff
- import { logger } from 'ice';

- logger.info('log info');  // 可用但不推荐，等价于 console.*
+ console.log('log info');
```

### 废弃 loglevel 以及 smartLoglevel 配置项

由于缺乏实际的使用场景，icejs 2.0 废弃这两个配置，不推荐使用。
