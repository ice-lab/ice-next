import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugin: Plugin = ({ generator }) => {
  const runtimePath = path.join(__dirname, '../runtime');
  // 注册 API：import { useAuth, withAuth } from 'ice';
  generator.addExport({
    specifier: ['withAuth', 'useAuth'],
    source: path.join(runtimePath, 'Auth'),
  });

  // 注册类型：appConfig.auth
  // export interface IAppConfig {
  //   auth?: IAuth;
  // }
  generator.addConfigTypes({
    specifier: ['AuthConfig'],
    source: path.join(runtimePath, 'types'),
    type: true,
    exportAlias: {
      AuthConfig: 'auth?',
    },
  });
};

export default plugin;