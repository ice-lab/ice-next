---
title: 元素可见
order: 16
---

当需要监测一个元素是否出现在可见区域时（比如列表滚动时是否曝光），可以通过 `VisibilityChange` 来监测指定元素是否当前可见或者消失。

## 监测元素是否可见

```js
import VisibilityChange from '@ice/appear';

export default function Home() {
  return (
    <VisibilityChange
      onAppear={() => {
        console.log('onAppear')
      }}
    >
      show something
    </VisibilityChange>
  )
}
```

## 检测元素是否消失

```js
import VisibilityChange from '@ice/appear';

export default function Home() {
  return (
    <VisibilityChange
      onDisappear={() => {
        console.log('onDisappear')
      }}
    >
      show something
    </VisibilityChange>
  )
}
```
