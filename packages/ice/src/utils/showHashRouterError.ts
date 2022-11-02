import consola from 'consola';
import type { UserConfig } from '../types/userConfig';

export default function showHashRouterError(userConfig: UserConfig) {
  if (userConfig.ssr || userConfig.ssg) {
    consola.error("Detect that you have enabled hash router. Please set 'ssr: false' and 'ssg: false' in your `ice.config.mts` file.");
    process.exit(1);
  }
}
