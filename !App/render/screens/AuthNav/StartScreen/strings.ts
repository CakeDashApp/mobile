import core from "../../../../src/core";

// Interface
interface StringsInterface {
  headerText: string;
  footerTitle: string;
  signInButtonText: string;
  getStartedButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    headerText: "Welcome!",
    footerTitle: "Get free cakes from everyone!",
    signInButtonText: "Sign In with account",
    getStartedButtonText: "Get Started",
  },
  de: {
    headerText: "Wilkommen!",
    footerTitle: "Bekomme Kuchen von jedem!",
    signInButtonText: "Sign In mit Account",
    getStartedButtonText: "Lege Los!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
