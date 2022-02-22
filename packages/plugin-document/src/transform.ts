import type {
  TransformResult,
} from 'esbuild';
import { transform } from 'esbuild';

export default async function doTransform(code): Promise<TransformResult> {
  const result = await transform(code, {
    loader: 'jsx',
    format: 'cjs',
  });

  return result;
}