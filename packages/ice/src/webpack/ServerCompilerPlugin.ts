import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';
import type ServerCompileTask from '../utils/ServerCompileTask.js';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>;
  private serverCompileTask: ServerCompileTask;

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    serverCompileTask: ServerCompileTask,
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap(pluginName, () => {
      this.serverCompileTask.set(this.serverCompiler(...this.serverCompilerOptions));
    });
  }
}
