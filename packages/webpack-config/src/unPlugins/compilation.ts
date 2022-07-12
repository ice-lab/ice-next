import { createRequire } from 'module';
import swc from '@swc/core';
import type { Options as SwcConfig, ReactConfig } from '@swc/core';
import type { UnpluginOptions } from 'unplugin';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';

const { merge } = lodash;
const require = createRequire(import.meta.url);

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  mode: 'development' | 'production' | 'none';
  fastRefresh: boolean;
  compileIncludes?: (string | RegExp)[];
  sourceMap?: Config['sourceMap'];
  compileExcludes?: RegExp[];
  swcOptions?: Config['swcOptions'];
}

const compilationPlugin = (options: Options): UnpluginOptions => {
  const { sourceMap, mode, fastRefresh, compileIncludes = [], compileExcludes, swcOptions = {} } = options;
  const compileRegex = compileIncludes.map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });

  const extensionRegex = /\.(jsx?|tsx?|mjs)$/;
  return {
    name: 'compilation-plugin',
    transformInclude(id) {
      return extensionRegex.test(id) && !compileExcludes.some((regex) => regex.test(id));
    },
    // @ts-expect-error TODO: source map types
    async transform(source: string, id: string) {
      if ((/node_modules/.test(id) && !compileRegex.some((regex) => regex.test(id)))) {
        return;
      }

      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));

      const programmaticOptions: SwcConfig = {
        filename: id,
      };

      const commonOptions = getJsxTransformOptions({ suffix, fastRefresh });

      // auto detect development mode
      if (
        mode &&
        commonOptions?.jsc?.transform?.react &&
        !Object.prototype.hasOwnProperty.call(commonOptions.jsc.transform.react, 'development')
      ) {
        commonOptions.jsc.transform.react.development = mode === 'development';
      }

      Object.assign(programmaticOptions, { sourceMaps: !!sourceMap }, commonOptions);

      const { removeExportExprs } = swcOptions;
      if (removeExportExprs && /(.*)pages(.*)\.(jsx?|tsx?|mjs)$/.test(id)) {
        merge(programmaticOptions, {
          jsc: {
            experimental: {
              plugins: [
                [
                  require.resolve('@ice/swc-plugin-remove-export'),
                  removeExportExprs,
                ],
              ],
            },
          },
        });
      }

      try {
        const output = await swc.transform(source, programmaticOptions);

        const { code } = output;
        let { map } = output;
        // FIXME: swc transform should return the sourcemap which the type is object
        if (typeof map === 'string') {
          // map require object type
          map = JSON.parse(map);
        }
        return { code, map };
      } catch (e) {
        // catch error for Unhandled promise rejection
        console.error(e);
      }
    },
  };
};

interface GetJsxTransformOptions {
  suffix: JSXSuffix;
  fastRefresh: boolean;
}

function getJsxTransformOptions({
  suffix,
  fastRefresh,
}: GetJsxTransformOptions) {
  const reactTransformConfig: ReactConfig = {
    refresh: fastRefresh,
    runtime: 'automatic',
    importSource: '@ice/runtime', // The exact import source is '@ice/runtime/jsx-runtime'
  };

  const commonOptions: SwcConfig = {
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
    },
    env: {
      loose: true,
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

export default compilationPlugin;
