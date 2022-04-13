import consola from 'consola';
import type { UserConfig, Config, Plugin } from '@ice/types';
import type { UserConfigContext } from 'build-scripts';

const mergeDefaultValue = <T>(config: Config, key: string, value: T): Config => {
  if (value) {
    if (typeof value === 'object') {
      return {
        ...config,
        [key]: {
          ...(config[key] || {}),
          ...value,
        },
      };
    } else {
      config[key] = value;
      return config;
    }
  }
  return config;
};

const userConfig = [
  {
    name: 'alias',
    validation: 'object',
    setConfig: (config: Config, alias: UserConfig['alias']) => {
      return mergeDefaultValue(config, 'alias', alias);
    },
  },
  {
    name: 'define',
    validation: 'object',
    setConfig: (config: Config, define: UserConfig['define']) => {
      return mergeDefaultValue(config, 'define', define);
    },
  },
  {
    name: 'devPublicPath',
    validation: 'string',
    setConfig: (config: Config, publicPath: UserConfig['publicPath'], context: UserConfigContext<Config>) => {
      return mergeDefaultValue(config, 'publicPath', context.command === 'start' && publicPath);
    },
  },
  {
    name: 'publicPath',
    validation: 'string',
    setConfig: (config: Config, publicPath: UserConfig['publicPath'], context: UserConfigContext<Config>) => {
      return mergeDefaultValue(config, 'publicPath', context.command === 'build' && publicPath);
    },
  },
  {
    name: 'hash',
    validation: 'string|boolean',
    setConfig: (config: Config, hash: UserConfig['hash']) => {
      return mergeDefaultValue(config, 'hash', hash);
    },
  },
  {
    name: 'externals',
    validation: 'object',
    setConfig: (config: Config, externals: UserConfig['externals']) => {
      return mergeDefaultValue(config, 'externals', externals);
    },
  },
  {
    name: 'outputDir',
    validation: 'string',
    setConfig: (config: Config, outputDir: UserConfig['outputDir']) => {
      return mergeDefaultValue(config, 'outputDir', outputDir);
    },
  },
  {
    name: 'proxy',
    validation: 'object',
    setConfig: (config: Config, proxy: UserConfig['proxy']) => {
      return mergeDefaultValue(config, 'proxy', proxy);
    },
  },
  {
    name: 'filename',
    validation: 'string',
    setConfig: (config: Config, filename: UserConfig['filename']) => {
      if (filename) {
        const configFilename: Config['configureWebpack'][0] = (webpackConfig) => {
          webpackConfig.output.filename = filename;
          return webpackConfig;
        };
        config.configureWebpack = [...(config.configureWebpack || []), configFilename];
      }
    },
  },
  {
    name: 'ssg',
    validation: 'boolean',
  },
  {
    name: 'ssr',
    validation: 'boolean',
  },
  {
    name: 'webpack',
    validation: 'function',
    setConfig: (config: Config, configureWebpack: UserConfig['webpack']) => {
      if (configureWebpack) {
        // create warning for user
        const customConfigWebpack: Config['configureWebpack'][0] = (...args) => {
          consola.warn('It is not recommended to configure webpack directly.');
          return configureWebpack(...args);
        };
        config.configureWebpack = [...(config.configureWebpack || []), customConfigWebpack];
      }
    },
  },
  {
    name: 'minify',
    validation: 'boolean',
    setConfig: (config: Config, minify: UserConfig['minify']) => {
      return mergeDefaultValue(config, 'minify', minify);
    },
  },
  {
    name: 'dropLogLevel',
    validation: 'string',
    setConfig: (config: Config, dropLogLevel: UserConfig['dropLogLevel']) => {
      const levels = {
        trace: 0,
        debug: 1, // debug is alias for log
        log: 1,
        info: 2,
        warn: 3,
        error: 4,
      };
      const level = levels[dropLogLevel];
      if (typeof level === 'number') {
        return mergeDefaultValue(config, 'minimizerOptions', {
          compress: {
            pure_funcs: Object.keys(levels)
              .filter((methodName) => levels[methodName] <= level)
              .map(methodName => `console.${methodName}`),
          },
        });
      } else {
        consola.warn(`dropLogLevel only support [${Object.keys(levels).join(',')}]`);
      }
    },
  },
];

const cliOptions = [
  {
    name: 'disableOpen',
    commands: ['start'],
  },
];

const configPlugin: Plugin = ({ registerUserConfig, registerCliOption }) => {
  registerUserConfig(userConfig);
  registerCliOption(cliOptions);
};

export default configPlugin;
