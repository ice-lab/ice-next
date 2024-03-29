import { expect, describe, test } from 'vitest';
import { document } from '../index';
describe('DOM', () => {
  describe('node', () => {
    test('childeNodes 有任何类型', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(container.childNodes.length).toBe(2);
    });

    test('nextSibling', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(div.nextSibling).toBe(text);
      expect(text.nextSibling).toBe(null);
    });

    test('previousSibling', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(div.previousSibling).toBe(null);
      expect(text.previousSibling).toBe(div);
    });

    test('insertBefore', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      const div2 = document.createElement('div');
      container.appendChild(div);
      container.insertBefore(text, div);
      container.insertBefore(div2);
      expect(text.nextSibling).toBe(div);
      expect(div.previousSibling).toBe(text);
      expect(div2.nextSibling).toBe(null);
      expect(div.nextSibling).toBe(div2);
    });

    test('appendChild', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(div.previousSibling).toBe(null);
      expect(text.previousSibling).toBe(div);
    });

    test('replaceChild', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      const div2 = document.createElement('div');
      container.replaceChild(div2, div);
      expect(container.childNodes.length).toBe(2);
      expect(text.previousSibling).toBe(div2);
      expect(div.parentNode).toBe(null);
    });

    test('removeChild', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      container.removeChild(div);
      expect(div.parentNode).toBe(null);
      expect(container.childNodes.length).toBe(1);
    });

    test('firstChild', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(container.firstChild).toBe(div);
      container.textContent = '';
      expect(container.firstChild).toBe(null);
    });

    test('lastChild', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(container.lastChild).toBe(text);
      container.textContent = '';
      expect(container.lastChild).toBe(null);
    });

    test('hasChildNodes', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(container.hasChildNodes()).toBe(true);
      container.textContent = '';
      expect(container.hasChildNodes()).toBe(false);
    });
  });

  describe('text', () => {
    test('nodeValue', () => {
      const t = document.createTextNode('t1');
      expect(t.nodeValue).toBe('t1');
      t.textContent = 't2';
      expect(t.nodeValue).toBe('t2');
    });

    test('textContext', () => {
      const t = document.createTextNode('t1');
      expect(t.textContent).toBe('t1');
      t.nodeValue = 't2';
      expect(t.textContent).toBe('t2');
    });

    test('nodeType', () => {
      const t = document.createTextNode('t1');
      expect(t.nodeType).toBe(3);
    });
  });

  describe('element', () => {
    test('tagName 是大写', () => {
      const node = document.createElement('div');
      expect(node.tagName).toBe('DIV');
    });

    test('id 和 className 可以直接设置', () => {
      const node = document.createElement('div');
      node.className = 'className';
      node.id = 'id';
      expect(node.getAttribute('class')).toBe('className');
      expect(node.getAttribute('id')).toBe('id');
    });

    test('children 只包括 Element', () => {
      const container = document.createElement('container');
      const div = document.createElement('div');
      const text = document.createTextNode('text');
      container.appendChild(div);
      container.appendChild(text);
      expect(container.children.length).toBe(1);
    });

    test('hasAttribute', () => {
      const div = document.createElement('div');
      div.setAttribute('readOnly', true);
      expect(div.hasAttribute('readOnly')).toBe(true);
    });

    test('hasAttributes', () => {
      const div = document.createElement('div');
      div.setAttribute('readOnly', true);
      expect(div.hasAttributes()).toBe(true);
    });

    test('focus', () => {
      const input = document.createElement('input');
      input.focus();
      expect(input.getAttribute('focus')).toBe(true);
    });

    test('blur', () => {
      const input = document.createElement('input');
      input.blur();
      expect(input.getAttribute('focus')).toBe(false);
    });

    test('setAttribute: style', () => {
      const div = document.createElement('div');
      div.setAttribute('style', 'color: red');
      expect(div.cssText).toBe('color: red;');
    });

    test('setAttribute: id', () => {
      const div = document.createElement('div');
      div.setAttribute('id', '10080');
      expect(div.getAttribute('id')).toBe('10080');
      div.props.id = '10080';
    });

    test('setAttribute: data-set', () => {
      const div = document.createElement('div');
      div.setAttribute('data-test', '10080');
      expect(div.getAttribute('data-test')).toBe('10080');
      expect(div.dataset.test).toBe('10080');
    });

    test('setAttribute: others', () => {
      const div = document.createElement('div');
      div.setAttribute('test', '10080');
      expect(div.getAttribute('test')).toBe('10080');
      div.props.test = '10080';
    });

    test('removeAttribute: style', () => {
      const div = document.createElement('div');
      div.setAttribute('style', 'color: red');
      div.removeAttribute('style');
      expect(div.cssText).toBe('');
    });

    test('removeAttribute: id', () => {
      const div = document.createElement('div');
      div.id = 'test';
      div.removeAttribute('id');
      expect(div.id).toBe('');
    });

    test('removeAttribute: class', () => {
      const div = document.createElement('div');
      div.className = 'test';
      div.removeAttribute('class');
      expect(div.className).toBe('');
    });
  });
});
