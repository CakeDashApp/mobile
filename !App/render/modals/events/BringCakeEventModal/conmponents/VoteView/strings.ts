import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  voteTitle: string;
  voteSubTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    voteTitle: "Does the Cake Exist?",
    voteSubTitle: "Please be honest!",
  },
  de: {
    voteTitle: "Existiert dieser Kuchen?",
    voteSubTitle: "Bitte sei erlich!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
