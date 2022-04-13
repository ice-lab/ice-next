import { certificateFor } from 'trusted-cert';
import fse from 'fs-extra';
import consola from 'consola';
import type { UserConfig, Config, Plugin } from '@ice/types';
import type { CommandArgs, ICliOptionArgs, MaybeArray, UserConfigContext } from 'build-scripts';

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
];

const getCliOptions = (commandArgs: CommandArgs): MaybeArray<ICliOptionArgs<Config>> => {
  return [
    {
      name: 'disableOpen',
      commands: ['start'],
    },
    {
      name: 'analyzer',
      commands: ['start'],
      setConfig: (config: Config, analyzer: boolean) => {
        return mergeDefaultValue(config, 'analyzer', analyzer);
      },
    },
    {
      name: 'force',
      commands: ['start'],
      setConfig: (config: Config, force: boolean) => {
        if (force && fse.existsSync(config.cacheDirectory)) {
          fse.emptyDirSync(config.cacheDirectory);
        }
        return config;
      },
    },
    {
      name: 'https',
      commands: ['start'],
      setConfig: async (config: Config, https: boolean) => {
        let httpsConfig: Config['https'] = https;
        if (https) {
          const hosts = ['localhost'];
          const { host } = commandArgs;
          if (host && host !== 'localhost') {
            hosts.push(host);
          }
          // @ts-expect-error certificateFor types
          const certInfo = await certificateFor(hosts, { silent: true });
          const key = await fse.readFile(certInfo.keyFilePath, 'utf8');
          const cert = await fse.readFile(certInfo.certFilePath, 'utf8');
          httpsConfig = {
            key,
            cert,
          };
        }
        return mergeDefaultValue(config, 'https', httpsConfig);
      },
    },
    {
      name: 'mock',
      commands: ['start'],
    },
  ];
};

const configPlugin: Plugin = ({ registerUserConfig, registerCliOption, context: { commandArgs } }) => {
  registerUserConfig(userConfig);
  registerCliOption(getCliOptions(commandArgs));
};

export default configPlugin;
