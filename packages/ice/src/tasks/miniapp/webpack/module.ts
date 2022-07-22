import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import taroHelper from '@tarojs/helper';

interface IRule {
  test?: any;
  exclude?: any[];
  include?: any[];
  use?: any;
  enforce?: 'pre' | 'post';
  issuer?: any;
  loader?: any;
  loaders?: any;
  oneOf?: any;
  options?: any;
  query?: any;
  parser?: any;
  generator?: any;
  resource?: any;
  resourceQuery?: any;
  rules?: any;
  sideEffects?: boolean;
  type?: string;
  resolve?: any;
}

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  REG_SCRIPTS,
  REG_TEMPLATE,
} = taroHelper;

export class MiniWebpackModule {
  config: any;
  sourceRoot: string;

  constructor(config: any) {
    this.config = config;
    this.sourceRoot = 'src';
  }

  getLoader(loaderName: string, options: Record<string, any>) {
    return {
      loader: require.resolve(loaderName),
      options: options || {},
    };
  }

  getModules() {
    const {
      fileType,
      buildAdapter,
    } = this.config;

    const rules: Array<IRule> = [
      {
        // template
        test: REG_TEMPLATE,
        type: 'asset/resource',
        generator: {
          filename({ filename }) {
            const extname = path.extname(filename);
            return filename.replace(`${this.sourceRoot}/`, '').replace(extname, fileType.templ);
          },
        },
        use: [this.getLoader(path.resolve(__dirname, './loaders/miniTemplateLoader'), {
          buildAdapter,
        })],
      },
      // script
      // this.getScriptRule(),
    ];
    return { rules };
  }

  getScriptRule() {
    const {
      rootDir,
      compile = {},
    } = this.config;
    const sourceDir = path.join(rootDir, 'src');
    const rule: IRule = {
      test: REG_SCRIPTS,
      use: [this.getLoader('babel-loader', { compact: false })],
    };

    if (compile.exclude && compile.exclude.length) {
      rule.exclude = [
        ...compile.exclude,
        filename => /css-loader/.test(filename) || (/node_modules/.test(filename) && !(/taro/.test(filename))),
      ];
    } else if (compile.include && compile.include.length) {
      rule.include = [
        ...compile.include,
        sourceDir,
        filename => /taro/.test(filename),
      ];
    } else {
      rule.exclude = [filename => /css-loader/.test(filename) || (/node_modules/.test(filename) && !(/taro/.test(filename)))];
    }

    return rule;
  }
}
