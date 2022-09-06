import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component, useState } from '../src/index';
import { createElement } from '../src/create-element';
import { render } from '@testing-library/react';

describe('inputElement', () => {
  it('should work with update input value', () => {
    function TestInput() {
      const [val, setVal] = useState('input value');
      return <div>
        <input
          data-testid="TextComponent"
          value={val}
        />

        <div
          data-testid="clickDiv"
          onClick={() => {
            console.log('click')
            setVal('111');
          }}
        >
          click me...
        </div>
      </div>;
    }

    const wrapper = render(createElement(TestInput));
    wrapper.queryByTestId('clickDiv')?.click();
    const node = wrapper.queryByTestId('TextComponent');

    setTimeout(() => {
      // Wait for click handler.
      expect(node.value).toBe('111');
    }, 0);
  });
});
