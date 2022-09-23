import core from "../../../../src/core";

// Interface
interface StringInterface {
  defaultErrorMessage: string;
}

// Strings
const strings: { en: StringInterface; de: StringInterface } = {
  en: {
    defaultErrorMessage: "Ups.. it looks like you are lost in space :/",
  },
  de: {
    defaultErrorMessage: "Ups.. ich glaube du bist im Weltraum verloren :/",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
