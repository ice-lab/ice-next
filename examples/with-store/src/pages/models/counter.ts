import { createModel } from '@ice/plugin-store/esm/runtime';

export default createModel({
  state: {
    count: 0,
  },
  reducers: {
    inc(prevState) {
      prevState.count += 1;
    },
    dec(prevState) {
      prevState.count -= 1;
    },
  },
});
