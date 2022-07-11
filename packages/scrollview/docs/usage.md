---
title: 基础用法
sidebar_label: 基础
---

本 DEMO 演示基础的用法。

```jsx preview
import * as React from 'react';
import { useRef } from 'react';
import ScrollView from '@ice/scrollview';
import styles from './index.module.css';

function Thumb({ index }) {
  return (
    <div id={'id_' + index} className={styles.button}>
      <div className={styles.box}>{index}</div>
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
    <div className={styles.root}>
      <div className={styles.container}>
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
          className={styles.button}
          onClick={() => horizontalScrollViewRef.current.scrollTo({ x: 0 })}
        >
          <span>Scroll to start</span>
        </div>
        <div
          className={styles.button}
          onClick={() =>
            horizontalScrollViewRef.current.scrollIntoView({ id: 'id_2' })
          }
        >
          <span>Scroll to the third item</span>
        </div>
      </div>
      <div className={styles.container} style={{ flex: 1, maxHeight: '50vh' }}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log(e);
          }}
        >
          <div>
            <div className={styles.sticky}>
              <span>Cannot sticky</span>
            </div>
          </div>
          <div className={styles.sticky}>
            <span>Sticky view must in ScrollView root</span>
          </div>
          {list.map(createThumbRow)}
        </ScrollView>
        <div
          className={styles.button}
          onClick={() => scrollViewRef.current.scrollTo({ y: 0 })}
        >
          <span>Scroll to top</span>
        </div>
      </div>
    </div>
  );
}

```
