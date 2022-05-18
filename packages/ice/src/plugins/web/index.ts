import * as path from 'path';
import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import emptyDir from '../../utils/emptyDir.js';
import openBrowser from '../../utils/openBrowser.js';
import createAssetsPlugin from '../../esbuild/assets.js';
import { scanImports } from '../../service/analyze.js';
import preBundleDeps from '../../service/preBundleDeps.js';
import createDepRedirectPlugin from '../../esbuild/depRedirect.js';
import generateHTML from './ssr/generateHTML.js';
import { setupRenderServer } from './ssr/serverRender.js';
import getMockConfigs, { MOCK_FILE_PATTERN } from './mock/getConfigs.js';
import createMockMiddleware from './mock/createMiddleware.js';

const require = createRequire(import.meta.url);

const webPlugin: Plugin = ({ registerTask, context, onHook, watch }) => {
  const { command, rootDir, userConfig, commandArgs } = context;
  const { addEvent } = watch;
  const { ssg = true, ssr = true } = userConfig;
  const outputDir = path.join(rootDir, 'build');
  const routeManifest = path.join(rootDir, '.ice/route-manifest.json');
  const mode = command === 'start' ? 'development' : 'production';
  const assetsManifest = path.join(rootDir, '.ice/assets-manifest.json');
  const serverOutputDir = path.join(outputDir, 'server');
  const serverEntry = path.join(serverOutputDir, 'index.mjs');
  const cacheDir = path.join(rootDir, 'node_modules', '.ice');
  let serverCompiler = async () => '';

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ esbuildCompile, webpackConfigs }) => {
    await emptyDir(outputDir);

    // same as webpack define runtimeEnvs in build-webpack-config
    const runtimeDefineVars = {};
    Object.keys(process.env).forEach((key) => {
      if (/^ICE_CORE_/i.test(key)) {
        // in server.entry
        runtimeDefineVars[`__process.env.${key}__`] = JSON.stringify(process.env[key]);
      } else if (/^ICE_/i.test(key)) {
        runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
      }
    });

    serverCompiler = async () => {
      const entryPoint = path.join(rootDir, '.ice/entry.server.ts');
      let deps = await scanImports([entryPoint], {
        alias: (webpackConfigs[0].resolve?.alias || {}) as Record<string, string | false>,
      });
      console.log('depImport', deps);
      const { metadata } = await preBundleDeps(deps, rootDir, cacheDir);
      await esbuildCompile({
        entryPoints: {
          index: entryPoint,
        },
        outdir: serverOutputDir,
        // platform: 'node',
        format: 'esm',
        splitting: true,
        outExtension: { '.js': '.mjs' },
        define: runtimeDefineVars,
        plugins: [
          createDepRedirectPlugin(metadata),
          createAssetsPlugin(assetsManifest, rootDir),
        ],
      });
      // timestamp for disable import cache
      return `${serverEntry}?version=${new Date().getTime()}`;
    };
  });

  if (commandArgs.open) {
    onHook('after.start.compile', ({ urls, isFirstCompile }) => {
      if (!isFirstCompile) {
        return;
      }
      openBrowser(urls.localUrlForBrowser);
    });
  }

  onHook('after.build.compile', async () => {
    await serverCompiler();
    await generateHTML({
      rootDir,
      outDir: outputDir,
      entry: serverEntry,
      routeManifest,
      ssg,
      ssr,
    });
  });

  registerTask('web', {
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir,
    mode,
    outputDir,
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
      'webpack/hot': path.join(require.resolve('@ice/bundles'), '../../compiled/webpack/hot'),
    },
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const staticMiddlewaresIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
      // add ssr middleware before static
      middlewares.splice(staticMiddlewaresIndex, 0, {
        name: 'document-render-server',
        middleware: setupRenderServer({
          serverCompiler,
          ssg,
          ssr,
        }),
      });

      if (commandArgs.mock) {
        // mock
        const mockContext = {
          mockConfigs: getMockConfigs(rootDir, userConfig?.mock?.exclude),
        };
        addEvent([
          MOCK_FILE_PATTERN,
          () => {
            mockContext.mockConfigs = getMockConfigs(rootDir, userConfig?.mock?.exclude);
          },
        ]);
        middlewares.unshift(
          {
            name: 'mock',
            middleware: createMockMiddleware(mockContext),
          },
        );
      }

      return middlewares;
    },
  });
};

export default webPlugin;
