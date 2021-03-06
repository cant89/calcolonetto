import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import IT from "./locales/it/translation.json";
import EN from "./locales/en/translation.json";

const resources = {
  it: {
    translation: IT,
  },
  en: {
    translation: EN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: false, //process.env !== "production",
    lng: "it",
    fallbackLng: "it",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
