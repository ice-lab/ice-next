import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import type { RuleSetRule } from 'webpack';
import consola from 'consola';
import merge from 'lodash.merge';
import { transformSync } from '@babel/core';
import styleSheetLoader from './transform-styles.js';

const require = createRequire(import.meta.url);

const jsRegex = /\.(jsx?|tsx?|mjs)$/;

const alias = {
  // Add rax compat packages.
  rax: require.resolve('rax-compat'),
  'rax-children': require.resolve('rax-compat/children'),
  'rax-clone-element': require.resolve('rax-compat/clone-element'),
  'rax-create-class': require.resolve('rax-compat/create-class'),
  'rax-create-factory': require.resolve('rax-compat/create-factory'),
  'rax-create-portal': require.resolve('rax-compat/create-portal'),
  'rax-find-dom-node': require.resolve('rax-compat/find-dom-node'),
  'rax-is-valid-element': require.resolve('rax-compat/is-valid-element'),
  'rax-unmount-component-at-node': require.resolve('rax-compat/unmount-component-at-node'),
};

const ruleSetStylesheet = {
  test: /\.css$/i,
  use: [
    {
      loader: require.resolve('stylesheet-loader'),
      options: {},
    },
  ],
};

const ruleSetStylesheetForLess = {
  test: /\.less$/i,
  use: [
    {
      loader: require.resolve('stylesheet-loader'),
      options: {},
    },
    {
      loader: require.resolve('@ice/bundles/compiled/less-loader'),
      options: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  ],
};

let warnOnce = false;

export interface CompatRaxOptions {
  inlineStyle?: boolean;
}

const plugin: Plugin<CompatRaxOptions> = (options = {}) => ({
  name: '@ice/plugin-rax-compat',
  setup: ({ onGetConfig }) => {
    onGetConfig((config) => {
      // Reset jsc.transform.react.runtime to classic.
      config.swcOptions = merge(config.swcOptions || {}, {
        compilationConfig: {
          jsc: {
            transform: {
              react: {
                runtime: 'classic',
                pragma: 'createElement',
                pragmaFrag: 'Fragment',
              },
            },
          },
        },
      });

      if (!config.server) {
        config.server = {};
      }
      const originalOptions = config.server.buildOptions;
      config.server.buildOptions = (options) => ({
        ...(originalOptions ? originalOptions(options) : options),
        jsx: 'transform',
        jsxFactory: 'createElement',
        jsxFragment: 'Fragment',
      });
      Object.assign(config.alias, alias);

      if (options.inlineStyle) {
        if (!warnOnce) {
          consola.warn('Enabling inline style is not recommended.\n       It is recommended to use CSS modules (as default). Only allow old projects to migrate and use.');
          warnOnce = true;
        }

        applyStylesheetLoaderForServer(config);
        applyStylesheetLoader(config);
        transformClassNameToStyle(config);
      }
    });
  },
});

function applyStylesheetLoader(config) {
  config.configureWebpack ??= [];
  config.configureWebpack.unshift((config) => {
    const { rules } = config.module || {};
    if (Array.isArray(rules)) {
      for (let i = 0, l = rules.length; i < l; i++) {
        const rule: RuleSetRule | any = rules[i];
        // Find the css rule, that default to CSS Modules.
        if (rule.test && rule.test.source && rule.test.source.indexOf('.css') > -1) {
          rule.test = /\.module\.css$/i;
          rules[i] = {
            test: /\.css$/i,
            oneOf: [
              rule,
              ruleSetStylesheet,
            ],
          };
        }

        // Find and replace the less rule
        if (rule.test && rule.test.source && rule.test.source.indexOf('.less') > -1) {
          rules[i] = {
            test: /\.less$/i,
            oneOf: [
              ruleSetStylesheetForLess,
            ],
          };
        }
      }
    }
    return config;
  });
}

function transformClassNameToStyle(config) {
  config.transforms = [...(config.transforms || []), async (sourceCode, id) => {
    // js file transform with rax-platform-loader and babel-plugin-transform-jsx-stylesheet
    if (id.includes('node_modules') && id.includes('react')) {
      return;
    }

    if (jsRegex.test(id)) {
      const parserPlugins = [
        'jsx',
        'importMeta',
        'topLevelAwait',
        'classProperties',
        'classPrivateMethods',
      ];
      if (/\.tsx?$/.test(id)) {
        // when routes file is a typescript file,
        // add ts parser plugins
        parserPlugins.push('typescript');
        parserPlugins.push('decorators-legacy'); // allowing decorators by default
      }
      const { code, map } = transformSync(sourceCode, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          // ts syntax had already been transformed by swc plugin.
          plugins: parserPlugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true,
        },
        sourceFileName: id,
        plugins: [
          [require.resolve('babel-plugin-transform-jsx-stylesheet'), {
            retainClassName: true,
          }],
          require.resolve('@babel/plugin-proposal-export-default-from'),
        ],
      });
      return {
        code,
        map,
      };
    }
  }];
}

function applyStylesheetLoaderForServer(config) {
  const currentBuildOptions = config.server?.buildOptions;

  config.server = {
    ...config.server,
    buildOptions: (buildOptions) => {
      console.log('reset buildOptions');
      const currentOptions = currentBuildOptions?.(buildOptions) || buildOptions;
      // Remove esbuild-empty-css while use inline style.
      currentOptions.plugins = currentOptions.plugins?.filter(({ name }) => name !== 'esbuild-empty-css');
      const cssModuleIndex = currentOptions.plugins?.findIndex(({ name }) => name === 'esbuild-css-modules');
      // Add custom transform for server compile.
      currentOptions.plugins?.splice(cssModuleIndex as number, 0, inlineStylePlugin());

      console.warn('esbuild options ---');
      console.warn(currentOptions.plugins);
      currentOptions.treeShaking = true;
      return currentOptions;
    },
  };
}

const inlineStylePlugin = () => {
  return {
    name: 'esbuild-inline-style',
    setup: (build) => {
      build.onResolve({ filter: /\.(css|sass|scss|less)$/ }, (args) => {
        // golang not support the following regexp, we use javascript to determine again
        if (/(?<!.module)\.(css|sass|scss|less)$/.test(args.path)) {
          const absolutePath = path.resolve(args.resolveDir, args.path);
          return {
            path: absolutePath,
            namespace: 'css-content',
          };
        }
      });

      build.onLoad({ filter: /.*/, namespace: 'css-content' }, async (args) => {
        console.log(args.path);

        const cssContent = fs.readFileSync(args.path, 'utf8');
        const content = await styleSheetLoader(cssContent, args.path.includes('.less') ? 'less' : 'css');

        return {
          contents: content,
          loader: 'js',
        };
      });
    },
  };
};

export default plugin;
