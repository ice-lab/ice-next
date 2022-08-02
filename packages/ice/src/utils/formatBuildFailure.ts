import esbuild from 'esbuild';
import consola from 'consola';

export default function formatBuildFailure(message: string, failure: esbuild.BuildFailure | Error) {
  if ('warnings' in failure || 'errors' in failure) {
    if (failure.warnings) {
      let messages = esbuild.formatMessagesSync(failure.warnings, {
        kind: 'warning',
        color: true,
      });
      consola.warn(`${message}\n`, ...messages);
    }

    if (failure.errors) {
      let messages = esbuild.formatMessagesSync(failure.errors, {
        kind: 'error',
        color: true,
      });
      consola.error(`${message}\n`, ...messages);
    }
  }

  consola.error(`${message}\n`, failure?.message || 'An unknown build error occurred');
}
