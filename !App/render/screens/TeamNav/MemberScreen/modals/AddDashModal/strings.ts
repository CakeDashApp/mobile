import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  addDashModalTitle: string;
  titleInputLabel: string;
  descriptionInputLabel: string;
  titleIsToShortError: string;
  descriptionIsToShortError: string;
  addDashAlertTitle: string;
  addDashAlertText: string;
  yesButtonText: string;
  noButtonText: string;
  addDashSuccessTitle: string;
  addDashSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    addDashModalTitle: "Add Dash",

    // Error
    titleIsToShortError: "Title is to short!",
    descriptionIsToShortError: "Description is to short!",

    // Alert
    addDashAlertTitle: "Are you sure?",
    addDashAlertText: "Do you really want to add a Dash to ${name}?",

    // Button
    yesButtonText: "Yes",
    noButtonText: "No",

    // Success
    addDashSuccessTitle: "Success",
    addDashSuccessText: "Successfully added Dash to ${name}",

    // Inputs
    titleInputLabel: "Title",
    descriptionInputLabel: "Description",
  },
  de: {
    addDashModalTitle: "Strich hinzufügen",

    // Error
    titleIsToShortError: "Title ist zu kurz!",
    descriptionIsToShortError: "Beschreibung ist zu kurz!",

    // Alert
    addDashAlertTitle: "Bist du dir sicher?",
    addDashAlertText: "Willst du wirklich ${name} einen Strich hinzufügen?",

    // Button
    yesButtonText: "Ja",
    noButtonText: "Nein",

    // Success
    addDashSuccessTitle: "Erfolg",
    addDashSuccessText: "Erfolgreich einen Strich ${name} hinzugefügt",

    // Inputs
    titleInputLabel: "Title",
    descriptionInputLabel: "Beschreibung",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
