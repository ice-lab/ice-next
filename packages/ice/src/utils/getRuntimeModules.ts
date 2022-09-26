import path from 'path';
import { createRequire } from 'module';
import fse from 'fs-extra';
import findUp from 'find-up';
import consola from 'consola';
import type { PluginInfo } from 'build-scripts';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import { resolve as resolveExports } from 'resolve.exports';

const require = createRequire(import.meta.url);

export interface RuntimeModule {
  staticModule: boolean;
  path: string;
  name: string;
}

function getRuntimeModules(plugins: Array<PluginInfo<any, ExtendsPluginAPI>>, rootDir: string) {
  const runtimes = plugins
    .filter(({ runtime }) => !!runtime)
    .map(({ name, runtime }) => ({ name, runtime }));
  return runtimes.map(({ runtime, name }) => {
    let runtimeExists = false;
    let pkgInfo: Record<string, any>;

    if (path.isAbsolute(runtime)) {
      // The runtime path is in the local project directory not in the node_modules.
      runtimeExists = fse.pathExistsSync(runtime);
      pkgInfo = getPkgInfo(path.join(rootDir, 'package.json'));
    } else {
      // The runtime is in the node_modules.
      let pluginName = '';
      if (runtime.startsWith('@')) {
        // @ice/plugin-auth
        pluginName = runtime.split('/').slice(0, 2).join('/');
      } else {
        // plugin-auth
        pluginName = runtime.split('/')[0];
      }
      // for example: xx/@ice/plugin-auth/package.json
      const pkgPath = findUp.sync('package.json', { cwd: path.join(rootDir, 'node_modules', pluginName) });
      pkgInfo = getPkgInfo(pkgPath);

      try {
        runtimeExists = !!(resolveExports(pkgInfo || {}, runtime) || require.resolve(runtime, { paths: [rootDir] }));
      } catch (error) {
        // ignore error
      }
    }

    if (runtimeExists) {
      return {
        staticModule: !!pkgInfo?.pluginConfig?.staticModule,
        path: runtime,
        name: pkgInfo?.name as string,
      };
    } else {
      consola.warn(`runtime is not exist in ${name}`);
    }
    return false;
  }).filter(Boolean) as RuntimeModule[];
}

function getPkgInfo(pkgPath: string) {
  try {
    return fse.readJSONSync(pkgPath);
  } catch (error) {
    // for example: xx/build-plugin-app/
    const packageDir = path.dirname(pkgPath);
    consola.error(`Failed to load package.json of plugin ${path.basename(packageDir)}`);
  }
}

export default getRuntimeModules;
