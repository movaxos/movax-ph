import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

// Get saved language or detect from browser
const getInitialLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved && ['ar', 'en'].includes(saved)) {
    return saved;
  }
  // Detect from browser
  const browserLang = navigator.language?.split('-')[0];
  return browserLang === 'ar' ? 'ar' : 'en';
};

// Transform translations to proper i18next format with 'translation' namespace
const resources = {
  ar: {
    translation: translations.ar
  },
  en: {
    translation: translations.en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.style.fontFamily = lang === 'ar'
    ? "'IBM Plex Sans Arabic', 'Cairo', sans-serif"
    : "'Inter', 'DM Sans', sans-serif";
};

export const getCurrentLanguage = () => i18n.language;
