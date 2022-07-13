import type {
  Attributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { createElement as _createElement, useEffect, useRef, forwardRef } from 'react';
import { cached, convertUnit } from 'style-unit';
import { observerElement } from './visibility';
import { isFunction, isObject, isNumber } from './type';

// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js
// opacity -> opa
// fontWeight -> ntw
// lineHeight|lineClamp -> ne[ch]
// flex|flexGrow|flexPositive|flexShrink|flexNegative|boxFlex|boxFlexGroup|zIndex -> ex(?:s|g|n|p|$)
// order -> ^ord
// zoom -> zoo
// gridArea|gridRow|gridRowEnd|gridRowSpan|gridRowStart|gridColumn|gridColumnEnd|gridColumnSpan|gridColumnStart -> grid
// columnCount -> mnc
// tabSize -> bs
// orphans -> orp
// windows -> ows
// animationIterationCount -> onit
// borderImageOutset|borderImageSlice|borderImageWidth -> erim
const NON_DIMENSIONAL_REG = /opa|ntw|ne[ch]|ex(?:s|g|n|p|$)|^ord|zoo|grid|orp|ows|mnc|^columns$|bs|erim|onit/i;

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @returns Element
 */
export function createElement<P extends {
  ref: RefObject<any>;
  children: any;
  style?: object;
  onAppear?: Function;
  onDisappear?: Function;
}>(
  type: FunctionComponent<P> | string,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement {
  const rest = Object.assign({}, props);
  const { onAppear, onDisappear } = rest;
  delete rest.onAppear;
  delete rest.onDisappear;

  // Compat for style unit.
  const compatStyleProps = compatStyle(rest.style);
  if (compatStyleProps) {
    rest.style = compatStyleProps;
  }

  // const el = _createElement(type, rest, ...children);
  if (isFunction(onAppear) || isFunction(onDisappear)) {
    type UpdateRef = (props: Attributes | P) => any;
    return _createElement(
      forwardRef(VisibilityChange),
      {
        onAppear,
        onDisappear,
        ref: rest.ref,
        children: (updateRef: UpdateRef) => _createElement(type, updateRef(rest), ...children),
      },
    );
  } else {
    return _createElement(type, rest, ...children);
  }
}

function VisibilityChange({
  onAppear,
  onDisappear,
  children,
}: any, forwardedRef: RefObject<any>) {
  const fallbackRef = useRef(null); // `fallbackRef` used if `ref` is not provided.
  const ref = forwardedRef || fallbackRef;

  useEffect(() => {
    const { current } = ref;
    if (current != null) {
      if (isFunction(onAppear)) {
        observerElement(current as HTMLElement);
        current.addEventListener('appear', onAppear);
      }
    }

    return () => {
      const { current } = ref;
      if (current) {
        current.removeEventListener('appear', onAppear);
      }
    };
  }, [ref, onAppear]);

  useEffect(() => {
    const { current } = ref;
    if (current != null) {
      if (isFunction(onDisappear)) {
        observerElement(current as HTMLElement);
        current.addEventListener('disappear', onDisappear);
      }
    }
    return () => {
      const { current } = ref;
      if (current) {
        current.removeEventListener('disappear', onDisappear);
      }
    };
  }, [ref, onDisappear]);

  function updateRef(props: Attributes | any) {
    props.ref = ref;
    return props;
  }
  return children(updateRef);
}

const isDimensionalProp = cached((prop: string) => !NON_DIMENSIONAL_REG.test(prop));

// Convert unit as driver-dom does.
// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js#L346
function compatStyle<S = object>(style?: S): S | void {
  if (isObject(style)) {
    // Do not modify the original style object, copy results to another plain object.
    const result = Object.create(Object.prototype);
    for (let key in style) {
      const value = style[key];
      if (isNumber(value) && isDimensionalProp(key)) {
        // Transform rpx to vw.
        result[key] = convertUnit(`${value}rpx`);
      } else {
        result[key] = convertUnit(value);
      }
    }
    return result;
  }
  return style;
}
