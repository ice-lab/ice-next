import { promises as fs } from 'fs';
import transform from './transform';

type SSRModule = Record<string, any>;

export async function ssrLoadModule(url: string): Promise<SSRModule> {
  const code = await fs.readFile(url, 'utf-8');

  const result = await transform(code);

  let mod = {
    exports: null,
  };

  const AsyncFunction = async function () {}.constructor as typeof Function;
  const initModule = new AsyncFunction(
    'global',
    'require',
    'module',
    result.code,
  );

  await initModule(
    global,
    require,
    mod,
  );

  return { mod: mod.exports.default };
}
