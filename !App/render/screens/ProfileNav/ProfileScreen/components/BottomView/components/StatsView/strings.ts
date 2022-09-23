import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  statsTitle: string;
  bakeSkillTitle: string;
  totalDashesTitle: string;
  totalCakesTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    statsTitle: "STATS",
    bakeSkillTitle: "BAKE SKILL",
    totalDashesTitle: "TOTAL DASHES",
    totalCakesTitle: "TOTAL CAKES",
  },
  de: {
    statsTitle: "STATISTIKEN",
    bakeSkillTitle: "BACK SKILL",
    totalDashesTitle: "TOTAL STRICHE",
    totalCakesTitle: "TOTAL KUCHEN",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
