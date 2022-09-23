import core from "../../../../src/core";

// Interface
interface StringsInterface {
  imagesTitle: string;
  textTile: string;
  nameIsToShortError: string;
  descriptionIsToShortError: string;
  randomCakeTitle: string;
  noImagesError: string;
  submitCakeSuccessText: string;
  submitCakeSuccessTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    imagesTitle: "Images",
    textTile: "Text",
    randomCakeTitle: "Random Cake",

    // Errors
    nameIsToShortError: "The Name is to short!",
    descriptionIsToShortError: "The Description is to short!",
    noImagesError: "You need at least one image!",

    // Success
    submitCakeSuccessText: "Successfully submited cake",
    submitCakeSuccessTitle: "Success",
  },
  de: {
    imagesTitle: "Bilder",
    textTile: "Text",
    randomCakeTitle: "Zufälliger Kuchen",

    // Errors
    nameIsToShortError: "Der Name ist zu kurz!",
    descriptionIsToShortError: "Die Beschreibung ist zu kurz!",
    noImagesError: "Du brauchst mindestens ein Image",

    // Success
    submitCakeSuccessText: "Erfolgreich Kuchen eingereicht",
    submitCakeSuccessTitle: "Erfolg",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
