import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  membersTitle: string;
  allTagText: string;
  adminTagText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    membersTitle: "Members",

    // Tags
    allTagText: "All",
    adminTagText: "Admin",
  },
  de: {
    membersTitle: "Members",

    // Tags
    allTagText: "Alle",
    adminTagText: "Admin",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
