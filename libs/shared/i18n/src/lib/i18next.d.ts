import type { defaultLocalesNamespace, resources } from './i18n-core';

// At this moment, we are not using the `defaultNS` and `resources` properties
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultLocalesNamespace;
    resources: (typeof resources)['kr'];
  }
}
