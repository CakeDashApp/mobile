import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  descriptionInputText: string;
  nameInputText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    descriptionInputText: "Descripiton",
    nameInputText: "Name",
  },
  de: {
    descriptionInputText: "Beschreibung",
    nameInputText: "Name",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
