import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  editProfileTitle: string;
  descriptionInputText: string;
  nameInputText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    editProfileTitle: "Edit Profile",

    // Inputs
    descriptionInputText: "Description",
    nameInputText: "Name",
  },
  de: {
    editProfileTitle: "Profil bearbeiten",

    // Inputs
    descriptionInputText: "Beschreibung",
    nameInputText: "Name",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
