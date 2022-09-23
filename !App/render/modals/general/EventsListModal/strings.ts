import core from "../../../../src/core";

// Interface
interface StringsInterface {
  noEventsText: string;
  eventsTitle: string;
  allTagText: string;
  memberTagText: string;
  teamTagText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventsTitle: "News",
    noEventsText: "Nothing new happens!",

    // Tag
    allTagText: "All",
    memberTagText: "Member",
    teamTagText: "Team",
  },
  de: {
    eventsTitle: "Neuigkeiten",
    noEventsText: "Es gibt nichts neues!",

    // Tag
    allTagText: "Alle",
    memberTagText: "Member",
    teamTagText: "Team",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
