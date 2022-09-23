import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} brought a ${product} with him!",
  },
  de: {
    eventText: "${member} hat ein ${product} für uns!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
