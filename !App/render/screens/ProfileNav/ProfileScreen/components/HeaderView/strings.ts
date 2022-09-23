import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  editProfileButtonText: string;
  changePasswordButtonText: string;
  descriptionTitle: string;
  resetImageButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Other
    descriptionTitle: "DESCRIPTION",

    // Buttons
    editProfileButtonText: "Edit Profile",
    changePasswordButtonText: "Change Password",
    resetImageButtonText: "Reset Image",
  },
  de: {
    // Other
    descriptionTitle: "BESCHREIBUNG",

    // Buttons
    editProfileButtonText: "Profil bearbeiten",
    changePasswordButtonText: "Passwort ändern",
    resetImageButtonText: "Bild zurücksetzen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
