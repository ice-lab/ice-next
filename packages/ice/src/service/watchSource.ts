import type { FSWatcher } from 'fs';
import type { WatchOptions } from 'chokidar';
import type { WatchEvent } from '@ice/types/esm/plugin.js';
import * as chokidar from 'chokidar';
import micromatch from 'micromatch';
import formatPath from '../utils/formatPath.js';

export interface WatchHandle {
  watcher: FSWatcher;
  addWatchEvent: (...args: WatchEvent[]) => void;
  removeWatchEvent: (name: string) => void;
}

export default function createWatch(options: {
  watchDir: string;
  command?: string;
  watchOptions?: WatchOptions;
  watchEvents?: WatchEvent[];
}) {
  const { watchDir, command = 'start', watchOptions } = options;
  const watchEvents = options.watchEvents || [];
  // do not setup chokidar when run build
  const watcher = command === 'start' && chokidar.watch(watchDir, {
    ignoreInitial: true,
    ignored: [/node_modules/],
    ...(watchOptions || {}),
  }).on('all', (event, filePath) => {
    watchEvents.forEach(([pattern, action]) => {
      const formattedPath = formatPath(filePath);
      if (pattern instanceof RegExp && pattern.test(formattedPath)) {
        action(event, formattedPath);
      } else if (typeof pattern === 'string' && micromatch.contains(formattedPath, pattern)) {
        action(event, formattedPath);
      }
    });
  });

  return {
    watcher,
    addWatchEvent: (...args: WatchEvent[]) => {
      watchEvents.push(...args);
    },
    removeWatchEvent: (name: string) => {
      const eventIndex = watchEvents.findIndex(([,,watchName]) => watchName === name);
      watchEvents.splice(eventIndex, 1);
    },
  } as WatchHandle;
}
