# @ice/plugin-proposal-export-default-from

ICE plugin to support proposal-export-default-from

transform code:

```js
export default from './Component';
```

to:

```js
export { default } from './Component';
```
