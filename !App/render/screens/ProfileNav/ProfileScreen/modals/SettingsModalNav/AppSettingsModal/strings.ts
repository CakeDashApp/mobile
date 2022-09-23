import core from "../../../../../../../src/core";

// Interface
interface StringsInterface {
  generalTitle: string;
  darkModeTitle: string;
  darkModeText: string;
  languageTitle: string;
  languageText: string;
  englishButtonText: string;
  germanButtonText: string;
  resourcesTitle: string;
  vectorIconsTitle: string;
  vectorIconsText: string;
  websiteButtonText: string;
  vectorImagesTitle: string;
  vectorImagesText: string;
  settingsAppTitle: string;
  settingsAppSubTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Title
    generalTitle: "General",
    resourcesTitle: "Resources",
    settingsAppTitle: "App",
    settingsAppSubTitle: "Settings",

    darkModeTitle: "Dark Mode",
    darkModeText: "Will change the theme of your !App",
    languageTitle: "Language",
    languageText: "Will change the language of your !App",
    vectorIconsTitle: "Vector Icons",
    vectorIconsText: "https://feathericons.com/",
    vectorImagesTitle: "Vector Images",
    vectorImagesText: "https://www.freepik.com/",

    // Button
    englishButtonText: "English",
    germanButtonText: "German",
    websiteButtonText: "Website",
  },
  de: {
    // Title
    generalTitle: "General",
    resourcesTitle: "Resources",
    settingsAppTitle: "App",
    settingsAppSubTitle: "Einstellungen",

    darkModeTitle: "Dark Mode",
    darkModeText: "Wir das Theme deiner App ändern",
    languageTitle: "Sprache",
    languageText: "Wird die Sprache deiner App ändern",
    vectorIconsTitle: "Vector Icons",
    vectorIconsText: "https://feathericons.com/",
    vectorImagesTitle: "Vector Images",
    vectorImagesText: "https://www.freepik.com/",

    // Button
    englishButtonText: "Englisch",
    germanButtonText: "Deutsch",
    websiteButtonText: "Webseite",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
