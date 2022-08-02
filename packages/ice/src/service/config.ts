import fs from 'fs';
import consola from 'consola';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import removeTopLevelCode from '../esbuild/removeTopLevelCode.js';

interface CompileConfig {
  entry: string;
  outfile: string;
  transformInclude: (id: string) => boolean;
}

class Config {
  private compileTask: Promise<string>;
  private compiler: (keepExports: string[]) => Promise<string>;
  private compileConfig: CompileConfig;
  private lastOptions: string[];

  constructor(compileConfig: CompileConfig) {
    this.compileTask = null;
    this.compileConfig = compileConfig;
    this.lastOptions = [];
  }

  public setCompiler(esbuildCompiler: ServerCompiler): void {
    this.compiler = async (keepExports) => {
      const { entry, outfile, transformInclude } = this.compileConfig;
      await esbuildCompiler({
        entryPoints: [entry],
        format: 'esm',
        inject: [],
        outfile,
        plugins: [removeTopLevelCode(keepExports, transformInclude)],
      });
      return `${outfile}?version=${new Date().getTime()}`;
    };
  }

  public reCompile() {
    // Re-compile only triggered when `getConfig` has been called.
    if (this.compileTask) {
      this.compileTask = this.compiler(this.lastOptions);
    }
  }

  public getConfig = async (keepExports: string[]) => {
    this.lastOptions = keepExports;
    if (!this.compileTask) {
      this.compileTask = this.compiler(keepExports);
    }
    const targetFile = await this.compileTask;
    const result = import(targetFile);
    return result;
  };
}

export default Config;