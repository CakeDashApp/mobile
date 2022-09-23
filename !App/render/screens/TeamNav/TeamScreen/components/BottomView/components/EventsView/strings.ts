import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  eventsTitle: string;
  noEventsText: string;
  allTagText: string;
  memberTagText: string;
  teamTagText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    eventsTitle: "News",
    noEventsText: "Nothing special happend",

    // Tags
    allTagText: "All",
    memberTagText: "Member",
    teamTagText: "Team",
  },
  de: {
    eventsTitle: "Neuigkeiten",
    noEventsText: "Nichts neues ist passiert",

    // Tags
    allTagText: "Alle",
    memberTagText: "Member",
    teamTagText: "Team",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
