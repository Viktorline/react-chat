import { translations } from 'app/locales';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = localStorage.getItem('lang') || 'ru';

const resources = {
  en: {
    translation: translations.en,
  },
  ru: {
    translation: translations.ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((error) => {
    console.error(error);
  });

export default i18n;
