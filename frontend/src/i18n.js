import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "locales/{{lng}}/translation.json",
        },
        lng: 'fr',
        fallbackLng: 'en',
        debug: true,
        supportedLngs: ['fr', 'en'],
        load: 'languageOnly',
        ns: ['messages', 'auth', 'songs', 'tickets', 'errors', 'signup', 'user-infos', 'signin', 'modal'],
        interpolation: {
            escapeValue: false,
        },
    });
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});
export default i18n;
