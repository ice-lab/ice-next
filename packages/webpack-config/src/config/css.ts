import { createRequire } from 'module';
import { createHash } from 'crypto';
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/index.js';
import { sass, less, postcss } from '@ice/bundles';
import type { ModifyWebpackConfig } from '@ice/types/esm/config';
import type { LoaderContext } from 'webpack';

type CSSRuleConfig = [string, string?, Record<string, any>?];
interface Options {
  publicPath: string;
  browsers: string[];
}

const require = createRequire(import.meta.url);

function configCSSRule(config: CSSRuleConfig, options: Options) {
  const { publicPath, browsers } = options;
  const [style, loader, loaderOptions] = config;
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      auto: (resourcePath: string) => resourcePath.endsWith(`.module.${style}`),
      getLocalIdent: (context: LoaderContext<any>, localIdentName: string, localName: string) => {
        const hash = createHash('md4');
        hash.update(Buffer.from(context.resourcePath + localName, 'utf8'));
        return `${localName}--${hash.digest('base64').slice(0, 8)}`;
      },
    },
  };
  const postcssOpts = {
    // lock postcss version
    implementation: postcss,
    postcssOptions: {
      config: false,
      plugins: [
        ['@ice/bundles/compiled/postcss-nested'],
        ['@ice/bundles/compiled/postcss-preset-env', {
          // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
          stage: 3,
          autoprefixer: {
            // Disable legacy flexbox support
            flexbox: 'no-2009',
          },
          features: {
            'custom-properties': false,
          },
          browsers,
        }],
      ],
    },
  };
  return {
    test: new RegExp(`\\.${style}$`),
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        // compatible with commonjs syntax: const styles = require('./index.module.less')
        options: {
          esModule: false,
          publicPath,
        },
      },
      {
        loader: require.resolve('@ice/bundles/compiled/css-loader'),
        options: cssModuleLoaderOpts,
      },
      {
        loader: require.resolve('@ice/bundles/compiled/postcss-loader'),
        options: {
          ...cssLoaderOpts,
          ...postcssOpts,
        },
      },
      loader && {
        loader,
        options: { ...cssLoaderOpts, ...loaderOptions },
      },
    ].filter(Boolean),
  };
}

const css: ModifyWebpackConfig = (config, ctx) => {
  const { supportedBrowsers, publicPath, hashKey } = ctx;
  const cssOutputFolder = 'css';
  config.module.rules.push(...([
    ['css'],
    ['less', require.resolve('@ice/bundles/compiled/less-loader'), {
      lessOptions: { javascriptEnabled: true },
      implementation: less,
    }],
    ['scss', require.resolve('@ice/bundles/compiled/sass-loader'), {
      implementation: sass,
    }],
  ] as CSSRuleConfig[]).map((config) => configCSSRule(config, { publicPath, browsers: supportedBrowsers })));
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
      // If the warning is triggered, it seen to be unactionable for the user,
      ignoreOrder: true,
    }),
  );

  return config;
};

export default css;
