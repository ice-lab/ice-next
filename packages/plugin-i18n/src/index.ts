import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';
import type { I18nConfig } from './types';
import { DEFAULT_PLUGIN_CONFIG, PLUGIN_NAME } from './constants.js';
import createI18nMiddleware from './createI18nMiddleware.js';

const plugin: Plugin<I18nConfig> = (originI18nConfig) => {
  ensureCorrectPluginOptions(originI18nConfig);

  const i18nConfig = mergeDefaultConfig(originI18nConfig);

  return {
    name: PLUGIN_NAME,
    setup: ({ addDefineRoutesFunc, onGetConfig, setData, generator, context: { userConfig, ...rest } }) => {
      // The i18nConfig is for the runtime to use.
      setData(PLUGIN_NAME, i18nConfig);
      // Register API: `import { useLocale, withLocale } from 'ice';`
      generator.addExport({
        specifier: ['withLocale', 'useLocale'],
        source: '@ice/plugin-i18n/esm/runtime/I18nContext',
      });

      if (userConfig.ssr) {
        onGetConfig(config => {
          config.middlewares = (middlewares) => {
            const newMiddlewares = [...middlewares];
            // TODO: how to get the app.router.basename
            const basename = config.basename || '/';
            const i18nMiddleware = createI18nMiddleware(i18nConfig, basename);
            const serverRenderMiddlewareIndex = newMiddlewares.findIndex((middleware) => middleware.name === 'server-render');
            newMiddlewares.splice(serverRenderMiddlewareIndex, 0, i18nMiddleware);

            return newMiddlewares;
          };
        });
      }
      // Add locale prefixed path.
      if (i18nConfig.i18nRouting) {
        const defineRoutes: Parameters<typeof addDefineRoutesFunc>[0] = (defineRoute, options) => {
          const prefixedLocales = i18nConfig.locales.filter(locale => locale !== i18nConfig.defaultLocale);
          prefixedLocales.forEach(prefixedLocale => {
            options.nestedRouteManifest.forEach((route) => {
              const newRoutePath = `${prefixedLocale}/${route.path || ''}`;
              const newRouteId = `${prefixedLocale}/${route.id}`;
              defineRoute(
                newRoutePath,
                route.file,
                { index: route.index, id: newRouteId },
                () => {
                  function defineChildrenRoutes(children: typeof route.children) {
                    children.forEach(child => {
                      const newChildRouteId = `${prefixedLocale}/${child.id}`;
                      defineRoute(
                        child.path,
                        child.file,
                        { index: child.index, id: newChildRouteId },
                        () => {
                          if (child.children) {
                            defineChildrenRoutes(child.children);
                          }
                        });
                    });
                  }
                  route.children && defineChildrenRoutes(route.children);
                });
            });
          });
        };
        addDefineRoutesFunc(defineRoutes);
      }
    },
    runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime/index.js'),
  };
};

function ensureCorrectPluginOptions(i18nConfig: I18nConfig) {
  const { locales, defaultLocale } = i18nConfig;
  if (!locales) {
    console.error(`[${PLUGIN_NAME}] The plugin option \`locales\` type should array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[${PLUGIN_NAME}] The plugin option \`defaultLocale\` type should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}

function mergeDefaultConfig(i18nConfig: I18nConfig): I18nConfig {
  return { ...DEFAULT_PLUGIN_CONFIG, ...i18nConfig };
}

export default plugin;
