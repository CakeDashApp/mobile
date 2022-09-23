import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  noCakesText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    noCakesText: "It's time to relax",
  },
  de: {
    noCakesText: "Es ist Zeit zu entspannen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
