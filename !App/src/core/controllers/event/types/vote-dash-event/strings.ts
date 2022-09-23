import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} may get a dash!",
  },
  de: {
    eventText: "${member} bekommt villeicht einen Strich!",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
