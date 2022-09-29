import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';
import type { I18nConfig } from './types';

const PLUGIN_NAME = '@ice/plugin-i18n';

const plugin: Plugin<I18nConfig> = (i18nConfig) => {
  ensureCorrectPluginOptions(i18nConfig);
  return {
    name: PLUGIN_NAME,
    setup: ({ addDefineRoutesFunc }) => {
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
                        // @ts-expect-error ts type
                        if (child.children) {
                          debugger;
                          // @ts-expect-error ts type
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
    },
    runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime', 'index.js'),
  };
};

function ensureCorrectPluginOptions(i18nConfig: I18nConfig) {
  const { locales, defaultLocale } = i18nConfig;
  if (!locales) {
    console.error(`[${PLUGIN_NAME}] The plugin option \`locales\` type should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[${PLUGIN_NAME}] The plugin option \`defaultLocale\` type should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}

export default plugin;
