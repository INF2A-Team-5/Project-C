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
          },
          editticket: {
            header: "Edit your ticket",
            notes: "Add notes",
            notes2: "Still does not work, because...",
            description: "Give us a detailed description on what you want to update the ticket with",
            pictures: "Add pictures",
            submit: "Submit",
            cancel: "Cancel",
            problem: "Problem: ",
            mbd: "Must be doing: ",
            tried: "Have tried: ",
            notes3: "Notes: ",
            ticketinfo: "Show ticket information"

          },
          ticket: {
            phonealert: "Please enter a phone number",
            wordsalert: "The first 2 answers must contain at least 20 words",
            machinealert: "Please choose a machine",
            submitalert: "Ticket submitted",
            submit: 'Submit',
            emptyalert: "You haven't filled in all necessary fields",
            header: "Report error",
            details: "Give details of the error and we will try to help you as soon as possible",
            selectmachine: "Select Machine",
            selectmachinedes: "Select the machine related to the ticket",
            place1: "shit broken...",
            place2: "Pack in stuff...",
            place3: "Restarted the machine...",
            place4: "Enter phonenumber",
            problem: "What do you see?*",
            problemdes: "Give us a detailed description on any visible defects (Atleast 20 words)",
            bedoing: "What should it do?*",
            bedoingdes: "Give us a detailed description on what the machine should do (Atleast 20 words)",
            havetried: "What have you tried?*",
            havetrieddes: "Describe all things you have done to try fixing the machine",
            phonenum: "Use other phone Number",
            files: "Upload files",
            cancel: "Cancel"
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
          },
          editticket: {
            header: "Pas je ticket aan",
            notes: "Voeg notities toe",
            notes2: "Werkt nog steeds niet, want...",
            description: "Geef ons een gedetailleerde beschrijving waarmee je de ticket wilt updaten",
            pictures: "Voeg eventuele foto's toe",
            submit: "Dien in",
            cancel: "Annuleer",
            problem: "Probleem: ",
            mbd: "Hoort te doen: ",
            tried: "Heb geprobeerd: ",
            notes3: "notities: ",
            ticketinfo: "Laat ticket informatie zien"
          },
          ticket: {
            phonealert: "Vul AUB je telefoonnummer in",
            wordsalert: "De eerste 2 antwoorden moeten 20 woorden bevatten",
            machinealert: "Kies AUB een machine",
            submitalert: "Ticket ingediend",
            submit: 'Dien in',
            emptyalert: "Je hebt nog niet alle verplichte velden ingevuld",
            header: "Meld een foutmelding",
            details: "Geef alle details van de foutmelding en we zullen je zo snel mogelijk helpen",
            selectmachine: "Selecteer Machine",
            selectmachinedes: "Selecteer de machine waar je een melding van wilt maken",
            place1: "Er zijn dingen kapot...",
            place2: "Spullen in te pakken",
            place3: "Machine opnieuw aangezet",
            place4: "Vul telefoonnummer in",
            problem: "Wat zie je gebeuren?*",
            problemdes: "Geef ons een gedetailleerde beschrijving van zichtbare defecten (Tenminste 20 woorden)",
            bedoing: "Wat hoort de machine te doen?*",
            bedoingdes: "Geef ons een gedetailleerde beschrijving van wat de machine hoort te doen (Tenminste 20 woorden)",
            havetried: "Wat heb je al geprobeerd?*",
            havetrieddes: "Beschrijf alles wat je al hebt geprobeerd om het probleem op te lossen",
            phonenum: "Kies een ander telefoonnummer dan van account",
            files: "Upload bestanden",
            cancel: "Annuleer"
          }
        }
      }
    }
  });

export default i18n;