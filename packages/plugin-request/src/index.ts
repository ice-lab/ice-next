import type { Plugin } from '@ice/types';
import type { IRequest, IInterceptors, IInterceptorRequest, IInterceptorResponse } from './types';

interface PluginRequestOptions {}

const plugin: Plugin<PluginRequestOptions | void> = () => ({
  name: 'plugin-request',
  setup: ({ onGetConfig, context, generator }) => {
    // Add useRequest export for 'ice'.
    //   import { useRequest } from 'ice';
    generator.addExport({
      specifier: 'useRequest',
      source: '@ice/plugin-request/hooks',
      type: false,
    });
    //   import { request } from 'ice';
    generator.addExport({
      specifier: 'request',
      source: '@ice/plugin-request/request',
      type: false,
    });
  },
});

export type {
  IRequest,
  IInterceptors,
  IInterceptorRequest,
  IInterceptorResponse,
  PluginRequestOptions,
};
export default plugin;
