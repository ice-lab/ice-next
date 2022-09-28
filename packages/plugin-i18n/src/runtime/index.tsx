import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = async (runtimeAPI) => {
  console.log(runtimeAPI);
};

export default runtime;
