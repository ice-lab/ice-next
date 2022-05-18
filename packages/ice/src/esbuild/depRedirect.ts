import path from 'path';
import type { Plugin, TransformOptions } from 'esbuild';
import { transform } from 'esbuild';
import fse from 'fs-extra';
import { parse as parseJS } from 'acorn';
import MagicString from 'magic-string';
import esModuleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { Node } from 'estree';
import type { DepsMetaData } from '../service/preBundleDeps.js';

const { init, parse } = esModuleLexer;

type ImportNameSpecifier = { importedName: string; localName: string };

const createDepRedirectPlugin = (metadata: DepsMetaData): Plugin => {
  return {
    name: 'esbuild-dep-redirect',
    setup(build) {
      const { deps } = metadata;
      const urls = [];
      build.onResolve({ filter: /^[\w@][^:]/ }, ({ path: id, importer, resolveDir }) => {
        console.log('id: ', id);
        if (id in deps) {
          return {
            path: id,
            namespace: 'dep',
            pluginData: {
              importer,
              resolveDir,
            },
          };
        }
      });
      build.onResolve({ filter: /.*/ }, ({ path: id }) => {
        if (urls.includes(id)) {
          console.log('-===>', id);
          return {
            path: id,
            external: true,
          };
        }
      });
      build.onLoad({ filter: /.*/, namespace: 'dep' }, async ({ path: id, pluginData: { importer, resolveDir } }) => {
        try {
          await init;
          let source = await fse.readFile(importer, 'utf-8');
          // transformWithParseJS(originSource);
          const extname = path.extname(importer).slice(1) as TransformOptions['loader'];
          let imports: readonly ImportSpecifier[] = [];
          try {
            imports = parse(source)[0];
          } catch {
            try {
              const transformed = await transformWithESBuild(
                source,
                importer,
              );
              source = transformed.code;
              imports = parse(transformed.code)[0];
            } catch (e) {
              debugger;
              console.log(e);
            }


            // const imports = parseImportsByParseJS(source);
          }
          const str = new MagicString(source);
          for (let index = 0; index < imports.length; index++) {
            const {
              // depId start and end
              s: start,
              e: end,
              ss: expStart,
              se: expEnd,
              n: specifier,
            } = imports[index];
            if (specifier !== id) {
              continue;
            }

            const importExp = source.slice(expStart, expEnd);
            const filePath = deps[id].file;
            // const url = path.relative(path.join(process.cwd(), 'build/server'), filePath);
            urls.push(filePath);
            const rewritten = transformCjsImport(
              importExp,
              filePath,
              id,
              index,
            );
            if (rewritten) {
              str.overwrite(expStart, expEnd, rewritten, {
                contentOnly: true,
              });
            } else {
              // export * from '...'
              str.overwrite(start, end, filePath, { contentOnly: true });
            }
            const contents = str.toString();
            console.log('contents==>', contents);
            return {
              contents,
              loader: extname,
              resolveDir: '/',
            };
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
  };
};

async function transformWithESBuild(
  input: string,
  filePath: string,
  options: TransformOptions = {},
) {
  let loader = options?.loader as TransformOptions['loader'];
  if (!loader) {
    const extname = path.extname(filePath).slice(1);
    if (extname === 'mjs' || extname === 'cjs') {
      loader = 'js';
    } else {
      loader = extname as TransformOptions['loader'];
    }
  }

  const transformOptions = {
    sourcemap: true,
    sourcefile: filePath,
    ...options,
    loader,
  } as TransformOptions;

  return await transform(input, transformOptions);
}

function parseImportsByParseJS(
  source: string,
) {
  const node = (
    parseJS(source, {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }) as any
  );
  console.log('node===>', node);
}

function transformCjsImport(
  importExp: string,
  importUrl: string,
  depId: string,
  importIndex: number,
): string | undefined {
  const node = (
    parseJS(importExp, {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }) as any
  ).body[0] as Node;

  if (
    node.type === 'ImportDeclaration' ||
    node.type === 'ExportNamedDeclaration'
  ) {
    if (!node.specifiers.length) {
      return `import "${importUrl}"`;
    }

    const importNames: ImportNameSpecifier[] = [];
    const exportNames: string[] = [];
    let defaultExports = '';
    for (const spec of node.specifiers) {
      if (
        spec.type === 'ImportSpecifier' &&
        spec.imported.type === 'Identifier'
      ) {
        const importedName = spec.imported.name;
        const localName = spec.local.name;
        importNames.push({ importedName, localName });
      } else if (spec.type === 'ImportDefaultSpecifier') {
        importNames.push({
          importedName: 'default',
          localName: spec.local.name,
        });
      } else if (spec.type === 'ImportNamespaceSpecifier') {
        importNames.push({ importedName: '*', localName: spec.local.name });
      } else if (
        spec.type === 'ExportSpecifier' &&
        spec.exported.type === 'Identifier'
      ) {
        // for ExportSpecifier, local name is same as imported name
        const importedName = spec.local.name;
        // we want to specify exported name as variable and re-export it
        const exportedName = spec.exported.name;
        if (exportedName === 'default') {
          defaultExports = makeLegalIdentifier(`__ice__cjsExportDefault_${importIndex}`);
          importNames.push({ importedName, localName: defaultExports });
        } else {
          importNames.push({ importedName, localName: exportedName });
          exportNames.push(exportedName);
        }
      }
    }

    // If there is multiple import for same id in one file,
    // importIndex will prevent the cjsModuleName to be duplicate
    const cjsModuleName = makeLegalIdentifier(`__ice__cjsImport${importIndex}_${depId}`);
    const lines: string[] = [`import ${cjsModuleName} from "${importUrl}"`];
    importNames.forEach(({ importedName, localName }) => {
      if (importedName === '*') {
        lines.push(`const ${localName} = ${cjsModuleName}`);
      } else if (importedName === 'default') {
        lines.push(
          `const ${localName} = ${cjsModuleName}.__esModule ? ${cjsModuleName}.default : ${cjsModuleName}`,
        );
      } else {
        lines.push(`const ${localName} = ${cjsModuleName}["${importedName}"]`);
      }
    });
    if (defaultExports) {
      lines.push(`export default ${defaultExports}`);
    }
    if (exportNames.length) {
      lines.push(`export { ${exportNames.join(', ')} }`);
    }

    return lines.join('; ');
  }
}

const reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public';
const builtins = 'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl';
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(' '));
forbiddenIdentifiers.add('');
function makeLegalIdentifier(str: string) {
  let identifier = str
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/[^$_a-zA-Z0-9]/g, '_');
  if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
    identifier = `_${identifier}`;
  }
  return identifier || '_';
}

export default createDepRedirectPlugin;
