import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  resultTitleMembersVoted: string;
  resultTitleNoMemberVoted: string;
  hasText: string;
  haveText: string;
  confirmedMembersTableContentText: string;
  rejectedMembersTableContentText: string;
  neededVotesTableContentText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    resultTitleMembersVoted: "${members} Member${s} ${has} already voted!",
    resultTitleNoMemberVoted: "Nobody has voted yet!",
    hasText: "has",
    haveText: "have",

    // Table Content
    confirmedMembersTableContentText: "Members who are for the dash",
    rejectedMembersTableContentText: "Members who are against the dash",
    neededVotesTableContentText: "Needed Votes to put the dash into effect",
  },
  de: {
    resultTitleMembersVoted: "${members} Member${s} ${has} schon abgestimmt!",
    resultTitleNoMemberVoted: "Niemand hat bisher abgestimmt!!",
    hasText: "hat",
    haveText: "haben",

    // Table Content
    confirmedMembersTableContentText: "Members welche für den Strich sind",
    rejectedMembersTableContentText: "Members welche gegen den Strich sind",
    neededVotesTableContentText:
      "Gebrauchte abstimmungen um den Dash in kraft zu setzen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
