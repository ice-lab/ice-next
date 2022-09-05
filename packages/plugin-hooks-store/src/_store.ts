/**
 * This file which is imported by the runtime.tsx, is to avoid TS error.
 */
import { createStore } from '@ice/hooks-store';

const models = {};

const store: ReturnType<typeof createStore> = createStore(models);

export default store;
