import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  generalTitle: string;
  dashesTitle: string;
  statusTitle: string;
  definedCakesTitle: string;
  otherTitle: string;
  nameErrorText: string;
  descriptionErrorText: string;
  definedCakesErrorText: string;
  productNameErrorText: string;
  teamCreationSuccessTitle: string;
  teamUpdateSuccessTitle: string;
  teamCreationSuccessText: string;
  teamUpdateSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    generalTitle: "General",
    dashesTitle: "Dashes",
    statusTitle: "Status",
    definedCakesTitle: "Defined Cakes",
    otherTitle: "Other",

    // Error
    nameErrorText: "The name is to short!",
    descriptionErrorText: "The description is to short!",
    definedCakesErrorText: "You need at least one defined Cakes!",
    productNameErrorText: "Name is to short!",

    // Success
    teamCreationSuccessTitle: "Success",
    teamCreationSuccessText: "Successfully created Team (${name})",
    teamUpdateSuccessTitle: "Success",
    teamUpdateSuccessText: "Successfully updated Team",
  },
  de: {
    generalTitle: "General",
    dashesTitle: "Striche",
    statusTitle: "Status",
    definedCakesTitle: "Definierte Cakes",
    otherTitle: "Anderes",

    // Error
    nameErrorText: "Der Name ist zu kurz!",
    descriptionErrorText: "Die Beschreibung ist zu kurz!",
    definedCakesErrorText: "Du brauchst mindestens ein definierten Cake!",
    productNameErrorText: "Der Name ist zu kurz!",

    // Success
    teamCreationSuccessText: "Erfolgreich Team (${name}) erstellt",
    teamCreationSuccessTitle: "Erfolg",
    teamUpdateSuccessText: "Erfolgreich Team aktuallisiert",
    teamUpdateSuccessTitle: "Erfolg",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
