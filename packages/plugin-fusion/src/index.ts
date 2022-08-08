import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
// import styleImportPlugin from '@ice/style-import';

interface PluginOptions {
  theme?: Record<string, string>;
  themePackage?: string;
  importStyle?: Boolean | string;
}

const require = createRequire(import.meta.url);

function getVariablesPath({
  packageName,
  filename = 'variables.scss',
  silent = false,
}) {
  let filePath = '';
  const variables = `${packageName}/${filename}`;
  try {
    filePath = require.resolve(variables);
  } catch (err) {
    if (!silent) {
      console.log('[ERROR]', `fail to resolve ${variables}`);
    }
  }
  return filePath;
}

const plugin: Plugin<PluginOptions> = (options = {}) => ({
  name: '@ice/plugin-fusion',
  setup: ({ onGetConfig }) => {
    const { theme, themePackage } = options;
    /* if (importStyle) {
      onGetConfig((config) => {
        config.transformPlugins = [...(config.transformPlugins || []), styleImportPlugin({
          libraryName: 'antd',
          style: (name) => `@alifd/next/es/${name.toLocaleLowerCase()}/style2`,
        })];
      });
    } */
    if (theme || themePackage) {
      onGetConfig((config) => {
        // Modify webpack config of scss rule for fusion theme.
        config.configureWebpack ??= [];
        config.configureWebpack.push((webpackConfig) => {
          const { rules } = webpackConfig.module;
          let sassLoader = null;
          rules.some((rule) => {
            if (typeof rule === 'object' &&
            rule.test instanceof RegExp &&
            rule?.test?.source?.match(/scss/)) {
              sassLoader = Array.isArray(rule?.use) &&
                rule.use.find((use) => typeof use === 'object' && use.loader.includes('sass-loader'));
              return true;
            }
            return false;
          });
          if (sassLoader) {
            let additionalContent = '';
            if (themePackage) {
              const themeFile = getVariablesPath({
                packageName: themePackage,
              });
              if (themeFile) {
                additionalContent += `@import '${themePackage}/variables.scss'`;
              }
              // Try to get icon.scss if exists.
              const iconFile = getVariablesPath({
                packageName: themePackage,
                filename: 'icons.scss',
                silent: true,
              });
              if (iconFile) {
                additionalContent += `@import '${themePackage}/icons.scss'`;
              }
            }
            let themeConfig = [];
            Object.keys(theme || {}).forEach((key) => {
              themeConfig.push(`$${key}: ${theme[key]};`);
            });
            additionalContent += themeConfig.join('\n');

            const loaderOptions = sassLoader.options || {};
            sassLoader.options = {
              ...loaderOptions,
              additionalData: (content, loaderContext) => {
                const originalContent = typeof loaderOptions.additionalData === 'function'
                  ? loaderOptions.additionalData(content, loaderContext)
                  : `${loaderOptions.additionalData || ''}${content}`;
                return `${additionalContent}\n${originalContent}`;
              },
            };
          }
          return webpackConfig;
        });
      });
    }
  },
});

export default plugin;
