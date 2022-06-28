import type { RefAttributes, HTMLAttributes, UIEvent } from 'react';

export interface ScrollViewRefObject {
  _nativeNode: HTMLDivElement;
  resetScroll: () => void;
  scrollTo: (options?: {
    x?: number | string;
    y?: number | string;
    animated?: boolean;
  }) => void;
}

export interface ScrollEvent extends UIEvent<HTMLDivElement> {
  readonly contentOffset: {
    x: number;
    y: number;
  };
  readonly contentSize: {
    width: number;
    height: number;
  };
}

export interface ScrollViewProps extends RefAttributes<ScrollViewRefObject>, HTMLAttributes<HTMLDivElement>{
  scrollEventThrottle?: number;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  onEndReachedThreshold?: number | string;
  onEndReached?: (e: ScrollEvent) => void;
  contentContainerStyle?: object;
  disableScroll?: boolean;
  onScroll?: (e: ScrollEvent) => void;
}

declare global {
  function __weex_require__(weexModuleName: string): any;
}
