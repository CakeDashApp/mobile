import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  currentDashesTitle: string;
  currentProductTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    currentDashesTitle: "CURRENT DASHES",
    currentProductTitle: "CURRENT CAKE",
  },
  de: {
    currentDashesTitle: "AKTUELLE STRICHE",
    currentProductTitle: "AKTUELLER KUCHEN",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
