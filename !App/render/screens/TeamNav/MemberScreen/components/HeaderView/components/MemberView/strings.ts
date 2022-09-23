import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  roleTitle: string;
  bakeSkillTitle: string;
  totalDashesTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    roleTitle: "ROLE",
    bakeSkillTitle: "BAKE SKILL",
    totalDashesTitle: "TOTAL DASHES",
  },
  de: {
    roleTitle: "ROLLE",
    bakeSkillTitle: "BACK SKILL",
    totalDashesTitle: "TOTAL STRICHE",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
