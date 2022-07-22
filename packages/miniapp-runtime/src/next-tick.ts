import { Current } from './current.js';
import type { TaroRootElement } from './dom/root.js';
import env from './env.js';
import type { Func } from './interface/index.js';

export const nextTick = (cb: Func, ctx?: Record<string, any>) => {
  const { router } = Current;
  const timerFunc = () => {
    setTimeout(() => {
      ctx ? cb.call(ctx) : cb();
    }, 1);
  };

  if (router !== null) {
    let pageElement: TaroRootElement | null = null;
    const path = router.$taroPath;
    pageElement = env.document.getElementById<TaroRootElement>(path);
    if (pageElement?.pendingUpdate) {
      pageElement.enqueueUpdateCallback(cb, ctx);
    } else {
      timerFunc();
    }
  } else {
    timerFunc();
  }
};
