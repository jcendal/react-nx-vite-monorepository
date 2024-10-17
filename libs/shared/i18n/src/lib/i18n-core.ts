import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { isProduction } from '@memegle/common';

import {
  DefaultSupportedLangs,
  getDefaultSupportedLangs,
  I18nOptions,
} from './models';

export const DEFAULT_LOCALES_NAMESPACE = 'translations';

// Function to initialize i18n with the provided options
export function initI18n(options?: I18nOptions): void {
  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
      ns: options?.ns || [DEFAULT_LOCALES_NAMESPACE],
      defaultNS: options?.defaultNS || DEFAULT_LOCALES_NAMESPACE,
      debug: !isProduction,
      fallbackLng: options?.fallbackLng || DefaultSupportedLangs.kr,
      supportedLngs: options?.supportedLngs || getDefaultSupportedLangs(),
      load: 'currentOnly',
      detection: {
        lookupCookie: 'i18nextLng',
        lookupLocalStorage: 'i18nextLng',
        order: [
          'localStorage',
          'cookie',
          'querystring',
          'sessionStorage',
          'navigator',
        ],
        caches: ['localStorage', 'cookie'],
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        loadPath: (lngs, namespaces) =>
          `${window.location.origin}/i18n/${lngs[0]}/${namespaces[0]}.json`,
        request: (_options, url, _payload, callback) => {
          try {
            fetch(url)
              .then((response) => {
                if (!response.ok)
                  throw new Error(`Error fetching locale ${url}`);
                return response.json(); // Devuelve la promesa de response.json()
              })
              .then((result) => {
                callback(null, {
                  data: result,
                  status: 200,
                });
              });
          } catch (e) {
            console.error(e);
          }
        },
      },
    });
}

// import i18n, { type InitOptions } from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// import { isProduction } from '@memegle/common';

// export type Resource = { prefix: string; suffix: string };
// export const defaultLocalesNamespace = 'translations';

// // Cargador múltiple personalizado para i18next
// class MultiTranslateHttpLoader {
//   private _resources: Resource[];

//   constructor({ resources }: { resources: Resource[] }) {
//     this._resources = resources;
//   }

//   public async getTranslation(lang: string): Promise<Record<string, unknown>> {
//     const fetchPromises = this._resources.map(async (resource: Resource) => {
//       const response = await fetch(
//         `${resource.prefix}${lang}${resource.suffix}`
//       );
//       if (!response.ok) {
//         console.error(
//           `Error fetching ${resource.prefix}${lang}${resource.suffix}`
//         );
//         return {};
//       }
//       return response.json();
//     });

//     const records = await Promise.all(fetchPromises);
//     return this.mergeRecordsRecursively(records);
//   }

//   // Método privado para combinar múltiples objetos de traducción recursivamente
//   public mergeRecordsRecursively(
//     records: Record<string, unknown>[]
//   ): Record<string, unknown> {
//     const mergedRecords: Record<string, unknown> = {};

//     for (const record of records) {
//       for (const key in record) {
//         if (Object.prototype.hasOwnProperty.call(record, key)) {
//           if (typeof record[key] === 'object' && record[key] !== null) {
//             mergedRecords[key] = this.mergeRecordsRecursively([
//               mergedRecords[key] as Record<string, unknown>,
//               record[key] as Record<string, unknown>,
//             ]);
//           } else {
//             mergedRecords[key] = record[key];
//           }
//         }
//       }
//     }

//     return mergedRecords;
//   }
// }

// // Función para inicializar i18n con el cargador personalizado
// const i18nOptions: InitOptions = {
//   defaultNS: defaultLocalesNamespace,
//   ns: [defaultLocalesNamespace],
//   fallbackLng: 'en',
//   debug: !isProduction,
//   detection: {
//     lookupCookie: 'i18nextLng',
//     lookupLocalStorage: 'i18nextLng',
//     order: [
//       'localStorage',
//       'cookie',
//       'querystring',
//       'sessionStorage',
//       'navigator',
//     ],
//     caches: ['localStorage', 'cookie'],
//   },
//   interpolation: {
//     escapeValue: false, // not needed for react as it escapes by default
//   },
//   backend: {
//     loadPath: async (lng: string) => {
//       const loader = new MultiTranslateHttpLoader({
//         resources: [
//           { prefix: '/i18n/', suffix: `/${defaultLocalesNamespace}.json` },
//           {
//             prefix: '/extra-i18n/',
//             suffix: `/${defaultLocalesNamespace}.json`,
//           }, // Otra ubicación
//         ],
//       });
//       return loader.getTranslation(lng);
//     },
//   },
// };

// void i18n.use(initReactI18next).use(LanguageDetector).init(i18nOptions);
