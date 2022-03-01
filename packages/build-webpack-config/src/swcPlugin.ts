import { createUnplugin } from 'unplugin';
import { transform } from '@builder/swc';
import path from 'path';
import lodash from '@builder/pack/deps/lodash/lodash.js';
import type { Config } from '@ice/types';

const { merge } = lodash;

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  rootDir: string;
  dev: boolean;
  sourceMap?: Config['sourceMap'];
}

const unplugin = createUnplugin((options: Options) => {
  const { rootDir, sourceMap, dev } = options;
  return {
    name: 'swc-plugin',
    async transform(source: string, id: string) {
      // TODO specific runtime plugin name
      if (/node_modules/.test(id) && !/[\\/]runtime[\\/]/.test(id)) {
        return;
      }

      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));
      if (!suffix) {
        return;
      }

      const programmaticOptions = {
        filename: id,
        sourceMaps: !!sourceMap,
        ...getSwcTransformOptions({ suffix, rootDir, dev }),
      };
      const output = await transform(source, programmaticOptions);
      const { code, map } = output;

      return { code, map };
    },
  };
});

function getSwcTransformOptions({
  suffix,
  rootDir,
  dev,
}: {
    suffix: JSXSuffix;
    rootDir: string;
    dev: boolean;
  }) {
  const baseReactTransformConfig = {
    // development: dev,
    // refresh: dev,
   };
  const reactTransformConfig = merge(baseReactTransformConfig, hasJsxRuntime(rootDir) ? { runtime: 'automatic' } : {});

  const commonOptions = {
    jsc: {
      transform: {
        react: reactTransformConfig,
        legacyDecorator: true,
      },
      externalHelpers: false,
    },
    module: {
      type: 'es6',
      noInterop: false,
      // webpack will evaluate dynamic import, so there need preserve it
      ignoreDynamic: true,
    },
    env: {
      loose: true,
      targets: 'last 2 versions',
    },
  };

  const jsOptions = merge({
    jsc: {
      parser: {
        jsx: true,
        dynamicImport: true,
        functionBind: true,
        exportDefaultFrom: true,
        exportNamespaceFrom: true,
        decorators: true,
      },
    },
  }, commonOptions);

  const tsOptions = merge({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
        dynamicImport: true,
      },
    },
  }, commonOptions);

  if (suffix === 'jsx') {
    return jsOptions;
  } else if (suffix === 'tsx') {
    return tsOptions;
  }
  return commonOptions;
}

function hasJsxRuntime(rootDir: string) {
  try {
    // auto detect of jsx runtime
    // eslint-disable-next-line
    const tsConfig = require(path.join(rootDir, 'tsconfig.json'));
    if (tsConfig?.compilerOptions?.jsx !== 'react-jsx') {
      return false;
    }
    // ensure react/jsx-runtime
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
}

const webpackPlugin = unplugin.webpack;

export default webpackPlugin;
