import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} got a dash!",
  },
  de: {
    eventText: "${member} bekommt einen Strich!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
