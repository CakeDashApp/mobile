import core from "../../../../src/core";

// Interface
interface StringsInterface {
  listItemSubtitle: string;
  randomCakeTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    listItemSubtitle: "from ${name}",
    randomCakeTitle: "Random Cake",
  },
  de: {
    listItemSubtitle: "von ${name}",
    randomCakeTitle: "Zufälliger Kuchen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
