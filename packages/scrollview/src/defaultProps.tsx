import type { ForwardRefExoticComponent } from 'react';
import type { ScrollViewProps } from './types';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

export default function wrapDefaultProperties(
  ScrollView: ForwardRefExoticComponent<ScrollViewProps>,
): ForwardRefExoticComponent<ScrollViewProps> {
  ScrollView.defaultProps = {
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    className: 'ice-scrollview',
  };
  ScrollView.displayName = 'ScrollView';
  return ScrollView;
}
