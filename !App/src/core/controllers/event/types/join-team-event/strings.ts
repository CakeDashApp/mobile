import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} joined!",
  },
  de: {
    eventText: "${member} ist beigetreten!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
