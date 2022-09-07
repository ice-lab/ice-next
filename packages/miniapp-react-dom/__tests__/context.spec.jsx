import { expect, describe, test } from 'vitest';
import * as React from 'react'
import { render } from '../esm/index';
import { document } from '@ice/miniapp-runtime';

describe('Context', () => {
  test('Context must be available in the consumer', () => {
    let actual = 0;
    const Context = React.createContext();

    function Consumer () {
      return (
        <Context.Consumer>
          {value => {
            actual = value
            return <text prop={'Result: ' + value} />
          }}
        </Context.Consumer>
      );
    }

    class MyNode extends React.Component {
      render () {
        return (
          <view>
            <text>Noise</text>
            <Consumer />
          </view>
        );
      }
    }

    const container = document.createElement('view')
    render(
      <Context.Provider value={5}>
        <MyNode />
      </Context.Provider>,
      container,
      function () {
        expect(actual).toBe(5);
      }
    );
  })
})