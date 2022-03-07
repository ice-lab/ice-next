// based on https://github.com/remix-run/remix/blob/main/packages/remix-dev/config/routesConvention.ts
import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';
import { createRouteId, defineRoutes } from './routes.js';
import type { RouteManifest, DefineRouteFunction, NestedRouteManifest } from './routes.js';

const routeModuleExts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'];

export function isRouteModuleFile(filename: string): boolean {
  return routeModuleExts.includes(path.extname(filename));
}

export function generateRouteManifest(rootDir: string) {
  const srcDir = path.join(rootDir, 'src');
  const routeManifest: RouteManifest = {};
  // 1. find global layout
  const globalLayoutFile = findGlobalLayout(srcDir, 'layout');
  if (globalLayoutFile) {
    routeManifest['layout'] = { path: '', id: 'layout', file: globalLayoutFile };
  }

  // 2. find routes in `src/pages` directory
  if (fs.existsSync(path.resolve(srcDir, 'pages'))) {
    const conventionalRoutes = defineConventionalRoutes(
      rootDir,
      [], // TODO: add ignoredFilePatterns defined in ice.config.js
    );

    for (const key of Object.keys(conventionalRoutes)) {
      const route = conventionalRoutes[key];
      routeManifest[route.id] = {
        ...route,
        parentId: route.parentId || (globalLayoutFile && 'layout') || undefined,
      };
    }
  }

  return routeManifest;
}

export function formatNestedRouteManifest(routeManifest: RouteManifest, parentId?: string): NestedRouteManifest[] {
  return Object.keys(routeManifest)
    .filter(key => routeManifest[key].parentId === parentId)
    .map(key => {
      const route = {
        ...routeManifest[key],
      } as NestedRouteManifest;
      const children = formatNestedRouteManifest(routeManifest, route.id);
      if (children.length > 0) route.children = children;
      return route;
    });
}

function defineConventionalRoutes(
  rootDir: string,
  ignoredFilePatterns?: string[],
): RouteManifest {
  const files: { [routeId: string]: string } = {};

  // 1. find all route components in src/pages
  visitFiles(
    path.join(rootDir, 'src', 'pages'),
    file => {
      if (
        ignoredFilePatterns &&
        ignoredFilePatterns.some(pattern => minimatch(file, pattern))
      ) {
        return;
      }

      const filePath = path.join('pages', file);
      if (isRouteModuleFile(file)) {
        let routeId = createRouteId(filePath);
        files[routeId] = filePath;
        return;
      }

      throw new Error(
        `Invalid route module file: ${path.join(rootDir, filePath)}`,
      );
    },
  );

  const routeIds = Object.keys(files).sort(byLongestFirst);

  const uniqueRoutes = new Map<string, string>();

  // 2. recurse through all routes using the public defineRoutes() API
  function defineNestedRoutes(
    defineRoute: DefineRouteFunction,
    parentId?: string,
  ): void {
    const childRouteIds = routeIds.filter((id) => {
      const parentRouteId = findParentRouteId(routeIds, id);
      return parentRouteId === parentId;
    });

    console.log('childRouteIds: ', childRouteIds);

    for (let routeId of childRouteIds) {
      const routePath: string | undefined = createRoutePath(
        routeId.slice((removeLayoutStrFromId(parentId) || 'pages').length),
      );

      const isIndexRoute = routeId.endsWith('/index');
      let fullPath = createRoutePath(routeId.slice('pages'.length + 1));
      let uniqueRouteId = (fullPath || '') + (isIndexRoute ? '?index' : '');

      if (uniqueRouteId) {
        if (uniqueRoutes.has(uniqueRouteId)) {
          throw new Error(
            `Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(
              routeId,
            )} conflicts with route ${JSON.stringify(
              uniqueRoutes.get(uniqueRouteId),
            )}`,
          );
        } else {
          uniqueRoutes.set(uniqueRouteId, routeId);
        }
      }

      if (isIndexRoute) {
        let invalidChildRoutes = routeIds.filter(
          (id) => findParentRouteId(routeIds, id) === routeId,
        );

        if (invalidChildRoutes.length > 0) {
          throw new Error(
            `Child routes are not allowed in index routes. Please remove child routes of ${routeId}`,
          );
        }

        defineRoute(routePath, files[routeId], {
          index: true,
        });
      } else {
        defineRoute(routePath, files[routeId], () => {
          defineNestedRoutes(defineRoute, routeId);
        });
      }
    }
  }

  return defineRoutes(defineNestedRoutes);
}

let escapeStart = '[';
let escapeEnd = ']';

export function createRoutePath(partialRouteId: string): string | undefined {
  let result = '';
  let rawSegmentBuffer = '';

  let inEscapeSequence = 0;
  let skipSegment = false;

  partialRouteId = removeLayoutStrFromId(partialRouteId);

  for (let i = 0; i < partialRouteId.length; i++) {
    const char = partialRouteId.charAt(i);
    const lastChar = i > 0 ? partialRouteId.charAt(i - 1) : undefined;
    const nextChar = i < partialRouteId.length - 1 ? partialRouteId.charAt(i + 1) : undefined;

    function isNewEscapeSequence() {
      return !inEscapeSequence && char === escapeStart && lastChar !== escapeStart;
    }

    function isCloseEscapeSequence() {
      return inEscapeSequence && char === escapeEnd && nextChar !== escapeEnd;
    }

    // src/pages/__app/dashboard.tsx || src/pages/__app.tsx
    function isStartOfLayoutSegment() {
      return char === '_' && nextChar === '_' && !rawSegmentBuffer;
    }

    if (skipSegment) {
      if (char === '/' || char === '.' || char === path.win32.sep) {
        skipSegment = false;
      }
      continue;
    }

    if (isNewEscapeSequence()) {
      inEscapeSequence++;
      continue;
    }

    if (isCloseEscapeSequence()) {
      inEscapeSequence--;
      continue;
    }

    // if you want to mark resource route for a `/sitemap.xml`, add a route `src/pages/[sitemap.xml].tsx`
    if (inEscapeSequence) {
      result += char;
      continue;
    }

    if (char === '/' || char === path.win32.sep || char === '.') {
      if (rawSegmentBuffer === 'index' && result.endsWith('index')) {
        result = result.replace(/\/?index$/, '');
      } else {
        result += '/';
      }
      rawSegmentBuffer = '';
      continue;
    }

    if (isStartOfLayoutSegment()) {
      skipSegment = true;
      continue;
    }

    rawSegmentBuffer += char;

    if (char === '$') {
      result += typeof nextChar === 'undefined' ? '*' : ':';
      continue;
    }

    result += char;
  }

  if (rawSegmentBuffer === 'index' && result.endsWith('index')) {
    result = result.replace(/\/?index$/, '');
  }

  return result || undefined;
}

function findParentRouteId(
  routeIds: string[],
  childRouteId: string,
): string | undefined {
  // return routeIds.find((id) => childRouteId.startsWith(`${id}/`));

  return routeIds.find((id) => {
    return (
      // childRouteId.startsWith(`${id}/`)
      childRouteId !== id && id.endsWith('layout') && childRouteId.startsWith(`${id.slice(0, id.length - '/layout'.length)}`)
    );
  });
}

function byLongestFirst(a: string, b: string): number {
  return b.length - a.length;
}

function visitFiles(
  dir: string,
  visitor: (file: string) => void,
  baseDir = dir,
): void {
  for (let filename of fs.readdirSync(dir)) {
    let file = path.resolve(dir, filename);
    let stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      visitFiles(file, visitor, baseDir);
    } else if (stat.isFile()) {
      visitor(path.relative(baseDir, file));
    }
  }
}

const entryExts = ['.js', '.jsx', '.ts', '.tsx'];

function findGlobalLayout(srcDir: string, basename: string): string | undefined {
  for (let ext of entryExts) {
    let file = path.resolve(srcDir, basename + ext);
    if (fs.existsSync(file)) return path.relative(srcDir, file);
  }

  return undefined;
}

/**
 * remove `/layout` str if the routeId has it
 *
 * /About/layout -> /About
 * /About/layout/index -> /About/layout/index
 */
function removeLayoutStrFromId(id?: string) {
  if (!id) {
    return id;
  }
  return id.endsWith('/layout') ? id.slice(0, id.length - '/layout'.length) : id;
}