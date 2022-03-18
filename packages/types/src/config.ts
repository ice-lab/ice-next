import type { RuleSetRule, Configuration } from 'webpack';
import type { ProxyConfigArray, ProxyConfigArrayItem, ProxyConfigMap, Middleware } from 'webpack-dev-server';
import type { UnpluginOptions } from 'unplugin';
import type Server from 'webpack-dev-server';

export interface Config {
  mode: 'none' | 'development' | 'production';

  define?: Record<string, string | boolean>;

  experiments?: Configuration['experiments'];

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  devPublicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  alias?: Record<string, any>;

  hash?: boolean;

  transformPlugins?: UnpluginOptions[];

  transforms?: UnpluginOptions['transform'][];

  middlewares?:
    | ((middlewares: Middleware[], devServer: Server) => Middleware[])
    | undefined;

  proxy?: ProxyConfigArrayItem | ProxyConfigMap | ProxyConfigArray | undefined;

  isServer?: boolean;
}
