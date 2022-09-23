import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  dashesDescription: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    dashesDescription:
      "Dashes represent how far a team member is from a cake. These dashes can be given by team members",
  },
  de: {
    dashesDescription:
      "Dashes repräsentieren wann ein Member einen Kuchen bekommt. Diese DAshes können Membern hinzugefügt werden!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
