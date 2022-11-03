import { createRequire } from 'module';
// FIXME when resolve mini-css-extract-plugin symbol in test
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import { sass, less, postcss } from '@ice/bundles';
import type webpack from 'webpack';
import type { LoaderContext, Configuration } from 'webpack';
import type { ModifyWebpackConfig } from '../types.js';
import { getCSSModuleLocalIdent } from '../utils/getCSSModuleLocalIdent.js';

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
        return getCSSModuleLocalIdent(context.resourcePath, localName);
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
        ['@ice/bundles/compiled/postcss-plugin-rpx2vw'],
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

const css: ModifyWebpackConfig<Configuration, typeof webpack> = (config, ctx) => {
  const { supportedBrowsers, publicPath, hashKey, cssFilename, cssChunkFilename } = ctx;
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
      filename: cssFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
      chunkFilename: cssChunkFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
      // If the warning is triggered, it seen to be unactionable for the user,
      ignoreOrder: true,
    }),
  );

  return config;
};

export default css;
