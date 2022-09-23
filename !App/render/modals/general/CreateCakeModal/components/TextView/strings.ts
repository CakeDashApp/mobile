import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  descriptionInputText: string;
  nameInputText: string;
  descriptionInputDescriptionText: string;
  nameInputDescriptionText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    descriptionInputText: "Description",
    nameInputText: "Name",
    descriptionInputDescriptionText:
      "Here you can for example tell your members where the cake is.",
    nameInputDescriptionText: "So your cake will be called",
  },
  de: {
    descriptionInputText: "Beschreibung",
    nameInputText: "Name",
    descriptionInputDescriptionText:
      "Hier kanst du zum Beispiel deinen Mitglieder sagen wo der Kuchen steht",
    nameInputDescriptionText: "So wird mal dein Kuchen genannt",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
