import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  noTeamText: string;
  joinTeamButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    noTeamText: "You are in no Team yet!",
    joinTeamButtonText: "Join Team",
  },
  de: {
    noTeamText: "Du bist bis jetzt in noch keinem Team!",
    joinTeamButtonText: "Team beitreten",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
