import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  goBackButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    goBackButtonText: "Go Back",
  },
  de: {
    goBackButtonText: "Gehe Zurück",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
