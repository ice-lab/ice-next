---
title: jsx plus
order: 8
---

import Support from '../../../src/components/Support'

<Support list={['webpack', 'vite']} />

该插件支持了一种 JSX 扩展语法 JSX+，它能帮助业务开发者更爽更快地书写 JSX。JSX+ 不是一种新的概念，它是 JSX 基础上的扩展指令概念。

- JSX 虽然语法灵活，但是大量的花括号 + JS 语法导致了上下文切换和代码可读性的下降，JSX+ 的指令很好的解决了这个问题
- JSX 本质是 JS 表达式，在运行时阶段才可以计算出真实的 DOM 结构，JSX+ 引入了一部分静态模板特性可以满足编译优化
- 不新创造实体，指令在社区中是已经被广泛接受的概念，对开发者更友好，语法糖的表达更简单
- 统一一套 JSX+ 类似概念的语法规范，减少已存在和潜在的重复建设

## Install

```bash
$ npm i --save-dev build-plugin-jsx-plus
```

## Usage

```json
{
  "plugins": ["build-plugin-jsx-plus"]
}
```

接下来就可以使用更强大的 jsx 语法了：

```jsx
function ExampleComponent(props) {
  const { isAdmin, dataSource } = props;

  return (
    <>
      <div x-if={isAdmin}>admin</div>
      <div x-else>guest</div>

      <div x-for={item in dataSource}>
        <span>{item.name}</span>
      </div>
    </>
  );
}
```

更多语法请参考 [jsx-plus](https://github.com/jsx-plus/jsx-plus/blob/master/README.zh_CN.md)
