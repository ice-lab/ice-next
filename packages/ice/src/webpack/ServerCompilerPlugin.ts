import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';
import type ServerCompilerTask from '../utils/ServerCompilerTask.js';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>[0];
  private serverCompilerTask: ServerCompilerTask;

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>[0],
    serverCompilerTask: ServerCompilerTask,
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompilerTask = serverCompilerTask;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap(pluginName, () => {
      this.serverCompilerTask.set(this.serverCompiler(this.serverCompilerOptions));
    });
  }
}
