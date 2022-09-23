import core from "../../../../src/core";

// Interface
interface StringsInterface {
  headerText: string;
  logoutAlertTitle: string;
  logoutAlertText: string;
  deleteAccountAlertTitle: string;
  deleteAccountAlertText: string;
  noButtonText: string;
  yesButtonText: string;
  nameIsToShortError: string;
  descriptionIsToShortError: string;
  updatedProfileSuccessText: string;
  updatedProfileSuccessTitle: string;
  logoutSuccessTitle: string;
  logoutSuccessText: string;
  deleteAccountSuccessTitle: string;
  deleteAccountSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Other
    headerText: "Your Profile",

    // Alerts
    logoutAlertTitle: "Are you sure?",
    logoutAlertText: "Do you really want to miss a cake?",
    deleteAccountAlertTitle: "Are you sure?",
    deleteAccountAlertText: "Do you really want to let your team down?",

    // Errors
    nameIsToShortError: "The Name is to short!",
    descriptionIsToShortError: "The Description is to short!",

    // Success
    updatedProfileSuccessText: "Successfully updated Profile",
    updatedProfileSuccessTitle: "Success",
    logoutSuccessTitle: "Success",
    logoutSuccessText: "Successfully logged out",
    deleteAccountSuccessTitle: "Success",
    deleteAccountSuccessText: "Successfully deleted Account",

    // Buttons
    noButtonText: "No",
    yesButtonText: "Yes",
  },
  de: {
    // Other
    headerText: "Dein Profil",

    // Alerts
    logoutAlertTitle: "Bist du dir sicher?",
    logoutAlertText: "Willst du wirklich einen Kuchen verpassen?",
    deleteAccountAlertTitle: "Bist du dir sicher?",
    deleteAccountAlertText: "Willst du wirklich dein Team im Stich lassen?",

    // Errors
    nameIsToShortError: "Der Name ist zu kurz!",
    descriptionIsToShortError: "Die Beschreibung ist zu kurz!",

    // Success
    updatedProfileSuccessText: "Erfolgreich Profile aktuallisiert",
    updatedProfileSuccessTitle: "Erfolg",
    logoutSuccessTitle: "Erfolg",
    logoutSuccessText: "Erfolgreich ausgeloggt",
    deleteAccountSuccessTitle: "Erfolg",
    deleteAccountSuccessText: "Erfolgreich ausgeloggt",

    // Buttons
    noButtonText: "Nein",
    yesButtonText: "Ja",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
