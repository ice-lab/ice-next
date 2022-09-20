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
    // for example: xx/build-plugin-app/package.json
    const pkgPath = findUp.sync('package.json', { cwd: path.join(rootDir, 'node_modules', name) });
    // for example: xx/build-plugin-app/
    const packageDir = path.dirname(pkgPath);
    let pkgInfo: Record<string, any>;
    try {
      pkgInfo = fse.readJSONSync(pkgPath);
    } catch (error) {
      consola.error(`Failed to load package.json of plugin ${path.basename(packageDir)}`);
      return false;
    }

    let runtimeExists = false;
    try {
      runtimeExists = !!(resolveExports(pkgInfo, runtime) || require.resolve(runtime, { paths: [rootDir] }));
    } catch (error) {
      // ignore error
    }
    if (runtimeExists) {
      return {
        staticModule: !!pkgInfo?.pluginConfig?.staticModule,
        path: runtime,
        name: pkgInfo.name as string,
      };
    } else {
      consola.warn(`runtime is not exist in ${name}`);
    }
    return false;
  }).filter(Boolean) as RuntimeModule[];
}

export default getRuntimeModules;
