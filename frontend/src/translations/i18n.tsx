import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
        loadPath: `http://localhost:4000/locales/{{lng}}/{{ns}}.json`,
    },
    resources: {
      en: {
        translation: {
          login: {
            login: "Login",
            username: "Enter username",
            password: "Enter password",
            log_in: "Log in",
            theme: "theme",
            txt_rotation0: "Fully designing your process in",
            txt_rotation1: "flowers & plants",
            txt_rotation2: "fruit & vegetables",
            txt_rotation3: "poultry",
            txt_rotation4: "insect farming",
            txt_rotation5: "intralogistics",
          },
          setting: {
            account: "Edit Account",
            theme: "Theme",
            themeL: "Light",
            themeD: "Dark",
            lang: "Language",
            langNl: "Dutch",
            langEn: "English",
            langPl: "Polish",
            logOut: "Log Out",
          }
        }
      },
      nl: {
        translation: {
            login: {
              login: "Login",
              username: "Voer gebruikersnaam in",
              password: "Voer wachtwoord in",
              log_in: "Log in",
              theme: "thema",
              txt_rotation0: "Het volledig inrichten van uw proces",
              txt_rotation1: "bloemen & planten",
              txt_rotation2: "groente & fruit",
              txt_rotation3: "gevogelte",
              txt_rotation4: "insecten kweken",
              txt_rotation5: "intralogistiek",
          },
          setting: {
            account: "Account Aanpassen",
            theme: "Thema",
            themeL: "Light",
            themeD: "Donker",
            lang: "Taal",
            langNl: "Nederlands",
            langEn: "Engels",
            langPl: "Pools",
            logOut: "Log Uit",
          }
        }
      }
    }
  });

export default i18n;