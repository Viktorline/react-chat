import i18n from 'i18next';

export const changeLanguage = async () => {
  try {
    const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';
    await i18n.changeLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};
