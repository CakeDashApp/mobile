import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  changePasswordTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    changePasswordTitle: "Change Password",
  },
  de: {
    changePasswordTitle: "Passwort ändern",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
