import core from "../../../../src/core";

// Interface
interface StringsInterface {
  headerText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    headerText: "TODO",
  },
  de: {
    headerText: "TODO",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
