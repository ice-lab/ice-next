import type { RouteMatch } from '../types.js';

/**
 * Get the current page path exclude the basename.
 */
export default function getCurrentPagePath(matches: RouteMatch[]): string | undefined {
  return matches.length && matches[matches.length - 1].pathname;
}
