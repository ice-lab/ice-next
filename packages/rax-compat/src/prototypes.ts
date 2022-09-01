import { registrationNameToReactEvent } from './events';

export default function transformPrototypes(props: Object): void {
  Object.keys(props).forEach((propKey: string) => {
    // Transform the event so that it works properly in React.
    // ontouchstart can work in rax, but react will check event in event plugin.
    // Rax compat should transform event which can work in rax runtime.
    // React support onDoubleClick but dblclick event is web Standards events.
    // etc...
    if (propKey.startsWith('on')) {
      const lowerCasedPropkey: string = propKey.toLowerCase();
      if (registrationNameToReactEvent.hasOwnProperty(lowerCasedPropkey)) {
        const reactEvent: string = registrationNameToReactEvent[lowerCasedPropkey];
        if (reactEvent !== propKey) {
          props[reactEvent] = props[propKey];
          delete props[propKey];
        }
      }
    }
  });
}
