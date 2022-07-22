describe('react', () => {
  const runtime = require('../../dist/runtime.esm');
  const { document } = runtime;

  it('event should work', () => {
    const div = document.createElement('div');
    const spy = jest.fn();
    div.addEventListener('tap', spy);
    const event = runtime.createEvent({ type: 'tap' }, div);
    div.dispatchEvent(event);
    expect(spy).toBeCalledTimes(1);
  });
});
