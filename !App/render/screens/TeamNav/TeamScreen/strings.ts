import core from "../../../../src/core";

// Interface
interface StringsInterface {
  removeTeamAlertTitle: string;
  removeTeamAlertText: string;
  yesButtonText: string;
  noButtonText: string;
  deletedTeamSuccessTitle: string;
  deletedTeamSuccessText: string;
  leaveTeamAlertTitle: string;
  leaveTeamAlertText: string;
  leftTeamSuccessTitle: string;
  leftTeamSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Alert
    removeTeamAlertTitle: "Are you sure?",
    removeTeamAlertText: "Do you really want to delete this Team?",
    leaveTeamAlertTitle: "Are you sure?",
    leaveTeamAlertText: "Do you really want to leave this Team?",

    // Button
    yesButtonText: "Yes",
    noButtonText: "No",

    // Drop Down
    deletedTeamSuccessTitle: "Success",
    deletedTeamSuccessText: "Sucessfully deleted Team!",
    leftTeamSuccessTitle: "Success",
    leftTeamSuccessText: "Sucessfully left Team!",
  },
  de: {
    // Alert
    removeTeamAlertTitle: "Bist du dir sicher?",
    removeTeamAlertText: "Willst du wirklich das Team löschen?",
    leaveTeamAlertTitle: "Bist du dir sicher?",
    leaveTeamAlertText: "Willst du wirklich das Team verlassen?",

    // Button
    yesButtonText: "Ja",
    noButtonText: "Nein",

    // Drop Down
    deletedTeamSuccessTitle: "Erfolg",
    deletedTeamSuccessText: "Erfolgreich Team gelöscht!",
    leftTeamSuccessTitle: "Erfolg",
    leftTeamSuccessText: "Erfolgreich Team verlassen!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
