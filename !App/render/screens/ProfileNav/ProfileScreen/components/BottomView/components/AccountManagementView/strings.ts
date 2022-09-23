import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  logoutButtonText: string;
  deleteAccountButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Buttons
    logoutButtonText: "Logout",
    deleteAccountButtonText: "Delete Account",
  },
  de: {
    // Buttons
    logoutButtonText: "Logout",
    deleteAccountButtonText: "Akount löschen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
