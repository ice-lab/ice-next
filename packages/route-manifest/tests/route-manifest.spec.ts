import path from 'path';
import { fileURLToPath } from 'url';
import { generateRouteManifest, formatNestedRouteManifest } from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');

const expectedRouteManifest = {
  layout: { path: '', id: 'layout', file: 'layout.tsx' },
  'pages/About/me/index': {
    path: '/About/me',
    index: true,
    caseSensitive: undefined,
    id: 'pages/About/me/index',
    parentId: 'layout',
    file: 'pages/About/me/index.tsx'
  },
  'pages/About/index': {
    path: '/About',
    index: true,
    caseSensitive: undefined,
    id: 'pages/About/index',
    parentId: 'layout',
    file: 'pages/About/index.tsx'
  },
  'pages/Home/layout': {
    path: '/Home',
    index: undefined,
    caseSensitive: undefined,
    id: 'pages/Home/layout',
    parentId: 'layout',
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
    parentId: 'layout',
    file: 'pages/About/$id.tsx'
  },
  'pages/index': {
    path: undefined,
    index: true,
    caseSensitive: undefined,
    id: 'pages/index',
    parentId: 'layout',
    file: 'pages/index.tsx'
  }
}

const expectedNestedRouteManifest = [
  {
    path: "",
    id: "layout",
    file: "layout.tsx",
    children: [
      {
        path: "/About/me",
        index: true,
        caseSensitive: undefined,
        id: "pages/About/me/index",
        parentId: "layout",
        file: "pages/About/me/index.tsx",
      },
      {
        path: "/About",
        index: true,
        caseSensitive: undefined,
        id: "pages/About/index",
        parentId: "layout",
        file: "pages/About/index.tsx",
      },
      {
        path: "/Home",
        index: undefined,
        caseSensitive: undefined,
        id: "pages/Home/layout",
        parentId: "layout",
        file: "pages/Home/layout.tsx",
        children: [
          {
            path: "/location",
            index: true,
            caseSensitive: undefined,
            id: "pages/Home/location/index",
            parentId: "pages/Home/layout",
            file: "pages/Home/location/index.tsx",
          },
          {
            path: "/detail",
            index: undefined,
            caseSensitive: undefined,
            id: "pages/Home/detail",
            parentId: "pages/Home/layout",
            file: "pages/Home/detail.tsx",
          },
          {
            path: undefined,
            index: true,
            caseSensitive: undefined,
            id: "pages/Home/index",
            parentId: "pages/Home/layout",
            file: "pages/Home/index.tsx",
          },
        ],
      },
      {
        path: "/About/:id",
        index: undefined,
        caseSensitive: undefined,
        id: "pages/About/$id",
        parentId: "layout",
        file: "pages/About/$id.tsx",
      },
      {
        path: undefined,
        index: true,
        caseSensitive: undefined,
        id: "pages/index",
        parentId: "layout",
        file: "pages/index.tsx",
      },
    ],
  },
]

describe('route-manifest', () => {
  test('generateRouteManifest function', () => {
    const routeManifest = generateRouteManifest(fixturesDir);
    expect(routeManifest).toEqual(expectedRouteManifest);
  });

  test('generateNestedRouteManifest function', () => {
    const nestedRouteManifest = formatNestedRouteManifest(expectedRouteManifest);
    expect(nestedRouteManifest).toEqual(expectedNestedRouteManifest);
  });
})
