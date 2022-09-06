import React from 'react';
import { expect, it, describe, vi } from 'vitest';
import { Component, useState } from '../src/index';
import { createElement } from '../src/create-element';
import { render } from '@testing-library/react';

describe('inputElement', () => {
  it('should work with update input value', () => {
    function TestInput() {
      const [val, setVal] = useState('input value');
      return <div>
        <input
          data-testid="inputValue"
          value={val}
        />

        <div
          data-testid="inputValueDiv"
          onClick={() => {
            setVal('111');
          }}
        >
          click me...
        </div>
      </div>;
    }

    const wrapper = render(createElement(TestInput));
    wrapper.queryByTestId('inputValueDiv')?.click();
    const node = wrapper.queryByTestId('inputValue');

    setTimeout(() => {
      // Wait for click handler.
      expect(node.value).toBe('111');
    }, 0);
  });

  it('inputElement should not recreate when update props', () => {
    function TestInput() {
      const [val, setVal] = useState('input value');
      return <div>
        <input
          data-testid="sameInput"
          value={val}
        />

        <div
          data-testid="sameInputDiv"
          onClick={() => {
            setVal('111');
          }}
        >
          click me...
        </div>
      </div>;
    }

    const wrapper = render(createElement(TestInput));

    const node = wrapper.queryByTestId('sameInput');
    node?.setAttribute('date-value', 'val');

    wrapper.queryByTestId('sameInputDiv')?.click();

    setTimeout(() => {
      // Wait for click handler.
      expect(node?.getAttribute('date-value')).toBe('val');
    }, 0);
  });

  it('should work with onChange', () => {
    const obj = {
      handleChange: () => console.log('change'),
    }
    const change = vi.spyOn(obj, 'handleChange');

    function TestInput() {
      const [val, setVal] = useState('input value');

      return <div>
        <input
          data-testid="changeInput"
          value={val}
          onChange={obj.handleChange}
        />
      </div>;
    }

    const wrapper = render(createElement(TestInput));

    const node = wrapper.queryByTestId('changeInput');
    node?.dispatchEvent('change');

    setTimeout(() => {
      // Wait for click handler.
      expect(change).toHaveBeenCalled()
    }, 0);
  });
});
