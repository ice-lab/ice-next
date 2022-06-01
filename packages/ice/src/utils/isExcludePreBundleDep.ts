import { BUILDIN_CJS_DEPS, BUILDIN_ESM_DEPS } from '../constant.js';

export default function isExcludePreBundleDep(dep: string) {
  const buildinDeps = [...BUILDIN_CJS_DEPS, ...BUILDIN_ESM_DEPS];
  return buildinDeps.some((buildinDep) => {
    return dep === buildinDep || dep.startsWith(`${buildinDep}/`);
  });
}
