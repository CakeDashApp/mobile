import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  definedCakesDescription: string;
  activeButtonText: string;
  nameInputText: string;
  addButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    definedCakesDescription:
      "Defined cakes are assigned to the members and if they have too many " +
      "dashes they have to bring this defined cake and can’t choose it on their own.",

    // Button
    activeButtonText: "Active",
    addButtonText: "Add",

    // Input
    nameInputText: "Name",
  },
  de: {
    definedCakesDescription:
      "Definierte Cakes sind einem Member zugewiesen und wenn dieser zu viele hat muss dieser.. diesen Kuchen mitbringen.. blablabla ",

    // Button
    activeButtonText: "Aktivieren",
    addButtonText: "Hinzufügen",

    // Input
    nameInputText: "Name",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
