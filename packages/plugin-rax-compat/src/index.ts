import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import type { RuleSetRule } from 'webpack';
import consola from 'consola';
import merge from 'lodash.merge';

const require = createRequire(import.meta.url);

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
        config.configureWebpack ??= [];
        config.configureWebpack.unshift((config) => {
          const { rules } = config.module || {};
          if (Array.isArray(rules)) {
            for (let i = 0, l = rules.length; i < l; i++) {
              const rule: RuleSetRule | any = rules[i];
              // Find the css rule, that default to CSS Modules.
              if (rule?.test?.source?.indexOf('.css') > -1) {
                rule.test = /\.module\.css$/i;
                rules[i] = {
                  test: /\.css$/i,
                  oneOf: [
                    rule,
                    ruleSetStylesheet,
                  ],
                };
              }
            }
          }
          return config;
        });
      }
    });
  },
});

export default plugin;
