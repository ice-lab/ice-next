import { expect, describe, test, beforeEach } from 'vitest';
import { eventSource, document } from '../index';

describe('eventSource', () => {
  beforeEach(() => {
    eventSource.clear();
  });

  function createDiv(id) {
    const div = document.createElement('div');
    if (id) div.id = id;
    return div;
  }

  /**
   * <div id='target' />
   */
  test('eventSource.removeNode should remove node\' sid & uid', () => {
    const node = createDiv('target');

    const { sid, uid } = node;

    expect(eventSource.has(sid)).toBeTruthy();
    expect(eventSource.has(uid)).toBeTruthy();

    eventSource.removeNode(node);

    expect(eventSource.has(sid)).toBeFalsy();
    expect(eventSource.has(uid)).toBeFalsy();
  });

  /**
   * div
   *   div
   *   div#list
   *     div
   *     div
   *       div#target
   *     div
   *   div
   */
  test('eventSource.removeNodeTree should remove entire node tree', () => {
    const container = createDiv();
    const list = createDiv('list');
    const target = createDiv();
    target.appendChild(createDiv('target'));
    list.appendChild(createDiv());
    list.appendChild(target);
    list.appendChild(createDiv());
    container.appendChild(createDiv());
    container.appendChild(list);
    container.appendChild(createDiv());

    expect(eventSource.size).toBe(10);

    eventSource.removeNodeTree(list);

    expect(eventSource.size).toBe(3);

    expect(eventSource.has(list.sid)).toBeFalsy();
    expect(eventSource.has(list.uid)).toBeFalsy();
    expect(eventSource.has(target.sid)).toBeFalsy();
    expect(eventSource.has('target')).toBeFalsy();
  });
});
