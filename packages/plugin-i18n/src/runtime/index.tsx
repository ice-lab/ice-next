import React from 'react';
import type { RuntimePlugin } from '@ice/types';
import { PLUGIN_NAME } from '../constants.js';
import { I18nProvider } from './I18nContext.js';

const runtime: RuntimePlugin = async ({ addProvider }, pluginData) => {
  addProvider(({ children }) => (
    <I18nProvider i18nConfig={pluginData[PLUGIN_NAME]}>
      {children}
    </I18nProvider>
  ));
};

export default runtime;
