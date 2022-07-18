import type webpack from '@ice/bundles/compiled/webpack/index.js';

export function getChunkEntryModule(compilation: webpack.Compilation, chunk: webpack.Chunk) {
  const { chunkGraph } = compilation;
  const entryModules = Array.from(chunkGraph.getChunkEntryModulesIterable(chunk));
  if (entryModules.length) {
    return entryModules[0];
  }
}
