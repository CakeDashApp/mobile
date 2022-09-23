import core from "../../../../src/core";

// Interface
interface StringsInterface {
  cakesTitle: string;
  noCakesText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    cakesTitle: "Cakes",
    noCakesText: "No yummy cakes here",
  },
  de: {
    cakesTitle: "Kuchen",
    noCakesText: "Keine leckeren Kuchen da",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
