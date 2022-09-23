import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  hiddenDasherButton: string;
  hiddenDasherDescription: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    hiddenDasherButton: "Hidden Dasher",
    hiddenDasherDescription:
      "Defines whether the Member who added the dash should be mentioned or not!",
  },
  de: {
    hiddenDasherButton: "Versteckter Dasher",
    hiddenDasherDescription:
      "Definiert ob der Member, welcher den Dash angezeigt werden soll oder nicht!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
