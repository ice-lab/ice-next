import { expect, it, describe, vi } from 'vitest';
import React, { Children } from 'react';
import { useRef, useEffect } from '../src/index';
import { createElement } from '../src/create-element';
import findDOMNode from '../src/find-dom-node';
import { render } from '@testing-library/react';

describe('events', () => {
  it('should work with onclick', () => {
    function App() {
      const ref = useRef(null);

      const obj = {
        handleClick: () => console.log('click'),
      }

      const click = vi.spyOn(obj, 'handleClick')

      useEffect(() => {
        const dom = findDOMNode(ref.current);
        dom.click();
        expect(click).toHaveBeenCalled()
      });

      return createElement('div', {
        onclick: obj.handleClick,
        ref: ref
      }, 'click me')
    }

    render(<App />);
  });
});
