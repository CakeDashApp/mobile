import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  rateTitle: string;
  rateSubTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    rateTitle: "Was the Cake good?",
    rateSubTitle: "Every rating counts!",
  },
  de: {
    rateTitle: "War der Kuchen gut?",
    rateSubTitle: "Jede abstimmung zählt!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
