import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>;
  private serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  private ensureRoutesConfig: () => Promise<void>;

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    serverCompileTask: ExtendsPluginAPI['serverCompileTask'],
    ensureRoutesConfig: () => Promise<void>,
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
    this.ensureRoutesConfig = ensureRoutesConfig;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap(pluginName, () => {
      this.ensureRoutesConfig().then(() => {
        this.serverCompileTask.set(this.serverCompiler(...this.serverCompilerOptions));
      });
    });
  }
}
