import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// english
import commonEn from "src/locales/en/common.json";

// thai
import commonTh from "src/locales/th/common.json";

export const resources = {
  en: {
    common: commonEn,
  },
  th: {
    common: commonTh,
  },
} as const;

const lang = localStorage.getItem("i18nextLng");
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: lang ? lang : "en",
    fallbackLng: "en",
    ns: ["auth"],
    resources,
  });
