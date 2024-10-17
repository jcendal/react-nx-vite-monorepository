import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Nullable } from '@memegle/utils';

export const Home = (): Nullable<ReactElement> => {
  const { t, i18n } = useTranslation();

  const onTranslateButtonClick = async (): Promise<void> => {
    if (i18n.resolvedLanguage === 'kr') {
      await i18n.changeLanguage('en');
    } else {
      await i18n.changeLanguage('kr');
    }
  };

  return (
    <div className="container">
      <p className="text">{t('home.greeting')}</p>
      <button type="submit" onClick={onTranslateButtonClick}>
        translate
      </button>
    </div>
  );
};
