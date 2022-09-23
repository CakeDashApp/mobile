import core from "../../../../src/core";

// Interface
interface StringsInterface {
  alreadyVotedInfoText: string;
  alreadyVotedInfoTitle: string;
  confirmVoteSuccessTitle: string;
  confirmVoteSuccessText: string;
  rejectVoteSuccessTitle: string;
  rejectVoteSuccessText: string;
  fromTitle: string;
  forTitle: string;
  createdTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    fromTitle: "FROM",
    forTitle: "FOR",
    createdTitle: "CREATED",

    // Success
    confirmVoteSuccessTitle: "Success",
    confirmVoteSuccessText: "Successfully confirmed Dash",
    rejectVoteSuccessTitle: "Success",
    rejectVoteSuccessText: "Successfully rejected Dash",

    // Info
    alreadyVotedInfoText: "Info",
    alreadyVotedInfoTitle: "Nice try.. but you have already voted!",
  },
  de: {
    fromTitle: "VON",
    forTitle: "FÜR",
    createdTitle: "ERSTELLT",

    confirmVoteSuccessTitle: "Erfolg",
    confirmVoteSuccessText: "Erfolgreich Strich bestätigt",
    rejectVoteSuccessTitle: "Erfolg",
    rejectVoteSuccessText: "ERfolgreich Strich abgelehnt",

    // Info
    alreadyVotedInfoText: "Info",
    alreadyVotedInfoTitle: "Netter Versuch.. Aber du hast schon abgestimmt!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
