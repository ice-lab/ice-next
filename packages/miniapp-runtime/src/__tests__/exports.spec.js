describe('style', () => {
  const runtime = require('../../dist/runtime.esm');

  it('bom', () => {
    const { window } = runtime;
    expect(window).not.toBeUndefined();
    expect(window.navigator).not.toBeUndefined();
    expect(window.document).not.toBeUndefined();
    expect(runtime.document).toBe(window.document);
    expect(runtime.navigator).toBe(window.navigator);
  });

  it('dom', () => {
    expect(runtime.Element).not.toBeUndefined();
    expect(runtime.Node).not.toBeUndefined();
    expect(runtime.Text).not.toBeUndefined();
  });

  it('event', () => {
    expect(runtime.createEvent).not.toBeUndefined();
    expect(runtime.Event).not.toBeUndefined();
  });

  it('dsl', () => {
    expect(runtime.createComponentConfig).not.toBeUndefined();
    expect(runtime.createPageConfig).not.toBeUndefined();
  });
});
