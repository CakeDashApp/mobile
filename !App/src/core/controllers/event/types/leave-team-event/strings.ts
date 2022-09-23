import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} left!",
  },
  de: {
    eventText: "${member} hat uns verlassen!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
