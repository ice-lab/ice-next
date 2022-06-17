import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import type { RuleSetRule } from 'webpack';

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
  test: /\.css$/,
  use: [
    {
      loader: require.resolve('stylesheet-loader'),
      options: {},
    },
  ],
};

function getPlugin(options: CompatRaxOptions): Plugin {
  return ({ onGetConfig }) => {
    onGetConfig((config) => {
      Object.assign(config.alias, alias);
      if (options.inlineStyle) {
        config.configureWebpack ??= [];
        config.configureWebpack.unshift((config) => {
          const { rules } = config.module || {};
          if (Array.isArray(rules)) {
            for (let i = 0, l = rules.length; i < l; i++) {
              const rule: RuleSetRule | any = rules[i];
              if (rule.test && rule.test.source.indexOf('.css') > -1) {
                rules[i] = ruleSetStylesheet;
              }
            }
          }
          return config;
        });
      }
    });
  };
}

export interface CompatRaxOptions {
  inlineStyle?: boolean;
}

export default (options: CompatRaxOptions | void) => ({
  name: '@ice/plugin-rax-compat',
  plugin: getPlugin(options || {}),
});
