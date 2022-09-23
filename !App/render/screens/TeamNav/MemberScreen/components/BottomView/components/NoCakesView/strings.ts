import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  noCakesText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    noCakesText: "This member has nothing todo!",
  },
  de: {
    noCakesText: "Dieser Member hat nichts zu tun!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
