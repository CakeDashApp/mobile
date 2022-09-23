import core from "../../../../src/core";

// Interface
interface StringsInterface {
  descriptionModalTitle: string;
  emptyDescriptionError: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    descriptionModalTitle: "Description",
    emptyDescriptionError: "Ups.. Something went wrong!",
  },
  de: {
    descriptionModalTitle: "Beschreibung",
    emptyDescriptionError: "Ups.. Etwas ist schief gegangen!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
