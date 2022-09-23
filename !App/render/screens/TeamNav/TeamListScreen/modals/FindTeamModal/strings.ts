import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  findTeamTitle: string;
  allTagText: string;
  closedTagText: string;
  openTagText: string;
  noTeamFoundCalledInfoText: string;
  noTeamFoundInfoText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    findTeamTitle: "Find Team",

    // Tags
    allTagText: "All",
    closedTagText: "Closed",
    openTagText: "Open",

    // Info
    noTeamFoundCalledInfoText: "No team found called ${name}",
    noTeamFoundInfoText: "No team found!",
  },
  de: {
    findTeamTitle: "Finde Team",

    // Tags
    allTagText: "Alle",
    closedTagText: "Geschlossen",
    openTagText: "Offen",

    // Info
    noTeamFoundCalledInfoText: "Kein Team names ${name} gefunden",
    noTeamFoundInfoText: "Kein Team gefunden!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
