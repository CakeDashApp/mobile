import core from "../../../../../../../../src/core";

// Interface
interface StringsInterface {
  statusDescription: string;
  openButtonText: string;
  closedButtonText: string;
  inviteButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    statusDescription:
      "The Status represent whether the team is open (everybody can join), closed (nobody can join) " +
      "or invite (you can accept/reject people which want to join)",

    // Button
    openButtonText: "Open",
    inviteButtonText: "Invite",
    closedButtonText: "Closed",
  },
  de: {
    statusDescription: "blablabla",

    // Button
    openButtonText: "Offen",
    inviteButtonText: "Einladung",
    closedButtonText: "Geschlossen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
