import { LANGUAGE } from "../../../other/other.controller";

// Interface
interface StringsInterface {
  eventText: string;
  randomProductName: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventText: "${member} has to bring a ${product}!",
    randomProductName: "random Product",
  },
  de: {
    eventText: "${member} muss ein ${product} mitbringen!",
    randomProductName: "random Produkt",
  },
};

export default function () {
  return strings[LANGUAGE.value] || strings.en;
}
