export const ROUTER_MANIFEST = '.ice/route-manifest.json';
export const ASSETS_MANIFEST = '.ice/assets-manifest.json';
export const SERVER_ENTRY = '.ice/entry.server.ts';
export const SERVER_OUTPUT_DIR = 'server';
export const SERVER_OUTPUT = `${SERVER_OUTPUT_DIR}/index.mjs`;
export const CACHE_DIR = 'node_modules/.ice';
export const EXCLUDE_PRE_BUNDLE_DEPS = [
  'react',
  'react-dom',
  '@ice/runtime',
  '@ice/runtime/server',
];