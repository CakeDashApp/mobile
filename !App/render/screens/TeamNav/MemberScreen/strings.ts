import core from "../../../../src/core";

// Interface
interface StringsInterface {
  noButtonText: string;
  yesButtonText: string;
  kickMemberAlertTitle: string;
  kickMemberAlertText: string;
  kickMemberSuccessTitle: string;
  kickMemberSuccessText: string;
  makeMemberToCreatorAlertTitle: string;
  makeMemberToCreatorAlertText: string;
  madeMemberToCreatorSuccessTitle: string;
  madeMemberToCreatorSuccessText: string;
  addAdminToMemberAlertTitle: string;
  addAdminToMemberAlertText: string;
  addedMemberToAdminSuccessTitle: string;
  addedMemberToAdminSuccessText: string;
  removeAdminFromMemberAlertTitle: string;
  removeAdminFromMemberAlertText: string;
  removedMemberFromAdminSuccessTitle: string;
  removedMemberFromAdminSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    // Button
    noButtonText: "Nein",
    yesButtonText: "Ja",

    // Alert
    kickMemberAlertTitle: "Are you sure?",
    kickMemberAlertText: "Do you really want to kick ${name}",
    makeMemberToCreatorAlertTitle: "Are you sure?",
    makeMemberToCreatorAlertText:
      "Do you really want to make ${name} to the owner?",
    addAdminToMemberAlertTitle: "Are you sure?",
    addAdminToMemberAlertText:
      "Do you really want to add ${name} to the admins?",
    removeAdminFromMemberAlertTitle: "Are you sure?",
    removeAdminFromMemberAlertText:
      "Do you really want to remove ${name} from the admins?",

    // Drop Down
    kickMemberSuccessTitle: "Success",
    kickMemberSuccessText: "Successfully kicked ${name}!",
    madeMemberToCreatorSuccessTitle: "Success",
    madeMemberToCreatorSuccessText: "Successfully made ${name} to the owner",
    addedMemberToAdminSuccessTitle: "Success",
    addedMemberToAdminSuccessText: "Successfully added ${name} to the admins",
    removedMemberFromAdminSuccessTitle: "Success",
    removedMemberFromAdminSuccessText:
      "Successfully removed ${name} from the admins",
  },
  de: {
    // Button
    noButtonText: "Nein",
    yesButtonText: "Ja",

    // Alert
    kickMemberAlertTitle: "Bist du dir sicher?",
    kickMemberAlertText: "Willst du wirklich ${member} kicken?",
    makeMemberToCreatorAlertTitle: "Bist du dir sicher?",
    makeMemberToCreatorAlertText:
      "Willst du wirklich ${name} zum Owner machen?",
    addAdminToMemberAlertTitle: "Bist du dir sicher?",
    addAdminToMemberAlertText:
      "Willst du ${name} wirklich zu einem Admin machen?",
    removeAdminFromMemberAlertTitle: "Bist du dir sicher?",
    removeAdminFromMemberAlertText:
      "Willst du ${name} wirklich Admin wegnehmen?",

    // Drop Down
    kickMemberSuccessTitle: "Erfolg",
    kickMemberSuccessText: "Erfolgreich ${name} gekickt!",
    madeMemberToCreatorSuccessTitle: "Erfolg",
    madeMemberToCreatorSuccessText:
      "Du hast erfolgreich ${name} zum Owner gemacht",
    addedMemberToAdminSuccessTitle: "Erfolg",
    addedMemberToAdminSuccessText:
      "Du hast erfolgreich ${name} zu einem Admin gemacht",
    removedMemberFromAdminSuccessTitle: "Erfolg",
    removedMemberFromAdminSuccessText:
      "Du hast erfolgreich ${name} Admin weggenommen",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
