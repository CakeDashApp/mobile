import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} had luck!",
  },
  de: {
    eventText: "${member} hatte Glück!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
