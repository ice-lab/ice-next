---
sidebar_label: Usage
---

本 Demo 演示一行文字的用法。

```jsx preview
import * as React from 'react';
import { useRef } from 'react';
import ScrollView from '@ice/scrollview';
import './index.css';

function Thumb({ index }) {
  return (
    <div id={'id_' + index} className="button">
      <div className="box">{index}</div>
    </div>
  );
}

const list = [];
for (let i = 0; i < 20; i++) list.push(i);
const createThumbRow = (val, i) => <Thumb index={i} key={i} />;

export default function App() {
  const horizontalScrollViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  return (
    <div className="root">
      <div className="container">
        <ScrollView
          ref={horizontalScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log(e);
          }}
        >
          {list.map(createThumbRow)}
        </ScrollView>
        <div
          className="button"
          onClick={() => horizontalScrollViewRef.current.scrollTo({ x: 0 })}
        >
          <span>Scroll to start</span>
        </div>
        <div
          className="button"
          onClick={() =>
            horizontalScrollViewRef.current.scrollIntoView({ id: 'id_2' })
          }
        >
          <span>Scroll to the third item</span>
        </div>
      </div>
      <div className="container" style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log(e);
          }}
        >
          <div>
            <div className='sticky'>
              <span>Cannot sticky</span>
            </div>
          </div>
          <div className='sticky'>
            <span>Sticky view must in ScrollView root</span>
          </div>
          {list.map(createThumbRow)}
        </ScrollView>
        <div
          className="button"
          onClick={() => scrollViewRef.current.scrollTo({ y: 0 })}
        >
          <span>Scroll to top</span>
        </div>
      </div>
    </div>
  );
}

```
