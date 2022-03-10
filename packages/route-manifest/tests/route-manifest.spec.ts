import path from 'path';
import { fileURLToPath } from 'url';
import { generateRouteManifest, formatNestedRouteManifest } from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');

const expectedRouteManifest = {
  layout: {
    path: "",
    id: "layout",
    componentName: "Layout",
    file: "layout.tsx",
  },
  "pages/About/me/index": {
    path: "/About/me",
    index: true,
    id: "pages/About/me/index",
    parentId: "layout",
    file: "pages/About/me/index.tsx",
    componentName: "PagesAboutMeIndex",
  },
  "pages/About/index": {
    path: "/About",
    index: true,
    id: "pages/About/index",
    parentId: "layout",
    file: "pages/About/index.tsx",
    componentName: "PagesAboutIndex",
  },
  "pages/Home/layout": {
    path: "/Home",
    index: undefined,
    id: "pages/Home/layout",
    parentId: "layout",
    file: "pages/Home/layout.tsx",
    componentName: "PagesHomeLayout",
  },
  "pages/Home/location/index": {
    path: "/location",
    index: true,
    id: "pages/Home/location/index",
    parentId: "pages/Home/layout",
    file: "pages/Home/location/index.tsx",
    componentName: "PagesHomeLocationIndex",
  },
  "pages/Home/layout/index": {
    path: "/layout",
    index: true,
    id: "pages/Home/layout/index",
    parentId: "pages/Home/layout",
    file: "pages/Home/layout/index.tsx",
    componentName: "PagesHomeLayoutIndex",
  },
  "pages/Home/detail": {
    path: "/detail",
    index: undefined,
    id: "pages/Home/detail",
    parentId: "pages/Home/layout",
    file: "pages/Home/detail.tsx",
    componentName: "PagesHomeDetail",
  },
  "pages/Home/index": {
    path: undefined,
    index: true,
    id: "pages/Home/index",
    parentId: "pages/Home/layout",
    file: "pages/Home/index.tsx",
    componentName: "PagesHomeIndex",
  },
  "pages/About/$id": {
    path: "/About/:id",
    index: undefined,
    id: "pages/About/$id",
    parentId: "layout",
    file: "pages/About/$id.tsx",
    componentName: "PagesAbout$id",
  },
  "pages/index": {
    path: undefined,
    index: true,
    id: "pages/index",
    parentId: "layout",
    file: "pages/index.tsx",
    componentName: "PagesIndex",
  },
}

const expectedNestedRouteManifest = [
  {
    path: "",
    id: "layout",
    componentName: "Layout",
    file: "layout.tsx",
    children: [
      {
        path: "/About/me",
        index: true,
        id: "pages/About/me/index",
        parentId: "layout",
        file: "pages/About/me/index.tsx",
        componentName: "PagesAboutMeIndex",
      },
      {
        path: "/About",
        index: true,
        id: "pages/About/index",
        parentId: "layout",
        file: "pages/About/index.tsx",
        componentName: "PagesAboutIndex",
      },
      {
        path: "/Home",
        index: undefined,
        id: "pages/Home/layout",
        parentId: "layout",
        file: "pages/Home/layout.tsx",
        componentName: "PagesHomeLayout",
        children: [
          {
            path: "/location",
            index: true,
            id: "pages/Home/location/index",
            parentId: "pages/Home/layout",
            file: "pages/Home/location/index.tsx",
            componentName: "PagesHomeLocationIndex",
          },
          {
            path: "/layout",
            index: true,
            id: "pages/Home/layout/index",
            parentId: "pages/Home/layout",
            file: "pages/Home/layout/index.tsx",
            componentName: "PagesHomeLayoutIndex",
          },
          {
            path: "/detail",
            index: undefined,
            id: "pages/Home/detail",
            parentId: "pages/Home/layout",
            file: "pages/Home/detail.tsx",
            componentName: "PagesHomeDetail",
          },
          {
            path: undefined,
            index: true,
            id: "pages/Home/index",
            parentId: "pages/Home/layout",
            file: "pages/Home/index.tsx",
            componentName: "PagesHomeIndex",
          },
        ],
      },
      {
        path: "/About/:id",
        index: undefined,
        id: "pages/About/$id",
        parentId: "layout",
        file: "pages/About/$id.tsx",
        componentName: "PagesAbout$id",
      },
      {
        path: undefined,
        index: true,
        id: "pages/index",
        parentId: "layout",
        file: "pages/index.tsx",
        componentName: "PagesIndex",
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
