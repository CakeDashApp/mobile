import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  voteTitle: string;
  voteFooter: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    voteTitle: "Is this dash justified?",
    voteFooter: "Every vote counts",
  },
  de: {
    voteTitle: "Ist der Strich berechtigt?",
    voteFooter: "Jede Abstimmung zählt",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
