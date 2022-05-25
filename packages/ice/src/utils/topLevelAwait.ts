import consola from 'consola';
import MagicString from 'magic-string';
import { parse as parseAST } from 'acorn';
import type { Node } from 'estree';
import { init, parse } from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer';

type ImportName = { importedName: string; localName: string };
type ValidateId = (id: string) => boolean;
async function topLevelAwait(code: string, validateId?: ValidateId): Promise<string> {
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
    if (validateId && !validateId(importSpecifier.n)) return;
    const importStr = code.substring(importSpecifier.ss, importSpecifier.se);
    const node = (parseAST(importStr, {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }) as any).body[0] as Node;
    if (node.type === 'ImportDeclaration') {
      if (node.specifiers.length === 0) {
        awaitImport = `await import('${node.source.value}')`;
      }

      const importNames: ImportName[] = [];
      for (const specifier of node.specifiers) {
        if (specifier.type === 'ImportNamespaceSpecifier') {
          // import * as xx from 'xx';
          awaitImport = `const ${specifier.local.name} = await import('${node.source.value}')`;
        } else if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
          importNames.push({
            importedName: specifier.imported.name,
            localName: specifier.local.name,
          });
        } else if (specifier.type === 'ImportDefaultSpecifier') {
          importNames.push({
            importedName: 'default',
            localName: specifier.local.name,
          });
        }
      }
      const awaitIdentifiers = [];
      importNames.forEach(({ importedName, localName }) => {
        if (importedName === localName) {
          awaitIdentifiers.push(importedName);
        } else {
          awaitIdentifiers.push(`${importedName} as ${localName}`);
        }
      });
      if (awaitIdentifiers.length > 0) {
        awaitImport = `const { ${awaitIdentifiers.join(',')} } = await import('${node.source.value}')`;
      }
      str().overwrite(importSpecifier.ss, importSpecifier.se, awaitImport);
    }
  });

  return str().toString();
}

export default topLevelAwait;
