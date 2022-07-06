export const ROUTER_MANIFEST = '.ice/route-manifest.json';
export const ASSETS_MANIFEST = '.ice/assets-manifest.json';
export const SERVER_ENTRY = '.ice/entry.server.ts';
export const SERVER_OUTPUT_DIR = 'server';
export const SERVER_OUTPUT = `${SERVER_OUTPUT_DIR}/index.mjs`;
export const CACHE_DIR = 'node_modules/.ice';
export const BUILDIN_ESM_DEPS = [
  '@ice/runtime',
];
export const BUILDIN_CJS_DEPS = [
  'react',
  'react-dom',
];

export const WEB = 'web';
export const ALI_MINIAPP = 'ali-miniapp';
export const WECHAT_MINIPROGRAM = 'wechat-miniprogram';
export const BYTEDANCE_MICROAPP = 'bytedance-microapp';
export const BAIDU_SMARTPROGRAM = 'baidu-smartprogram';
export const KUAISHOU_MINIPROGRAM = 'kuaishou-miniprogram';

export const MINIAPP_PLATFORMS = [ALI_MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM];
export const ALL_PLATFORMS = [WEB, ALI_MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM];
