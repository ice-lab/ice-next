import path from 'path';
import { createRequire } from 'module';
import fse from 'fs-extra';
import findUp from 'find-up';
import consola from 'consola';
import { resolve as resolveExports } from 'resolve.exports';
import type { PluginData } from '@ice/types';
const require = createRequire(import.meta.url);

export interface RuntimeModule {
  staticRuntime: boolean;
  path: string;
  name: string;
}

function getRuntimeModules(plugins: PluginData[], rootDir: string) {
  const runtimes = plugins
    .filter(({ runtime }) => !!runtime)
    .map(({ name, runtime, staticRuntime }) => ({ name, runtime, staticRuntime }));
  return runtimes.map(({ runtime, name, staticRuntime }) => {
    let runtimeExists = false;

    if (path.isAbsolute(runtime)) {
      runtimeExists = fse.pathExistsSync(runtime);
    } else {
      // The runtime is in the node_modules.
      // Not support the runtime path is relative(`./runtime`) which is in the local project directory.
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
      const pkgInfo = getPkgInfo(pkgPath);

      try {
        runtimeExists = !!(resolveExports(pkgInfo || {}, runtime) || require.resolve(runtime, { paths: [rootDir] }));
      } catch (error) {
        // ignore error
      }
    }

    if (runtimeExists) {
      return {
        staticRuntime,
        path: runtime,
        name,
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
