import consola from 'consola';
import MagicString from 'magic-string';
import { parse as parseAST } from 'acorn';
import type { Node } from 'estree';
import { init, parse } from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer';
import { resolveId } from '../service/analyze.js';
import type { Alias } from '../service/analyze.js';

type ImportName = { importedName: string; localName: string };
async function topLevelAwait(code: string, alias: Alias) {
  await init;
  let imports: readonly ImportSpecifier[] = [];

  try {
    imports = parse(code)[0];
  } catch (e) {
    consola.error('[parse error]', e);
  }

  if (!imports.length) return code;

  let s: MagicString | undefined;
  const str = () => s || (s = new MagicString(code));
  imports.forEach((importSpecifier) => {
    // check relative import
    let awaitImport = '';
    const importStr = code.substring(importSpecifier.ss, importSpecifier.se);
    const node = (parseAST(importStr, {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }) as any).body[0] as Node;
    if (node.type === 'ImportDeclaration') {
      if (node.specifiers.length === 0) {
        awaitImport = `import '${node.source.value}';`;
      }

      const importNames: ImportName[] = [];
      for (const specifier of node.specifiers) {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
          importNames.push({
            importedName: specifier.imported.name,
            localName: specifier.local.name,
          });
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
        }
      }
    }
  });
}
