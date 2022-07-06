import type { ServerCompiler } from '@ice/types/esm/plugin.js';

class ServerCompilerTask {
  private task: ReturnType<ServerCompiler>;

  set(task: ReturnType<ServerCompiler>) {
    this.task = task;
  }

  public async get() {
    return this.task;
  }
}

export default ServerCompilerTask;
