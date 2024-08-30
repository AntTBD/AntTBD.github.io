import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enNavbar from "./locales/en/navbar.json"
import frNavbar from "./locales/fr/navbar.json"
import enCommon from "./locales/en/common.json"
import frCommon from "./locales/fr/common.json"
import enHome from "./locales/en/home.json"
import frHome from "./locales/fr/home.json"
import enDiplomas from "./locales/en/diplomas.json"
import frDiplomas from "./locales/fr/diplomas.json"
import enWorkExperience from "./locales/en/workExperience.json"
import frWorkExperience from "./locales/fr/workExperience.json"
import enProjects from "./locales/en/projects.json"
import frProjects from "./locales/fr/projects.json"
import enContact from "./locales/en/contact.json"
import frContact from "./locales/fr/contact.json"
import enFooter from "./locales/en/footer.json"
import frFooter from "./locales/fr/footer.json"
import {DateTime} from 'luxon';

export const defaultNS = "common";
export const resources = {
    en: {
        common: enCommon,
        navbar: enNavbar,
        home: enHome,
        diplomas: enDiplomas,
        workExperience: enWorkExperience,
        projects: enProjects,
        contact: enContact,
        footer: enFooter,
    },
    fr: {
        common: frCommon,
        navbar: frNavbar,
        home: frHome,
        diplomas: frDiplomas,
        workExperience: frWorkExperience,
        projects: frProjects,
        contact: frContact,
        footer: frFooter,
    },
} as const;

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    //.use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        supportedLngs: ["en", "fr"],
        fallbackLng: "en",// If does not find the language of the browser, is going to use english as a default language
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
            // format: (value, format, lng) => { // legacy usage
            //   if (value instanceof Date) {
            //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
            //   }
            //   return value;
            // }
        },
        react: {
            useSuspense: true,
        },
        defaultNS,
        resources,
        //saveMissing:true,
        returnObjects: true,
    })
    .then(r => r);

i18n?.services?.formatter?.add('DATE_LONG', (value, lng, _options) => {
    return DateTime.fromJSDate(value).setLocale(lng as string).toLocaleString(DateTime.DATE_HUGE)
});
export default i18n;