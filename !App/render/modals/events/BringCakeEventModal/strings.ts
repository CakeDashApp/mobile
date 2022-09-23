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
  ratingsTitle: string;
  createdTitle: string;
  alreadyRatedInfoText: string;
  alreadyRatedInfoTitle: string;
  rateSuccessTitle: string;
  rateSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    fromTitle: "FROM",
    ratingsTitle: "RATING",
    createdTitle: "CREATED",

    // Success
    confirmVoteSuccessTitle: "Success",
    confirmVoteSuccessText: "Successfully confirmed Cake",
    rejectVoteSuccessTitle: "Success",
    rejectVoteSuccessText: "Successfully rejected Cake",
    rateSuccessTitle: "Success",
    rateSuccessText: "Successfully rated",

    // Info
    alreadyVotedInfoText: "Info",
    alreadyVotedInfoTitle: "Nice try.. but you have already voted!",
    alreadyRatedInfoText: "Info",
    alreadyRatedInfoTitle: "You have already rated!",
  },
  de: {
    fromTitle: "VON",
    ratingsTitle: "BEWERTUNG",
    createdTitle: "ERSTELLT",

    confirmVoteSuccessTitle: "Erfolg",
    confirmVoteSuccessText: "Erfolgreich Kuchen bestätigt",
    rejectVoteSuccessTitle: "Erfolg",
    rejectVoteSuccessText: "Erfolgreich Kuchen abgelehnt",
    rateSuccessTitle: "Erfolg",
    rateSuccessText: "Erfolgreich abgestimmt",

    // Info
    alreadyVotedInfoText: "Info",
    alreadyVotedInfoTitle: "Netter Versuch.. Aber du hast schon abgestimmt!",
    alreadyRatedInfoText: "Info",
    alreadyRatedInfoTitle: "Du hast schon bewertet!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
