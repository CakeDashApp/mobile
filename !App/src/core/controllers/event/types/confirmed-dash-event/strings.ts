import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member}'s dash got confirmed",
  },
  de: {
    eventText: "${member}'s Strich wurde bestätigt",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
