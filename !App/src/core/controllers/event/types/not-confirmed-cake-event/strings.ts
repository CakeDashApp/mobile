import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} had no ${product} with him!",
  },
  de: {
    eventText: "${member} hatte kein ${product} dabei!!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
