import core from "../../../../src/core";

// Interface
interface StringsInterface {
  defaultErrorMessage: string;
  defaultErrorTitle: string;
  deniedCameraPermissionErrorTitle: string;
  deniedCameraPermissionErrorMessage: string;
  deniedLibraryPermissionErrorTitle: string;
  deniedLibraryPermissionErrorMessage: string;
  selectImageTitle: string;
  selectImageMessage: string;
  newButton: string;
  cancelButton: string;
  selectButton: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    defaultErrorMessage: "Something went wrong!",
    defaultErrorTitle: "An error occurred!",
    deniedCameraPermissionErrorTitle: "Denied Camera Permission!",
    deniedCameraPermissionErrorMessage:
      "You have denied the Camera Permission for this App!",
    deniedLibraryPermissionErrorTitle: "Denied Library Permission!",
    deniedLibraryPermissionErrorMessage:
      "You have denied the Library Permission for this App!",
    selectImageTitle: "Select an Image!",
    selectImageMessage: "Do you want to take a new Image or Select one?",
    newButton: "New",
    cancelButton: "Cancel",
    selectButton: "Select",
  },
  de: {
    defaultErrorMessage: "Etwas ist schief gegangen!",
    defaultErrorTitle: "Ein Fehler ist aufgetreten!",
    deniedCameraPermissionErrorTitle: "Kamera erlaubnis abgelehnt!",
    deniedCameraPermissionErrorMessage:
      "Du hast dieser App keine Kamera erlaubnis erteilt!",
    deniedLibraryPermissionErrorTitle: "Speicher erlaubnis abgelehnt!",
    deniedLibraryPermissionErrorMessage:
      "Du hast dieser App keine Speicher erlaubnis erteilt!",
    selectImageTitle: "Wähle ein Bild aus!",
    selectImageMessage:
      "Willst du eine neues Bild machen oder eins aus der Bibiliothek wählen?",
    newButton: "Neu",
    cancelButton: "Abbrechen",
    selectButton: "Wähle",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
