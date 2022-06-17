import type { CSSProperties, ForwardRefExoticComponent } from 'react';
import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import cx from 'classnames';
import { ScrollViewProps } from '../types';
import defaultProps from '../defaultProps';
import { getInfoSync } from '@uni/system-info';
import '../index.css';

const FULL_WIDTH = 750;
const ANIMATION_DURATION = 400;
const baseCls = 'ice-scrollview';
let pixelRatio: number;

function getPixelRatio() {
  if (pixelRatio) {
    return pixelRatio;
  }
  pixelRatio = getInfoSync().windowWidth / FULL_WIDTH;
  return pixelRatio;
}

function translateToPx(origin: string | number): number {
  if (typeof origin === 'number') {
    return origin;
  }
  const matched = /^([\d.]+)(r?px)?$/.exec(origin);
  if (matched) {
    if (!matched[2]) {
      return parseFloat(matched[1]);
    }
    if (matched[2] === 'rpx') {
      return parseFloat(matched[1]) * getPixelRatio();
    }
    if (matched[2] === 'px') {
      return parseFloat(matched[1]);
    }
  }
  return 0;
}

const ScrollView: ForwardRefExoticComponent<ScrollViewProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      style,
      horizontal,
      onEndReached,
      onScroll,
      children,
      disableScroll = false,
      onEndReachedThreshold,
    } = props;
    const [scrollTop] = useState(0);
    const [scrollLeft] = useState(0);
    const [scrollWithAnimation, setScrollWithAnimation] = useState(false);
    const [scrollAnimationDuration, setScrollAnimationDuration] = useState(ANIMATION_DURATION);
    const [scrollIntoViewId] = useState(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const handleScroll = (e: Event | any) => {
      if (onScroll) {
        e.nativeEvent = {
          get contentOffset() {
            return {
              x: e.detail.scrollLeft,
              y: e.detail.scrollTop,
            };
          },
          get contentSize() {
            return {
              width: e.detail.scrollWidth,
              height: e.detail.scrollHeight,
            };
          },
        };
        onScroll(e);
      }
    };
    useImperativeHandle(ref, () => ({
      _nativeNode: scrollerRef.current,
      resetScroll() {
        if (horizontal) {
          scrollerRef.current.setAttribute('scroll-left', '0');
        } else {
          scrollerRef.current.setAttribute('scroll-top', '0');
        }
      },
      scrollTo(options?: {
        x?: number | string;
        y?: number | string;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true, duration = ANIMATION_DURATION } = options || {};

        // Scroll event caused by users can not change scroll-top or scroll-left, so here we add some slight random element to force update
        if (horizontal) {
          scrollerRef.current.setAttribute('scroll-left', String(translateToPx(x)));
        } else {
          scrollerRef.current.setAttribute('scroll-top', String(translateToPx(y)));
        }
        setScrollWithAnimation(animated);
        setScrollAnimationDuration(duration);
      },
      scrollIntoView(options: {
        id: string;
        animated?: boolean;
        duration?: number;
      }) {
        const { id, animated = true, duration = ANIMATION_DURATION } = options || {};
        if (!id) {
          throw new Error('Params missing id.');
        }
        scrollerRef.current.setAttribute('scroll-into-view', id);
        setScrollWithAnimation(animated);
        setScrollAnimationDuration(duration);
      },
    }));

    const scrollerStyle: CSSProperties = {
      ...style,
    };

    if (scrollerStyle.height === null) {
      scrollerStyle.flex = 1;
    }

    const cls = cx(
      baseCls,
      `${baseCls}-${horizontal ? 'horizontal' : 'vertical'}`,
      className,
    );

    const endReachedThreshold = translateToPx(onEndReachedThreshold);

    return (
      // @ts-ignore
      <scroll-view
        {...props}
        ref={scrollerRef}
        className={cls}
        style={scrollerStyle}
        scroll-top={scrollTop}
        scroll-left={scrollLeft}
        onScroll={onScroll ? handleScroll : null}
        onScrollToLower={onEndReached}
        lower-threshold={endReachedThreshold}
        scroll-with-animation={scrollWithAnimation}
        scroll-animation-duration={scrollAnimationDuration}
        scroll-x={!disableScroll && horizontal}
        scroll-y={!disableScroll && !horizontal}
        scroll-into-view={scrollIntoViewId}
        enable-flex
      >
        {children}
        {/* @ts-ignore */}
      </scroll-view>
    );
  },
);

export default defaultProps(ScrollView);
