# @ice/plugin-rax-compat

ICE plugin for migrating `rax-app` project into `ICE`.

## Usage

Add plugin in `ice.config.mts`:

```js
import { defineConfig } from 'ice';
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  plugins: [compatRax({ /* options */ })],
});
```

## Options

- inlineStyle: 
  - Enable stylesheet loader to import CSS files.
  - default to `false`.
  
