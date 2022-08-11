import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = async ({ addWrapper }) => {
  console.log('Running in plugin-request runtime');
};
export default runtime;
