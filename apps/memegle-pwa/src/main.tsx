import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { initI18n } from '@memegle/i18n';

import App from './app/app';

initI18n({
  fallbackLng: 'kr',
  supportedLngs: ['kr', 'en'],
});

const rootElement = document.querySelector('#root') as Element;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </StrictMode>
  );
}
