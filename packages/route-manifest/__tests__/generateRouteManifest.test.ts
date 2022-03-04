import path from 'path';
import { fileURLToPath } from 'url';
import generateRouteManifest from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, '__fixtures__');

const expectedRouteManifest = {
  globalLayout: { path: '', id: 'globalLayout', file: 'layout.tsx' },
  'pages/About/me/index': {
    path: '/About/me',
    index: true,
    caseSensitive: undefined,
    id: 'pages/About/me/index',
    parentId: 'globalLayout',
    file: 'pages/About/me/index.tsx'
  },
  'pages/About/index': {
    path: '/About',
    index: true,
    caseSensitive: undefined,
    id: 'pages/About/index',
    parentId: 'globalLayout',
    file: 'pages/About/index.tsx'
  },
  'pages/Home/layout': {
    path: '/Home',
    index: undefined,
    caseSensitive: undefined,
    id: 'pages/Home/layout',
    parentId: 'globalLayout',
    file: 'pages/Home/layout.tsx'
  },
  'pages/Home/location/index': {
    path: '/location',
    index: true,
    caseSensitive: undefined,
    id: 'pages/Home/location/index',
    parentId: 'pages/Home/layout',
    file: 'pages/Home/location/index.tsx'
  },
  'pages/Home/detail': {
    path: '/detail',
    index: undefined,
    caseSensitive: undefined,
    id: 'pages/Home/detail',
    parentId: 'pages/Home/layout',
    file: 'pages/Home/detail.tsx'
  },
  'pages/Home/index': {
    path: undefined,
    index: true,
    caseSensitive: undefined,
    id: 'pages/Home/index',
    parentId: 'pages/Home/layout',
    file: 'pages/Home/index.tsx'
  },
  'pages/About/$id': {
    path: '/About/:id',
    index: undefined,
    caseSensitive: undefined,
    id: 'pages/About/$id',
    parentId: 'globalLayout',
    file: 'pages/About/$id.tsx'
  },
  'pages/index': {
    path: undefined,
    index: true,
    caseSensitive: undefined,
    id: 'pages/index',
    parentId: 'globalLayout',
    file: 'pages/index.tsx'
  }
}

test('generateRouteManifest function', () => {
  const routeManifest = generateRouteManifest(fixturesDir);
  expect(routeManifest).toEqual(expectedRouteManifest);
});
