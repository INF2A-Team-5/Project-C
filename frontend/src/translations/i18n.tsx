import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpBackend from "i18next-http-backend"; // *** added this ***

i18n
//   .use(HttpBackend) // *** added this ***
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   .use(LanguageDetector)
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    // supportedLngs: ["en", "nl"], // *** added this ***
    // ns: ['translations'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
        loadPath: `http://localhost:4000/locales/{{lng}}/{{ns}}.json`,
    },
    resources: {
      en: {
        translation: {
          login: {
            login: "Login",
            username: "Username",
            password: "Password",
            log_in: "Log in",
            theme: "theme",
            txt_rotation0: "Fully designing your process in",
            txt_rotation1: "flowers & plants",
            txt_rotation2: "fruit & vegetables",
            txt_rotation3: "poultry",
            txt_rotation4: "insect farming",
            txt_rotation5: "intralogistics",
          }
        }
      },
      nl: {
        translation: {
            login: {
              login: "Login",
              username: "Gebruikersnaam",
              password: "Wachtwoord",
              log_in: "Log in",
              theme: "thema",
              txt_rotation0: "Het volledig inrichten van uw proces in",
              txt_rotation1: "bloemen & planten",
              txt_rotation2: "groente & fruit",
              txt_rotation3: "gevogelte",
              txt_rotation4: "insecten kweken",
              txt_rotation5: "intralogistiek",
          }
        }
      }
    }
  });

export default i18n;