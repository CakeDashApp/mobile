import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  membersTitle: string;
  dashesTitle: string;
  cakesTitle: string;
  moreSelectorRemoveButtonText: string;
  moreSelectorEditButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    membersTitle: "Members",
    dashesTitle: "Dashes",
    cakesTitle: "Cakes",

    // Button
    moreSelectorRemoveButtonText: "Remove",
    moreSelectorEditButtonText: "Edit",
  },
  de: {
    membersTitle: "Members",
    dashesTitle: "Striche",
    cakesTitle: "Kuchen",

    // Button
    moreSelectorRemoveButtonText: "Löschen",
    moreSelectorEditButtonText: "Bearbeiten",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
