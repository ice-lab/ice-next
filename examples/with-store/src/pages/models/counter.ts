export default {
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
};
